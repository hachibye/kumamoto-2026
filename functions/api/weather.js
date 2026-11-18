/* Fixed destinations only: no arbitrary upstream URLs or user coordinates. */
const coordinates=[[32.8031,130.7079],[32.4277,130.3273],[32.7018,131.3009],[33.0773,131.1426],[32.8815,131.0535],[32.8358,130.8646]];
export async function onRequestGet({request,waitUntil}){
 const key=new Request(new URL('/api/weather',request.url));
 const cache=globalThis.caches?.default;
 const hit=await cache?.match(key);if(hit)return hit;
 const get=async (url,timeout=3000)=>{
  const response=await fetch(url,{headers:{'User-Agent':'KumamotoTrip/1.0 https://github.com/hachibye/kumamoto-2026'},signal:AbortSignal.timeout(timeout)});
  if(!response.ok)throw new Error('upstream');return response.json();
 };
 let payload;
 try{
  const query=new URLSearchParams({latitude:coordinates.map(p=>p[0]).join(','),longitude:coordinates.map(p=>p[1]).join(','),daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',timezone:'Asia/Tokyo',forecast_days:'16'});
  const data=await get('https://api.open-meteo.com/v1/forecast?'+query);
  if(!Array.isArray(data)||data.length!==6||data.some(p=>!p.daily?.temperature_2m_max?.some(Number.isFinite)))throw new Error('empty');
  payload={source:'open-meteo',data,at:Date.now()};
 }catch{
  try{
   const query=new URLSearchParams({latitude:coordinates.map(p=>p[0]).join(','),longitude:coordinates.map(p=>p[1]).join(','),daily:'temperature_2m_min,temperature_2m_max',models:'gfs_seamless',timezone:'Asia/Tokyo',forecast_days:'16'});
   const data=await get('https://ensemble-api.open-meteo.com/v1/ensemble?'+query);
   if(!Array.isArray(data)||data.length!==6||data.some(p=>!p.daily?.temperature_2m_max?.some(Number.isFinite)))throw new Error('empty');
   payload={source:'ensemble',data,at:Date.now()};
  }catch{
  const responses=await Promise.allSettled(coordinates.map(([lat,lon])=>get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,5000)));
  const data=responses.map(r=>r.status==='fulfilled'?r.value:null);
  if(!data.some(p=>p?.properties?.timeseries?.length))return Response.json({error:'Weather sources unavailable'},{status:503,headers:{'Cache-Control':'no-store'}});
  payload={source:'met',data,at:Date.now()};
  }
 }
 const response=Response.json(payload,{headers:{'Cache-Control':'public, max-age=1800'}});
 if(cache)waitUntil(cache.put(key,response.clone()));
 return response;
}
