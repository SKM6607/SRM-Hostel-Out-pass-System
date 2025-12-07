import {LOGGED_IN_STUDENT, Message, STATUS} from "./script.js";
import {InputVerifier} from "./InputVerifier.js";
const showMessage=Message.showMessage;
function loginStudent(email, password) {
    showMessage("Logging in, please wait...", STATUS.INFO);
    fetch("login", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
        .then((res) => res.text())
        .then((data) => {
            if (data.startsWith("success")) {
                const parts = data.split("|");
                const student = {
                    name: parts[1],
                    registeredNumber: parts[2],
                    email,
                };
                localStorage.setItem(LOGGED_IN_STUDENT, JSON.stringify(student));
                showMessage("Login successful. Redirecting to dashboard...", STATUS.SUCCESS);
                setTimeout(() => (window.location.href = "student_dashboard.html"), 1500);
            } else {
                showMessage("Invalid credentials. Please check your email or password.", STATUS.ERROR);
            }
        })
        .catch(() => showMessage("Unable to reach the server. Please try again.", STATUS.ERROR));
}
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const result=InputVerifier.verifyLogin('email','password',showMessage,STATUS.ERROR);
    if(result instanceof Array) loginStudent(...result);
});