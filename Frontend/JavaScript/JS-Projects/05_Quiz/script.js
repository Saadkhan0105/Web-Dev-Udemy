document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
    {
      question: "What is the smallest prime number?",
      choices: ["0", "1", "2", "3"],
      answer: "2",
    },
    {
      question: "Which is the longest river in the world?",
      choices: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      answer: "Nile",
    },
    {
      question: "What is the square root of 64?",
      choices: ["6", "8", "7", "9"],
      answer: "8",
    },
    {
      question: "Who painted the Mona Lisa?",
      choices: [
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Claude Monet",
      ],
      answer: "Leonardo da Vinci",
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      answer: "Nitrogen",
    },
    {
      question: "What is the chemical symbol for water?",
      choices: ["O2", "H2O", "CO2", "HO2"],
      answer: "H2O",
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      choices: ["China", "Japan", "Thailand", "India"],
      answer: "Japan",
    },
    {
      question:
        "Which organ is responsible for pumping blood in the human body?",
      choices: ["Lungs", "Liver", "Heart", "Kidneys"],
      answer: "Heart",
    },
    {
      question: "What is the capital city of Australia?",
      choices: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      answer: "Canberra",
    },
    {
      question: "Which animal is known as the King of the Jungle?",
      choices: ["Elephant", "Tiger", "Lion", "Gorilla"],
      answer: "Lion",
    },
    {
      question: "What is the speed of light in vacuum?",
      choices: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "299,792 km/s"],
      answer: "299,792 km/s",
    },
    {
      question: "Which planet is closest to the Sun?",
      choices: ["Venus", "Earth", "Mercury", "Mars"],
      answer: "Mercury",
    },
  ];


  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; // Clear previous choices
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(li, choice));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(selectedElement, choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = choice === correctAnswer;

    if (isCorrect) {
      score++;
      selectedElement.style.backgroundColor = "#4caf50";
    } else {
      selectedElement.style.backgroundColor = "#ff5252";
    }

    // Disable all choices
    const choices = document.querySelectorAll("li");
    choices.forEach((choice) => (choice.style.pointerEvents = "none"));

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
