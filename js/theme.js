const themeButton = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}


function updateThemeButton() {

    if (document.body.classList.contains("light-theme")) {

        themeButton.textContent = "☾";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeButton.textContent = "☀";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }
}


updateThemeButton();


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light-theme");


    if (document.body.classList.contains("light-theme")) {

        localStorage.setItem(
            "theme",
            "light"
        );

    } else {

        localStorage.setItem(
            "theme",
            "dark"
        );
    }


    updateThemeButton();

});