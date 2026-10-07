const map=q=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const ts=q=>`https://tabelog.com/rstLst/?vs=1&sk=${encodeURIComponent(q)}`;
const days=[
{date:'11/15',wd:'日',title:'抵達熊本・市區慢慢走',route:'機場集合 → 飯店 → 熊本城周邊 → 櫻町',tag:'集合日',danger:true,note:'其餘成員 12:30、12:40 落地後需預留入境、領行李與集合時間。熊本城與熊本縣立美術館仍是複數備案，視實際抵達市區時間擇一。',stops:[
 ['07:30','飛機','桃園出發航班','桃園國際機場','3h05m','','','一位成員先抵達；另外兩位友人 12:30、12:40 抵達熊本。'],
 ['12:30–13:40','集合','入境・領行李・三人會合','阿蘇熊本機場 國際線抵達大廳','約 60–90 分','','','以最後一位 12:40 落地為基準；不預設能立刻出關。先抵達的成員在大廳等另外兩位友人。','阿蘇くまもと空港 国際線'],
 ['13:45後','交通','三人集合後搭機場巴士','阿蘇熊本機場 → 熊本桜町バスターミナル','約 55–65 分','¥1,400','目標 13:45–14:10 間首班','全員拿到行李後才移動；機場 1 樓戶外 4 號月台。實際班次於出發前再確認。','熊本桜町バスターミナル'],
 ['15:20','飯店','預放行李','熊本市區飯店','約 15 分','依訂房方案','','從巴士總站步行約 8–10 分；若搭到較晚班次，此後行程等幅順延。','熊本市區 飯店'],
 ['15:50','景點','下午主景點擇一','熊本城／熊本縣立美術館','約 60–70 分','熊本城約 ¥800／美術館約 ¥430','城 09:00–17:00；館 09:30–17:15','兩個都是完整備案，不要求連續走完。美術館 16:45 最後入館；若錯過售票時間就改逛城彩苑與城外。'],
 ['17:10','購物','城彩苑・下通・櫻町慢走','櫻之馬場 城彩苑／下通商店街／SAKURA MACHI','約 60–75 分','依消費','','依所選景點順路走；若市區抵達較晚，這段可縮短但不影響 18:30 晚餐。','SAKURA MACHI Kumamoto'],
 ['18:30','用餐','市區晚餐首選','あか牛 Dining yoka-yoka','','¥1,000–3,000','11:00–22:00','マルイチ週日晚間不營業，已保留在下方並反灰；晚餐主線改為赤牛丼。','あか牛Dining yoka-yoka サクラマチ店','https://tabelog.com/tw/kumamoto/A4301/A430101/43014139/'],
 ['20:30','購物','超市補給','業務スーパー 辛島公園店','約 30 分','','至 21:00','買隔日早餐、午餐、水與 11/17 車上補給。','業務スーパー 辛島公園店'],
 ['21:00','飯店','Check-in','熊本市區飯店','','依訂房方案','','早點休息，隔天搭 A列車。','熊本市區 飯店']],
 alts:[['マルイチ食堂','天草大王鹽味拉麵｜約 ¥1,000｜週日僅 11:30–15:00','https://tabelog.com/kumamoto/A4301/A430101/43005518/','週日晚餐不營業'],['あか牛 Dining yoka-yoka','赤牛丼｜約 ¥2,500｜11:00–22:00','https://tabelog.com/tw/kumamoto/A4301/A430101/43014139/'],['むら上','19:00 開席 Omakase｜約 ¥20,000–40,000｜SAKURA MACHI 約 630 m','https://tabelog.com/kumamoto/A4301/A430101/43014482/','','Tabelog 4.28・Award 2026 Bronze',true],['勝烈亭 新市街本店','飯店旁豬排｜約 ¥2,000–3,000｜11:00–21:30','https://tabelog.com/kumamoto/A4301/A430101/43000307/','','とんかつ百名店 2026'],['熊本屋台村','多店集合＋自助燒酒機｜約 ¥2,000–4,000'],['ねぎぼうず','熊本鄉土料理居酒屋｜約 ¥4,000–5,000｜週日 17:00–22:00','https://tabelog.com/kumamoto/A4301/A430101/43001918/','','Tabelog 3.53'],['馬桜 銀座通り店','馬肉料理｜約 ¥8,000–10,000｜週日 17:00–22:00','https://tabelog.com/kumamoto/A4301/A430101/43010130/','','Tabelog 3.68']],
 backups:[['熊本城','下午主景點 A｜約 ¥800｜09:00–17:00'],['熊本縣立美術館 本館','下午主景點 B｜常設展約 ¥430｜09:30–17:15'],['下通商店街','途經的市中心商店街'],['櫻之馬場 城彩苑','熊本城旁飲食與伴手禮區'],['熊本城稻荷神社','熊本城旁可快速參拜'],['熊本大神宮','熊本城旁神社'],['SAKURA MACHI Kumamoto','晚餐、休息與購物備選']]},
{date:'11/16',wd:'一',title:'天草・倉岳神社天空鳥居',route:'熊本 → 三角 → 天空鳥居 → 熊本',tag:'JR＋租車',note:'行李留飯店。Sky Walker、本渡溫泉、海水浴場與 L’isola Terrace 都保留為備選，可依當天進度直接開啟導航。',stops:[
 ['08:30','用餐','早餐與車上補給','前一晚超商／超市購入','','約 ¥800–1,200','','早餐、午餐、下午茶與水一次帶齊。'],
 ['09:20','交通','飯店出發前往熊本站','熊本市區飯店 → 辛島町 → 熊本站','約 25–35 分','市電 ¥200','','09:20 步行到辛島町搭市電；09:50 前抵達熊本站，保留買駅弁與找月台時間。','熊本駅'],
 ['10:21','交通','搭「坐 A 列車去吧」','熊本站 → 三角站','1h09m','¥2,650','10:21–11:30','觀光列車需先劃位；11:30 抵達後步行約 4 分鐘到租車店。','三角駅'],
 ['12:00','交通','三角駅前店取車','ガッツレンタカー 三角駅前店','','約 ¥6,000／三人均分','取車 12:00・還車 19:00','費用依車型、保險與選配而異，請以自己的預約內容為準。','ガッツレンタカー 三角駅前店','','https://guts-rentacar.com/shop/kumamoto/misumiekimae/'],
 ['12:15','用餐','道の駅 さんぱーる','Roadside Station Sun Pearl','約 45 分','約 ¥1,000–1,800','約 09:00–18:00','取車後直接前往，海鮮與在地物產；13:00 左右出發往倉岳。','道の駅 上天草さんぱーる'],
 ['15:00','景點','倉岳神社・天空鳥居','倉岳神社','45–60 分','免費','全天','最後路段狹窄；風大或能見度差就縮短停留。','倉岳神社 天空の鳥居'],
 ['16:15','景點','海岸線支線擇一','ペルラの湯舟／L’isola Terrace 天草','45–60 分','溫泉 ¥800','溫泉 14:00–21:30','本渡海水浴場、Sky Walker 也保留在下方；17:20 前開始回三角。','ペルラの湯舟'],
 ['17:20','交通','返回三角駅前店','天草支線 → ガッツレンタカー 三角駅前店','約 1h20m','','','19:00 為店家閉店與預約還車時間，至少預留 20 分鐘加油與緩衝。','ガッツレンタカー 三角駅前店'],
 ['19:00','交通','還車・搭 JR 回熊本','三角站 → 熊本站','19:28–20:19','JR 約 ¥870','還車 19:00','租車店步行約 4 分鐘到車站；依 2026/10 時刻表搭 19:28 普通車。','三角駅'],
 ['20:40','購物','超市快速補給','業務スーパー 辛島公園店','約 20 分','','至 21:00','從熊本站回市中心後快速補齊 11/17 早餐、午餐與水；來不及就改便利商店。','業務スーパー 辛島公園店'],
 ['21:10','用餐','熊本市區晚餐','酒湊／ささとら／馬桜 下通店','約 60–75 分','約 ¥4,000–9,000','馬桜至 23:00','配合還車與 JR 班次延後；優先選可接 21:00 後入店的店家並預約，22:25 左右離開。','馬桜 下通り店','https://tabelog.com/kumamoto/A4301/A430101/43000437/'],
 ['22:30','景點','熊本屋台村・球磨焼酎ためし酒','熊本銀行 熊本屋台村','約 30–40 分','自動販賣機 ¥100 起／杯','平日 15:00–23:30','正式行程：晚餐後路過喝一杯，重點是全 27 蔵元球磨焼酎ためし酒自動販賣機；目標 23:00 前進場，不再只列為備案。','熊本屋台村','','https://kumamotoyataimura.com/'],
 ['23:15','飯店','步行返回飯店','熊本屋台村 → 熊本市區飯店','約 15–20 分','','','飲酒後全程步行，不再安排其他移動。','熊本市區 飯店']],
 alts:[['熊本站駅弁','若要在 A列車上吃午餐，出發前先買'],['アマテラス珈琲','三角附近景觀咖啡廳｜視行車進度前往'],['道の駅 上天草さんぱーる','海鮮與在地物產｜約 ¥1,000–1,800'],['鮓 たいと','天草壽司｜約 ¥20,000–30,000｜本渡支線，週一公休','https://tabelog.com/kumamoto/A4305/A430501/43001426/','週一公休','Tabelog 4.08・Award 2026 Bronze',true],['奴寿司','天草壽司｜午餐約 ¥8,000–10,000｜週一通常公休且與租車時段衝突','https://tabelog.com/kumamoto/A4305/A430501/43001204/','週一公休／時間不符','寿司 WEST 百名店 2025'],['酒湊 SAKASOU','生魚片居酒屋｜約 ¥4,000–6,000｜17:00–00:00','https://tabelog.com/kumamoto/A4301/A430101/43000581/'],['日本酒×酒肴 ささとら','日本酒與特色料理｜週一最晚 20:30 入店，趕不上 21:10 行程','https://tabelog.com/kumamoto/A4301/A430101/43013228/','時間不符'],['馬桜 下通店','馬肉料理｜約 ¥8,000–10,000｜約 17:00–23:00','https://tabelog.com/kumamoto/A4301/A430101/43000437/']],
 backups:[['ペルラの湯舟','海景錢湯｜¥800｜14:00–21:30'],['本渡海水浴場','沿路海岸線短停備選'],['L’isola Terrace 天草','土產、咖啡與海景休息站'],['Sky Walker Amakusa','回程支線滑翔傘｜需預約','https://skywalker2021.jp/']]},
{date:'11/17',wd:'二',title:'高千穗峽・水源・黑川溫泉',route:'熊本 → 聖滝 → 高千穗 → 山吹／池山擇一 → 黑川',tag:'全程自駕',danger:true,note:'全程最硬的一天。聖滝列入正式主線；下午由山吹水源與池山水源擇一，切換上方路線圖即可比較位置。只走一處水源，保留旅館 17:00 最晚入住前的緩衝。',stops:[
 ['07:00','用餐','咖啡與早餐','colour coffee／前一晚補給','','約 ¥600–1,000','','吃完直接取車，不安排久坐。','colour coffee 熊本'],
 ['08:00','交通','熊本站前店取車・出發','熊本站前店 → 聖滝展望所','約 1h20m','約 ¥22,000／三人均分','11/17 08:00 取車','範例費用已模糊化；行李全放車上，沿國道 218 號前往聖滝。','熊本駅前 レンタカー'],
 ['09:20','景點','聖滝展望所・途經拍照','國道 218 號沿線展望所','約 10 分','免費','戶外','正式停靠點；展望所就在主線旁，只短停拍照，09:30 準時續行高千穗。','聖滝展望所 山都町'],
 ['10:40','景點','高千穗天空小火車','高千穂あまてらす鉄道','30 分','¥2,300','09:40–15:40','09:00 起受理，不能預約；滿席即止，雨天或強風可能停駛。','高千穂あまてらす鉄道'],
 ['11:40','景點','高千穗峽划船','第1御塩井停車場內報到','30 分','¥4,100–5,100 / 艘','08:30–17:00','11 月需完全預約；每艘 3 人，超時每 10 分 ¥1,000。','高千穂峡 貸しボート受付'],
 ['12:25','購物','Aコープ高千穂店補給','Aコープ 高千穂店','約 20 分','約 ¥800–1,500','約 09:00–20:00','划船後先買飯糰、麵包、蛋白質、水與車上物資；再前往そらいろ與高千穗神社，避免只吃甜點當午餐。','Aコープ 高千穂店'],
 ['12:55','用餐','起司饅頭＋快速午餐','菓子工房 そらいろ','約 25 分','約 ¥500–1,500','至約 17:00','そらいろ距高千穗神社前約步行 2 分；起司饅頭當點心，正餐以剛才超市採買為主。','菓子工房 そらいろ 高千穂'],
 ['13:25','景點','高千穗神社','高千穂神社','約 30 分','免費','全天','13:55 前回到車上，14:00 準時往產山村；保留完整參拜時間。','高千穂神社'],
 ['14:00','交通','出發前往產山村水源','高千穗 → 山吹／池山水源停車場','約 1h05-1h10m','','','在上方路線圖選擇今天要去的水源並開啟導航；目的地已設定為對應停車場。'],
 ['15:10','景點','山吹水源／池山水源擇一','產山村水源停車場','約 40 分','免費','戶外','山吹停車場約 15 台並有公廁，至水源單程步行約 10 分；池山停車場約 30 台且距水源較近。兩者只選一處，15:50 回到車上。','','','https://www.ubuyama-v.jp/villagepromotion/996.html'],
 ['15:50','交通','前往黑川溫泉','所選水源 → 黑川溫泉旅館','約 25-35 分','','','山路行車時間可能浮動，目標 16:25 左右抵達。','黒川温泉'],
 ['16:25','飯店','Check-in・放行李','黑川溫泉旅館','約 20 分','依訂房方案','最晚 Check-in 17:00','住宿方案含晚餐；完成入住後再步行前往溫泉街。','黒川温泉'],
 ['16:50','購物','晚餐前逛黑川溫泉街','いご坂・川端通り・後藤酒店','約 40-45 分','依消費','商店多約 18:00 關門','旅館到溫泉街中心約步行數分鐘；17:35 前回旅館準備晚餐，沿途延誤時縮短但不刪除此行程。','黒川温泉 いご坂'],
 ['18:00','用餐','旅館晚餐','黑川溫泉旅館','約 60–75 分','住宿方案已含','18:00 開始','不要另排餐廳；依旅館指定時間入席。','黒川温泉'],
 ['19:20','景點','飯後夜間散步・回旅館泡湯','黑川溫泉川端通り','約 45–60 分','免費','商店多已關門','晚餐後可以散步，但不定位為逛街；整個溫泉街約 15–20 分可走一圈，視氣溫與體力提早回旅館泡湯。','黒川温泉 川端通り']],
 backups:[['黑川溫泉街','Check-in 前後散步'],['黑川溫泉商店街','旅館附近散步與伴手禮']]},
{date:'11/18',wd:'三',title:'黑川 → 阿蘇 → 熊本',route:'上色見 → 高森田樂 → 草千里 → 肥後大津 → 熊本站飯店',tag:'保留彈性',danger:true,note:'午餐主線為週三營業的高森田楽の里；らくだ山週三休息。akaushi restaurant mou 保留為餐廳備選；兩位成員從肥後大津搭 JR 回熊本站，另一位成員開車前往機場還車。',stops:[
 ['09:00','用餐','旅館早餐','黑川溫泉旅館','','依訂房方案','','行李整理後 10:00 退房。','黒川温泉'],
 ['10:00','交通','Check-out・往上色見','黑川溫泉 → 上色見熊野座神社','約 1h10m','','','行李放車上。','上色見熊野座神社'],
 ['11:10','景點','上色見熊野座神社','上色見熊野座神社','40–60 分','免費','全天','只到本殿約 40 分；含穿戶岩抓 1–1.5 小時。','上色見熊野座神社'],
 ['12:15','用餐','高森田楽の里','高森町高森 2685-2','約 75 分','約 ¥2,390–3,890','週三約 11:00–19:00','從上色見熊野座神社前往約 10–15 分；圍爐餐預留 75 分鐘，目標 13:30 離開前往草千里。','高森田楽の里','https://tabelog.com/kumamoto/A4302/A430202/43000684/','https://www.dengakunosato.com/'],
 ['14:10','景點','草千里・阿蘇火山博物館','草千里ヶ浜','約 50 分','博物館 ¥1,300','09:00–17:00','15:00 左右離開；火山口只在當日開放且時間明顯充裕時加。天候差改阿蘇神社與門前町。','阿蘇火山博物館'],
 ['15:15','景點','米塚必經短停','米塚','約 15–20 分','免費','戶外','從草千里沿阿蘇パノラマライン往肥後大津的順路必經景觀；只在安全停車點短停拍照，不進入草地。','米塚'],
 ['15:35','交通','米塚下山前往肥後大津','米塚 → 肥後大津站','約 45–60 分','租車費已計','','預留山路、下車取行李與找月台時間，目標 16:25 前抵達。','肥後大津駅'],
 ['16:30','交通','主線｜兩位成員搭 JR 回熊本','肥後大津站 → 熊本站','約 34–40 分','¥560 / 人','依當日時刻','還車成員放下另外兩位成員後立即前往機場；兩人搭下一班 JR 豐肥本線，不強追固定班次。','肥後大津駅'],
 ['16:25','支線','一位成員開車至機場店還車','肥後大津 → 熊本空港店','約 30–40 分','租車費已含','17:30 前還車','此段是一人支線；預估 17:00–17:10 抵達，保留約 20 分鐘還車緩衝。','熊本空港 レンタカー'],
 ['18:30','飯店','熊本站 Check-in','熊本站飯店','','依訂房方案','','放行李後在熊本站周邊晚餐。','熊本站 飯店'],
 ['19:00','用餐','熊本站晚餐','めっけもん／雪花山房／黑亭 等','約 60–90 分','約 ¥1,000–5,000','','依體力與候位現場選。','熊本ラーメン 黒亭 熊本駅店','https://tabelog.com/tw/kumamoto/A4301/A430101/43000091/'],
 ['20:30後','飯店','晚餐後返回飯店','熊本站周邊 → 熊本站飯店','步行約 2–8 分','','','依最後選定的餐廳調整步行時間；回房休息並整理隔日市區行程物品。','熊本站 飯店']],
 alts:[['akaushi restaurant mou','赤牛午餐原案｜約 ¥2,500–3,500｜週三營業','https://tabelog.com/kumamoto/A4302/A430202/43019766/'],['鶏炭火焼 らくだ山','雞肉炭火燒｜週三休息，保留導航','https://tabelog.com/kumamoto/A4302/A430202/43000153/','週三公休','鳥料理百名店 2025'],['廻る寿司 めっけもん','平價迴轉壽司｜約 ¥2,000–3,000','https://tabelog.com/tw/kumamoto/A4301/A430101/43015371/'],['雪花山房','鴨汁蕎麥麵｜約 ¥1,500–3,000｜週三休息，保留原案','https://tabelog.com/kumamoto/A4301/A430101/43001170/','週三公休','そば百名店 2025'],['ホルモン煮 ほんだ','燉牛雜｜約 ¥1,000–2,000','https://tabelog.com/kumamoto/A4301/A430101/43019892/'],['炭火焼鳥 火鶏 HITORI','燒鳥｜約 ¥4,000–6,000','https://tabelog.com/kumamoto/A4301/A430101/43016434/'],['熊本拉麵 黑亭 本店','熊本黑蒜拉麵｜約 ¥1,000–2,000','https://tabelog.com/tw/kumamoto/A4301/A430101/43000091/','','ラーメン百名店 2025']],
 backups:[['杵島岳','早起且天候良好再走'],['阿蘇神社','天候差或火山口關閉時替代'],['阿蘇中岳火山口','當日開放且時間充裕才前往'],['門前町商店街','阿蘇神社前散步與採買']]},
{date:'11/19',wd:'四',title:'熊本市區・水前寺自行車',route:'飯店 → 咖啡 → 水前寺 → 江津湖 → 晚餐 → AMU → 飯店',tag:'不開車',danger:true,note:'依順路方向改為先在市中心晚餐，再到 AMU、最後步行回飯店。AMU 1–6F 多數店舖 20:00 關門；若選魚飯時 19:00 開席，餐後僅剩 1F 超市等少數區域。',stops:[
 ['09:00','飯店','從飯店出發','熊本站飯店 → 珈琲回廊','約 20–30 分','市電約 ¥200','','從熊本站前搭市電往市中心，預留步行與候車時間，09:30 左右抵達。','熊本站 飯店'],
 ['09:30','用餐','珈琲回廊','珈琲回廊','約 60 分','約 ¥700–1,300','','老町家咖啡，慢慢開始市區日。','珈琲回廊 熊本'],
 ['11:30','用餐','花遊懷石午餐','花遊','約 90 分','¥1,000–2,000','11:30–14:30','週四有營業，建議先預約。','花遊 熊本 新町','https://tabelog.com/kumamoto/A4301/A430101/43001679/'],
 ['13:15','交通','租腳踏車','熊本市國際交流會館','約 4 小時','依現場方案','','午餐後直接辦理租車，確認 17:15 前可還車。','熊本市国際交流会館'],
 ['13:45','景點','水前寺成趣園','水前寺成趣園','30–40 分','¥500','08:30–17:00','最後入園 16:30；園內不可騎車。','水前寺成趣園'],
 ['14:35','用餐','途經 Wednesday 咖啡與甜甜圈','WEDNESDAY コーヒーとドーナツ','約 25–30 分','約 ¥500–1,000','08:00–16:00','從水前寺往江津湖方向途中休息；甜甜圈可能提早售完。','WEDNESDAY コーヒーとドーナツ 熊本'],
 ['15:15','景點','騎往江津湖','熊本縣立圖書館 → 江津湖','約 50–60 分','免費','','15:05 左右離開咖啡廳；視風勢調整湖區停留。','水前寺江津湖公園'],
 ['16:25','景點','熊本縣廳・魯夫像','熊本県庁 ルフィ像','約 15 分','免費','戶外','拍照後立即騎回市中心還車。','ルフィ像 熊本県庁'],
 ['17:15','交通','還車・前往晚餐','熊本市國際交流會館 → 晚餐餐廳','約 20–30 分','市電／步行依餐廳','','還車後直接前往市中心餐廳，不先繞去熊本站。','熊本市国際交流会館'],
 ['17:45','用餐','預約型早場晚餐','鶴八／其他可訂早場餐廳','約 75–90 分','約 ¥5,000–20,000','依店家','為保留 AMU 購物時間，優先預約 17:30–17:45。魚飯時 19:00 一齊開席，選它時餐後只能逛 21:00 前的 1F 超市。','鶴八 熊本','https://tabelog.com/kumamoto/A4301/A430101/43006179/'],
 ['19:40','購物','AMU PLAZA 熊本逛街','AMU PLAZA 熊本','約 40–50 分','依消費','1–6F 多數至 20:00；1F 超市至 21:00','先逛 GU／UNIQLO 等 20:00 關門店舖，再到 1F 超市採買零食與伴手禮。','AMU PLAZA 熊本'],
 ['20:30','飯店','從 AMU 步行回飯店','AMU PLAZA 熊本 → 熊本站飯店','步行約 3–5 分','','','AMU 與飯店都在熊本站前，採買完成後直接回飯店。','熊本站 飯店']],
 alts:[['至福のひととき＋甘味処','日式定食＋甜點｜約 ¥1,000｜週四休息，保留導航','https://tabelog.com/kumamoto/A4301/A430101/43015800/','週四公休'],['Re:)break','水果可麗餅｜下午茶備選'],['アゲパンヤ','炸麵包｜下午茶備選'],['ニク..ヒノマル','原創意肉料理｜店家標示僅營業至 2026/7，保留原案但不可作 11 月預約','https://tabelog.com/kumamoto/A4301/A430101/43017616/','已結束營業'],['むら上','19:00 開席 Omakase｜約 ¥20,000–40,000｜需預約','https://tabelog.com/kumamoto/A4301/A430101/43014482/','','Tabelog 4.28・Award 2026 Bronze',true],['鮨中村','壽司 Omakase｜週四公休，無法排入當日晚餐','https://tabelog.com/kumamoto/A4301/A430101/43017173/','週四公休','Tabelog 4.10・Award 2026 Bronze',true],['勝烈亭 新市街本店','豬排｜約 ¥2,000–3,000｜辛島町站步行約 2 分','https://tabelog.com/kumamoto/A4301/A430101/43000307/','','とんかつ百名店 2026'],['魚飯時','Omakase｜約 ¥10,000｜需預約','https://tabelog.com/kumamoto/A4301/A430101/43017708/party/'],['天蕎 かたへい','天婦羅 Omakase｜需預約','https://tabelog.com/kumamoto/A4301/A430101/43014435/party/','','天ぷら百名店 2025'],['鶴八','天婦羅名店｜約 ¥10,000–20,000｜需預約','https://tabelog.com/kumamoto/A4301/A430101/43006179/','','Award 2026 Bronze・百名店 2025'],['焼肉すどう 熊本本店','Omakase 燒肉｜約 ¥10,000–20,000','https://tabelog.com/kumamoto/A4301/A430101/43008422/party/'],['肴や ハチstand','居酒屋料理｜約 ¥5,000｜需預約','https://tabelog.com/kumamoto/A4301/A430101/43018348/party/'],['日本料理 五感','完全預約制日本料理｜約 ¥14,300–22,000｜週四 18:00–22:00','https://tabelog.com/kumamoto/A4301/A430101/43013551/','','Tabelog 3.81']],
 backups:[['熊本縣立圖書館','水前寺與江津湖之間的室內備選'],['熊本市現代美術館','市中心室內備選｜通常至 20:00'],['GU／UNIQLO AMU PLAZA 熊本','AMU 內服飾採買｜多數店舖約 20:00 關門']]},
{date:'11/20',wd:'五',title:'返台日',route:'飯店 → 熊本站巴士 → 熊本機場 → 桃園',tag:'不排景點',note:'建議搭 08:40 前後班次，不要壓 09:45 後；前一晚再次確認巴士時刻。',stops:[
 ['07:30','用餐','飯店早餐','熊本站飯店','','依訂房方案','','護照、行李與伴手禮先集中。','熊本站 飯店'],
 ['08:20','飯店','Check-out・步行至月台','熊本站前 7 號公車月台','','','','不要等到最後一刻才離開飯店。','熊本駅前 バス 7番のりば'],
 ['08:40','交通','機場利木津巴士','熊本站 → 阿蘇熊本機場','約 60–65 分','¥1,400','08:25／08:40／08:55','不需預約，先到先上；可感應信用卡，不能用 Suica。','阿蘇くまもと空港'],
 ['09:45','飛機','抵達機場・報到採買','阿蘇熊本機場','約 2 小時','','','機場採買當 bonus，不當主行程。','阿蘇くまもと空港'],
 ['11:45','飛機','熊本起飛','阿蘇熊本機場 → 桃園國際機場','1h40m','','','預計 13:25 抵達桃園。']]}
];

