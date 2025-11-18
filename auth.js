// Fungsi Register
function registerUser() {
    const username = document.getElementById("regUser").value.trim();
    const password = document.getElementById("regPass").value.trim();

    if (!username || !password) {
        alert("Username dan password wajib diisi!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username === username)) {
        alert("Username sudah digunakan!");
        return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil!");
    window.location.href = "index.html";
}

// Fungsi Login
function login() {
    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        alert("Username atau password salah!");
        return;
    }

    localStorage.setItem("loggedUser", username);
    window.location.href = "dashboard.html";  // Sesuaikan halamanmu
}

// Fungsi Logout (opsional)
function logout() {
    localStorage.removeItem("loggedUser");
    window.location.href = "index.html";
}
