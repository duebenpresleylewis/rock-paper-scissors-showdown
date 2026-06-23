const form = document.getElementById("form-sub");
const button = document.getElementById("submit-btn");

form.addEventListener("submit", sendMail);


function sendMail(event) {

    event.preventDefault();

    button.disabled = true;
    button.textContent = "Sending...";


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

        alert("✅ Message sent successfully!");

        form.reset();

        button.disabled = false;

        button.textContent = "Send Message";

    })


    .catch(error => {

        console.error(error);

        alert("❌ Failed to send message");

        button.disabled = false;

        button.textContent = "Send Message";

    });

}