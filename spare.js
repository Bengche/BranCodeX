const main = document.querySelector(".main");
const container = document.querySelector(".container");
const getBtn = document.querySelector(".get-btn");

const getJoke = function () {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      main.style.display = "block";
      container.style.display = "block";
      container.innerHTML = `<h3>${data.setup}</h3><p>${data.punchline}</P>`;
    });
};
getBtn.addEventListener("click", getJoke);

// --- CATEGORY IDS ---
const categories = [
  { name: "Science: Computers", id: 18, api: true },
  { name: "General Knowledge", id: 9, api: true },
  { name: "World History", id: 23, api: true },
  { name: "Riddles", id: null, api: false },
  { name: "Politics", id: 24, api: true },
  { name: "Science: Gadgets", id: 30, api: true },
  { name: "Sports", id: 21, api: true },
  { name: "Cameroon History", id: null, api: false },
];
const QUESTIONS_PER_CATEGORY = 20;
const TOTAL_QUESTIONS = 20;
const DIFFICULTY = "easy";

// --- CUSTOM QUESTIONS: Cameroon History (50 unique) ---
const cameroonHistoryQuestions = [
  {
    categoryName: "Cameroon History",
    question: "When did Cameroon gain independence from France?",
    correct_answer: "1960",
    incorrect_answers: ["1958", "1961", "1962"],
  },
  {
    categoryName: "Cameroon History",
    question: "What is the capital city of Cameroon?",
    correct_answer: "Yaoundé",
    incorrect_answers: ["Douala", "Bamenda", "Garoua"],
  },
  {
    categoryName: "Cameroon History",
    question: "Who was the first President of Cameroon?",
    correct_answer: "Ahmadou Ahidjo",
    incorrect_answers: ["Paul Biya", "John Fru Ndi", "Manu Dibango"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which river forms part of the border between Cameroon and Nigeria?",
    correct_answer: "Cross River",
    incorrect_answers: ["Sanaga River", "Benue River", "Logone River"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which year did Cameroon join the United Nations?",
    correct_answer: "1960",
    incorrect_answers: ["1955", "1961", "1972"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which is the largest city in Cameroon?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bafoussam", "Bamenda"],
  },
  {
    categoryName: "Cameroon History",
    question: "What is the official language of Cameroon?",
    correct_answer: "French and English",
    incorrect_answers: ["French only", "English only", "Pidgin"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which mountain is the highest in Cameroon?",
    correct_answer: "Mount Cameroon",
    incorrect_answers: ["Mount Fako", "Mount Manengouba", "Mount Oku"],
  },
  {
    categoryName: "Cameroon History",
    question: "Who is the current President of Cameroon (as of 2024)?",
    correct_answer: "Paul Biya",
    incorrect_answers: ["Ahmadou Ahidjo", "John Fru Ndi", "Samuel Eto'o"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which ocean borders Cameroon to the southwest?",
    correct_answer: "Atlantic Ocean",
    incorrect_answers: ["Indian Ocean", "Pacific Ocean", "Mediterranean Sea"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which country colonized Cameroon after World War I?",
    correct_answer: "France and Britain",
    incorrect_answers: ["Germany", "Belgium", "Portugal"],
  },
  {
    categoryName: "Cameroon History",
    question: "What is the currency of Cameroon?",
    correct_answer: "Central African CFA franc",
    incorrect_answers: ["West African CFA franc", "Naira", "Dollar"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which Cameroonian footballer is known as 'The Indomitable Lion'?",
    correct_answer: "Roger Milla",
    incorrect_answers: ["Samuel Eto'o", "Rigobert Song", "Patrick Mboma"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which region is famous for the Bamileke people?",
    correct_answer: "West Region",
    incorrect_answers: ["North Region", "Southwest Region", "Littoral Region"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which Cameroonian city is known for its port and economic activities?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Buea", "Ngaoundéré"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which year did Cameroon host the African Cup of Nations for the first time?",
    correct_answer: "1972",
    incorrect_answers: ["1984", "2000", "2019"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which Cameroonian lake is known for a deadly gas eruption in 1986?",
    correct_answer: "Lake Nyos",
    incorrect_answers: ["Lake Chad", "Lake Barombi Mbo", "Lake Oku"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which is the oldest university in Cameroon?",
    correct_answer: "University of Yaoundé",
    incorrect_answers: [
      "University of Douala",
      "University of Buea",
      "University of Bamenda",
    ],
  },
  {
    categoryName: "Cameroon History",
    question: "What is the nickname of Cameroon’s national football team?",
    correct_answer: "The Indomitable Lions",
    incorrect_answers: ["The Super Eagles", "The Black Stars", "The Elephants"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which Cameroonian city is known as the 'Town of Legendary Hospitality'?",
    correct_answer: "Buea",
    incorrect_answers: ["Bamenda", "Garoua", "Maroua"],
  },
  // 30 more unique questions:
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is called the 'Economic Capital'?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bafoussam", "Bamenda"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which country did Cameroon defeat to win their first AFCON title?",
    correct_answer: "Nigeria",
    incorrect_answers: ["Egypt", "Ghana", "Ivory Coast"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian is a famous jazz saxophonist?",
    correct_answer: "Manu Dibango",
    incorrect_answers: ["Richard Bona", "Francis Bebey", "Charlotte Dipanda"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which region is Limbe located in?",
    correct_answer: "Southwest Region",
    incorrect_answers: ["Northwest Region", "Littoral Region", "West Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is known for the 'Ngondo' festival?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bamenda", "Buea"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which Cameroonian footballer won the Olympic gold medal in 2000?",
    correct_answer: "Samuel Eto'o",
    incorrect_answers: ["Roger Milla", "Rigobert Song", "Patrick Mboma"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which is the largest region in Cameroon by area?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is famous for tea plantations?",
    correct_answer: "Tiko",
    incorrect_answers: ["Buea", "Bamenda", "Garoua"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian river is the longest?",
    correct_answer: "Sanaga River",
    incorrect_answers: ["Wouri River", "Benue River", "Cross River"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which Cameroonian city is known for the 'FENAC' cultural festival?",
    correct_answer: "Yaoundé",
    incorrect_answers: ["Douala", "Bamenda", "Buea"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is known for the Mandara Mountains?",
    correct_answer: "Far North Region",
    incorrect_answers: ["North Region", "West Region", "East Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the North Region?",
    correct_answer: "Garoua",
    incorrect_answers: ["Ngaoundéré", "Maroua", "Bamenda"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the Adamawa Region?",
    correct_answer: "Ngaoundéré",
    incorrect_answers: ["Garoua", "Bamenda", "Buea"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is famous for the Tikar people?",
    correct_answer: "Adamawa Region",
    incorrect_answers: ["West Region", "North Region", "Southwest Region"],
  },
  {
    categoryName: "Cameroon History",
    question:
      "Which Cameroonian city is known for the 'Mount Cameroon Race of Hope'?",
    correct_answer: "Buea",
    incorrect_answers: ["Bamenda", "Yaoundé", "Douala"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is the least populated?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the Northwest Region?",
    correct_answer: "Bamenda",
    incorrect_answers: ["Buea", "Yaoundé", "Douala"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is known for the Bakossi people?",
    correct_answer: "Southwest Region",
    incorrect_answers: ["Northwest Region", "West Region", "Littoral Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the West Region?",
    correct_answer: "Bafoussam",
    incorrect_answers: ["Bamenda", "Buea", "Douala"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the South Region?",
    correct_answer: "Ebolowa",
    incorrect_answers: ["Buea", "Bamenda", "Garoua"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is known for the Beti people?",
    correct_answer: "Central Region",
    incorrect_answers: ["West Region", "North Region", "East Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the Central Region?",
    correct_answer: "Yaoundé",
    incorrect_answers: ["Douala", "Bafoussam", "Bamenda"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is known for the Baka pygmies?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the Far North Region?",
    correct_answer: "Maroua",
    incorrect_answers: ["Garoua", "Ngaoundéré", "Bamenda"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is known for the Fulani people?",
    correct_answer: "Adamawa Region",
    incorrect_answers: ["West Region", "North Region", "Southwest Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the Littoral Region?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bafoussam", "Bamenda"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is known for the Bamoun people?",
    correct_answer: "West Region",
    incorrect_answers: ["North Region", "Southwest Region", "Littoral Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the Southwest Region?",
    correct_answer: "Buea",
    incorrect_answers: ["Bamenda", "Yaoundé", "Douala"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian region is known for the Maka people?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    categoryName: "Cameroon History",
    question: "Which Cameroonian city is the capital of the East Region?",
    correct_answer: "Bertoua",
    incorrect_answers: ["Buea", "Bamenda", "Garoua"],
  },
];

// --- RIDDLES (custom, 20 unique) ---
const riddlesQuestions = [
  {
    categoryName: "Riddles",
    question: "What has keys but can't open locks?",
    correct_answer: "A piano",
    incorrect_answers: ["A map", "A lock", "A door"],
  },
  {
    categoryName: "Riddles",
    question: "What gets wetter as it dries?",
    correct_answer: "A towel",
    incorrect_answers: ["A sponge", "A river", "A soap"],
  },
  {
    categoryName: "Riddles",
    question: "What has a head and a tail but no body?",
    correct_answer: "A coin",
    incorrect_answers: ["A snake", "A comet", "A worm"],
  },
  {
    categoryName: "Riddles",
    question: "What belongs to you but others use it more than you do?",
    correct_answer: "Your name",
    incorrect_answers: ["Your phone", "Your car", "Your house"],
  },
  {
    categoryName: "Riddles",
    question: "What can travel around the world while staying in a corner?",
    correct_answer: "A stamp",
    incorrect_answers: ["A coin", "A shadow", "A clock"],
  },
  {
    categoryName: "Riddles",
    question: "What has one eye but cannot see?",
    correct_answer: "A needle",
    incorrect_answers: ["A storm", "A hurricane", "A potato"],
  },
  {
    categoryName: "Riddles",
    question: "What has many teeth but cannot bite?",
    correct_answer: "A comb",
    incorrect_answers: ["A saw", "A zipper", "A rake"],
  },
  {
    categoryName: "Riddles",
    question: "What is always in front of you but can’t be seen?",
    correct_answer: "The future",
    incorrect_answers: ["The air", "Your nose", "The wind"],
  },
  {
    categoryName: "Riddles",
    question: "What goes up but never comes down?",
    correct_answer: "Your age",
    incorrect_answers: ["A balloon", "A rocket", "A mountain"],
  },
  {
    categoryName: "Riddles",
    question: "What has hands but can’t clap?",
    correct_answer: "A clock",
    incorrect_answers: ["A monkey", "A statue", "A robot"],
  },
  {
    categoryName: "Riddles",
    question: "What can you catch but not throw?",
    correct_answer: "A cold",
    incorrect_answers: ["A ball", "A fish", "A butterfly"],
  },
  {
    categoryName: "Riddles",
    question: "What kind of band never plays music?",
    correct_answer: "A rubber band",
    incorrect_answers: ["A jazz band", "A rock band", "A marching band"],
  },
  {
    categoryName: "Riddles",
    question: "What has a neck but no head?",
    correct_answer: "A bottle",
    incorrect_answers: ["A guitar", "A shirt", "A vase"],
  },
  {
    categoryName: "Riddles",
    question: "What has an eye but cannot see?",
    correct_answer: "A needle",
    incorrect_answers: ["A hurricane", "A potato", "A tornado"],
  },
  {
    categoryName: "Riddles",
    question: "What has a thumb and four fingers but is not alive?",
    correct_answer: "A glove",
    incorrect_answers: ["A hand", "A sock", "A mitten"],
  },
  {
    categoryName: "Riddles",
    question: "What has a heart that doesn’t beat?",
    correct_answer: "An artichoke",
    incorrect_answers: ["A stone", "A robot", "A tree"],
  },
  {
    categoryName: "Riddles",
    question:
      "What comes once in a minute, twice in a moment, but never in a thousand years?",
    correct_answer: "The letter M",
    incorrect_answers: ["The letter N", "The letter E", "The letter T"],
  },
  {
    categoryName: "Riddles",
    question:
      "What has cities, but no houses; forests, but no trees; and water, but no fish?",
    correct_answer: "A map",
    incorrect_answers: ["A globe", "A book", "A painting"],
  },
  {
    categoryName: "Riddles",
    question: "What is full of holes but still holds water?",
    correct_answer: "A sponge",
    incorrect_answers: ["A net", "A bucket", "A pipe"],
  },
  {
    categoryName: "Riddles",
    question: "What question can you never answer yes to?",
    correct_answer: "Are you asleep?",
    incorrect_answers: ["Are you hungry?", "Are you awake?", "Are you ready?"],
  },
];

// --- DOM ELEMENTS ---
// const quizSetup = document.getElementById("quiz-setup");
// const quizMain = document.getElementById("quiz-main");
// const quizResult = document.getElementById("quiz-result");
// const playerDisplay = document.getElementById("playerDisplay");
// const highScoreSpan = document.getElementById("highScore");
// const passedCount = document.getElementById("passedCount");
// const failedCount = document.getElementById("failedCount");
// const currentQ = document.getElementById("currentQ");
// const totalQ = document.getElementById("totalQ");
// const timerSpan = document.getElementById("timer");
// const questionBox = document.getElementById("questionBox");
// const questionEl = document.getElementById("question");
// const optionsEl = document.getElementById("options");
// const explanationEl = document.getElementById("explanation");
// const nextBtn = document.getElementById("nextBtn");
// const restartBtn = document.getElementById("restartBtn");
// const quitBtn = document.getElementById("quitBtn");
// const startBtn = document.getElementById("startBtn");
// const playerNameInput = document.getElementById("playerName");
// const resultMsg = document.getElementById("resultMsg");
// const finalPassed = document.getElementById("finalPassed");
// const finalFailed = document.getElementById("finalFailed");
// const finalHighScore = document.getElementById("finalHighScore");
// const playAgainBtn = document.getElementById("playAgainBtn");

// --- STATE ---
// let questions = [];
// let currentIndex = 0;
// let score = 0;
// let failed = 0;
// let passed = 0;
// let timer = null;
// let timeLeft = 30;
// let playerName = "";
// let highScore = localStorage.getItem("quizHighScore") || 0;

// --- UTILS ---
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// --- FETCH QUESTIONS ---
async function fetchQuestions() {
  let allQuestions = [];
  for (const cat of categories) {
    if (cat.api && cat.id) {
      const url = `https://opentdb.com/api.php?amount=${QUESTIONS_PER_CATEGORY}&category=${cat.id}&difficulty=${DIFFICULTY}&type=multiple`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          allQuestions = allQuestions.concat(
            data.results.map((q) => ({
              ...q,
              categoryName: cat.name,
            }))
          );
        }
      } catch (e) {
        // If fetch fails, skip this category
      }
    } else if (cat.name === "Cameroon History") {
      allQuestions = allQuestions.concat(cameroonHistoryQuestions);
    } else if (cat.name === "Riddles") {
      allQuestions = allQuestions.concat(riddlesQuestions);
    }
  }
  // Remove duplicates by question text
  const seen = new Set();
  allQuestions = allQuestions.filter((q) => {
    const key = (q.categoryName || "") + decodeHTML(q.question);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  // Shuffle and pick only TOTAL_QUESTIONS
  return shuffle(allQuestions).slice(0, TOTAL_QUESTIONS);
}

// --- QUIZ LOGIC ---
function resetQuiz() {
  currentIndex = 0;
  score = 0;
  failed = 0;
  passed = 0;
  questions = [];
  timeLeft = 30;
  passedCount.textContent = "0";
  failedCount.textContent = "0";
  currentQ.textContent = "1";
  totalQ.textContent = TOTAL_QUESTIONS;
  timerSpan.textContent = "30";
  explanationEl.classList.add("hidden");
  explanationEl.textContent = "";
  optionsEl.innerHTML = "";
  questionEl.textContent = "";
}

async function startQuiz() {
  playerName = playerNameInput.value.trim() || "Player";
  quizSetup.classList.add("hidden");
  quizMain.classList.remove("hidden");
  quizResult.classList.add("hidden");
  playerDisplay.textContent = playerName;
  highScoreSpan.textContent = highScore;
  resetQuiz();
  questions = await fetchQuestions();
  if (!questions.length) {
    questionEl.textContent =
      "Sorry, could not load questions. Please try again.";
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;
    return;
  }
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerSpan.textContent = timeLeft;
  explanationEl.classList.add("hidden");
  explanationEl.textContent = "";
  optionsEl.innerHTML = "";
  if (currentIndex >= questions.length) {
    return endQuiz();
  }
  const q = questions[currentIndex];
  questionEl.innerHTML = `<span class="text-indigo-700 font-bold">${decodeHTML(
    q.categoryName
  )}</span>: ${decodeHTML(q.question)}`;
  const answers = shuffle([q.correct_answer, ...q.incorrect_answers]);
  answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.className =
      "option-btn w-full text-left px-4 py-2 rounded-lg border border-indigo-300 bg-white text-indigo-900 font-semibold shadow hover:bg-indigo-200 transition";
    btn.innerHTML = decodeHTML(ans);
    btn.onclick = () => selectAnswer(btn, ans, q.correct_answer, q);
    optionsEl.appendChild(btn);
  });
  currentQ.textContent = currentIndex + 1;
  nextBtn.disabled = true;
  startTimer(q);
}

function startTimer(q) {
  timerSpan.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoFail(q);
    }
  }, 1000);
}

function selectAnswer(btn, selected, correct, q) {
  clearInterval(timer);
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach((b) => b.classList.add("disabled"));
  if (decodeHTML(selected) === decodeHTML(correct)) {
    btn.classList.add("correct");
    score++;
    passed++;
    playSound("sound-correct");
    explanationEl.textContent = `✅ Correct!`;
  } else {
    btn.classList.add("wrong");
    allBtns.forEach((b) => {
      if (b.innerHTML === decodeHTML(correct)) b.classList.add("correct");
    });
    failed++;
    playSound("sound-wrong");
    explanationEl.textContent = `❌ Wrong! The correct answer is: ${decodeHTML(
      correct
    )}`;
  }
  explanationEl.classList.remove("hidden");
  passedCount.textContent = passed;
  failedCount.textContent = failed;
  nextBtn.disabled = false;
}

function autoFail(q) {
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach((b) => {
    b.classList.add("disabled");
    if (b.innerHTML === decodeHTML(q.correct_answer))
      b.classList.add("correct");
  });
  failed++;
  failedCount.textContent = failed;
  playSound("sound-wrong");
  explanationEl.textContent = `⏰ Time's up! The correct answer is: ${decodeHTML(
    q.correct_answer
  )}`;
  explanationEl.classList.remove("hidden");
  nextBtn.disabled = false;
}

function nextQuestion() {
  playSound("sound-next");
  currentIndex++;
  showQuestion();
}

function endQuiz() {
  quizMain.classList.add("hidden");
  quizResult.classList.remove("hidden");
  resultMsg.textContent = `${playerName}, you scored ${score} out of ${TOTAL_QUESTIONS}!`;
  finalPassed.textContent = passed;
  finalFailed.textContent = failed;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("quizHighScore", highScore);
  }
  finalHighScore.textContent = highScore;
}

function quitQuiz() {
  quizMain.classList.add("hidden");
  quizSetup.classList.remove("hidden");
  playerNameInput.value = "";
}

// --- EVENT LISTENERS ---
startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = () => {
  resetQuiz();
  startQuiz();
};
quitBtn.onclick = quitQuiz;
playAgainBtn.onclick = () => {
  quizResult.classList.add("hidden");
  quizSetup.classList.remove("hidden");
  playerNameInput.value = "";
};

// --- State ---
let playerName = "";
let guessRound = 1;
let guessStreak = 0;
let guessResults = [];
let challengeCountries = [];
let challengeIndex = 0;
let challengeScore = 0;
let challengeTimer = null;
let challengeTimeLeft = 0;
let challengeMaxTime = 30; // default, will be set per round
let challengePoints = 2;
let challengeHints = true;
let challengeContinent = null;
let challengeCountriesPool = [];
let leaderboard = JSON.parse(
  localStorage.getItem("guessChallengeLeaderboard") || "[]"
);
let highScore = localStorage.getItem("guessChallengeHighScore") || 0;
let allCountries = null; // cache

// --- Static fallback data (in case API fails) ---
const staticCountries = [
  {
    name: { common: "France" },
    capital: ["Paris"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/fr.png" },
    region: "Europe",
  },
  {
    name: { common: "Nigeria" },
    capital: ["Abuja"],
    currencies: { NGN: { name: "Nigerian naira" } },
    flags: { png: "https://flagcdn.com/w320/ng.png" },
    region: "Africa",
  },
  {
    name: { common: "Brazil" },
    capital: ["Brasília"],
    currencies: { BRL: { name: "Brazilian real" } },
    flags: { png: "https://flagcdn.com/w320/br.png" },
    region: "Americas",
  },
  {
    name: { common: "Japan" },
    capital: ["Tokyo"],
    currencies: { JPY: { name: "Japanese yen" } },
    flags: { png: "https://flagcdn.com/w320/jp.png" },
    region: "Asia",
  },
  {
    name: { common: "Australia" },
    capital: ["Canberra"],
    currencies: { AUD: { name: "Australian dollar" } },
    flags: { png: "https://flagcdn.com/w320/au.png" },
    region: "Oceania",
  },
  {
    name: { common: "Canada" },
    capital: ["Ottawa"],
    currencies: { CAD: { name: "Canadian dollar" } },
    flags: { png: "https://flagcdn.com/w320/ca.png" },
    region: "Americas",
  },
  {
    name: { common: "Egypt" },
    capital: ["Cairo"],
    currencies: { EGP: { name: "Egyptian pound" } },
    flags: { png: "https://flagcdn.com/w320/eg.png" },
    region: "Africa",
  },
  {
    name: { common: "India" },
    capital: ["New Delhi"],
    currencies: { INR: { name: "Indian rupee" } },
    flags: { png: "https://flagcdn.com/w320/in.png" },
    region: "Asia",
  },
  {
    name: { common: "Germany" },
    capital: ["Berlin"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/de.png" },
    region: "Europe",
  },
  {
    name: { common: "South Africa" },
    capital: ["Pretoria"],
    currencies: { ZAR: { name: "South African rand" } },
    flags: { png: "https://flagcdn.com/w320/za.png" },
    region: "Africa",
  },
  {
    name: { common: "Argentina" },
    capital: ["Buenos Aires"],
    currencies: { ARS: { name: "Argentine peso" } },
    flags: { png: "https://flagcdn.com/w320/ar.png" },
    region: "Americas",
  },
  {
    name: { common: "China" },
    capital: ["Beijing"],
    currencies: { CNY: { name: "Chinese yuan" } },
    flags: { png: "https://flagcdn.com/w320/cn.png" },
    region: "Asia",
  },
  {
    name: { common: "Italy" },
    capital: ["Rome"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/it.png" },
    region: "Europe",
  },
  {
    name: { common: "New Zealand" },
    capital: ["Wellington"],
    currencies: { NZD: { name: "New Zealand dollar" } },
    flags: { png: "https://flagcdn.com/w320/nz.png" },
    region: "Oceania",
  },
  {
    name: { common: "Russia" },
    capital: ["Moscow"],
    currencies: { RUB: { name: "Russian ruble" } },
    flags: { png: "https://flagcdn.com/w320/ru.png" },
    region: "Europe",
  },
  {
    name: { common: "Mexico" },
    capital: ["Mexico City"],
    currencies: { MXN: { name: "Mexican peso" } },
    flags: { png: "https://flagcdn.com/w320/mx.png" },
    region: "Americas",
  },
  {
    name: { common: "Kenya" },
    capital: ["Nairobi"],
    currencies: { KES: { name: "Kenyan shilling" } },
    flags: { png: "https://flagcdn.com/w320/ke.png" },
    region: "Africa",
  },
  {
    name: { common: "Spain" },
    capital: ["Madrid"],
    currencies: { EUR: { name: "Euro" } },
    flags: { png: "https://flagcdn.com/w320/es.png" },
    region: "Europe",
  },
  {
    name: { common: "Turkey" },
    capital: ["Ankara"],
    currencies: { TRY: { name: "Turkish lira" } },
    flags: { png: "https://flagcdn.com/w320/tr.png" },
    region: "Asia",
  },
  {
    name: { common: "United Kingdom" },
    capital: ["London"],
    currencies: { GBP: { name: "Pound sterling" } },
    flags: { png: "https://flagcdn.com/w320/gb.png" },
    region: "Europe",
  },
];

// --- DOM Elements ---
const setupSection = document.getElementById("setup-section");
const guessSection = document.getElementById("guess-section");
const challengeSection = document.getElementById("challenge-section");
const finalSection = document.getElementById("final-section");
const leaderboardDiv = document.getElementById("leaderboard");
const highScoreSpan = document.getElementById("highScore");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const playerNameInput = document.getElementById("playerName");
const startBtn = document.getElementById("startBtn");
const oddBtn = document.getElementById("oddBtn");
const evenBtn = document.getElementById("evenBtn");
const guessRoundSpan = document.getElementById("guessRound");
const guessResultDiv = document.getElementById("guessResult");
const guessStreakDiv = document.getElementById("guessStreak");
const toChallengeBtn = document.getElementById("toChallengeBtn");
const challengeInfo = document.getElementById("challengeInfo");
const continentSelectDiv = document.getElementById("continentSelectDiv");
const continentSelect = document.getElementById("continentSelect");
const continentGoBtn = document.getElementById("continentGoBtn");
const challengeTimerDiv = document.getElementById("challengeTimer");
const challengeQ = document.getElementById("challengeQ");
const challengeInputs = document.getElementById("challengeInputs");
const challengeHint = document.getElementById("challengeHint");
const submitChallengeBtn = document.getElementById("submitChallengeBtn");
const challengeResult = document.getElementById("challengeResult");
const nextChallengeBtn = document.getElementById("nextChallengeBtn");
const finalScoreDiv = document.getElementById("finalScore");
const playAgainBtn = document.getElementById("playAgainBtn");

// --- Utility ---
function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function updateLeaderboard() {
  leaderboardDiv.innerHTML = "";
  const sorted = leaderboard
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  sorted.forEach((entry, idx) => {
    leaderboardDiv.innerHTML += `<div class="leaderboard-row"><span>${
      idx + 1
    }. ${entry.name}</span><span>${entry.score}</span></div>`;
  });
  highScoreSpan.textContent = highScore;
}
function saveLeaderboard(name, score) {
  leaderboard.push({ name, score });
  leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem(
    "guessChallengeLeaderboard",
    JSON.stringify(leaderboard)
  );
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("guessChallengeHighScore", highScore);
  }
  updateLeaderboard();
}

// --- Game Logic ---
function resetGame() {
  guessRound = 1;
  guessStreak = 0;
  guessResults = [];
  challengeCountries = [];
  challengeIndex = 0;
  challengeScore = 0;
  challengeContinent = null;
  challengeCountriesPool = [];
  challengeHints = true;
  challengePoints = 2;
  challengeMaxTime = 30;
  playerNameDisplay.textContent = playerName;
  guessRoundSpan.textContent = guessRound;
  guessResultDiv.textContent = "";
  guessStreakDiv.textContent = "";
  toChallengeBtn.classList.add("hidden");
  challengeSection.classList.add("hidden");
  finalSection.classList.add("hidden");
  setupSection.classList.remove("hidden");
  guessSection.classList.add("hidden");
  updateLeaderboard();
}

function startGame() {
  playerName = playerNameInput.value.trim() || "Player";
  playerNameDisplay.textContent = playerName;
  setupSection.classList.add("hidden");
  guessSection.classList.remove("hidden");
  guessRound = 1;
  guessStreak = 0;
  guessResults = [];
  guessRoundSpan.textContent = guessRound;
  guessResultDiv.textContent = "";
  guessStreakDiv.textContent = "";
  toChallengeBtn.classList.add("hidden");
  updateLeaderboard();
}

function handleGuess(playerGuess) {
  oddBtn.disabled = true;
  evenBtn.disabled = true;
  const computerNum = Math.floor(Math.random() * 100) + 1;
  const isEven = computerNum % 2 === 0;
  const correct =
    (playerGuess === "even" && isEven) || (playerGuess === "odd" && !isEven);
  guessResults.push(correct);
  if (correct) {
    guessStreak++;
    playSound("sound-correct");
    guessResultDiv.innerHTML = `<span class="btn btn-correct px-3 py-1 rounded">Correct! Computer chose <b>${computerNum}</b> (${
      isEven ? "Even" : "Odd"
    })</span>`;
  } else {
    guessStreak = 0;
    playSound("sound-wrong");
    guessResultDiv.innerHTML = `<span class="btn btn-wrong px-3 py-1 rounded">Wrong! Computer chose <b>${computerNum}</b> (${
      isEven ? "Even" : "Odd"
    })</span>`;
  }
  guessStreakDiv.textContent = `Current Streak: ${guessStreak}`;
  setTimeout(() => {
    oddBtn.disabled = false;
    evenBtn.disabled = false;
    if (guessRound < 5) {
      guessRound++;
      guessRoundSpan.textContent = guessRound;
      guessResultDiv.textContent = "";
    } else {
      toChallengeBtn.classList.remove("hidden");
      guessResultDiv.innerHTML += `<br><span class="font-bold text-indigo-700">Proceed to the Capital & Currency Challenge!</span>`;
    }
  }, 1200);
}

function goToChallenge() {
  guessSection.classList.add("hidden");
  challengeSection.classList.remove("hidden");
  challengeCountries = [];
  challengeIndex = 0;
  challengeScore = 0;
  challengeResult.textContent = "";
  challengeHint.textContent = "";
  challengeInputs.innerHTML = "";
  challengeQ.innerHTML = "";
  challengeTimerDiv.textContent = "";
  nextChallengeBtn.classList.add("hidden");
  submitChallengeBtn.disabled = false;

  if (guessResults.length === 5 && guessResults.every(Boolean)) {
    challengeHints = true;
    challengePoints = 2;
    challengeMaxTime = 30;
    challengeInfo.innerHTML = `<span class="text-green-700 font-bold">You got a perfect streak! You get 30 seconds, hints, 2 points per answer, and can choose a continent.</span>`;
    continentSelectDiv.classList.remove("hidden");
  } else {
    challengeHints = false;
    challengePoints = 1;
    challengeMaxTime = 20;
    challengeInfo.innerHTML = `<span class="text-red-700 font-bold">No perfect streak. You get 20 seconds, no hints, 1 point per answer, and random countries.</span>`;
    continentSelectDiv.classList.add("hidden");
    challengeContinent = null;
    fetchCountriesAndStartChallenge();
  }
}

// Use countriesnow.space for capitals/currencies (no CORS issues, but limited data)
function fetchCountriesAndStartChallenge() {
  let url = "https://countriesnow.space/api/v0.1/countries/capital";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // This API returns {data: [{name, capital}], ...}
      // We'll use staticCountries for currency, flag, region
      let countries = data.data
        .map((c) => {
          let match = staticCountries.find(
            (s) => s.name.common.toLowerCase() === c.name.toLowerCase()
          );
          return match
            ? match
            : {
                name: { common: c.name },
                capital: [c.capital || "Unknown"],
                currencies: { CUR: { name: "Unknown" } },
                flags: { png: "" },
                region: "Unknown",
              };
        })
        .filter(
          (c) =>
            c.capital[0] !== "Unknown" &&
            c.currencies &&
            Object.values(c.currencies)[0].name !== "Unknown" &&
            c.flags.png
        );

      if (challengeHints && challengeContinent) {
        countries = countries.filter((c) => c.region === challengeContinent);
      }
      challengeCountriesPool = shuffle(
        countries.length ? countries : staticCountries
      );
      challengeCountries = challengeCountriesPool.slice(0, 3);
      challengeIndex = 0;
      showChallengeQ();
    })
    .catch(() => {
      // fallback to staticCountries
      let countries = staticCountries;
      if (challengeHints && challengeContinent) {
        countries = countries.filter((c) => c.region === challengeContinent);
      }
      challengeCountriesPool = shuffle(countries);
      challengeCountries = challengeCountriesPool.slice(0, 3);
      challengeIndex = 0;
      showChallengeQ();
    });
}

function showChallengeQ() {
  clearInterval(challengeTimer);
  challengeResult.textContent = "";
  challengeHint.textContent = "";
  challengeInputs.innerHTML = "";
  challengeQ.innerHTML = "";
  if (challengeIndex >= challengeCountries.length) {
    return endGame();
  }
  const country = challengeCountries[challengeIndex];
  challengeQ.innerHTML = `
        <div class="flex items-center gap-4 mb-2">
          <img src="${country.flags.png}" alt="Flag" class="w-12 h-8 border rounded shadow"/>
          <span class="font-bold text-indigo-700 text-lg">${country.name.common}</span>
        </div>
      `;
  challengeInputs.innerHTML = `
        <input id="capitalInput" type="text" placeholder="Capital" class="border p-2 rounded mb-2 w-full" autocomplete="off"/>
        <input id="currencyInput" type="text" placeholder="Currency" class="border p-2 rounded mb-2 w-full" autocomplete="off"/>
      `;
  if (challengeHints) {
    const capitalHint = country.capital[0].charAt(0);
    const currencyHint = Object.values(country.currencies)[0].name.charAt(0);
    challengeHint.innerHTML = `Hint: Capital starts with <b>${capitalHint}</b>, Currency starts with <b>${currencyHint}</b>`;
  }
  challengeTimeLeft = challengeMaxTime;
  challengeTimerDiv.textContent = `⏰ ${challengeTimeLeft}s`;
  challengeTimer = setInterval(() => {
    challengeTimeLeft--;
    challengeTimerDiv.textContent = `⏰ ${challengeTimeLeft}s`;
    if (challengeTimeLeft <= 0) {
      clearInterval(challengeTimer);
      submitChallenge(true);
    }
  }, 1000);
}

function submitChallenge(timeout = false) {
  clearInterval(challengeTimer);
  submitChallengeBtn.disabled = true;
  const country = challengeCountries[challengeIndex];
  const capitalInput = document.getElementById("capitalInput")
    ? document.getElementById("capitalInput").value.trim().toLowerCase()
    : "";
  const currencyInput = document.getElementById("currencyInput")
    ? document.getElementById("currencyInput").value.trim().toLowerCase()
    : "";
  const correctCapital = country.capital[0].toLowerCase();
  const correctCurrency = Object.values(
    country.currencies
  )[0].name.toLowerCase();
  let resultHTML = "";

  if (!timeout) {
    if (capitalInput === correctCapital) {
      challengeScore += challengePoints;
      resultHTML += `<div class="btn btn-correct px-2 py-1 rounded mb-1">Capital: Correct!</div>`;
      playSound("sound-correct");
    } else {
      resultHTML += `<div class="btn btn-wrong px-2 py-1 rounded mb-1">Capital: Wrong! Correct: <b>${country.capital[0]}</b></div>`;
      playSound("sound-wrong");
    }
    if (currencyInput === correctCurrency) {
      challengeScore += challengePoints;
      resultHTML += `<div class="btn btn-correct px-2 py-1 rounded mb-1">Currency: Correct!</div>`;
      playSound("sound-correct");
    } else {
      resultHTML += `<div class="btn btn-wrong px-2 py-1 rounded mb-1">Currency: Wrong! Correct: <b>${
        Object.values(country.currencies)[0].name
      }</b></div>`;
      playSound("sound-wrong");
    }
  } else {
    resultHTML += `<div class="btn btn-wrong px-2 py-1 rounded mb-1">Time's up!<br>Capital: <b>${
      country.capital[0]
    }</b>, Currency: <b>${Object.values(country.currencies)[0].name}</b></div>`;
    playSound("sound-wrong");
  }

  challengeResult.innerHTML = `
        ${resultHTML}
        <div class="mt-2 flex items-center gap-2">
          <img src="${
            country.flags.png
          }" alt="Flag" class="w-10 h-7 border rounded shadow"/>
          <span class="font-bold">${country.name.common}</span>
        </div>
        <div>Capital: <b>${country.capital[0]}</b> | Currency: <b>${
    Object.values(country.currencies)[0].name
  }</b></div>
      `;
  nextChallengeBtn.classList.remove("hidden");
}

function nextChallenge() {
  challengeIndex++;
  submitChallengeBtn.disabled = false;
  nextChallengeBtn.classList.add("hidden");
  showChallengeQ();
}

function endGame() {
  challengeSection.classList.add("hidden");
  finalSection.classList.remove("hidden");
  finalScoreDiv.innerHTML = `<span class="font-bold text-indigo-700">Final Score: ${challengeScore}</span>`;
  saveLeaderboard(playerName, challengeScore);
}

// --- Event Listeners ---
startBtn.onclick = () => {
  resetGame();
  startGame();
};
oddBtn.onclick = () => handleGuess("odd");
evenBtn.onclick = () => handleGuess("even");
toChallengeBtn.onclick = goToChallenge;
continentGoBtn.onclick = () => {
  challengeContinent = continentSelect.value;
  continentSelectDiv.classList.add("hidden");
  fetchCountriesAndStartChallenge();
};
submitChallengeBtn.onclick = () => submitChallenge(false);
nextChallengeBtn.onclick = nextChallenge;
playAgainBtn.onclick = () => {
  resetGame();
  startGame();
};

// --- Initial Setup ---
resetGame();

//

const htmlEditor = document.getElementById("html");
const cssEditor = document.getElementById("css");
const jsEditor = document.getElementById("js");
const iframe = document.getElementById("preview");
const errorBox = document.getElementById("error");

function updatePreview() {
  const html = htmlEditor.value;
  const css = `<style>${cssEditor.value}</style>`;
  const js = `<script>
        try {
          ${jsEditor.value}
        } catch(e) {
          parent.document.getElementById('error').style.display = "block";
          parent.document.getElementById('error').textContent = e.message;
        }
      <\/script>`;
  const fullCode = `${html}${css}${js}`;
  const previewDocument =
    iframe.contentDocument || iframe.contentWindow.document;
  try {
    previewDocument.open();
    previewDocument.write(fullCode);
    previewDocument.close();
    errorBox.style.display = "none";
  } catch (err) {
    errorBox.style.display = "block";
    errorBox.textContent = err.message;
  }
}

function saveCode() {
  localStorage.setItem("html", htmlEditor.value);
  localStorage.setItem("css", cssEditor.value);
  localStorage.setItem("js", jsEditor.value);
  alert("Code saved!");
}

function loadSavedCode() {
  htmlEditor.value = localStorage.getItem("html") || "";
  cssEditor.value = localStorage.getItem("css") || "";
  jsEditor.value = localStorage.getItem("js") || "";
}

function resetCode() {
  if (confirm("Are you sure you want to reset all code?")) {
    htmlEditor.value = "";
    cssEditor.value = "";
    jsEditor.value = "";
    updatePreview();
  }
}

function toggleFullscreen() {
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.mozRequestFullScreen) {
    iframe.mozRequestFullScreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  }
}

function downloadCode() {
  const zip = new JSZip();
  zip.file("index.html", htmlEditor.value);
  zip.file("style.css", cssEditor.value);
  zip.file("script.js", jsEditor.value);
  zip.generateAsync({ type: "blob" }).then(function (content) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "code.zip";
    link.click();
  });
}

function loadTemplate(template) {
  if (template === "hello") {
    htmlEditor.value = "<h1>Hello, World!</h1>";
    cssEditor.value =
      "body { font-family: sans-serif; text-align: center; padding-top: 20px; }";
    jsEditor.value = "console.log('Hello World loaded');";
  } else if (template === "grid") {
    htmlEditor.value =
      "<div class='grid'>\n  <div>1</div><div>2</div><div>3</div>\n</div>";
    cssEditor.value =
      ".grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; } .grid div { background: #444; color: white; padding: 20px; text-align: center; }";
    jsEditor.value = "";
  }
  updatePreview();
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
}

[htmlEditor, cssEditor, jsEditor].forEach((editor) => {
  editor.addEventListener("input", () => {
    updatePreview();
    saveAutosave();
  });
});

function saveAutosave() {
  localStorage.setItem("auto_html", htmlEditor.value);
  localStorage.setItem("auto_css", cssEditor.value);
  localStorage.setItem("auto_js", jsEditor.value);
}

function loadAutosave() {
  htmlEditor.value = localStorage.getItem("auto_html") || "";
  cssEditor.value = localStorage.getItem("auto_css") || "";
  jsEditor.value = localStorage.getItem("auto_js") || "";
}

// Load autosave first, then saved code if autosave is empty
loadAutosave();
if (!htmlEditor.value && !cssEditor.value && !jsEditor.value) {
  loadSavedCode();
}
updatePreview();
