const themeButton =
    document.getElementById("theme-toggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}


function updateThemeButton() {

    if (!themeButton) {
        return;
    }


    const lightMode =
        document.body.classList.contains(
            "light-theme"
        );


    if (lightMode) {

        themeButton.textContent = "☾";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeButton.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        themeButton.textContent = "☀";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeButton.setAttribute(
            "aria-pressed",
            "false"
        );

    }

}


updateThemeButton();


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-theme"
            );


            const lightMode =
                document.body.classList.contains(
                    "light-theme"
                );


            if (lightMode) {

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

        }
    );

}