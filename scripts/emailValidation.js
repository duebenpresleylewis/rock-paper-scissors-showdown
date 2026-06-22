const emailInput = document.getElementById('user-email');
let typingTimer;
const doneTypingInterval = 800; // 800 ms , time to wait in milliseconds

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', () => {
    emailInput.classList.remove('invalid');
    
    clearTimeout(typingTimer);
    
    // start the countdown again
    // giving the user a buffer of 800ms to type, if he does not type, then the function will run, otherwise if he starts typing within the buffer then the eventListener will kill the timer and start a fresh timer
    typingTimer = setTimeout(validateEmail, doneTypingInterval);
});

function validateEmail() {
    const currentInputValue = emailInput.value;
    if(currentInputValue == '') {
        emailInput.classList.add('invalid');
        return;
    }

    if(!emailRegex.test(currentInputValue)) {
        emailInput.classList.add('invalid');
    }
    else {
        emailInput.classList.remove('invalid');
        
    }
}
