/**
 * data/quizData.js
 *
 * Custom quiz questions that are NOT from the Open Trivia Database API.
 * ─ Cameroon History questions (50 unique)
 * ─ Riddles (20 unique)
 *
 * The quiz component fetches other categories from the API and mixes
 * these in. To add questions, just push a new object to the arrays below.
 */

export const cameroonHistoryQuestions = [
  {
    question: "When did Cameroon gain independence from France?",
    correct_answer: "1960",
    incorrect_answers: ["1958", "1961", "1962"],
  },
  {
    question: "What is the capital city of Cameroon?",
    correct_answer: "Yaoundé",
    incorrect_answers: ["Douala", "Bamenda", "Garoua"],
  },
  {
    question: "Who was the first President of Cameroon?",
    correct_answer: "Ahmadou Ahidjo",
    incorrect_answers: ["Paul Biya", "John Fru Ndi", "Manu Dibango"],
  },
  {
    question:
      "Which river forms part of the border between Cameroon and Nigeria?",
    correct_answer: "Cross River",
    incorrect_answers: ["Sanaga River", "Benue River", "Logone River"],
  },
  {
    question: "Which year did Cameroon join the United Nations?",
    correct_answer: "1960",
    incorrect_answers: ["1955", "1961", "1972"],
  },
  {
    question: "Which is the largest city in Cameroon?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bafoussam", "Bamenda"],
  },
  {
    question: "What are the official languages of Cameroon?",
    correct_answer: "French and English",
    incorrect_answers: ["French only", "English only", "Pidgin"],
  },
  {
    question: "Which mountain is the highest in Cameroon?",
    correct_answer: "Mount Cameroon",
    incorrect_answers: ["Mount Fako", "Mount Manengouba", "Mount Oku"],
  },
  {
    question: "Who is the current President of Cameroon (as of 2024)?",
    correct_answer: "Paul Biya",
    incorrect_answers: ["Ahmadou Ahidjo", "John Fru Ndi", "Samuel Eto'o"],
  },
  {
    question: "Which ocean borders Cameroon to the southwest?",
    correct_answer: "Atlantic Ocean",
    incorrect_answers: ["Indian Ocean", "Pacific Ocean", "Mediterranean Sea"],
  },
  {
    question: "Which country colonized Cameroon after World War I?",
    correct_answer: "France and Britain",
    incorrect_answers: ["Germany", "Belgium", "Portugal"],
  },
  {
    question: "What is the currency of Cameroon?",
    correct_answer: "Central African CFA franc",
    incorrect_answers: ["West African CFA franc", "Naira", "Dollar"],
  },
  {
    question:
      "Which Cameroonian footballer is known as 'The Indomitable Lion'?",
    correct_answer: "Roger Milla",
    incorrect_answers: ["Samuel Eto'o", "Rigobert Song", "Patrick Mboma"],
  },
  {
    question: "Which region is famous for the Bamileke people?",
    correct_answer: "West Region",
    incorrect_answers: ["North Region", "Southwest Region", "Littoral Region"],
  },
  {
    question:
      "Which Cameroonian city is known for its port and economic activities?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Buea", "Ngaoundéré"],
  },
  {
    question:
      "Which year did Cameroon host the African Cup of Nations for the first time?",
    correct_answer: "1972",
    incorrect_answers: ["1984", "2000", "2019"],
  },
  {
    question:
      "Which Cameroonian lake is known for a deadly gas eruption in 1986?",
    correct_answer: "Lake Nyos",
    incorrect_answers: ["Lake Chad", "Lake Barombi Mbo", "Lake Oku"],
  },
  {
    question: "Which is the oldest university in Cameroon?",
    correct_answer: "University of Yaoundé",
    incorrect_answers: [
      "University of Douala",
      "University of Buea",
      "University of Bamenda",
    ],
  },
  {
    question: "What is the nickname of Cameroon's national football team?",
    correct_answer: "The Indomitable Lions",
    incorrect_answers: ["The Super Eagles", "The Black Stars", "The Elephants"],
  },
  {
    question:
      "Which Cameroonian city is known as the 'Town of Legendary Hospitality'?",
    correct_answer: "Buea",
    incorrect_answers: ["Bamenda", "Garoua", "Maroua"],
  },
  {
    question: "Which Cameroonian city is called the 'Economic Capital'?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bafoussam", "Bamenda"],
  },
  {
    question:
      "Which country did Cameroon defeat to win their first AFCON title?",
    correct_answer: "Nigeria",
    incorrect_answers: ["Egypt", "Ghana", "Ivory Coast"],
  },
  {
    question: "Which Cameroonian is a famous jazz saxophonist?",
    correct_answer: "Manu Dibango",
    incorrect_answers: ["Richard Bona", "Francis Bebey", "Charlotte Dipanda"],
  },
  {
    question: "Which region is Limbe located in?",
    correct_answer: "Southwest Region",
    incorrect_answers: ["Northwest Region", "Littoral Region", "West Region"],
  },
  {
    question: "Which Cameroonian city is known for the 'Ngondo' festival?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bamenda", "Buea"],
  },
  {
    question:
      "Which Cameroonian footballer won the Olympic gold medal in 2000?",
    correct_answer: "Samuel Eto'o",
    incorrect_answers: ["Roger Milla", "Rigobert Song", "Patrick Mboma"],
  },
  {
    question: "Which is the largest region in Cameroon by area?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    question: "Which Cameroonian city is famous for tea plantations?",
    correct_answer: "Tiko",
    incorrect_answers: ["Buea", "Bamenda", "Garoua"],
  },
  {
    question: "Which Cameroonian river is the longest?",
    correct_answer: "Sanaga River",
    incorrect_answers: ["Wouri River", "Benue River", "Cross River"],
  },
  {
    question:
      "Which Cameroonian city is known for the 'FENAC' cultural festival?",
    correct_answer: "Yaoundé",
    incorrect_answers: ["Douala", "Bamenda", "Buea"],
  },
  {
    question: "Which Cameroonian region is known for the Mandara Mountains?",
    correct_answer: "Far North Region",
    incorrect_answers: ["North Region", "West Region", "East Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the North Region?",
    correct_answer: "Garoua",
    incorrect_answers: ["Ngaoundéré", "Maroua", "Bamenda"],
  },
  {
    question: "Which Cameroonian city is the capital of the Adamawa Region?",
    correct_answer: "Ngaoundéré",
    incorrect_answers: ["Garoua", "Bamenda", "Buea"],
  },
  {
    question: "Which Cameroonian region is famous for the Tikar people?",
    correct_answer: "Adamawa Region",
    incorrect_answers: ["West Region", "North Region", "Southwest Region"],
  },
  {
    question:
      "Which Cameroonian city is known for the 'Mount Cameroon Race of Hope'?",
    correct_answer: "Buea",
    incorrect_answers: ["Bamenda", "Yaoundé", "Douala"],
  },
  {
    question: "Which Cameroonian region is the least populated?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the Northwest Region?",
    correct_answer: "Bamenda",
    incorrect_answers: ["Buea", "Yaoundé", "Douala"],
  },
  {
    question: "Which Cameroonian region is known for the Bakossi people?",
    correct_answer: "Southwest Region",
    incorrect_answers: ["Northwest Region", "West Region", "Littoral Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the West Region?",
    correct_answer: "Bafoussam",
    incorrect_answers: ["Bamenda", "Buea", "Douala"],
  },
  {
    question: "Which Cameroonian city is the capital of the South Region?",
    correct_answer: "Ebolowa",
    incorrect_answers: ["Buea", "Bamenda", "Garoua"],
  },
  {
    question: "Which Cameroonian region is known for the Beti people?",
    correct_answer: "Central Region",
    incorrect_answers: ["West Region", "North Region", "East Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the Central Region?",
    correct_answer: "Yaoundé",
    incorrect_answers: ["Douala", "Bafoussam", "Bamenda"],
  },
  {
    question: "Which Cameroonian region is known for the Baka pygmies?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the Far North Region?",
    correct_answer: "Maroua",
    incorrect_answers: ["Garoua", "Ngaoundéré", "Bamenda"],
  },
  {
    question: "Which Cameroonian region is known for the Fulani people?",
    correct_answer: "Adamawa Region",
    incorrect_answers: ["West Region", "North Region", "Southwest Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the Littoral Region?",
    correct_answer: "Douala",
    incorrect_answers: ["Yaoundé", "Bafoussam", "Bamenda"],
  },
  {
    question: "Which Cameroonian region is known for the Bamoun people?",
    correct_answer: "West Region",
    incorrect_answers: ["North Region", "Southwest Region", "Littoral Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the Southwest Region?",
    correct_answer: "Buea",
    incorrect_answers: ["Bamenda", "Yaoundé", "Douala"],
  },
  {
    question: "Which Cameroonian region is known for the Maka people?",
    correct_answer: "East Region",
    incorrect_answers: ["North Region", "West Region", "Littoral Region"],
  },
  {
    question: "Which Cameroonian city is the capital of the East Region?",
    correct_answer: "Bertoua",
    incorrect_answers: ["Buea", "Bamenda", "Garoua"],
  },
].map((q) => ({ ...q, categoryName: "Cameroon History" }));

export const riddlesQuestions = [
  {
    question: "What has keys but can't open locks?",
    correct_answer: "A piano",
    incorrect_answers: ["A map", "A lock", "A door"],
  },
  {
    question: "What gets wetter as it dries?",
    correct_answer: "A towel",
    incorrect_answers: ["A sponge", "A river", "A soap"],
  },
  {
    question: "What has a head and a tail but no body?",
    correct_answer: "A coin",
    incorrect_answers: ["A snake", "A comet", "A worm"],
  },
  {
    question: "What belongs to you but others use it more than you do?",
    correct_answer: "Your name",
    incorrect_answers: ["Your phone", "Your car", "Your house"],
  },
  {
    question: "What can travel around the world while staying in a corner?",
    correct_answer: "A stamp",
    incorrect_answers: ["A coin", "A shadow", "A clock"],
  },
  {
    question: "What has one eye but cannot see?",
    correct_answer: "A needle",
    incorrect_answers: ["A storm", "A hurricane", "A potato"],
  },
  {
    question: "What has many teeth but cannot bite?",
    correct_answer: "A comb",
    incorrect_answers: ["A saw", "A zipper", "A rake"],
  },
  {
    question: "What is always in front of you but can't be seen?",
    correct_answer: "The future",
    incorrect_answers: ["The air", "Your nose", "The wind"],
  },
  {
    question: "What goes up but never comes down?",
    correct_answer: "Your age",
    incorrect_answers: ["A balloon", "A rocket", "A mountain"],
  },
  {
    question: "What has hands but can't clap?",
    correct_answer: "A clock",
    incorrect_answers: ["A monkey", "A statue", "A robot"],
  },
  {
    question: "What can you catch but not throw?",
    correct_answer: "A cold",
    incorrect_answers: ["A ball", "A fish", "A butterfly"],
  },
  {
    question: "What kind of band never plays music?",
    correct_answer: "A rubber band",
    incorrect_answers: ["A jazz band", "A rock band", "A marching band"],
  },
  {
    question: "What has a neck but no head?",
    correct_answer: "A bottle",
    incorrect_answers: ["A guitar", "A shirt", "A vase"],
  },
  {
    question: "What has a thumb and four fingers but is not alive?",
    correct_answer: "A glove",
    incorrect_answers: ["A hand", "A sock", "A mitten"],
  },
  {
    question: "What has a heart that doesn't beat?",
    correct_answer: "An artichoke",
    incorrect_answers: ["A stone", "A robot", "A tree"],
  },
  {
    question:
      "What comes once in a minute, twice in a moment, but never in a thousand years?",
    correct_answer: "The letter M",
    incorrect_answers: ["The letter N", "The letter E", "The letter T"],
  },
  {
    question:
      "What has cities, but no houses; forests, but no trees; and water, but no fish?",
    correct_answer: "A map",
    incorrect_answers: ["A globe", "A book", "A painting"],
  },
  {
    question: "What is full of holes but still holds water?",
    correct_answer: "A sponge",
    incorrect_answers: ["A net", "A bucket", "A pipe"],
  },
  {
    question: "What question can you never answer yes to?",
    correct_answer: "Are you asleep?",
    incorrect_answers: ["Are you hungry?", "Are you awake?", "Are you ready?"],
  },
  {
    question: "What type of house weighs the least?",
    correct_answer: "A lighthouse",
    incorrect_answers: ["A bungalow", "A treehouse", "A houseboat"],
  },
].map((q) => ({ ...q, categoryName: "Riddles" }));

// API categories for Open Trivia Database
// See https://opentdb.com/api_category.php for the full list
export const apiCategories = [
  { name: "Science: Computers", id: 18 },
  { name: "General Knowledge", id: 9 },
  { name: "World History", id: 23 },
  { name: "Politics", id: 24 },
  { name: "Science: Gadgets", id: 30 },
  { name: "Sports", id: 21 },
];

export const TOTAL_QUESTIONS = 20;
export const DIFFICULTY = "easy";
