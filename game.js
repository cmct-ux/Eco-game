/* =====================
   ECO GAME - GAME.JS
   ===================== */

/* ====== BIẾN TOÀN CỤC ====== */
let currentLevel = 0;
let score = 0;
let timeLeft = 60;
let timer;
let trashRemaining = 0;
let questionIndex = 0;

/* ====== DỮ LIỆU CÂU HỎI ====== */
const questions = [
  // 🌳 RỪNG
  [
    {
      q: "Xả rác trong rừng gây hậu quả gì?",
      options: ["Ô nhiễm đất", "Cháy rừng", "Mất động vật", "Tất cả đều đúng"],
      answer: 3
    },
    {
      q: "Rác nhựa trong rừng mất bao lâu để phân hủy?",
      options: ["Vài ngày", "Vài tháng", "Hàng trăm năm", "Tự biến mất"],
      answer: 2
    },
    {
      q: "Hành động đúng khi đi rừng là gì?",
      options: ["Vứt rác gọn góc", "Đốt rác", "Mang rác về", "Chôn rác"],
      answer: 2
    },
    {
      q: "Động vật rừng bị ảnh hưởng bởi rác vì?",
      options: ["Ăn nhầm rác", "Mắc kẹt", "Mất môi trường sống", "Cả 3"],
      answer: 3
    },
    {
      q: "Thông điệp bảo vệ rừng đúng nhất?",
      options: ["Rừng vô hạn", "Rừng không cần bảo vệ", "Giữ rừng sạch", "Chặt cây hợp lý"],
      answer: 2
    }
  ],

  // 🏙️ KHU DÂN CƯ
  [
    {
      q: "Rác sinh hoạt không xử lý gây?",
      options: ["Mùi hôi", "Bệnh tật", "Ô nhiễm nước", "Tất cả"],
      answer: 3
    },
    {
      q: "Loại rác phổ biến nhất ở khu dân cư?",
      options: ["Rác nhựa", "Rác kim loại", "Rác điện tử", "Rác công nghiệp"],
      answer: 0
    },
    {
      q: "Hành động đúng là?",
      options: ["Vứt rác ra đường", "Phân loại rác", "Đốt rác", "Chôn rác"],
      answer: 1
    },
    {
      q: "Rác tồn đọng gây bệnh gì?",
      options: ["Sốt xuất huyết", "Tiêu chảy", "Hô hấp", "Tất cả"],
      answer: 3
    },
    {
      q: "Ai chịu trách nhiệm giữ môi trường sạch?",
      options: ["Nhà nước", "Công nhân", "Người dân", "Tất cả"],
      answer: 3
    }
  ],

  // 🌊 SÔNG – BIỂN
  [
    {
      q: "Rác nhựa xuống biển gây?",
      options: ["Chết sinh vật", "Ô nhiễm nước", "Ảnh hưởng con người", "Tất cả"],
      answer: 3
    },
    {
      q: "Sinh vật biển dễ ăn nhầm?",
      options: ["Nhựa", "Kim loại", "Thủy tinh", "Giấy"],
      answer: 0
    },
    {
      q: "Nguồn rác ra biển nhiều nhất từ?",
      options: ["Sông", "Tàu", "Bãi biển", "Mưa"],
      answer: 0
    },
    {
      q: "Hành động đúng khi đi biển?",
      options: ["Chôn rác", "Vứt rác xuống nước", "Mang rác về", "Để lại"],
      answer: 2
    },
    {
      q: "Biển sạch giúp?",
      options: ["Du lịch", "Thủy sản", "Sức khỏe", "Tất cả"],
      answer: 3
    }
  ],

  // 🏫 TRƯỜNG HỌC
  [
    {
      q: "Rác nhiều nhất ở trường?",
      options: ["Vỏ bánh kẹo", "Kim loại", "Pin", "Gỗ"],
      answer: 0
    },
    {
      q: "Hành động đúng của học sinh?",
      options: ["Xả rác", "Thu gom rác", "Đổ rác bừa", "Đốt rác"],
      answer: 1
    },
    {
      q: "Trường học xanh cần?",
      options: ["Nhiều cây", "Ít rác", "Ý thức", "Tất cả"],
      answer: 3
    },
    {
      q: "Rác nhựa gây hại vì?",
      options: ["Khó phân hủy", "Ô nhiễm", "Độc hại", "Cả 3"],
      answer: 3
    },
    {
      q: "Thông điệp đúng?",
      options: ["Trường học không cần sạch", "Giữ trường sạch đẹp", "Rác nhỏ không sao", "Ai dọn cũng được"],
      answer: 1
    }
  ],

  // 🏭 KHU CÔNG NGHIỆP
  [
    {
      q: "Rác công nghiệp gây?",
      options: ["Ô nhiễm đất", "Ô nhiễm nước", "Ô nhiễm không khí", "Tất cả"],
      answer: 3
    },
    {
      q: "Chất thải nguy hiểm cần?",
      options: ["Xử lý riêng", "Chôn", "Đổ sông", "Đốt bừa"],
      answer: 0
    },
    {
      q: "Ai quản lý rác công nghiệp?",
      options: ["Nhà máy", "Nhà nước", "Cộng đồng", "Tất cả"],
      answer: 3
    },
    {
      q: "Hậu quả lâu dài?",
      options: ["Bệnh tật", "Đất nhiễm độc", "Mất sinh thái", "Cả 3"],
      answer: 3
    },
    {
      q: "Biện pháp đúng?",
      options: ["Tái chế", "Xả thải", "Giấu rác", "Chôn lấp bừa"],
      answer: 0
    }
  ]
];

/* ====== HÀM BẮT ĐẦU MÀN ====== */
function startLevel(level) {
  currentLevel = level;
  score = 0;
  questionIndex = 0;
  timeLeft = 60;
  trashRemaining = 5;

  document.getElementById("score").innerText = score;
  document.getElementById("level").innerText = level + 1;

  createTrash();
  startTimer();
}

/* ====== TẠO RÁC ====== */
function createTrash() {
  const area = document.getElementById("game-area");
  area.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const trash = document.createElement("div");
    trash.className = "trash";
    trash.style.left = Math.random() * 80 + "%";
    trash.style.top = Math.random() * 80 + "%";

    trash.onclick = () => {
      trash.remove();
      score += 10;
      trashRemaining--;
      document.getElementById("score").innerText = score;

      if (trashRemaining === 0) {
        clearInterval(timer);
        showQuestion();
      }
    };

    area.appendChild(trash);
  }
}

/* ====== ĐỒNG HỒ ====== */
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showQuestion();
    }
  }, 1000);
}

/* ====== HIỂN THỊ CÂU HỎI ====== */
function showQuestion() {
  const q = questions[currentLevel][questionIndex];
  const box = document.getElementById("question-box");

  box.innerHTML = `
    <h3>${q.q}</h3>
    ${q.options.map((opt, i) =>
      `<button onclick="answer(${i})">${opt}</button>`
    ).join("")}
  `;
}

/* ====== TRẢ LỜI ====== */
function answer(choice) {
  const q = questions[currentLevel][questionIndex];

  if (choice === q.answer) score += 20;

  questionIndex++;

  if (questionIndex < 5) {
    showQuestion();
  } else {
    alert("🎉 Hoàn thành màn!");
  }
}
