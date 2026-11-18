"use strict";


/* =========================================================
   FIVE.
   ASSIGNMENT 4 CLEANED VERSION

   Current features:
   - FAQ accordion
   - Background changer
   - Current date and time

   Old subscription popup and old profile form
   were removed because the final project now uses
   Sign Up / Log In / Profile authentication.
========================================================= */



document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           FAQ ACCORDION
        ================================================= */

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


                        question.classList.toggle(
                            "active"
                        );


                        if (answer) {

                            answer.classList.toggle(
                                "open"
                            );

                        }


                    }
                );


            }
        );



        /* =================================================
           BACKGROUND CHANGER
        ================================================= */

        const backgroundButton =
            document.getElementById(
                "change-background"
            );


        const darkBackgrounds = [

            "#0b0b0b",
            "#101820",
            "#18110d",
            "#0d1812",
            "#16121f"

        ];


        const lightBackgrounds = [

            "#f4f1e8",
            "#e9f0f2",
            "#edf2e5",
            "#f3e9e5",
            "#eee9f3"

        ];



        if (backgroundButton) {


            backgroundButton.addEventListener(
                "click",
                function () {


                    const isLightTheme =
                        document.body.classList.contains(
                            "light-theme"
                        );


                    const colors =
                        isLightTheme
                            ? lightBackgrounds
                            : darkBackgrounds;


                    const randomIndex =
                        Math.floor(
                            Math.random() *
                            colors.length
                        );


                    const selectedColor =
                        colors[
                            randomIndex
                            ];


                    document.body.style.setProperty(
                        "--bg",
                        selectedColor
                    );


                }
            );


        }



        /* =================================================
           CURRENT DATE AND TIME
        ================================================= */

        const dateTimeElements =
            document.querySelectorAll(
                ".current-date-time"
            );



        function updateDateTime() {


            if (
                dateTimeElements.length === 0
            ) {

                return;

            }


            const now =
                new Date();


            const formattedDateTime =
                now.toLocaleString(
                    "en-US",
                    {

                        year:
                            "numeric",

                        month:
                            "short",

                        day:
                            "numeric",

                        hour:
                            "2-digit",

                        minute:
                            "2-digit",

                        second:
                            "2-digit"

                    }
                );


            dateTimeElements.forEach(
                function (element) {

                    element.textContent =
                        formattedDateTime;

                }
            );


        }


        updateDateTime();


        setInterval(
            updateDateTime,
            1000
        );


    }
);