function registerUser() {
    const username = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;

    if (!username || !password) return alert("Lengkapi semua data!");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username === username))
        return alert("Username sudah digunakan!");

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Berhasil daftar!");
    location.href = "index.html";
}

function login() {
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.username === username && u.password === password);

    if (!user) return alert("Akun salah!");

    localStorage.setItem("loggedUser", username);
    location.href = "dashboard.html";
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.href = "index.html";
}
