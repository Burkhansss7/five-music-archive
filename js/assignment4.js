/* =====================================================
   FIVE. MUSIC ARCHIVE
   ASSIGNMENT 4 — JAVASCRIPT
===================================================== */


/* =====================================================
   TASK 1 — FORM VALIDATION
===================================================== */

const archiveForm =
    document.getElementById("archive-form");


if (archiveForm) {

    archiveForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const password =
                document.getElementById("password");

            const confirmPassword =
                document.getElementById(
                    "confirm-password"
                );


            const nameError =
                document.getElementById(
                    "name-error"
                );

            const emailError =
                document.getElementById(
                    "email-error"
                );

            const passwordError =
                document.getElementById(
                    "password-error"
                );

            const confirmPasswordError =
                document.getElementById(
                    "confirm-password-error"
                );

            const formSuccess =
                document.getElementById(
                    "form-success"
                );


            nameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            formSuccess.textContent = "";


            let valid = true;


            if (name.value.trim() === "") {

                nameError.textContent =
                    "Please enter your name.";

                valid = false;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email.value.trim() === "") {

                emailError.textContent =
                    "Please enter your email.";

                valid = false;

            } else if (
                !emailPattern.test(email.value)
            ) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            if (password.value.length < 8) {

                passwordError.textContent =
                    "Password must contain at least 8 characters.";

                valid = false;

            }


            if (
                confirmPassword.value !==
                password.value
            ) {

                confirmPasswordError.textContent =
                    "Passwords do not match.";

                valid = false;

            }


            if (valid) {

                formSuccess.textContent =
                    "Success! Your profile was created.";

                archiveForm.reset();

            }

        }
    );

}



/* =====================================================
   TASK 2 — FAQ ACCORDION
===================================================== */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(
    function (question) {

        question.addEventListener(
            "click",
            function () {

                const answer =
                    question.nextElementSibling;

                const currentlyOpen =
                    question.classList.contains(
                        "active"
                    );


                question.classList.toggle(
                    "active"
                );

                answer.classList.toggle(
                    "open"
                );


                question.setAttribute(
                    "aria-expanded",
                    String(!currentlyOpen)
                );

            }
        );

    }
);



/* =====================================================
   TASK 3 — POPUP SUBSCRIPTION FORM
===================================================== */

const openPopupButton =
    document.getElementById(
        "open-subscribe"
    );

const popup =
    document.getElementById(
        "subscription-popup"
    );

const closePopupButton =
    document.getElementById(
        "close-popup"
    );


function openPopup() {

    if (!popup) {
        return;
    }

    popup.classList.add(
        "show"
    );

    document.body.classList.add(
        "popup-open"
    );

}


function closePopup() {

    if (!popup) {
        return;
    }

    popup.classList.remove(
        "show"
    );

    document.body.classList.remove(
        "popup-open"
    );

}


if (openPopupButton) {

    openPopupButton.addEventListener(
        "click",
        openPopup
    );

}


if (closePopupButton) {

    closePopupButton.addEventListener(
        "click",
        closePopup
    );

}


if (popup) {

    popup.addEventListener(
        "click",
        function (event) {

            if (event.target === popup) {
                closePopup();
            }

        }
    );

}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            popup &&
            popup.classList.contains("show")
        ) {

            closePopup();

        }

    }
);



/* SUBSCRIPTION FORM */

const subscriptionForm =
    document.getElementById(
        "subscription-form"
    );


if (subscriptionForm) {

    subscriptionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "subscription-email"
                );

            const message =
                document.getElementById(
                    "subscription-message"
                );


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                message.textContent =
                    "Please enter a valid email.";

                return;

            }


            message.textContent =
                "Welcome to the FIVE. archive!";


            subscriptionForm.reset();

        }
    );

}



/* =====================================================
   TASK 4 — CHANGE BACKGROUND COLOR
===================================================== */

const backgroundButton =
    document.getElementById(
        "change-background"
    );


const backgroundColors = [

    "#0b0b0b",

    "#101820",

    "#18110d",

    "#0d1812",

    "#16121f"

];


let backgroundIndex = 0;


if (backgroundButton) {

    backgroundButton.addEventListener(
        "click",
        function () {

            backgroundIndex++;


            if (
                backgroundIndex >=
                backgroundColors.length
            ) {

                backgroundIndex = 0;

            }


            document.documentElement
                .style
                .setProperty(
                    "--bg",
                    backgroundColors[
                        backgroundIndex
                        ]
                );

        }
    );

}



/* =====================================================
   TASK 5 — CURRENT DATE AND TIME
===================================================== */

function updateDateTime() {

    const dateTimeElements =
        document.querySelectorAll(
            ".current-date-time"
        );


    if (
        dateTimeElements.length === 0
    ) {

        return;

    }


    const now =
        new Date();


    const options = {

        year: "numeric",

        month: "long",

        day: "numeric",

        hour: "numeric",

        minute: "2-digit",

        second: "2-digit",

        hour12: true

    };


    const formattedDate =
        now.toLocaleString(
            "en-US",
            options
        );


    dateTimeElements.forEach(
        function (element) {

            element.textContent =
                formattedDate;

        }
    );

}


updateDateTime();


setInterval(
    updateDateTime,
    1000
);