const routeMaps=[
 {assessment:'抵達日：市區集中，順序可依出關時間縮放',tone:'good',points:[
  ['阿蘇熊本機場',32.835809,130.864627],['SAKURA MACHI',32.800722,130.704028],['熊本市區飯店',32.799000,130.706000],['熊本城',32.805269,130.705464],['辛島公園補給',32.798400,130.704600],['晚餐備選',32.800722,130.704028]
 ],segments:[{indexes:[0,1],mode:'road',label:'機場巴士'},{indexes:[1,2,3,1,5,4,2],mode:'line',label:'市區步行',dash:true}],googleRoutes:[{indexes:[0,2],mode:'transit',label:'機場巴士→飯店'},{indexes:[2,3,1],mode:'walking',label:'飯店→景點→商場'},{indexes:[1,5,4,2],mode:'walking',label:'商場→晚餐→飯店'}],choices:[
  {label:'下午主景點',point:3,options:[['熊本城',32.805269,130.705464],['熊本縣立美術館 本館',32.806450,130.702866]]},
  {label:'晚餐備選',point:5,from:1,to:2,options:[['あか牛 Dining yoka-yoka',32.800722,130.704028],['熊本屋台村',32.803860,130.709320],['勝烈亭 新市街本店（百名店）',32.798515,130.705798],['むら上（4.28・19:00 開席）',32.800140,130.700958],['ねぎぼうず（3.53）',32.802029,130.708221],['馬桜 銀座通り店（3.68）',32.800399,130.707771]]}
 ]},
 {assessment:'天草支線擇一；回熊本後正式停靠屋台村',tone:'warn',points:[
  ['熊本站',32.790412,130.688622],['三角站',32.607697,130.469751],['上天草さんぱーる',32.566200,130.429138],['倉岳神社',32.427719,130.327260],['ペルラの湯舟',32.472168,130.206612],['熊本屋台村',32.803860,130.709320],['熊本市區飯店',32.799000,130.706000],['晚餐備選',32.800137,130.708206]
 ],segments:[{indexes:[0,1],mode:'line',label:'JR',dash:true},{indexes:[1,2,3,4,1],mode:'road',label:'租車主線'},{indexes:[1,0],mode:'line',label:'JR 回程',dash:true},{indexes:[0,7,5,6],mode:'line',label:'晚餐・屋台村・飯店',dash:true}],googleRoutes:[{indexes:[1,2,3,4],mode:'driving',label:'三角→天草'},{indexes:[4,1],mode:'driving',label:'天草→三角還車'},{indexes:[0,7],mode:'transit',label:'熊本站→晚餐'},{indexes:[7,5,6],mode:'walking',label:'晚餐→屋台村→飯店'}],choices:[
  {label:'海岸線支線',point:4,options:[['ペルラの湯舟',32.472168,130.206612],['L’isola Terrace 天草',32.508297,130.422485]]},
  {label:'晚餐備選',point:7,from:0,to:6,default:1,options:[['酒湊 SAKASOU',32.799404,130.705948],['馬桜 下通店',32.800137,130.708206],['ささとら（20:30 最晚入店）',32.810184,130.710144,true]]}
 ]},
 {assessment:'長距離日：聖滝順路，下午水源選一後接黑川',tone:'warn',points:[
  ['熊本站',32.790412,130.688622],['聖滝展望所',32.680052,131.013160],['高千穗小火車',32.714555,131.306848],['高千穗峽',32.701785,131.300939],['Aコープ',32.712975,131.308304],['そらいろ',32.706600,131.304932],['高千穗神社',32.706671,131.301892],['山吹水源',33.049572,131.204239],['黑川溫泉旅館',33.077900,131.142800]
 ],segments:[{indexes:[0,1,2,3,4,5,6,7,8],mode:'road',label:'自駕主線'}],googleRoutes:[{indexes:[0,1,2,3],mode:'driving',label:'熊本→聖滝→高千穗'},{indexes:[3,4,5,6,7,8],mode:'driving',label:'高千穗→水源→黑川'}],choices:[
  {label:'下午水源擇一',point:7,from:6,to:8,options:[['山吹水源',33.049572,131.204239],['池山水源',33.047200,131.185297]]}
 ]},
 {assessment:'主線順路：米塚在下山方向，肥後大津再分流',tone:'good',points:[
  ['黑川溫泉旅館',33.077900,131.142800],['上色見熊野座神社',32.853804,131.158503],['高森田楽の里',32.836367,131.136173],['草千里',32.881466,131.053547],['米塚',32.905646,131.044407],['肥後大津站',32.877293,130.866000],['熊本機場',32.835809,130.864627],['熊本站',32.790412,130.688622],['熊本站飯店',32.789600,130.689300],['晚餐備選',32.788967,130.688232]
 ],segments:[{indexes:[0,1,2,3,4,5],mode:'road',label:'三人主線'},{indexes:[5,6],mode:'road',label:'一人還車支線',branch:true},{indexes:[5,7,8],mode:'line',label:'兩人 JR・飯店',dash:true},{indexes:[8,9,8],mode:'line',label:'晚餐往返',dash:true}],googleRoutes:[{indexes:[0,1,2],mode:'driving',label:'黑川→午餐'},{indexes:[2,3,4,5],mode:'driving',label:'阿蘇→肥後大津'},{indexes:[5,8],mode:'transit',label:'兩人回飯店'},{indexes:[5,6],mode:'driving',label:'一人還車'},{indexes:[8,9],mode:'walking',label:'飯店→晚餐'}],choices:[
  {label:'晚餐備選',point:9,from:8,to:8,options:[['廻る寿司 めっけもん（AMU）',32.788967,130.688232],['ホルモン煮 ほんだ',32.785118,130.686295],['炭火焼鳥 火鶏 HITORI',32.801643,130.708679],['熊本ラーメン 黒亭 本店',32.786118,130.691666],['雪花山房（週三公休）',32.803665,130.711945,true]]}
 ]},
 {assessment:'市區環線：景點順路，回國際交流會館還車會折返',tone:'good',points:[
  ['熊本站飯店',32.789600,130.689300],['珈琲回廊',32.797618,130.696659],['花遊',32.800346,130.695312],['國際交流會館',32.802269,130.704926],['水前寺成趣園',32.790744,130.734899],['Wednesday',32.777908,130.730118],['江津湖',32.772800,130.743500],['魯夫像',32.790410,130.742154],['AMU PLAZA',32.790412,130.688622],['鶴八',32.800163,130.705597]
 ],segments:[{indexes:[0,1,2,3],mode:'line',label:'步行／市電',dash:true},{indexes:[3,4,5,6,7,3],mode:'line',label:'自行車'},{indexes:[3,9],mode:'line',label:'前往晚餐',dash:true},{indexes:[9,8,0],mode:'road',label:'晚餐・AMU・飯店'}],googleRoutes:[{indexes:[3,4,5],mode:'bicycling',label:'水前寺→咖啡'},{indexes:[5,6,7,3],mode:'bicycling',label:'江津湖→還車'},{indexes:[3,9],mode:'transit',label:'還車→晚餐'},{indexes:[9,8],mode:'transit',label:'晚餐→AMU'},{indexes:[8,0],mode:'walking',label:'AMU→飯店'}],choices:[
  {label:'晚餐備選',point:9,from:3,to:0,default:4,options:[['むら上（4.28・19:00 開席）',32.800140,130.700958],['鮨中村（4.10・週四公休）',32.810184,130.710144,true],['魚飯時（19:00 開席／AMU 衝突）',32.803356,130.712631],['天蕎 かたへい（百名店・早場確認）',32.803665,130.711945],['鶴八（Award・早場優先）',32.800163,130.705597],['焼肉すどう 熊本本店',32.804630,130.710571],['肴や ハチstand',32.800995,130.706284],['niku..HINOMARU（已結束營業）',32.806034,130.711426,true],['勝烈亭 新市街本店（百名店）',32.798515,130.705798],['日本料理 五感（3.81・完全預約制）',32.803543,130.712296]]}
 ]},
 {assessment:'返程日：飯店經熊本站直達機場，沒有繞路',tone:'good',points:[
  ['熊本站飯店',32.789600,130.689300],['熊本站前 7 號公車月台',32.790412,130.688622],['阿蘇熊本機場',32.835809,130.864627]
 ],segments:[{indexes:[0,1],mode:'line',label:'步行至月台',dash:true},{indexes:[1,2],mode:'road',label:'機場巴士'}],googleRoutes:[{indexes:[0,2],mode:'transit',label:'飯店→機場'}]}
];

