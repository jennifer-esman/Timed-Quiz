var initials = document.getElementById('initials');

var saveScore = document.getElementById('saveScore');

var finalScore = document.getElementById('finalScore');
var mostRecentScores = localStorage.getItem('mostRecentScores');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var removeUserScore = document.getElementById('removeScore');

var maxHighScores = 5;
console.log(highScores);

finalScore.innerText = mostRecentScores;

initials.addEventListener('keyup', () =>{
    saveScore.disabled = !initials.value;
});

removeUserScore = (e) => {

    localStorage.clear('highScores',JSON.stringify(highScores));
}

saveUserScore = (e) => {
    e.preventDefault();

    var score = {
        score: mostRecentScores,
        name: initials.value
    };
    highScores.push(score);

    highScores.sort((a,b) =>  b.score - a.score);

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    console.log(highScores);
};