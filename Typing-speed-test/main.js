// add array of words
const words = [
    "cloth",
    "business",
    "mint",
    "white",
    "plan",
    "wriggle",
    "exciting",
    "selective",
    "wave",
    "damp",
    "lying",
    "instinctive",
    "teenytiny",
    "lumpy",
    "representative",
    "empty",
    "vest",
    "guard",
    "launch",
    "fit",
    "irate",
    "peck",
    "wait",
    "identify",
    "stiff",
    "sparkle",
    "rule",
    "hesitant",
    "knock",
    "illegal",
    "passenger",
    "acrid",
    "incredible",
    "women",
    "protect",
    "ambiguous",
    "zephyr",
    "adjustment",
    "verse",
    "release",
    "tame",
    "eggs",
    "frail",
    "multiply",
    "avoid",
    "marked"
];

// Settings levels
const lvls = {
    "Easy": 6,
    "Normal": 4,
    "Hard": 3
};

// Default level
let easy = document.querySelector(".select .easy");
let normal = document.querySelector(".select .normal");
let hard = document.querySelector(".select .hard");


let defaultLevel = "Normal";
let defaultLevelSeconds = lvls[defaultLevel];


// Selectors
let startBtn = document.querySelector(".start");
let lvlName = document.querySelector(".message .lvl");
let lvlSeconds = document.querySelector(".message .seconds");
let word = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let lvlTime = document.querySelector(".time span");
let lvlScoreGot = document.querySelector(".score .got");
let lvlTotalScore = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");


// Setting LVL Name, Score, Time
lvlName.innerHTML = defaultLevel;
lvlSeconds.innerHTML = defaultLevelSeconds;
lvlTime.innerHTML = defaultLevelSeconds;
lvlTotalScore.innerHTML = words.length;

// Disable paste event
input.onpaste = function() {
    return false;
}

// Start Game
startBtn.onclick = function() {
    this.remove()
    input.focus();
    generateWord();
}


// Generate word
function generateWord() {
    // Get random words
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get word index
    let wordIndex = words.indexOf(randomWord);
    // Remove word from array
    words.splice(wordIndex, 1);
    // Show the word
    word.innerHTML = randomWord;
    // Empty up coming words
    upcomingWords.innerHTML = "";
    // Generate words
    for(let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // Start play function
    startPlay()
}

function startPlay() {
    lvlTime.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        lvlTime.innerHTML--;
        if(lvlTime.innerHTML === "0") {
            clearInterval(start);

            if(word.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()) {
                input.value = "";
                lvlScoreGot.innerHTML++;
                if(words.length > 0) {
                    generateWord();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanTxt = document.createTextNode("Awesome");
                    span.appendChild(spanTxt);
                    finishMessage.appendChild(span);
                }
            } else {
                let span = document.createElement("span");
                span.className = "bad";
                let spanTxt = document.createTextNode("Game Over");
                span.appendChild(spanTxt);
                finishMessage.appendChild(span);
            }
        }
    },1000)
}