const isFood=t=>t==='用餐';
const cls=t=>isFood(t)?'food':(t==='交通'||t==='飛機')?'transport':t==='飯店'?'stay':'';
const renderStop=s=>{let [time,type,title,place,dur,cost,hours,note,m,tb,official]=s;let facts=[[dur,'停留'],[cost,'費用'],[hours,'營業']].filter(x=>x[0]).map(x=>`<span class="fact"><b>${x[1]}</b>${x[0]}</span>`).join('');let links=[];if(m)links.push(`<a href="${map(m)}" target="_blank" rel="noreferrer">Google Maps</a>`);if(isFood(type))links.push(`<a class="secondary" href="${tb||ts(title)}" target="_blank" rel="noreferrer">Tabelog 評價</a>`);if(official)links.push(`<a class="secondary" href="${official}" target="_blank" rel="noreferrer">官方網站</a>`);return `<li class="stop"><time class="stop-time">${time}</time><div class="stop-main"><div class="stop-top"><h4>${title}</h4><span class="type ${cls(type)}">${type}</span></div><p class="place">${place}</p>${facts?`<div class="facts">${facts}</div>`:''}<p class="stop-note">${note}</p>${links.length?`<div class="links">${links.join('')}</div>`:''}</div></li>`};
const isHyakumeiten=a=>/百名店/.test(a[4]||'');
const renderAltCard=a=>`<article class="alt ${a[3]?'unavailable':''} ${isHyakumeiten(a)?'featured':''}">${a[3]||a[4]?`<div class="alt-flags">${a[4]?`<span class="recommendation">${a[4]}</span>`:''}${a[3]?`<span class="availability">${a[3]}</span>`:''}</div>`:''}<h5>${a[0]}</h5><p>${a[1]}</p><div class="links"><a href="${map(a[0])}" target="_blank" rel="noreferrer">Google Maps</a><a class="secondary" href="${a[2]||ts(a[0])}" target="_blank" rel="noreferrer">Tabelog 評價</a></div></article>`;
const renderAlt=alts=>{if(!alts)return'';const available=alts.filter(a=>!a[3]);const unavailable=alts.filter(a=>a[3]);return `<details class="alternatives"><summary>查看餐廳備選（可用 ${available.length}）</summary><div class="alt-grid">${available.map(renderAltCard).join('')}</div>${unavailable.length?`<details class="unavailable-options"><summary>公休或時間不符（${unavailable.length}）</summary><div class="alt-grid">${unavailable.map(renderAltCard).join('')}</div></details>`:''}</details>`};
const renderBackups=items=>!items?'':`<details class="alternatives backup-options"><summary>查看景點／支線備選（${items.length}）</summary><div class="alt-grid">${items.map(a=>`<article class="alt"><h5>${a[0]}</h5><p>${a[1]}</p><div class="links"><a href="${map(a[0])}" target="_blank" rel="noreferrer">Google Maps 導航</a>${a[2]?`<a class="secondary" href="${a[2]}" target="_blank" rel="noreferrer">官方網站</a>`:''}</div></article>`).join('')}</div></details>`;
const choiceKey=(day,choice)=>`kumamoto-route-choice-v2-${day}-${choice}`;
routeMaps.forEach((route,day)=>route.choices?.forEach((choice,index)=>{
  let selected=choice.default||0;try{const stored=localStorage.getItem(choiceKey(day,index));if(stored!==null)selected=Number(stored)}catch{}
  if(day===4&&index===0){if(selected===10)selected=8;else if(selected===8||selected===9)selected=choice.default||0}
  choice.selected=choice.options[selected]&&!choice.options[selected][3]?selected:(choice.default||0);route.points[choice.point]=choice.options[choice.selected].slice(0,3);
}));
const encodePoint=p=>`${p[1]},${p[2]}`;
const pointNavUrl=p=>`https://www.google.com/maps/dir/?api=1&destination=${encodePoint(p)}`;
const googleRouteUrl=(points,mode='driving')=>{const waypoints=points.slice(1,-1).map(encodePoint).join('|');return `https://www.google.com/maps/dir/?api=1&origin=${encodePoint(points[0])}&destination=${encodePoint(points.at(-1))}${waypoints?`&waypoints=${encodeURIComponent(waypoints)}`:''}&travelmode=${mode}`};
const normalizeRoutePoints=points=>points.filter((point,index)=>!index||encodePoint(point)!==encodePoint(points[index-1]));
const renderGoogleRoutes=r=>{
  const groups=r.googleRoutes||[{indexes:r.google,mode:r.googleMode||'driving',label:'路線'}];
  return groups.map(group=>{const points=normalizeRoutePoints(group.indexes.map(i=>r.points[i]));const trip=`${points[0][0]} → ${points.at(-1)[0]}`;return `<a href="${googleRouteUrl(points,group.mode)}" target="_blank" rel="noreferrer" title="${trip}" aria-label="Google ${group.label}：${trip}">Google ${group.label}</a>`}).join('');
};
const straightDistance=(a,b)=>{const rad=n=>n*Math.PI/180;const dLat=rad(b[1]-a[1]);const dLng=rad(b[2]-a[2]);const h=Math.sin(dLat/2)**2+Math.cos(rad(a[1]))*Math.cos(rad(b[1]))*Math.sin(dLng/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h))};
const distanceLabel=(r,choice)=>{if(choice.from===undefined)return'';const restaurant=r.points[choice.point];const from=r.points[choice.from];const to=r.points[choice.to];const format=n=>n<1?`${Math.round(n*1000)} m`:`${n.toFixed(1)} km`;const first=`距 ${from[0]} 約 ${format(straightDistance(from,restaurant))}`;return choice.to===choice.from?`${first}（直線）`:`${first} · 距 ${to[0]} 約 ${format(straightDistance(restaurant,to))}（直線）`};
const renderChoices=(r,day)=>!r.choices?'':`<div class="route-choices">${r.choices.map((choice,index)=>`<label><span>${choice.label}</span><select data-choice-index="${index}" aria-label="${choice.label}">${choice.options.map((option,optionIndex)=>option[3]?'':`<option value="${optionIndex}" ${optionIndex===choice.selected?'selected':''}>${option[0]}</option>`).join('')}</select>${choice.from===undefined?'':`<em class="choice-distance" data-choice-distance="${index}">${distanceLabel(r,choice)}</em>`}</label>`).join('')}</div>`;
const renderRoutePanel=(r,i)=>`<section class="route-overview ${r.tone==='warn'?'route-warn':''}"><button class="route-toggle" type="button" aria-expanded="false" aria-controls="route-panel-${i}"><span class="route-copy"><b>當日路線圖</b><small>${r.assessment}</small></span><span class="route-action"><em>展開地圖</em><i aria-hidden="true">＋</i></span></button><div class="route-panel" id="route-panel-${i}" hidden>${renderChoices(r,i)}<div class="route-map-state" role="status">點擊後才載入地圖，節省手機流量與電量。</div><div class="route-map" aria-label="${days[i].date} 當日行程路線圖"></div><div class="route-map-footer"><span>點圖釘可用 Google Maps 導航</span><div class="route-google-links">${renderGoogleRoutes(r)}</div></div></div></section>`;
document.querySelector('#day-nav').innerHTML=days.map((d,i)=>`<a class="day-link" href="#day-${i+1}">${d.date} ${d.wd}</a>`).join('');
document.querySelector('#days').innerHTML=days.map((d,i)=>`<details class="day-card" id="day-${i+1}" ${i?'':'open'}><summary><div class="day-index">${String(i+1).padStart(2,'0')}</div><div class="day-heading"><span>${d.date}（${d.wd}） · ${d.tag}</span><h3>${d.title}</h3><p>${d.route}</p></div><span class="toggle" aria-hidden="true"></span></summary><div class="day-body"><div class="day-note ${d.danger?'danger':''}"><b>NOTE</b><span>${d.note}</span></div>${renderRoutePanel(routeMaps[i],i)}<ol class="timeline">${d.stops.map(renderStop).join('')}</ol>${renderBackups(d.backups)}${renderAlt(d.alts)}</div></details>`).join('');
const cards=[...document.querySelectorAll('.day-card')];
document.querySelector('#open-all').onclick=()=>cards.forEach(c=>c.open=true);
document.querySelector('#close-all').onclick=()=>cards.forEach(c=>c.open=false);
const links=[...document.querySelectorAll('.day-link')];
const dayNav=document.querySelector('.day-nav');
const setActiveDay=card=>links.forEach(link=>{const active=link.hash===`#${card.id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','date');else link.removeAttribute('aria-current')});
let dayFrame;
const syncActiveDay=()=>{
  dayFrame=undefined;
  const anchor=Math.ceil(dayNav.getBoundingClientRect().height)+2;
  let current=cards[0];
  for(const card of cards){if(card.getBoundingClientRect().top<=anchor)current=card;else break}
  setActiveDay(current);
};
const scheduleActiveDay=()=>{if(dayFrame===undefined)dayFrame=requestAnimationFrame(syncActiveDay)};
setActiveDay(cards[0]);
links.forEach(link=>link.addEventListener('click',()=>setActiveDay(document.querySelector(link.hash))));
cards.forEach(card=>card.addEventListener('toggle',scheduleActiveDay));
window.addEventListener('scroll',scheduleActiveDay,{passive:true});
window.addEventListener('resize',scheduleActiveDay,{passive:true});
scheduleActiveDay();

let leafletPromise;
const loadLeaflet=()=>{
  if(window.L)return Promise.resolve(window.L);
  if(leafletPromise)return leafletPromise;
  leafletPromise=new Promise((resolve,reject)=>{
    const css=document.createElement('link');css.rel='stylesheet';css.href='./vendor/leaflet.css';css.dataset.leaflet='true';
    const script=document.createElement('script');script.src='./vendor/leaflet.js';script.defer=true;
    script.onload=()=>resolve(window.L);script.onerror=()=>reject(new Error('Leaflet load failed'));
    document.head.append(css,script);
  });
  return leafletPromise;
};
const routeGeometry=async(r,segment)=>{
  const coords=segment.indexes.map(i=>{const p=r.points[i];return `${p[2]},${p[1]}`}).join(';');
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),9000);
  try{
    const response=await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=simplified&geometries=geojson&steps=false`,{signal:controller.signal});
    if(!response.ok)throw new Error(`Route ${response.status}`);
    const data=await response.json();if(!data.routes?.[0]?.geometry)throw new Error('No route');
    return data.routes[0].geometry;
  }finally{clearTimeout(timeout)}
};
const initRouteMap=async(section,index)=>{
  const panel=section.querySelector('.route-panel');const state=section.querySelector('.route-map-state');const target=section.querySelector('.route-map');const r=routeMaps[index];
  state.textContent='正在載入路線圖…';
  try{
    const L=await loadLeaflet();
    const view=L.map(target,{scrollWheelZoom:false,zoomControl:true,attributionControl:true});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(view);
    const bounds=L.latLngBounds([]);
    r.points.forEach((p,n)=>{
      const marker=L.marker([p[1],p[2]],{icon:L.divIcon({className:'route-marker',html:`<span>${n+1}</span>`,iconSize:[30,30],iconAnchor:[15,15]})}).addTo(view);
      marker.bindTooltip(`${n+1}. ${p[0]}`,{direction:'top',offset:[0,-12]});
      marker.bindPopup(`<div class="route-popup"><b>${n+1}. ${p[0]}</b><a href="${pointNavUrl(p)}" target="_blank" rel="noreferrer">用 Google Maps 導航</a></div>`);
      bounds.extend([p[1],p[2]]);
    });
    view.fitBounds(bounds.pad(.12),{maxZoom:14});
    let fallback=false;
    for(const segment of r.segments){
      const points=segment.indexes.map(i=>[r.points[i][1],r.points[i][2]]);const color=segment.branch?'#e9653f':'#176c68';
      if(segment.mode==='road'){
        try{L.geoJSON(await routeGeometry(r,segment),{style:{color,weight:5,opacity:.86,lineCap:'round',lineJoin:'round'}}).bindTooltip(segment.label).addTo(view)}
        catch{fallback=true;L.polyline(points,{color,weight:4,opacity:.82,dashArray:'7 8'}).bindTooltip(segment.label).addTo(view)}
      }else L.polyline(points,{color,weight:4,opacity:.76,dashArray:segment.dash?'7 8':null}).bindTooltip(segment.label).addTo(view);
    }
    target._leafletMap=view;state.textContent=fallback?'部分道路服務暫時無回應，改以站點連線顯示。':'實線為道路主線，虛線為步行、鐵路或示意連線。';
  }catch(error){console.error('Route map failed',error);state.textContent='地圖暫時載入失敗，仍可使用下方 Google 路線。';target.classList.add('route-map-error')}
};
document.querySelectorAll('.route-overview').forEach((section,index)=>{
  const button=section.querySelector('.route-toggle');const panel=section.querySelector('.route-panel');
  button.addEventListener('click',async()=>{
    const opening=panel.hidden;panel.hidden=!opening;button.setAttribute('aria-expanded',String(opening));button.querySelector('i').textContent=opening?'−':'＋';button.querySelector('em').textContent=opening?'收合地圖':'展開地圖';
    if(opening&&!panel.dataset.ready){panel.dataset.ready='true';await initRouteMap(section,index)}
    else if(opening)requestAnimationFrame(()=>section.querySelector('.route-map')._leafletMap?.invalidateSize());
  });
  section.querySelectorAll('.route-choices select').forEach(select=>select.addEventListener('change',async()=>{
    const choiceIndex=Number(select.dataset.choiceIndex);const choice=routeMaps[index].choices[choiceIndex];choice.selected=Number(select.value);
    routeMaps[index].points[choice.point]=choice.options[choice.selected].slice(0,3);
    try{localStorage.setItem(choiceKey(index,choiceIndex),String(choice.selected))}catch{}
    const distance=section.querySelector(`[data-choice-distance="${choiceIndex}"]`);if(distance)distance.textContent=distanceLabel(routeMaps[index],choice);
    section.querySelector('.route-google-links').innerHTML=renderGoogleRoutes(routeMaps[index]);
    const target=section.querySelector('.route-map');target._leafletMap?.remove();target._leafletMap=null;target.classList.remove('route-map-error');target.replaceChildren();
    if(!panel.hidden)await initRouteMap(section,index);
  }));
});

