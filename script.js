let currentQuestion = 0; 
let userAnswers = new Array(questions.length).fill(null); 
let score = 0;           
let finished = false;    

const navContainer = document.getElementById("nav-container");
const questionNumberElem = document.getElementById("question-number");
const questionTextElem = document.getElementById("question-text");
const answersElem = document.getElementById("answers");
const skipBtn = document.getElementById("skip-btn");
const submitBtn = document.getElementById("submit-btn");
const finishBtn = document.getElementById("finish-btn");
const resultContainer = document.getElementById("result-container");

function createNavSquares() {
  navContainer.innerHTML = "";
  questions.forEach((q, index) => {
    const square = document.createElement("div");
    square.classList.add("nav-square");
    square.textContent = index + 1;

    square.onclick = () => {
      currentQuestion = index;
      loadQuestion();
    };
    navContainer.appendChild(square);
  });
}

function updateNavSquares() {
  const squares = document.querySelectorAll(".nav-square");
  squares.forEach((square, index) => {
    square.classList.remove("active", "correct", "incorrect");
    if (index === currentQuestion) {
      square.classList.add("active");
    }
    if (finished) {
      if (userAnswers[index] === questions[index].correct) {
        square.classList.add("correct");
      } else {
        square.classList.add("incorrect");
      }
    }
  });
}

function loadQuestion() {
  updateNavSquares();

  const question = questions[currentQuestion];
  questionNumberElem.textContent = `Питання ${currentQuestion + 1} з ${questions.length}`;
  questionTextElem.innerHTML = question.text;
  answersElem.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("answer-btn");

    if (userAnswers[currentQuestion] === index) {
      btn.classList.add("selected");
    }

    if (finished) {
      if (index === question.correct) {
        btn.classList.add("correct");
      }
      if (userAnswers[currentQuestion] === index && index !== question.correct) {
        btn.classList.add("incorrect");
      }
    } else {
      btn.onclick = () => selectAnswer(index);
    }
    answersElem.appendChild(btn);
  });

  if (!finished) {
    skipBtn.style.display = (currentQuestion === questions.length - 1) ? "none" : "inline-block";
    submitBtn.style.display = "inline-block";
    finishBtn.style.display = (currentQuestion === questions.length - 1) ? "inline-block" : "none";
    document.querySelector(".buttons").style.display = "block";
  } else {
    document.querySelector(".buttons").style.display = "none";
  }

  document.getElementById("question-container").style.display = "block";
  if (!finished) {
    resultContainer.style.display = "none";
  }
}

function selectAnswer(index) {
  userAnswers[currentQuestion] = index;
  const allAnswerBtns = answersElem.querySelectorAll(".answer-btn");
  allAnswerBtns.forEach(btn => btn.classList.remove("selected"));
  allAnswerBtns[index].classList.add("selected");
}

submitBtn.onclick = () => {
  if (userAnswers[currentQuestion] !== null) {
    if (userAnswers[currentQuestion] === questions[currentQuestion].correct) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  } else {
    alert("Оберіть відповідь перед тим, як продовжити!");
  }
};

skipBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

finishBtn.onclick = () => {
  if (userAnswers[currentQuestion] !== null) {
    if (userAnswers[currentQuestion] === questions[currentQuestion].correct) {
      score++;
    }
    showResults();
  } else {
    alert("Оберіть відповідь перед тим, як завершити тест!");
  }
};

function showResults() {
  finished = true;
  updateNavSquares();
  resultContainer.style.display = "block";
  resultContainer.innerHTML = `<h2>Ваш результат: ${score} з ${questions.length}</h2>`;
  document.querySelector(".buttons").style.display = "none";
  loadQuestion();
}

createNavSquares();
loadQuestion();
