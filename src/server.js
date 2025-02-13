const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let collectedData = []; // 儲存測驗者的資料

// 儲存資料 API
app.post("/save-data", (req, res) => {
  collectedData.push(req.body); // 存入陣列
  console.log("📩 收到資料：", req.body);
  res.json({ message: "✅ 資料已儲存" });
});

// 取得資料 API（方便你查看）
app.get("/get-data", (req, res) => {
  res.json(collectedData);
});

app.listen(3001, () => console.log("🚀 伺服器已啟動：http://localhost:3001"));
