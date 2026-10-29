const themeButton =
    document.getElementById(
        "theme-toggle"
    );


const savedTheme =
    localStorage.getItem(
        "theme"
    );


/* =====================================================
   LOAD SAVED THEME
===================================================== */

if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

}



/* =====================================================
   UPDATE BUTTON ICON
===================================================== */

function updateThemeButton() {

    if (!themeButton) {
        return;
    }


    const lightMode =
        document.body.classList.contains(
            "light-theme"
        );


    if (lightMode) {

        themeButton.textContent =
            "☾";


        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );


        themeButton.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        themeButton.textContent =
            "☀";


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



/* =====================================================
   CHANGE THEME
===================================================== */

if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {


            document.body.classList.toggle(
                "light-theme"
            );


            /*
               Reset custom background color
               when switching between
               light and dark themes
            */

            document.body.style.removeProperty(
                "--bg"
            );


            const lightMode =
                document.body.classList.contains(
                    "light-theme"
                );


            localStorage.setItem(
                "theme",

                lightMode
                    ? "light"
                    : "dark"
            );


            updateThemeButton();

        }
    );

}