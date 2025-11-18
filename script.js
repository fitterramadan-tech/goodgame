// ================================
// SUPER APP SCRIPT.JS (Pilihan C)
// ================================
// Semua fitur login, AI kesehatan, AI gadget, dan history tracker
// Berjalan penuh tanpa backend (localStorage sebagai database)
// ---------------------------------------------------------------

// -------------------------
// 1. LOGIN & REGISTER SYSTEM
// -------------------------

function registerUser() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    if (!username || !password) {
        alert("Isi semua field!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
        alert("Username sudah terdaftar!");
        return;
    }

    users[username] = {
        password: btoa(password), // encode(base64)
        history: []
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "index.html";
}

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[username] || users[username].password !== btoa(password)) {
        alert("Username atau password salah!");
        return;
    }

    localStorage.setItem("currentUser", username);
    window.location.href = "dashboard.html";
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// -------------------------
// 2. MENU HAMBURGER
// -------------------------

function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    menu.classList.toggle("open");
}

// -------------------------
// 3. AI KESEHATAN (Health AI)
// -------------------------

function calculateHealth() {
    const age = parseInt(document.getElementById("age").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    const tired = document.getElementById("tired").checked;
    const angry = document.getElementById("angry").checked;
    const sick = document.getElementById("sick").checked;

    if (!age || !height || !weight) {
        alert("Isi semua data kesehatan!");
        return;
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    let status = "";
    let advice = "";

    if (bmi < 18.5) {
        status = "Kurus";
        advice = "Kamu perlu meningkatkan asupan nutrisi dan makan lebih teratur.";
    } else if (bmi < 25) {
        status = "Ideal";
        advice = "Tubuhmu dalam kondisi ideal! Pertahankan pola hidup sehat.";
    } else if (bmi < 30) {
        status = "Berlebih";
        advice = "Coba kurangi gula, tepung, dan tingkatkan cardio ringan.";
    } else {
        status = "Obesitas";
        advice = "Prioritaskan olahraga rutin dan kurangi kalori harian.";
    }

    // tambahan AI berdasarkan gejala
    if (tired) advice += "
• Kamu cepat lelah → Kurangi begadang dan perbanyak air putih.";
    if (angry) advice += "
• Mudah marah → Coba latihan pernapasan atau meditasi 5 menit.";
    if (sick) advice += "
• Gampang sakit → Tingkatkan konsumsi vitamin C dan tidur cukup.";

    // hasil output
    document.getElementById("bmi-result").innerText = bmi;
    document.getElementById("health-status").innerText = status;
    document.getElementById("health-advice").innerText = advice;

    saveHistory({
        type: "health",
        age, height, weight,
        bmi, status, tired, angry, sick,
        advice,
        time: Date.now()
    });
}

// -------------------------
// 4. AI PEMAKAIAN GADGET
// -------------------------

function checkGadget() {
    const hours = parseFloat(document.getElementById("gadget-hours").value);

    if (!hours && hours !== 0) {
        alert("Masukkan jam penggunaan gadget!");
        return;
    }

    const limit = 4;
    let message = "";

    if (hours > limit) {
        message = `⚠ Kamu menggunakan gadget selama ${hours} jam. Sudah melewati batas aman!

Saran Ai:
• Istirahatkan mata 15 menit.
• Lakukan peregangan leher.
• Kurangi layar sebelum tidur.`;
    } else {
        message = `Pemakaian gadget masih aman (${hours} jam). Pertahankan pola sehat!`;
    }

    document.getElementById("gadget-result").innerText = message;

    saveHistory({
        type: "gadget",
        hours,
        result: message,
        time: Date.now()
    });
}

// -------------------------
// 5. HISTORY SYSTEM
// -------------------------

function saveHistory(entry) {
    const username = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[username]) return;

    users[username].history.push(entry);
    localStorage.setItem("users", JSON.stringify(users));
}

function loadHistory() {
    const username = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[username]) return;

    const historyDiv = document.getElementById("history-list");
    const items = users[username].history;

    historyDiv.innerHTML = "";

    items.forEach(h => {
        const box = document.createElement("div");
        box.className = "history-item";

        if (h.type === "health") {
            box.innerHTML = `
                <h4>Kesehatan</h4>
                <p><b>BMI:</b> ${h.bmi} (${h.status})</p>
                <p><b>Saran AI:</b> ${h.advice}</p>
                <p class="time">${new Date(h.time).toLocaleString()}</p>
            `;
        }
        else if (h.type === "gadget") {
            box.innerHTML = `
                <h4>Gadget</h4>
                <p>${h.result}</p>
                <p class="time">${new Date(h.time).toLocaleString()}</p>
            `;
        }

        historyDiv.appendChild(box);
    });
}

// muat otomatis jika halaman history
if (window.location.pathname.includes("history.html")) {
    window.onload = loadHistory;
                       }
