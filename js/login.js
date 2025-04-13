// Mock users (admin and regular users)
const initUsers = () => {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([
            { id: "admin", password: "admin123", role: "admin" },
            { id: "user1", password: "user123", role: "user" },
            { id: "user2", password: "user123", role: "user" },
        ]));
    }
};

// Login form
const loginForm = new dhx.Form("login", {
    css: "dhx_form",
    rows: [
        { type: "input", name: "id", label: "User ID", required: true },
        { type: "input", name: "password", label: "Password", type: "password", required: true },
        { type: "button", value: "Login", submit: true },
    ],
});

// Show login screen
document.getElementById("login").style.display = "block";

loginForm.events.on("click", (id) => {
    if (id === "login") {
        const { id: userId, password } = loginForm.getValue();
        const users = JSON.parse(localStorage.getItem("users"));
        const user = users.find((u) => u.id === userId && u.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            document.getElementById("login").style.display = "none";
            document.getElementById("app").style.display = "block";
            initApp(user.role);
        } else {
            alert("Invalid ID or password");
        }
    }
});

initUsers();
