# kumamoto-2026

熊本六天五夜行程網站的去識別化公開範本。內容示範如何把試算表行程整理成可收合的每日時間軸、餐廳與景點備選、費用與營業資訊，以及可切換的當日路線圖；也能比較餐廳、收藏待選並替換行程中的用餐安排。

> 本 repository 的日期已提前一週，同行者名稱已改為泛稱。班機、住宿、路線與金額保留作為對照範例，但不是可直接照走的有效訂單；出發前請重新核對交通、房價、營業時間與預約規則。

## 功能

- 六日行程時間軸，時間、地點、費用、營業時間與備註分開顯示
- 景點與餐廳備選保留 Google Maps、Tabelog 與官方網站連結
- Leaflet／OpenStreetMap 當日路線圖，可切換景點或餐廳候選
- 餐廳評分比較與待選收藏，支援雙門檻、Tabelog 及放寬選擇三個級別
- 用餐安排可套用至行程，同步更新導航、保留選擇並支援逐餐還原
- 公休與時間不符項目反灰並另行收合
- RWD 與省流量設計；地圖按需載入，桌機才載入輕量動態效果
- `robots.txt` 與頁面 meta 設為不索引；這只能降低曝光，不能取代存取控制

## 本機預覽

```bash
python3 -m http.server 4173 --directory dist
```

開啟 `http://localhost:4173`。

## 從 CSV 建立自己的版本

本 repository **不提供原始 CSV**。建議先準備 UTF-8 CSV，至少包含以下欄位：

| 欄位 | 用途 |
| --- | --- |
| 日期、星期、時間 | 每日分組與排序 |
| 類別 | 交通、景點、用餐、住宿、購物等 |
| 名稱、地點 | 卡片標題與地圖查詢 |
| 停留時間 | 行程節奏與空檔檢查 |
| 已記錄花費、預估花費 | 區分固定支出與浮動預算 |
| 營業時間、狀態 | 標示公休、需預約或時間不符 |
| 同行者／分支 | 主線、個別還車等分流行程 |
| 備註 | 集合、交通緩衝與替代方案 |
| Google Maps、Tabelog、官方網站 | 導航、評價與第一手資料來源 |
| 緯度、經度 | 當日路線圖與候選切換 |

匯入前至少移除姓名、聯絡方式、訂單編號與其他不希望公開的資料。若要像此範本一樣保留班機、住宿與明碼價格，建議同時位移日期並清楚註明它們只是預算對照。此範本目前把行程資料直接放在 [`dist/app.js`](dist/app.js)；摘要與資料來源位於 [`dist/index.html`](dist/index.html)。

### 給 Codex 的簡易提示詞

把 CSV 放進專案目錄後，在該目錄開啟 Codex，貼上以下內容即可先做出可用雛形：

```text
請讀取此目錄的行程 CSV，沿用現有網站的視覺與結構，製作或更新極簡 RWD 行程網站。以 CSV 為主，不刪除任何複數景點、餐廳或分支，全部保留為可切換備選。依交通合理安排時間並補齊空檔、票價、營業／公休、預估費用與備註；景點附 Google Maps，餐廳附 Tabelog 與 Google Maps。每天加入可收合的 Leaflet／OpenStreetMap 路線圖與 Google 導航，異常選項反灰收合。手機版省電，桌機版可用輕量動畫。完成後啟動本機預覽，檢查 RWD、連結、路線與資料遺漏；不要部署或上傳。
```

若資料涉及個人行程，請先在提示詞補上要保留或去識別化的欄位；需要部署時再另外明確授權。

## 靜態部署參考

前端不需要建置流程；Cloudflare Pages 可同時提供 `functions/api/weather.js` 天氣 API。其他靜態主機會直接使用瀏覽器端天氣備援；實際部署與帳號設定請自行完成。

### Cloudflare Pages

1. 建立 Pages 專案並連結自己的 Git repository。
2. Production branch 設為 `main`。
3. Framework preset 選 `None`，Build command 留空。
4. Build output directory 設為 `dist`。
5. 若行程包含私人資訊，先設定 Cloudflare Access 或其他驗證，不要只依賴 `robots.txt`。

### Netlify 或其他靜態主機

