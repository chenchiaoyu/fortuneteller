# 2026 命運時間軸

三盤合一（八字 × 紫微斗數 × 西洋占星）逐週行運提醒互動網頁。

## 本機開發

```bash
npm install
npm run dev
```

## 部署到 GitHub Pages

### 第一次設定

1. 在 GitHub 建立一個新的 repo（例如 `fortune-timeline`）
2. 把 `vite.config.js` 裡的 `base` 改成你的 repo 名稱：
   ```js
   base: '/你的repo名稱/',
   ```
3. 把這個資料夾推上去：
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/你的帳號/你的repo名稱.git
   git push -u origin main
   ```
4. 到 GitHub repo → Settings → Pages
5. Source 選 **GitHub Actions**
6. 推上去後約 2 分鐘，網站自動上線

### 之後更新

```bash
git add .
git commit -m "update"
git push
```
推上去後 GitHub Actions 自動重新部署。

## 專案結構

```
src/
  data/
    weeks.js          # 所有週次資料與設定
  components/
    WeekCard.jsx      # 左側週次卡片
    DetailPanel.jsx   # 右側詳情面板
    EnergyBar.jsx     # 能量點狀顯示
  App.jsx             # 主應用
  main.jsx            # 入口
  index.css           # 全域樣式
```

## 自訂內容

所有週次內容都在 `src/data/weeks.js`，直接修改即可。
