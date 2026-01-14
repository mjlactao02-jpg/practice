function signup (){
    let email = document.getElementById("sign_email").value;
    let password = document.getElementById("sign_password").value;
    let comfirmpassword = document.getElementById("sign_passwordcomfirm").value;
    if(email ===""||password === ""||comfirmpassword===""){
        document.getElementById("ShowArea").textContent = "All fields are required!";
    }else if(!email.includes("@") || !email.includes(".")){
        document.getElementById("ShowArea").textContent = "Please enter a valid email address!";
    }else if(password === comfirmpassword ){
        alert("✔️Sign-Successful");
        window.location.href="login.html";

    }else{
        document.getElementById("ShowArea").textContent = "Password don't match!";
    }
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);
}
    
function login () {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");

    let signemail = document.getElementById("email").value;
    let signpassword = document.getElementById("password").value;

    if (signemail === email && signpassword === password) {
        window.location.href = "attendance.html";
    } else {
        document.getElementById("ShowArea").textContent = "Wrong email or password!";
    }
}
function loginadmin (){
    let email = "admin@school.com";
    let password = "user123";

    let adminemail = document.getElementById("admin_email").value;
    let adminpassword = document.getElementById("admin_password").value;

    if(adminemail ===""||adminpassword === ""){
        document.getElementById("ShowArea").textContent = "All fields are required!";
    }else if(!adminemail.includes("@") || !adminemail.includes(".")){
        document.getElementById("ShowArea").textContent = "Please enter a valid email address!";
    }else if(adminemail === email && adminpassword === password){
        window.location.href="admin.html";
    }else{
        document.getElementById("ShowArea").textContent = "Wrong email or password!";
    }
}
function markAttendance() {
    const email   = document.getElementById("studentemail").value.trim();
    const id      = document.getElementById("studentid").value.trim();
    const first   = document.getElementById("studentfirst").value.trim();
    const middle    = document.getElementById("studentmiddle").value.trim();
    const last  = document.getElementById("studentlast").value.trim();
    const status  = document.getElementById("studentstatus").value;
    const showArea = document.getElementById("ShowArea");

    if (!email || !id || !first || !last || !middle || !status) {
        showArea.textContent = "All fields are required!";
        showArea.style.color = "red";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        showArea.textContent = "Please enter a valid email address!";
        showArea.style.color = "red";
        return;
    }

    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    attendance.push({
        email,
        id,
        first,
        middle,
        last,
        status,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    showArea.textContent = "Attendance marked successfully!";
    showArea.style.color = "green";

    document.getElementById("studentemail").value = "";
    document.getElementById("studentID").value = "";
    document.getElementById("studentfirst").value = "";
    document.getElementById("studentmiddle").value = "";
    document.getElementById("studentlast").value = "";
    document.getElementById("studentstatus").value = "";
    displayAttendance();
}

function displayAttendance() {
    const tableBody = document.getElementById("attendanceTable");
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    tableBody.innerHTML = "";

    if (attendance.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8">No attendance records found</td></tr>`;
        return;
    }

    attendance.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.email}</td>
                <td>${student.id}</td>
                <td>${student.first}</td>
                <td>${student.middle}</td>
                <td>${student.last}</td>
                <td>${student.status}</td>
                <td>${student.time}</td>
            </tr>
        `;
    });
}

// Display on page load
displayAttendance();
function clearAttendance() {
    if (confirm("Are you sure you want to clear all attendance records?")) {
        localStorage.removeItem("attendance");
        displayAttendance();
        const showArea = document.getElementById("ShowArea");
        showArea.textContent = "All attendance records cleared!";
        showArea.style.color = "red";
    }
}