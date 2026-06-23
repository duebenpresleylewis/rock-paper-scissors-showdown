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

// Navigation toggle for small screens — dynamically create/remove nav to avoid layout overflow
const navToggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.header-container');
let detachedNav = null;

function isMobile() {
    return window.matchMedia('(max-width:729px)').matches;
}

function attachNav() {
    if (!detachedNav) return null;
    header.appendChild(detachedNav);
    const navEl = document.getElementById('primary-navigation');
    setupNavLinks(navEl);
    return navEl;
}

function detachNav() {
    const navEl = document.getElementById('primary-navigation');
    if (!navEl) return;
    detachedNav = navEl.parentNode.removeChild(navEl);
}

function setupNavLinks(navEl) {
    if (!navEl) return;
    navEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) {
                // close and remove from DOM on mobile after navigation
                navToggle.setAttribute('aria-expanded', 'false');
                if (navEl.classList.contains('open')) navEl.classList.remove('open');
                // remove after a tiny delay so click completes
                setTimeout(() => {
                    if (document.getElementById('primary-navigation')) detachNav();
                }, 150);
            }
        });
    });
}

// Initialize: if on mobile, remove nav from DOM to avoid occupying space
if (navToggle) {
    // store existing nav if present
    const existing = document.getElementById('primary-navigation');
    if (existing && isMobile()) {
        detachedNav = existing.parentNode.removeChild(existing);
    }

    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        if (!expanded) {
            // opening: attach nav and show
            const navEl = document.getElementById('primary-navigation') || attachNav();
            if (navEl) {
                navEl.classList.add('open');
            }
            navToggle.setAttribute('aria-expanded', 'true');
        } else {
            // closing: hide then remove
            const navEl = document.getElementById('primary-navigation');
            if (navEl) {
                navEl.classList.remove('open');
                // remove from DOM after transition
                setTimeout(() => {
                    if (document.getElementById('primary-navigation')) detachNav();
                }, 250);
            }
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close on Escape key when open (and remove)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navEl = document.getElementById('primary-navigation');
            if (navEl && navEl.classList.contains('open')) {
                navEl.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                setTimeout(() => {
                    if (document.getElementById('primary-navigation')) detachNav();
                }, 250);
                navToggle.focus();
            }
        }
    });

    // Handle viewport changes: re-attach nav on desktop, detach on mobile when closed
    let lastMobile = isMobile();
    window.addEventListener('resize', () => {
        const nowMobile = isMobile();
        if (nowMobile === lastMobile) return;
        lastMobile = nowMobile;
        if (!nowMobile) {
            // switched to desktop: ensure nav is present
            if (!document.getElementById('primary-navigation') && detachedNav) {
                header.appendChild(detachedNav);
                detachedNav = null;
            }
            // ensure toggle aria state reset
            navToggle.setAttribute('aria-expanded', 'false');
        } else {
            // switched to mobile: remove nav if it's present and not open
            const navEl = document.getElementById('primary-navigation');
            if (navEl && !navEl.classList.contains('open')) {
                detachedNav = navEl.parentNode.removeChild(navEl);
            }
        }
    });

    // If we attached nav at load (desktop), set up link handlers
    if (!isMobile()) {
        const navEl = document.getElementById('primary-navigation');
        if (navEl) setupNavLinks(navEl);
    }
}