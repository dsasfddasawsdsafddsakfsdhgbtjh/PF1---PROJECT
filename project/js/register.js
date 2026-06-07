function register() {

    const username =
        document.getElementById(
            "newUsername"
        ).value;

    const password =
        document.getElementById(
            "newPassword"
        ).value;

    const user = {
        username,
        password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration successful!");

    window.location.href =
        "login.html";
}