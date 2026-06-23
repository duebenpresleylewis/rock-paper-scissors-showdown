import { showToast } from '../scripts/toast.js';
let score = JSON.parse(localStorage.getItem('score'));

// First time playing the game, score will be null, so we need to initialize it
if(score === null) {
    score = {
        playerWins: 0,
        playerLosses: 0,
        playerTies: 0
    }
}

updateScoreElement();


function getComputerMove() {
    const randomNumber = Math.random();
    let computerChoice = '';

    if(randomNumber > 0 && randomNumber < 1 / 3) {
        computerChoice = 'rock';
    } else if(randomNumber > 1 / 3 && randomNumber < 2 / 3) {
        computerChoice = 'paper';
    } else {
        computerChoice = 'scissors';
    }

    return computerChoice;
}

function playGame(playerMove) {
    const computerMove = getComputerMove();
    console.log(computerMove);

    let result = '';

    if(playerMove === computerMove) {
        result = 'Tie!!';
    } else if(
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'You Win!!';
    } else {
        result = 'Computer Wins!!';
    }

    // Update the score
    if(result === 'You Win!!') {
        score.playerWins++;
        fireConfetti();   // confetti will be fired
    } else if(result === 'Computer Wins!!') {
        score.playerLosses++;
    } else {
        score.playerTies++;
    }


    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result-display').innerHTML = result;

    // document.querySelector('.moves').innerHTML = 'You Chose: ' + playerMove + '<br>Computer Chose: ' + computerMove;
    document.querySelector('.moves').innerHTML =
    `<div class="display-container">
        <div class="move">
            <span>👨🏻</span>
            <span>${playerMove}</span>
        </div>
        <div class="move">
            <span>🤖</span>
            <span>${computerMove}</span>
        </div>
    </div>
    `;

    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.playerWins}, Losses: ${score.playerLosses}, Ties: ${score.playerTies}`;
}

function resetScore() {
    score.playerWins = 0;
    score.playerLosses = 0;
    score.playerTies = 0;

    localStorage.removeItem('score');

    document.querySelector('.js-result-display').innerHTML = "";
    document.querySelector('.moves').innerHTML ="";
    
    updateScoreElement();   
    

}

function fireConfetti() {
    confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
}

// Expose functions used by inline handlers in HTML (buttons use onclick="playGame(...)" and onclick="resetScore()")
// Modules don't put functions on `window` by default, so assign them explicitly.
window.playGame = playGame;
window.resetScore = resetScore;


const resetBtn = document.querySelector('.reset-button');

resetBtn.addEventListener('click', () => {
    showToast("Score Reset", "success", 3000);
});