將 Publish directory 設為 `dist`，Build command 留空即可。若使用 GitHub Pages，請以 Actions 發佈 `dist/`，或把 `dist/` 內容移到發布分支根目錄。

## 隱私提醒

公開網址代表任何取得連結的人都可能複製內容。`robots.txt`、`noindex` 與 `noarchive` 只是對搜尋引擎的請求；若資料不能公開，應使用存取驗證或保持 repository 為 private。

GitHub 圖示來自 [Simple Icons](https://simpleicons.org/)（CC0）。

## 餐廳比較與行程替換

在「餐廳待選」比較 133 間餐廳的評分、預算、店址與來源，可切換 Tabelog ≥ 3.5 且 Google ≥ 4.5、Tabelog ≥ 3.5，以及 Tabelog ≥ 3.0 且 Google ≥ 4.0 三個級別。各級別可重疊，未知 Google 分數不計入雙平台門檻。

加入待選後，可選擇公開範例中的 10 個餐次並「套用行程」，更新餐廳與導航，也可逐餐還原。選擇只保存在目前瀏覽器。旅館含餐不提供替換；套用後沿用原時段，營業、預約與移動時間仍須自行確認。

餐廳公開資訊位於 `dist/restaurants.js`，缺少 Google 分數時填 `null`，新增店家請保留穩定的 `id`。更換行程時，同步調整 `dist/app.js` 的 `mealDefinitions` 餐次名稱與地圖索引。根目錄與 `dist/index.html` 必須保持同步，並保留 `_redirects` 的 `/restaurants.js` 規則。


## 公開範例天氣（2026/11/18）

首頁新增六張天氣卡，僅使用本公開範例的 **2026/11/15–11/20**，依熊本市、天草、高千穗、黑川溫泉、阿蘇草千里與熊本機場對應每天目的地。日期已去識別化，並非有效訂單或實際出發日期；更換範例時請同步修改 `dist/weather.js` 的 `days`、行程資料與兩份首頁。地點只使用公開景點座標，不要求瀏覽器定位。

- 優先讀取同站 `/api/weather`，以 Open-Meteo 為主要來源，GFS 集合趨勢及 MET Norway 為備援；API 只查固定目的地，不接受任意上游網址或座標，不需金鑰、資料庫或管理密碼。伺服器識別資訊僅連結本公開 repository。
- 以日本時區判斷日期；超過七天標示趨勢，最遠十六天。過期日期顯示「已過預報日期」，超出範圍或無資料時不填造溫度，提供氣象廳預報連結。預報不是歷史天氣回顧；今日若已超過範例日期，過期卡片屬預期行為。
- MET Norway 顯示時段樣本溫度範圍，GFS 顯示集合成員平均；兩者缺少降雨機率時不顯示成零。各來源依頁面註明 [Open-Meteo](https://open-meteo.com/en/docs)、[MET Norway](https://api.met.no/doc/TermsOfService) 與 CC BY 4.0。
- 瀏覽器以 `kumamoto-public-weather-v1` 保存預報，三十分鐘內使用快取；更新失敗可沿用四十八小時內的資料，保留來源及取得時間。私人行程、餐廳預約、共同清單、D1 綁定及密碼均未包含於此功能。
- 桌機六卡並列；手機可滑動、按鈕或方向鍵瀏覽，支援暫停輪播及減少動態效果。

Cloudflare Pages 請以 repository root 為專案根目錄、`dist` 為輸出目錄，使根目錄 `functions/` 可被部署；`dist/_routes.json` 僅讓 `/api/weather` 呼叫 Function。無 Functions 的本機靜態預覽仍可透過瀏覽器直接讀取公開氣象 API；CSP 已列出三個來源。

驗證指令：

```bash
node --test tests/weather-api.test.cjs
python3 -m http.server 4174 --directory dist
# 另一個終端；若 Playwright 未安裝於目前目錄，傳入其模組路徑
node tests/weather-browser.cjs /path/to/playwright http://localhost:4174
# 可加第四個參數指定 Chromium／Chrome 執行檔
```

API 測試包含快取、主要來源失敗、GFS／MET 備援、單一地點失敗與全部失敗；瀏覽器測試包含公開日期、桌機／手機明暗、鍵盤、快取、更新失敗、各來源備援及過期／範圍外日期。