const desktopMotion=window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
if(desktopMotion.matches){
  import('./vendor/anime.esm.min.js').then(({animate,stagger})=>{
    document.documentElement.classList.add('motion-enabled');
    animate('.hero > img',{scale:[1.08,1],duration:1800,ease:'out(4)'});
    animate(document.querySelectorAll('.hero .eyebrow,.hero h1,.hero-route,.hero-meta'),{
      opacity:[0,1],y:[28,0],delay:stagger(110,{start:120}),duration:900,ease:'out(4)'
    });
    animate('.hero-steam span',{
      opacity:[.12,.7,.12],y:[24,-20],scaleY:[.8,1.12],
      delay:stagger(420),duration:4200,loop:true,alternate:true,ease:'inOutSine'
    });

    const revealTargets=[...document.querySelectorAll('.stats article,.alert-card,.day-card,.check-grid article,.source-note')];
    const revealObserver=new IntersectionObserver(entries=>{
      entries.filter(entry=>entry.isIntersecting).forEach(entry=>{
        revealObserver.unobserve(entry.target);
        animate(entry.target,{opacity:[0,1],y:[24,0],duration:720,ease:'out(4)'});
      });
    },{rootMargin:'0px 0px -8%',threshold:.12});
    revealTargets.forEach(target=>revealObserver.observe(target));

    cards.forEach(card=>card.addEventListener('toggle',()=>{
      if(!card.open)return;
      animate(card.querySelector('.day-body'),{opacity:[0,1],y:[10,0],duration:420,ease:'out(3)'});
    }));
  }).catch(()=>document.documentElement.classList.remove('motion-enabled'));
}
