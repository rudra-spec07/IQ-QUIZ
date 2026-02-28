const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What year was JavaScript created?",
    options: ["1995", "2000", "1992", "2005"],
    answer: "1995"
  },
  {
    question: "Which keyword creates a constant?",
    options: ["var", "let", "const", "define"],
    answer: "const"
  },
  {
    question: "Which method selects an element by ID?",
    options: ["getElementByClass", "getById", "querySelector", "getElementById"],
    answer: "getElementById"
  },
  {
    question: "Which of these is a JavaScript data type?",
    options: ["float", "number", "decimal", "real"],
    answer: "number"
  }
];

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let selectedOption = "";

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;

  options.forEach((btn, index) => {
    btn.textContent = current.options[index];
    btn.classList.remove("selected", "correct", "wrong");
    btn.disabled = false;
  });

  nextBtn.disabled = true;
  selectedOption = "";
}

options.forEach(btn => {
  btn.addEventListener("click", () => {

    // lock after first click
    if (selectedOption !== "") return;

    selectedOption = btn.textContent.trim();
    const correctAnswer = quizData[currentQuestion].answer.trim();

    options.forEach(option => {
      option.disabled = true;

      // always show correct answer
      if (option.textContent.trim() === correctAnswer) {
        option.classList.add("correct");
      }
    });

    if (selectedOption === correctAnswer) {
      score++;
    } else {
      btn.classList.add("wrong");
    }

    nextBtn.disabled = false;
  });
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quiz").innerHTML = `
    <h2>You scored ${score} out of ${quizData.length}</h2>
    <button onclick="location.reload()">Try Again</button>
  `;
}

loadQuestion();
