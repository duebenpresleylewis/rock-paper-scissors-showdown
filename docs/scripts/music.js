window.addEventListener('DOMContentLoaded', () => {

    const bgMusic = document.getElementById('bg-music');
    const clickSound = document.getElementById('click-sound');
    const musicBtn = document.getElementById('music-btn');
    const tieSound = document.getElementById('tie-sound');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const comboSound = document.getElementById('combo-sound');
    
    winSound.volume = 0.7;
    loseSound.volume = 0.7;
    tieSound.volume = 0.7;

    if (bgMusic) bgMusic.volume = 0.1;
    
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!bgMusic) return;
            if(bgMusic.paused){
                bgMusic.play();
                musicBtn.textContent = '🔊';
            } else {
                bgMusic.pause();
                musicBtn.textContent = '🔇';
            }
        });
    }

    // buttons sound
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', () => {
            if (!clickSound) return;
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });

    // Play result sounds when the game dispatches a `gameResult` event
    function playResultSound(res) {
        if (!res) return;
        if (res === 'You Win!!') {
            if (winSound) {
                winSound.currentTime = 0;
                winSound.play();
            }
        } else if (res === 'Computer Wins!!') {
            if(loseSound) {

                loseSound.currentTime = 0;
                loseSound.play();
            }
        } else if (res === 'Tie!!') {
            if(tieSound) {

                tieSound.currentTime = 0;
                tieSound.play();
            }
        }
    }

    window.addEventListener('gameResult', (e) => {
        playResultSound(e.detail);
    });

    // play combo sound when script dispatches 'combo'
    window.addEventListener('combo', () => {
        if (comboSound) {
            comboSound.currentTime = 0;
            winSound.volume = 0.2;
            comboSound.play();
            winSound.volume = 0.8;

            const combo = document.getElementById('combo-popup');
            combo.textContent = 'LEGENDARY! 👑';
            combo.classList.add('combo-toast');

              setTimeout(() => {
                combo.classList.add('hide');
            }, 3000);
        }
    });

});