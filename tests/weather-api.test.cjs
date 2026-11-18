const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const moduleUrl='data:text/javascript;base64,'+Buffer.from(fs.readFileSync(require('node:path').join(__dirname,'../functions/api/weather.js'))).toString('base64');
test('weather proxy recovers from primary outage, tolerates one unavailable destination and caches success',async()=>{
 const {onRequestGet}=await import(moduleUrl),originalFetch=global.fetch,originalCaches=global.caches;
 const calls=[],stored=[];
 global.caches={default:{match:async()=>null,put:async(k,v)=>stored.push(await v.json())}};
 global.fetch=async(url,options)=>{
  calls.push(url);assert.match(options.headers['User-Agent'],/KumamotoTrip/);
  if(url.includes('open-meteo'))return new Response('down',{status:503});
  if(url.includes('32.7018'))throw new Error('destination down');
  return Response.json({properties:{timeseries:[{time:'2026-11-17T00:00:00Z',data:{instant:{details:{air_temperature:12}}}}]}});
 };
 try{
  const pending=[],response=await onRequestGet({request:new Request('https://test.invalid/api/weather'),waitUntil:p=>pending.push(p)});
  assert.equal(response.status,200);assert.match(response.headers.get('Cache-Control'),/1800/);
  const payload=await response.json();assert.equal(payload.source,'met');assert.equal(payload.data.length,6);assert.equal(payload.data[2],null);
  await Promise.all(pending);assert.equal(stored.length,1);assert.equal(calls.length,8);
  global.caches.default.match=async()=>Response.json(payload);
  await onRequestGet({request:new Request('https://test.invalid/api/weather'),waitUntil:()=>{}});assert.equal(calls.length,8);
  global.caches.default.match=async()=>null;
  global.fetch=async url=>url.includes('ensemble-api')?Response.json(Array.from({length:6},()=>({daily:{time:['2026-11-20'],temperature_2m_max:[20]}}))):new Response('down',{status:503});
  const ensemble=await onRequestGet({request:new Request('https://test.invalid/api/weather'),waitUntil:()=>{}});
  assert.equal((await ensemble.json()).source,'ensemble');
  global.fetch=async()=>{throw new Error('all down')};
  const failed=await onRequestGet({request:new Request('https://test.invalid/api/weather'),waitUntil:()=>{}});
  assert.equal(failed.status,503);assert.equal(failed.headers.get('Cache-Control'),'no-store');
 }finally{global.fetch=originalFetch;global.caches=originalCaches;}
});

test('primary forecast uses only fixed public coordinates and a public application identifier',async()=>{
 const {onRequestGet}=await import(moduleUrl),originalFetch=global.fetch,originalCaches=global.caches;
 const calls=[];
 global.caches=undefined;
 global.fetch=async(url,options)=>{
  calls.push(url);
  const upstream=new URL(url);
  assert.equal(upstream.origin,'https://api.open-meteo.com');
  assert.equal(upstream.searchParams.get('timezone'),'Asia/Tokyo');
  assert.equal(upstream.searchParams.get('forecast_days'),'16');
  assert.equal(upstream.searchParams.get('latitude'),'32.8031,32.4277,32.7018,33.0773,32.8815,32.8358');
  assert.equal(options.headers['User-Agent'],'KumamotoTrip/1.0 https://github.com/hachibye/kumamoto-2026');
  return Response.json(Array.from({length:6},()=>({daily:{time:['2026-11-20'],temperature_2m_max:[20],temperature_2m_min:[8]}})));
 };
 try{
  const response=await onRequestGet({request:new Request('https://example.org/api/weather?latitude=0&url=https://example.invalid'),waitUntil:()=>{}});
  assert.equal(response.status,200);
  const payload=await response.json();assert.equal(payload.source,'open-meteo');assert.equal(payload.data.length,6);assert.ok(Number.isFinite(payload.at));assert.equal(calls.length,1);
 }finally{global.fetch=originalFetch;global.caches=originalCaches;}
});
