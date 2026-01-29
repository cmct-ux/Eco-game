const scene = document.getElementById("scene");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const levelEl = document.getElementById("level");

let score = 0;
let time = 60;
let level = 0;
let trashLeft = 0;
let quizIndex = 0;

const levels = [
  { bg: "0px 0px", trashY: -900 },
  { bg: "-900px 0px", trashY: -950 },
  { bg: "-1800px 0px", trashY: -1000 },
  { bg: "0px -450px", trashY: -1050 },
  { bg: "-900px -450px", trashY: -1100 }
];
const quizzes = [

/* ================= MÀN 1 – RỪNG ================= */
[
  {
    q: "Rác nhựa trong rừng gây tác hại gì?",
    a: ["Làm đẹp cảnh quan", "Gây chết động vật", "Không ảnh hưởng"],
    correct: 1
  },
  {
    q: "Động vật rừng dễ bị tổn thương vì?",
    a: ["Ăn phải rác nhựa", "Thời tiết lạnh", "Thiếu ánh sáng"],
    correct: 0
  },
  {
    q: "Biện pháp bảo vệ rừng hiệu quả nhất là?",
    a: ["Xả rác đúng nơi", "Thu gom – tái chế rác", "Chặt cây"],
    correct: 1
  },
  {
    q: "Rác nhựa phân huỷ trong tự nhiên mất?",
    a: ["Vài ngày", "Hàng trăm năm", "1 tháng"],
    correct: 1
  },
  {
    q: "Ai có trách nhiệm bảo vệ rừng?",
    a: ["Chỉ kiểm lâm", "Chỉ nhà nước", "Tất cả mọi người"],
    correct: 2
  }
],

/* ================= MÀN 2 – KHU DÂN CƯ ================= */
[
  {
    q: "Xả rác bừa bãi ở khu dân cư gây ra?",
    a: ["Ô nhiễm môi trường", "Làm mát không khí", "Không ảnh hưởng"],
    correct: 0
  },
  {
    q: "Rác thải sinh hoạt cần được?",
    a: ["Đổ ra đường", "Phân loại trước khi xử lý", "Đốt ngoài trời"],
    correct: 1
  },
  {
    q: "Túi nilon gây hại vì?",
    a: ["Khó phân huỷ", "Nhẹ", "Dễ mang theo"],
    correct: 0
  },
  {
    q: "Hành động đúng khi thấy rác?",
    a: ["Bỏ qua", "Nhặt và bỏ đúng nơi", "Đá sang chỗ khác"],
    correct: 1
  },
  {
    q: "Khu dân cư sạch sẽ giúp?",
    a: ["Giảm bệnh tật", "Tăng ô nhiễm", "Không thay đổi"],
    correct: 0
  }
],

/* ================= MÀN 3 – SÔNG / BIỂN ================= */
[
  {
    q: "Rác thải nhựa dưới sông gây hại gì?",
    a: ["Gây chết sinh vật nước", "Làm nước trong hơn", "Không ảnh hưởng"],
    correct: 0
  },
  {
    q: "Sinh vật biển dễ bị gì khi có rác?",
    a: ["Mắc kẹt, nuốt rác", "Bơi nhanh hơn", "Sinh sản nhiều hơn"],
    correct: 0
  },
  {
    q: "Nguồn rác ra sông chủ yếu từ?",
    a: ["Sinh hoạt con người", "Mưa", "Cây cối"],
    correct: 0
  },
  {
    q: "Biện pháp bảo vệ sông biển là?",
    a: ["Không xả rác xuống nước", "Xả ban đêm", "Đổ rác ra xa bờ"],
    correct: 0
  },
  {
    q: "Biển sạch giúp?",
    a: ["Bảo vệ hệ sinh thái", "Giảm du lịch", "Không có lợi"],
    correct: 0
  }
],

/* ================= MÀN 4 – TRƯỜNG HỌC ================= */
[
  {
    q: "Rác trong trường học thường là?",
    a: ["Giấy, bao bì", "Kim loại nặng", "Rác y tế"],
    correct: 0
  },
  {
    q: "Hành động đúng của học sinh là?",
    a: ["Vứt rác dưới bàn", "Bỏ rác đúng thùng", "Giấu rác"],
    correct: 1
  },
  {
    q: "Trường học sạch giúp?",
    a: ["Học tập hiệu quả hơn", "Ô nhiễm hơn", "Không ảnh hưởng"],
    correct: 0
  },
  {
    q: "Giấy có thể được?",
    a: ["Tái chế", "Đốt ngoài trời", "Chôn lấp mãi mãi"],
    correct: 0
  },
  {
    q: "Ý thức bảo vệ môi trường cần hình thành từ?",
    a: ["Nhỏ tuổi", "Khi lớn", "Không cần"],
    correct: 0
  }
],

/* ================= MÀN 5 – KHU CÔNG NGHIỆP ================= */
[
  {
    q: "Rác công nghiệp gây nguy hiểm vì?",
    a: ["Có chất độc", "Nhẹ", "Dễ phân huỷ"],
    correct: 0
  },
  {
    q: "Chất thải công nghiệp cần?",
    a: ["Xử lý đúng quy trình", "Xả thẳng ra môi trường", "Chôn tuỳ ý"],
    correct: 0
  },
  {
    q: "Ô nhiễm từ nhà máy ảnh hưởng đến?",
    a: ["Sức khoẻ con người", "Không khí sạch hơn", "Cây xanh phát triển"],
    correct: 0
  },
  {
    q: "Biện pháp giảm ô nhiễm là?",
    a: ["Lọc khí thải", "Xả ban đêm", "Che giấu"],
    correct: 0
  },
  {
    q: "Phát triển bền vững là?",
    a: ["Phát triển đi đôi bảo vệ môi trường", "Chỉ phát triển kinh tế", "Khai thác tối đa"],
    correct: 0
  }
]

];

function loadLevel() {
  if (level >= levels.length) {
    endGame();
    return;
  }

  scene.style.backgroundPosition = levels[level].bg;
  levelEl.textContent = level + 1;
  spawnTrash();
}

function spawnTrash() {
  clearTrash();
  trashLeft = 5;

  for (let i = 0; i < 5; i++) {
    const t = document.createElement("div");
    t.className = "trash";
    t.style.left = Math.random() * 800 + "px";
    t.style.bottom = "40px";
    t.style.backgroundPosition = `${-i * 60}px ${levels[level].trashY}px`;

    t.onclick = () => {
      t.remove();
      trashLeft--;
      score += 10;
      scoreEl.textContent = score;

      if (trashLeft === 0) {
        startQuiz();
      }
    };

    scene.appendChild(t);
  }
}

function clearTrash() {
  document.querySelectorAll(".trash").forEach(t => t.remove());
}

function startQuiz() {
  document.getElementById("game").style.display = "none";
  quiz.style.display = "block";
  quizIndex = 0;
  showQuestion();
}

function showQuestion() {
  const q = quizzes[level][quizIndex];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";

  q.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => {
      if (i === q.correct) score += 20;
      quizIndex++;
      if (quizIndex < 5) showQuestion();
      else {
        quiz.style.display = "none";
        document.getElementById("game").style.display = "block";
        level++;
        loadLevel();
      }
    };
    answersEl.appendChild(btn);
  });
}

function startTimer() {
  setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
}

function endGame() {
  document.getElementById("game").style.display = "none";
  quiz.style.display = "none";
  document.getElementById("end").style.display = "block";
  document.getElementById("finalScore").textContent = score;
}

loadLevel();
startTimer();
