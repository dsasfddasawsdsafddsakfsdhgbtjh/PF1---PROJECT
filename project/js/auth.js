const userDisplay =
    document.getElementById(
        "userDisplay"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

const user =
    JSON.parse(
        localStorage.getItem("user")
    );

const loggedIn =
    localStorage.getItem(
        "loggedIn"
    );

if (loggedIn === "true" && user) {

    userDisplay.innerHTML =
        `Welcome, ${user.username}`;

} else {

    logoutBtn.style.display =
        "none";
}

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "loggedIn"
        );

        alert(
            "Logged out successfully!"
        );

        location.reload();
    }
);