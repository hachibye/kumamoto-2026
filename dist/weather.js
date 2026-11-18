/* Daily destination forecasts. Dates and day boundaries use Japan time. */
(()=>{
  const places=[
    {name:'熊本市',lat:32.8031,lon:130.7079},
    {name:'天草・倉岳',lat:32.4277,lon:130.3273},
    {name:'高千穗',lat:32.7018,lon:131.3009},
    {name:'黑川溫泉',lat:33.0773,lon:131.1426},
    {name:'阿蘇・草千里',lat:32.8815,lon:131.0535},
    {name:'熊本機場',lat:32.8358,lon:130.8646}
  ];
  const days=[
    {date:'2026-11-15',label:'11/15（日）',places:[0]},
    {date:'2026-11-16',label:'11/16（一）',places:[1]},
    {date:'2026-11-17',label:'11/17（二）',places:[2,3]},
    {date:'2026-11-18',label:'11/18（三）',places:[3,4,0]},
    {date:'2026-11-19',label:'11/19（四）',places:[0]},
    {date:'2026-11-20',label:'11/20（五）',places:[0,5]}
  ];
  const track=document.querySelector('#weather-track');
  if(!track)return;
  const status=document.querySelector('#weather-status');
  const refresh=document.querySelector('#weather-refresh');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const delta=(date,base)=>Math.round((Date.parse(date+'T00:00:00+09:00')-Date.parse(base+'T00:00:00+09:00'))/86400000);
  const codeLabel=code=>{
    if(code===0)return ['晴天','sun'];
    if([1,2].includes(code))return ['晴時多雲','cloud'];
    if(code===3)return ['多雲','cloud'];
    if([45,48].includes(code))return ['霧','cloud'];
    if([51,53,55,56,57].includes(code))return ['毛毛雨','rain'];
    if([61,63,65,66,67,80,81,82].includes(code))return ['雨天','rain'];
    if([71,73,75,77,85,86].includes(code))return ['降雪','snow'];
    if([95,96,99].includes(code))return ['雷雨','rain'];
    return ['天氣資料未提供','cloud'];
  };
  const icon=kind=>`<svg class="weather-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${kind==='sun'?'<circle cx="24" cy="24" r="9"/><path d="M24 3v5m0 32v5M3 24h5m32 0h5M9 9l4 4m22 22 4 4M9 39l4-4m22-22 4-4"/>':kind==='snow'?'<path d="M24 5v38M8 14l32 20M8 34l32-20M19 9l5 5 5-5M19 39l5-5 5 5"/>':'<path d="M12 33a9 9 0 1 1 2-18 12 12 0 0 1 23 6 6 6 0 0 1-1 12Z"/>'+ (kind==='rain'?'<path d="m15 38-2 5m12-5-2 5m12-5-2 5"/>':'')}</svg>`;
  const value=(n,unit)=>Number.isFinite(n)?`${Math.round(n)}${unit}`:'—';
  let current=0,loading=false,results=null,receivedAt=null,base=today(),timer,notice='';
  function render(){
    track.innerHTML=days.map((day,i)=>{
      const gap=delta(day.date,base);
      const rows=day.places.map(id=>{
        const daily=results?.[id]?.daily;
        const at=daily?.time?.indexOf(day.date)??-1;
        const [label,kind]=codeLabel(at>=0?daily.weather_code?.[at]:null);
        const source=results?.[id]?.sources?.[at]||results?.[id]?.source;
        const met=source==='met',ensemble=source==='ensemble';
        const stamp=results?.[id]?.timestamps?.[at];
        const old=stamp&&Date.now()-stamp>1800000?'・上次預報 '+new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Tokyo',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(stamp)):'';
        const has=gap>=0&&gap<=15&&at>=0&&(!stamp||Date.now()-stamp<48*3600000)&&[daily.temperature_2m_min?.[at],daily.temperature_2m_max?.[at]].every(Number.isFinite);
        const empty=gap<0?'已過預報日期':gap>15?'尚未進入預報範圍':loading?'正在載入…':results?'此地預報尚未提供':'天氣資料暫無法取得';
        return `<div class="weather-place"><div class="weather-place-name"><b>${places[id].name}</b><span>${has?(met?'備援・時段溫度':ensemble?'備援・GFS 集合趨勢':label)+old:empty}</span></div>${has?((met||ensemble)?'<span class="weather-placeholder" aria-hidden="true">°C</span>':icon(kind)):'<span class="weather-placeholder" aria-hidden="true">—</span>'}<div class="weather-numbers"><strong>${has?value(daily.temperature_2m_min?.[at],'°')+' / '+value(daily.temperature_2m_max?.[at],'°'):'—'}</strong><span>${has?(Number.isFinite(daily.precipitation_probability_max?.[at])?'降雨 '+value(daily.precipitation_probability_max[at],'%'):met?'MET Norway・降雨機率未提供':ensemble?'GFS 集合平均・降雨機率未提供':'降雨機率待更新'):`<a href="https://www.jma.go.jp/bosai/forecast/#area_type=offices&amp;area_code=${id===2?'450000':'430000'}" target="_blank" rel="noreferrer">氣象廳預報 ↗</a>`}</span></div></div>`;
      }).join('');
      return `<article class="weather-slide weather-count-${day.places.length}" role="group" aria-roledescription="投影片" aria-label="第 ${i+1} 張，共 6 張"><div class="weather-day"><h3>${day.label}</h3><span>${gap>7?'趨勢預報':gap<0?'旅程日期':'每日預報'}</span></div>${rows}</article>`;
    }).join('');
    if(receivedAt)status.textContent='資料取得 '+new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Tokyo',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(receivedAt)+'（日本時間）'+notice;
  }
  const controls=document.querySelector('.weather-controls');
  const step=()=>track.children.length>1?track.children[1].offsetLeft-track.children[0].offsetLeft:1;
  const lastIndex=()=>track.scrollWidth-track.clientWidth<=2?0:Math.ceil((track.scrollWidth-track.clientWidth)/step());
  function go(index){
    const last=lastIndex();
    current=(index+last+1)%(last+1);
    track.scrollTo({left:Math.min(current*step(),track.scrollWidth-track.clientWidth),behavior:motion.matches?'instant':'smooth'});
  }
  const fields=['weather_code','temperature_2m_min','temperature_2m_max','precipitation_probability_max'];
  const valid=data=>Array.isArray(data)&&data.length===places.length&&data.some(p=>p?.daily?.temperature_2m_max?.some(Number.isFinite));
  // MET provides point-in-time samples, not daily extrema or rain probabilities.
  function fromMet(data){
    return places.map((_,id)=>{
      const groups=new Map();
      for(const item of data[id]?.properties?.timeseries||[]){
        const date=new Date(Date.parse(item.time)+9*3600000).toISOString().slice(0,10);
        const temp=item.data?.instant?.details?.air_temperature;
        if(Number.isFinite(temp)){if(!groups.has(date))groups.set(date,[]);groups.get(date).push(temp);}
      }
      const entries=[...groups];
      return {source:'met',daily:{time:entries.map(([d])=>d),temperature_2m_min:entries.map(([,v])=>Math.min(...v)),temperature_2m_max:entries.map(([,v])=>Math.max(...v))}};
    });
  }
  function fromEnsemble(data){
    if(!Array.isArray(data)||data.length!==places.length)throw new Error('ensemble');
    return data.map(p=>{
      const daily={time:p?.daily?.time||[]};
      for(const field of ['temperature_2m_min','temperature_2m_max']){
        const keys=Object.keys(p?.daily||{}).filter(k=>k===field||k.startsWith(field+'_member'));
        daily[field]=daily.time.map((_,i)=>{const values=keys.map(k=>p.daily[k]?.[i]).filter(Number.isFinite);return values.length?values.reduce((a,b)=>a+b,0)/values.length:null;});
      }
      return {source:'ensemble',daily};
    });
  }
  const ensembleUrl=()=> 'https://ensemble-api.open-meteo.com/v1/ensemble?'+new URLSearchParams({latitude:places.map(p=>p.lat).join(','),longitude:places.map(p=>p.lon).join(','),daily:'temperature_2m_min,temperature_2m_max',models:'gfs_seamless',timezone:'Asia/Tokyo',forecast_days:'16'});
  function merge(fresh,older){
    return places.map((_,id)=>{
      const dates=[...new Set([...(fresh?.[id]?.daily?.time||[]),...(older?.[id]?.daily?.time||[])])].sort();
      const daily={time:dates},sources=[],timestamps=[];
      for(const field of fields)daily[field]=[];
      for(const date of dates){
        const a=fresh?.[id],b=older?.[id],ai=a?.daily?.time?.indexOf(date)??-1,bi=b?.daily?.time?.indexOf(date)??-1;
        const usable=p=>(!p?.timestamps?.[p===a?ai:bi]||Date.now()-p.timestamps[p===a?ai:bi]<48*3600000)&&Number.isFinite(p?.daily?.temperature_2m_min?.[p===a?ai:bi])&&Number.isFinite(p?.daily?.temperature_2m_max?.[p===a?ai:bi]);
        const use=usable(a)?a:usable(b)?b:null,index=use===a?ai:bi;
        for(const field of fields)daily[field].push(use?.daily?.[field]?.[index]??null);
        sources.push(use?.sources?.[index]||use?.source||'open-meteo');
        timestamps.push(use?.timestamps?.[index]||use?.at||null);
      }
      return {daily,sources,timestamps};
    });
  }
  const get=async (url,timeout=7000)=>{const r=await fetch(url,{signal:AbortSignal.timeout(timeout),credentials:'omit',referrerPolicy:'no-referrer'});if(!r.ok)throw new Error('weather');return r.json();};
  async function load(force=false){
    if(loading)return;
    base=today();loading=true;refresh.disabled=true;status.textContent='正在取得天氣資料…';
    let cache;
    for(const storage of ['localStorage','sessionStorage']){
      try{const c=JSON.parse(window[storage].getItem('kumamoto-public-weather-v1'));if(valid(c?.data)&&Number.isFinite(c.at)&&c.at<=Date.now()&&Date.now()-c.at<48*3600000&&(!cache||c.at>cache.at))cache=c;}catch{}
    }
    if(cache){results=cache.data.map(p=>({...p,at:cache.at}));receivedAt=new Date(cache.at);notice='・上次取得的預報';}
    render();
    try{
      if(!force&&cache?.date===base&&Date.now()-cache.at<1800000){notice=cache.notice||'';return;}
      let data,at=Date.now(),source='open-meteo';
      try{
        const payload=await get('/api/weather',13000);source=payload.source;
        data=source==='met'?fromMet(payload.data):source==='ensemble'?fromEnsemble(payload.data):payload.data;at=payload.at;
        if(!valid(data)||!Number.isFinite(at)||at>Date.now())throw new Error('empty');
      }catch{
        try{
          const query=new URLSearchParams({latitude:places.map(p=>p.lat).join(','),longitude:places.map(p=>p.lon).join(','),daily:fields.join(','),timezone:'Asia/Tokyo',forecast_days:'16'});
          source='open-meteo';data=await get('https://api.open-meteo.com/v1/forecast?'+query);
          if(!valid(data))throw new Error('empty');
        }catch{
          try{
            source='ensemble';data=fromEnsemble(await get(ensembleUrl()));if(!valid(data))throw new Error('empty');
          }catch{
          source='met';
          const responses=await Promise.allSettled(places.map(p=>get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${p.lat}&lon=${p.lon}`)));
          data=fromMet(responses.map(r=>r.status==='fulfilled'?r.value:null));
          if(!valid(data))throw new Error('empty');
          }
        }
        at=Date.now();
      }
      data=data.map(p=>({...p,at}));
      const incomplete=days.some(day=>delta(day.date,base)>=0&&delta(day.date,base)<=15&&day.places.some(id=>{const i=data[id]?.daily?.time?.indexOf(day.date)??-1;return i<0||fields.slice(1,3).some(f=>!Number.isFinite(data[id]?.daily?.[f]?.[i]));}));
      if(incomplete&&source!=='ensemble'){
        try{data=merge(data,fromEnsemble(await get(ensembleUrl())).map(p=>({...p,at:Date.now()})));}catch{}
      }
      if(incomplete&&source!=='met'){
        const responses=await Promise.allSettled(places.map(p=>get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${p.lat}&lon=${p.lon}`)));
        const backup=fromMet(responses.map(r=>r.status==='fulfilled'?r.value:null)).map(p=>({...p,at:Date.now()}));
        data=merge(data,backup);
      }
      results=merge(data,results);receivedAt=new Date(at);
      notice=source==='met'?'・備援 MET Norway（時段溫度範圍）':source==='ensemble'?'・備援 GFS 集合趨勢（低高溫為成員平均）':'';
      if(results.some(p=>p.sources.some(s=>s==='met'||s==='ensemble')))notice+='・部分日期使用備援';
      // Cached dates retain their own source and are never relabelled as new observations.
      if(days.some(day=>day.places.some(id=>{const i=data[id]?.daily?.time?.indexOf(day.date)??-1;return i<0||fields.slice(1,3).some(f=>!Number.isFinite(data[id]?.daily?.[f]?.[i]));})))notice+='・部分資料待更新／沿用上次預報';
      const saved={date:base,at,data:results,notice};
      for(const storage of ['localStorage','sessionStorage'])try{window[storage].setItem('kumamoto-public-weather-v1',JSON.stringify(saved));}catch{}
    }catch{notice=results?'・更新未完成，目前顯示上次取得的資料。':'';status.textContent='天氣資料暫無法取得，請查看氣象廳預報。';}
    finally{loading=false;refresh.disabled=false;render();}
  }
  document.querySelector('#weather-prev').addEventListener('click',()=>go(current-1));
  document.querySelector('#weather-next').addEventListener('click',()=>go(current+1));
  refresh.addEventListener('click',()=>load(true));
  track.addEventListener('scroll',()=>{const max=track.scrollWidth-track.clientWidth;current=track.scrollLeft>=max-2?lastIndex():Math.round(track.scrollLeft/step());},{passive:true});
  track.addEventListener('keydown',e=>{if(e.target===track&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}});
  const position=document.querySelector('#weather-position');
  let settleTimer;
  track.addEventListener('scroll',()=>{
    clearTimeout(settleTimer);
    settleTimer=setTimeout(()=>{position.textContent=`${days[Math.min(current,days.length-1)].label} 起的天氣`;},160);
  },{passive:true});
  // Automatic rotation pauses while reading, focusing, or using reduced motion.
  const section=document.querySelector('#trip-weather');
  let paused=false,visible=false,stopped=false;
  const start=()=>{clearInterval(timer);if(!motion.matches&&!paused&&!stopped&&visible&&!document.hidden&&lastIndex()>0)timer=setInterval(()=>go(current+1),7000);};
  section.addEventListener('mouseenter',()=>{paused=true;start();});
  section.addEventListener('mouseleave',()=>{paused=false;start();});
  section.addEventListener('focusin',()=>{paused=true;start();});
  section.addEventListener('focusout',e=>{if(!section.contains(e.relatedTarget)){paused=false;start();}});
  section.addEventListener('touchstart',()=>{paused=true;start();},{passive:true});
  const rotation=document.querySelector('#weather-rotation');
  rotation.addEventListener('click',()=>{stopped=!stopped;paused=stopped;rotation.textContent=stopped?'播放輪播':'暫停輪播';rotation.setAttribute('aria-pressed',String(stopped));start();});
  // Explicit pause remains in force after pointer/focus leaves the region.
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(stopped){clearInterval(timer);return;}start();});
  observer.observe(section);
  document.addEventListener('visibilitychange',()=>{if(stopped)clearInterval(timer);else start();});
  motion.addEventListener('change',start);
  new ResizeObserver(()=>{controls.hidden=lastIndex()===0;start();}).observe(track);
  render();load();
})();
