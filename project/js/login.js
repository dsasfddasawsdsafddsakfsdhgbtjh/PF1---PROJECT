function login() {

    const username =
        document.getElementById(
            "username"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if (
        user &&
        user.username === username &&
        user.password === password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        alert("Login successful!");

        window.location.href =
            "index.html";

    } else {

        alert(
            "Invalid username or password"
        );
    }
}