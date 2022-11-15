# 臺灣最新 COVID-19 確診病例數統計

## 功用
自動爬取臺灣當日最新COVID-19疫情確診病例最新統計資訊

## 使用
0. 確保擁有node.js及npm環境
1. clone此專案
2. 於終端中執行`npm install`
3. 執行`node server.js`

## 架構
- 邏輯及伺服器部分: server.js 
- 靜態資源: public/
	- 主要頁面: index.html
	- Vue渲染: script.js
	- 畫面樣式: style.css
