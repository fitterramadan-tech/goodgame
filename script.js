function toggleMenu() {
    const bar = document.getElementById("sidebar");
    bar.style.left = bar.style.left === "0px" ? "-200px" : "0px";
}

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(id).style	display = "block";

    if (id === "history") loadHistory();
}

/* CEK KESEHATAN */
function checkHealth() {
    let age = Number(document.getElementById("age").value);
    let height = Number(document.getElementById("height").value);
    let weight = Number(document.getElementById("weight").value);

    let lelah = document.getElementById("lelah").checked;
    let marah = document.getElementById("marah").checked;
    let sakit = document.getElementById("sakit").checked;

    let bmi = weight / ((height / 100) ** 2);
    let result = `BMI: ${bmi.toFixed(1)} → `;

    if (bmi < 18.5) result += "Kurus";
    else if (bmi <= 24.9) result += "Ideal";
    else result += "Gemuk";

    let advice = "Saran: ";

    if (lelah) advice += "Kurangi begadang. ";
    if (marah) advice += "Coba latihan pernapasan. ";
    if (sakit) advice += "Jaga makan & vitamin. ";

    document.getElementById("healthResult").innerText = result + "\n" + advice;

    saveHistory("Cek kesehatan dilakukan");
}

/* CEK GADGET */
function checkGadget() {
    let time = Number(document.getElementById("gadgetTime").value);
    let result = "";

    if (time > 6) {
        result = "Peringatan: Penggunaan terlalu lama!\nSaran: Istirahat tiap 1 jam.";
    } else {
        result = "Penggunaan masih normal.";
    }

    document.getElementById("gadgetResult").innerText = result;

    saveHistory("Cek gadget: " + time + " jam");
}

/* HISTORY */
function saveHistory(text) {
    let data = JSON.parse(localStorage.getItem("history")) || [];
    data.push({ text, time: new Date().toLocaleString() });
    localStorage.setItem("history", JSON.stringify(data));
}

function loadHistory() {
    let data = JSON.parse(localStorage.getItem("history")) || [];
    let list = document.getElementById("historyList");
    list.innerHTML = "";

    data.forEach(h => {
        let li = document.createElement("li");
        li.innerText = h.time + " - " + h.text;
        list.appendChild(li);
    });
}
