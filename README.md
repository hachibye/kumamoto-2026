# kumamoto-2026

熊本六天五夜行程網站的去識別化公開範本。內容示範如何把試算表行程整理成可收合的每日時間軸、餐廳與景點備選、費用與營業資訊，以及可切換的當日路線圖。

> 本 repository 的日期已提前一週，同行者名稱已改為泛稱。班機、住宿、路線與金額保留作為對照範例，但不是可直接照走的有效訂單；出發前請重新核對交通、房價、營業時間與預約規則。

## 功能

- 六日行程時間軸，時間、地點、費用、營業時間與備註分開顯示
- 景點與餐廳備選保留 Google Maps、Tabelog 與官方網站連結
- Leaflet／OpenStreetMap 當日路線圖，可切換景點或餐廳候選
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

這是一個不需要建置流程的靜態網站；實際部署與帳號設定請自行完成。

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
