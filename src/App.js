import React, { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    height: "",
    weight: "",
    bloodType: "O",
    feedback: "",
    message: "",
  });
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const questions = [
    {
      question: "今天是什麼節日？",
      options: ["西洋情人節", "光棍節", "正常的禮拜五", "白色情人節"],
      correct: ["西洋情人節"],
    },
    {
      question: "在朱博聖眼中唐詩媛是怎麼樣的人？",
      options: [
        "大姊姊",
        "小屁孩",
        "身材好但一直沒自信",
        "很有能力",
        "講話靠背",
        "扁人很痛",
        "以上皆是",
      ],
      correct: ["以上皆是"],
    },
    {
      question: "朱會擔心唐詩媛的事情是什麼？",
      options: [
        "有很多人追",
        "之前被別人扁",
        "哪天換燈泡手又受傷",
        "不正常睡覺",
        "不正常吃飯",
        "不小心上下跳又扭傷腳踝",
        "以上皆是",
      ],
      correct: ["以上皆是"],
    },
    {
      question: "朱對唐詩媛外貌身材的看法？",
      options: [
        "看一次嬌羞一次",
        "唉呦還不錯喔",
        "普普通通吧就這樣",
        "看一次嫌一次",
      ],
      correct: ["看一次嬌羞一次"],
    },
    {
      question: "繞口令中唐小姐哪個比較不分?",
      options: ["ㄉㄊ", "ㄋㄌ", "ㄕㄙ", "ㄤㄢ"],
      correct: ["ㄕㄙ"],
    },
    {
      question:
        "朱同學之前打麻將打輸，很感激後來姐姐的贊助，請問姐姐當時提供多少錢紅包💸?",
      options: ["666", "888", "1688", "520"],
      correct: ["666"],
    },
    {
      question: "如果今天朱要送你花他會送哪種💐",
      options: ["非洲菊", "薊花", "玫瑰", "火鶴"],
      correct: ["薊花"],
    },
    {
      question: "談戀愛應該首要考量的對象是誰？",
      options: [
        "有刺青",
        "會唱歌",
        "許光漢",
        "身材姣好",
        "一個可愛的研究所弟弟",
        "多金有腦長得帥",
      ],
      correct: ["一個可愛的研究所弟弟"],
    },
    {
      question: "請選擇這張圖片的正確數字？（選兩個）",
      img: "/image.jpg",
      options: [...Array(10).keys()].map(String),
      correct: ["2", "3"],
    },
  ];

  const TELEGRAM_BOT_TOKEN = "7968168632:AAHa9JlzMwhu0lqILrO9EuHsqV8aScHOO-Q";
  const TELEGRAM_CHAT_ID = "7302841188";

  const sendMessageToTelegram = () => {
    if (isSending) return;
    setIsSending(true);

    const message = `
📝 **使用者資料**
👤 姓名: ${userData.name}
📏 身高: ${userData.height} cm
⚖️ 體重: ${userData.weight} kg
🩸 血型: ${userData.bloodType}

💬 **遊戲體驗**: ${userData.feedback}
📩 **使用者留言**: ${userData.message}
    `;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })
      .then(() => setStep(step + 1))
      .catch(() => alert("發送失敗，請再試一次！"))
      .finally(() => setIsSending(false));
  };

  const handleInputChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleAnswerChange = (index, option) => {
    const correctAnswers = questions[index].correct;

    if (correctAnswers.length === 2) {
      let newSelected = [...selectedNumbers];

      if (newSelected.includes(option)) {
        newSelected = newSelected.filter((num) => num !== option);
      } else {
        newSelected.push(option);
      }

      setSelectedNumbers(newSelected);

      if (newSelected.length === 2) {
        if (
          newSelected.includes(correctAnswers[0]) &&
          newSelected.includes(correctAnswers[1])
        ) {
          setStep(step + 1);
          setSelectedNumbers([]);
        } else {
          alert("動動腦再試試:)");
          setSelectedNumbers([]);
        }
      }
    } else {
      if (option === correctAnswers[0]) {
        setStep(step + 1);
      } else {
        alert("你需要再想想🌚");
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      {step === 0 && (
        <div style={cardStyle}>
          <h2>請輸入你的資料</h2>
          <input
            name="name"
            placeholder="姓名"
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            name="height"
            placeholder="身高 (cm)"
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            name="weight"
            placeholder="體重 (kg)"
            onChange={handleInputChange}
            style={inputStyle}
          />
          <select
            name="bloodType"
            onChange={handleInputChange}
            value={userData.bloodType}
            style={inputStyle}
          >
            <option value="O">O</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
          </select>
          <button onClick={() => setStep(1)} style={buttonStyle}>
            開始測驗
          </button>
        </div>
      )}

      {step > 0 && step <= questions.length && (
        <div style={cardStyle}>
          <h2>
            問題 {step}: {questions[step - 1].question}
          </h2>
          {questions[step - 1].img && (
            <img
              src={questions[step - 1].img}
              alt="題目圖片"
              style={{ width: "100%" }}
            />
          )}
          {questions[step - 1].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerChange(step - 1, option)}
              style={{
                display: "inline-block",
                margin: "5px",
                padding: "10px",
                border: "2px solid black",
                backgroundColor: selectedNumbers.includes(option)
                  ? "lightblue"
                  : "white",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {step > questions.length && (
        <div style={cardStyle}>
          <h2>遊戲結束！🐷🎉❤️</h2>
          <textarea
            name="feedback"
            placeholder="Q: 遊戲體驗如何？"
            onChange={handleInputChange}
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="Q: 有什麼話想說？"
            onChange={handleInputChange}
            style={inputStyle}
          />
          <button
            onClick={sendMessageToTelegram}
            style={{
              ...buttonStyle,
              backgroundColor: isSending ? "#ccc" : "#28a745",
            }}
          >
            {isSending ? "發送中..." : "送出"}
          </button>
        </div>
      )}

      {step === questions.length + 2 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>🎁 朱在這一天有東西要跟你分享</h2>
          <p>請點擊下方連結觀看影片：</p>
          <a
            href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            ▶ 觀看影片
          </a>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  maxWidth: "500px",
  margin: "auto",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};
const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
const buttonStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};
