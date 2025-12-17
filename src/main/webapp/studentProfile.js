import { LOGGED_IN_STUDENT } from "./script.js";

const student = JSON.parse(localStorage.getItem(LOGGED_IN_STUDENT));

if (!student) {
    window.location.href = "student_login.html";
}

const studentDetailsDiv = document.getElementById("studentDetails");
const historyTable = document.getElementById("outpassHistory");

// Populate student details
studentDetailsDiv.innerHTML = `
    <p><strong>Name:</strong> ${student.name}</p>
    <p><strong>Register Number:</strong> ${student.registeredNumber}</p>
    <p><strong>Email:</strong> ${student.email}</p>
`;

// Fetch outpass history from backend
fetch(`studentOutpassHistory?regNo=${student.registeredNumber}`)
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            historyTable.innerHTML = `<tr><td colspan="4">No records found</td></tr>`;
            return;
        }

        data.forEach(o => {
            historyTable.innerHTML += `
                <tr>
                    <td>${o.reason}</td>
                    <td>${o.fromDate}</td>
                    <td>${o.toDate}</td>
                    <td>${o.status}</td>
                </tr>
            `;
        });
    });
