/*making ranking of high scores and creating a list of top 5*/
var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map( score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("")
