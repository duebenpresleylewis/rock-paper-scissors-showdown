import {linkToHome} from './utility/home.js';

linkToHome();

const textarea = document.getElementById("user-message");

textarea.addEventListener("input", () => {
    textarea.style.height = "auto";               // Reset height
    textarea.style.height = textarea.scrollHeight + "px"; // Set new height
});