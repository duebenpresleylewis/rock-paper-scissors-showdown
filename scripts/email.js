const form = document.getElementById("form-sub");
const button = document.getElementById("submit-btn");

form.addEventListener("submit", sendMail);


function sendMail(event) {

    event.preventDefault();

    button.disabled = true;
    showToast("📨 Sending message...");


    const params = {

        name: document.getElementById("user-name").value,

        email: document.getElementById("user-email").value,

        message: document.getElementById("user-message").value

    };


    emailjs.send(

        "service_a3mk3x8",

        "template_wod9dgx",

        params

    )

    .then(() => {

        showToast("✅ Message sent successfully!");



        form.reset();
        const textarea = document.getElementById("user-message");
        textarea.style.height = "auto";

        button.disabled = false;

    })


    .catch(error => {

        console.error(error);

        showToast("❌ Failed to send message");

        button.disabled = false;

    });

}


function showToast(message){

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    },3000);

}