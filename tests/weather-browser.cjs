const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict');
const path=require('node:path'),os=require('node:os');
const origin=process.argv[3]||'http://localhost:4174';
const forecast=base=>Array.from({length:6},(_,place)=>({daily:{time:Array.from({length:16},(_,i)=>new Date(Date.parse(base+'T00:00:00Z')+i*86400000).toISOString().slice(0,10)),weather_code:Array(16).fill(place%2?61:0),temperature_2m_min:Array(16).fill(8-place),temperature_2m_max:Array(16).fill(20-place),precipitation_probability_max:Array(16).fill(30)}}));
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.argv[4]?{executablePath:process.argv[4]}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[],requests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  await page.clock.install({time:new Date('2026-11-10T00:00:00Z')});
  let fail=false,backup=false,ensemble=false,partial=false,calls=0;
  const base='2026-11-10';
  const met=()=>({properties:{timeseries:Array.from({length:16},(_,i)=>({time:new Date(Date.parse(base+'T00:00:00Z')+i*86400000).toISOString(),data:{instant:{details:{air_temperature:12}}}}))}});
  await page.route('**/api/weather',r=>r.fulfill({status:503,json:{error:'test unavailable'}}));
  await page.route('https://api.open-meteo.com/**',r=>{calls++;const data=forecast(base);if(partial)data[2].daily.temperature_2m_min.fill(null);return fail?r.abort():r.fulfill({json:data});});
  await page.route('https://ensemble-api.open-meteo.com/**',r=>ensemble?r.fulfill({json:forecast(base).map(p=>({daily:{...p.daily,temperature_2m_min:Array(16).fill(8),temperature_2m_max:Array(16).fill(20),temperature_2m_min_member01:Array(16).fill(10),temperature_2m_max_member01:Array(16).fill(24)}}))}):r.abort());
  await page.route('https://api.met.no/**',r=>backup?r.fulfill({json:met()}):r.abort());
  const updated=()=>page.locator('#weather-status').filter({hasText:'資料取得'}).waitFor();
  const settled=()=>page.waitForFunction(()=>!document.querySelector('#weather-refresh').disabled);
  await page.goto(origin);await updated();await settled();
  assert.equal(await page.locator('.weather-slide').count(),6);
  assert.deepEqual(await page.locator('.weather-day h3').allTextContents(),['11/15（日）','11/16（一）','11/17（二）','11/18（三）','11/19（四）','11/20（五）']);
  assert.match(await page.locator('.weather-slide').first().innerText(),/8° \/ 20°/);
  assert.match(await page.locator('.weather-slide').nth(2).innerText(),/高千穗[\s\S]*黑川溫泉/);
  assert.match(await page.locator('.weather-slide').nth(3).innerText(),/阿蘇・草千里/);
  await page.locator('.weather-controls').waitFor({state:'hidden'});
  const boxes=await page.locator('.weather-slide').evaluateAll(cards=>cards.map(c=>{const r=c.getBoundingClientRect();return {y:r.y,right:r.right};}));
  assert.equal(new Set(boxes.map(b=>Math.round(b.y))).size,1);assert.ok(boxes.at(-1).right<=1440);
  await page.locator('#trip-weather').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(os.tmpdir(),'kumamoto-public-weather-desktop.png')});
  for(const colorScheme of ['light','dark']){
   await page.setViewportSize({width:390,height:844});await page.emulateMedia({colorScheme});
   await page.locator('#weather-next').click();assert.ok(await page.locator('#weather-track').evaluate(e=>e.scrollLeft)>0);
   await page.locator('#weather-track').focus();await page.keyboard.press('ArrowRight');assert.ok(await page.locator('#weather-track').evaluate(e=>e.scrollLeft)>200);
   await page.waitForTimeout(200);assert.match(await page.locator('#weather-position').innerText(),/起的天氣/);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await page.screenshot({path:path.join(os.tmpdir(),`kumamoto-public-weather-mobile-${colorScheme}.png`)});
  }
  await page.reload();await updated();await settled();assert.equal(calls,1);
  fail=true;await page.locator('#weather-refresh').click();await page.locator('#weather-status').filter({hasText:'更新未完成'}).waitFor();assert.match(await page.locator('.weather-slide').first().innerText(),/20°/);
  await page.evaluate(()=>{sessionStorage.clear();localStorage.clear();});await page.reload();await page.locator('#weather-status').filter({hasText:'暫無法取得'}).waitFor();
  assert.equal(await page.locator('.weather-slide a').count(),10);assert.doesNotMatch(await page.locator('#weather-track').innerText(),/20°/);
  backup=true;await page.locator('#weather-refresh').click();await updated();await settled();
  assert.match(await page.locator('#weather-track').innerText(),/備援・時段溫度/);assert.doesNotMatch(await page.locator('#weather-track').innerText(),/降雨 0%/);
  backup=false;await page.evaluate(()=>sessionStorage.clear());await page.reload();await updated();await settled();assert.match(await page.locator('#weather-track').innerText(),/12° \/ 12°/);
  fail=false;partial=true;backup=true;await page.locator('#weather-refresh').click();await settled();
  assert.match(await page.locator('.weather-slide').nth(2).innerText(),/高千穗[\s\S]*備援・時段溫度/);
  fail=true;partial=false;backup=false;ensemble=true;await page.locator('#weather-refresh').click();await settled();
  assert.match(await page.locator('.weather-slide').last().innerText(),/9° \/ 22°/);
  fail=false;ensemble=false;
  await page.clock.setSystemTime(new Date('2026-11-18T00:00:00Z'));await page.reload();await updated();await settled();
  for(let i=0;i<3;i++){assert.match(await page.locator('.weather-slide').nth(i).innerText(),/已過預報日期/);assert.doesNotMatch(await page.locator('.weather-slide').nth(i).innerText(),/20°/);}
  // Moving to a future date invalidates cached past forecasts, including failed refreshes.
  fail=true;await page.locator('#weather-refresh').click();await settled();assert.match(await page.locator('.weather-slide').first().innerText(),/已過預報日期/);
  fail=false;await page.clock.setSystemTime(new Date('2026-10-01T00:00:00Z'));await page.reload();await updated();await settled();
  assert.match(await page.locator('#weather-track').innerText(),/尚未進入預報範圍/);assert.doesNotMatch(await page.locator('#weather-track').innerText(),/20°/);
  // The public version never asks the private site's meal API or identifies its domain.
  assert.equal(requests.some(u=>u.includes('/api/meal-plan')),false);
  assert.deepEqual(errors,[]);
  console.log('Public dates, desktop/mobile light/dark, keyboard, cache, failures, per-place recovery, MET/GFS backups and date boundaries: passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
