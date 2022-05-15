/*global variables*/
var initials = document.getElementById('initials');

var saveScore = document.getElementById('saveScore');

var finalScore = document.getElementById('finalScore');
var mostRecentScores = localStorage.getItem('mostRecentScores');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var removeUserScore = document.getElementById('removeScore');

var maxHighScores = 5;
console.log(highScores);
/*populating the score and saving your score and initials*/
finalScore.innerText = mostRecentScores;

initials.addEventListener('keyup', () =>{
    saveScore.disabled = !initials.value;
});
/*removing scores from storage*/
removeUserScore = (e) => {

    localStorage.clear('highScores',JSON.stringify(highScores));
}
/*adding scores to storage, only the top 5 can be saved*/
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