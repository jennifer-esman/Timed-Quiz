var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-answer"));
var questionCount = document.getElementById('question-count');
var scoreCount = document.getElementById('score-count');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What HTML element allows us to add our css styling?",
        choice1: "<header>",
        choice2: "<body>",
        choice3: "<style>",
        choice4: "<link>",
        answer: 4,
    },
    {
        question: "What is the correct syntax for referring to an external style sheet called 'xxx.css'?",
        choice1: "<link href='xxx.css'>",
        choice2: "<link name='xxx.css'>",
        choice3: "<link src='xxx.css>'",
        choice4: "<link file='xxx.js>'",
        answer: 3,
    },
    {
        question: "How do you write 'Hi There' in an alert box?",
        choice1: "msgBox('Hi There');",
        choice2: "alertBox('Hi There');",
        choice3: "msg('Hi There');",
        choice4: "alert('Hi There');",
        answer: 4,   
    },
    {
        question: "What does the setInterval method do?",
        choice1: "Calls a function at specified intervals (in milliseconds).",
        choice2: "Creates an alert.",
        choice3: "Makes an event listener.",
        choice4: "Gets and element from the HTML id.",
        answer: 1,   
    },
];

const Correct_Bonus = 10;
const Wrong_penalty_time = 3;
const Max_Questions = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= Max_Questions){
        localStorage.setItem('mostRecentScores', score);
        return window.location.assign("./finished-quiz.html");
    }
    
    questionCounter++;
    questionCount.innerText = questionCounter

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];    
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    var classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer) {
        classToApply = 'correct';
        }

    if (classToApply === 'correct') {
        incrementScore(Correct_Bonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
    });
});

incrementScore = num => {
    score +=num;
    scoreCount.innerText = score;
}

DecrementTime = Wrong_penalty_time => {
    totalTime -= Wrong_penalty_time;
    quizTime.innerHTML = totalTime;
}

var quizTime = document.getElementById("quiz-time-left") 
var totalTime = 60;

function CheckTime() {
    var timerCountdown = setInterval(function() {
        totalTime--;
        totalTime.textContent = totalTime
        quizTime.innerHTML = ' Time Left: ' + totalTime;
        choices.forEach( choice => {
            choice.addEventListener('click', e =>{
                const selectedChoice = e.target;
                const selectedAnswer = selectedChoice.dataset['number'];
            
                var classToApply = 'incorrect';
                    if(selectedAnswer == currentQuestion.answer) {
                    classToApply = 'correct';
                    }
            
                if (classToApply === 'incorrect') {
                    DecrementTime(Wrong_penalty_time);
                }    
            })
        })
        if(totalTime <= 0){
            setTimeout(window.location.assign("./finished-quiz.html"));
            clearInterval(timerCountdown);
        }
    
    }, 1000)
    
}

startGame();

setInterval(CheckTime(), 1000);