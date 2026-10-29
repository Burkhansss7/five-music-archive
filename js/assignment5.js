"use strict";


/* =====================================================
   ASSIGNMENT 5
   ADVANCED JAVASCRIPT + DOM
===================================================== */


/* =====================================================
   SOUND EFFECT
===================================================== */

let audioContext = null;
let activeOscillator = null;


function playUiSound(frequency = 520) {

    const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContextClass) {
        return;
    }


    if (!audioContext) {

        audioContext =
            new AudioContextClass();

    }


    if (activeOscillator) {

        try {
            activeOscillator.stop();
        } catch (error) {
            /* already stopped */
        }

    }


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type =
        "sine";

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0.035,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.08
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.08
    );


    activeOscillator =
        oscillator;


    oscillator.onended =
        function () {

            if (
                activeOscillator === oscillator
            ) {

                activeOscillator = null;

            }

        };

}



/* =====================================================
   SWITCH STATEMENT
   GREETING BASED ON TIME
===================================================== */

function getGreetingByTime() {

    const hour =
        new Date().getHours();


    let period;


    if (hour < 12) {

        period = "morning";

    } else if (hour < 18) {

        period = "afternoon";

    } else {

        period = "evening";

    }


    switch (period) {

        case "morning":

            return "Good morning. Welcome to FIVE.";

        case "afternoon":

            return "Good afternoon. Welcome to FIVE.";

        case "evening":

            return "Good evening. Welcome to FIVE.";

        default:

            return "Welcome to FIVE.";

    }

}


const greetingMessage =
    document.getElementById(
        "greeting-message"
    );


if (greetingMessage) {

    greetingMessage.textContent =
        getGreetingByTime();

}



/* =====================================================
   BUTTON EVENT
   CURRENT TIME
===================================================== */

const showTimeButton =
    document.getElementById(
        "show-time"
    );

const timeOutput =
    document.getElementById(
        "time-output"
    );


function displayCurrentTime() {

    if (!timeOutput) {
        return;
    }


    const currentTime =
        new Date()
            .toLocaleTimeString();


    timeOutput.textContent =
        currentTime;


    timeOutput.classList.remove(
        "time-flash"
    );


    void timeOutput.offsetWidth;


    timeOutput.classList.add(
        "time-flash"
    );

}


if (showTimeButton) {

    showTimeButton.addEventListener(
        "click",
        function () {

            displayCurrentTime();

            playUiSound(620);

        }
    );

}



/* =====================================================
   STAR RATING
   querySelectorAll
   forEach
   DOM / STYLE
===================================================== */

const ratingStars =
    document.querySelectorAll(
        ".rating-star"
    );

const ratingOutput =
    document.getElementById(
        "rating-output"
    );

const ratingBox =
    document.getElementById(
        "rating-box"
    );


ratingStars.forEach(
    function (star) {

        star.addEventListener(
            "click",
            function () {

                const rating =
                    Number(
                        star.dataset.rating
                    );


                ratingStars.forEach(
                    function (item) {

                        const itemRating =
                            Number(
                                item.dataset.rating
                            );


                        if (
                            itemRating <= rating
                        ) {

                            item.classList.add(
                                "selected"
                            );

                            item.setAttribute(
                                "aria-pressed",
                                "true"
                            );

                        } else {

                            item.classList.remove(
                                "selected"
                            );

                            item.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        }

                    }
                );


                if (ratingOutput) {

                    ratingOutput.textContent =
                        `Your rating: ${rating}/5`;

                }


                if (ratingBox) {

                    ratingBox.classList.remove(
                        "rating-pulse"
                    );


                    void ratingBox.offsetWidth;


                    ratingBox.classList.add(
                        "rating-pulse"
                    );

                }


                playUiSound(
                    420 + rating * 60
                );

            }
        );

    }
);



/* =====================================================
   OBJECTS + METHODS
   ARRAYS + FILTER + FOREACH
===================================================== */

const artistArchive = {

    title:
        "FIVE. Music Archive",


    artists: [

        {
            name: "Yeat",
            category: "new-wave",
            style: "Experimental Trap",
            image: "images/yeat.jpg",
            link: "newwave.html#yeat"
        },

        {
            name: "Playboi Carti",
            category: "new-wave",
            style: "Experimental Hip-Hop",
            image: "images/carti.jpg",
            link: "newwave.html#carti"
        },

        {
            name: "Ken Carson",
            category: "new-wave",
            style: "Rage",
            image: "images/ken.jpg",
            link: "newwave.html#ken"
        },

        {
            name: "Future",
            category: "icons",
            style: "Trap",
            image: "images/future.jpg",
            link: "icons.html#future"
        },

        {
            name: "Drake",
            category: "icons",
            style: "Hip-Hop / R&B",
            image: "images/drake.jpg",
            link: "icons.html#drake"
        }

    ],


    getArtists:
        function (category) {

            if (category === "all") {

                return this.artists;

            }


            return this.artists.filter(
                function (artist) {

                    return (
                        artist.category ===
                        category
                    );

                }
            );

        },


    count:
        function () {

            return this.artists.length;

        }

};



const artistList =
    document.getElementById(
        "artist-list"
    );

const artistCount =
    document.getElementById(
        "artist-count"
    );

const filterButtons =
    document.querySelectorAll(
        ".artist-filter-btn"
    );


function createArtistCard(artist) {

    const article =
        document.createElement(
            "article"
        );


    article.classList.add(
        "dynamic-artist-card"
    );


    const image =
        document.createElement(
            "img"
        );


    image.src =
        artist.image;

    image.alt =
        artist.name;


    const content =
        document.createElement(
            "div"
        );


    content.classList.add(
        "dynamic-artist-content"
    );


    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        artist.name;


    const style =
        document.createElement(
            "p"
        );


    style.textContent =
        artist.style;


    const link =
        document.createElement(
            "a"
        );


    link.href =
        artist.link;

    link.textContent =
        "Explore";

    link.className =
        "btn btn-outline-success btn-sm";


    content.appendChild(
        title
    );

    content.appendChild(
        style
    );

    content.appendChild(
        link
    );


    article.appendChild(
        image
    );

    article.appendChild(
        content
    );


    return article;

}



function renderArtists(category) {

    if (!artistList) {
        return;
    }


    artistList.innerHTML =
        "";


    const selectedArtists =
        artistArchive.getArtists(
            category
        );


    selectedArtists.forEach(
        function (artist) {

            const card =
                createArtistCard(
                    artist
                );


            artistList.appendChild(
                card
            );

        }
    );


    if (artistCount) {

        artistCount.textContent =
            `${selectedArtists.length} of ${artistArchive.count()} artists shown`;

    }

}


if (artistList) {

    renderArtists(
        "all"
    );

}


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const category =
                    button.dataset.category;


                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                renderArtists(
                    category
                );


                playUiSound(560);

            }
        );

    }
);



/* =====================================================
   IMAGE GALLERY
   MANIPULATING SRC ATTRIBUTE
===================================================== */

const featuredImage =
    document.getElementById(
        "featured-image"
    );

const galleryCaption =
    document.getElementById(
        "gallery-caption"
    );

const thumbnails =
    document.querySelectorAll(
        ".archive-thumbnail"
    );


thumbnails.forEach(
    function (thumbnail) {

        thumbnail.addEventListener(
            "click",
            function () {

                if (!featuredImage) {
                    return;
                }


                featuredImage.classList.remove(
                    "image-swap"
                );


                void featuredImage.offsetWidth;


                featuredImage.src =
                    thumbnail.dataset.large;

                featuredImage.alt =
                    thumbnail.alt;


                featuredImage.classList.add(
                    "image-swap"
                );


                const buttons =
                    document.querySelectorAll(
                        ".thumbnail-button"
                    );


                buttons.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                thumbnail
                    .closest(
                        ".thumbnail-button"
                    )
                    .classList.add(
                    "active"
                );


                if (galleryCaption) {

                    galleryCaption.textContent =
                        `Selected artist: ${thumbnail.alt}`;

                }


                playUiSound(650);

            }
        );

    }
);



/* =====================================================
   KEYBOARD EVENT HANDLING
   LEFT / RIGHT NAVIGATION
===================================================== */

const navLinks =
    Array.from(
        document.querySelectorAll(
            ".nav-link"
        )
    );


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "ArrowRight" &&
            event.key !== "ArrowLeft"
        ) {

            return;

        }


        const activeTag =
            document.activeElement
                .tagName;


        if (
            activeTag === "INPUT" ||
            activeTag === "TEXTAREA" ||
            activeTag === "SELECT"
        ) {

            return;

        }


        if (
            navLinks.length === 0
        ) {

            return;

        }


        event.preventDefault();


        const currentIndex =
            navLinks.indexOf(
                document.activeElement
            );


        let nextIndex;


        if (
            event.key ===
            "ArrowRight"
        ) {

            if (currentIndex === -1) {

                nextIndex = 0;

            } else {

                nextIndex =
                    (currentIndex + 1) %
                    navLinks.length;

            }

        } else {

            if (currentIndex === -1) {

                nextIndex =
                    navLinks.length - 1;

            } else {

                nextIndex =
                    (
                        currentIndex -
                        1 +
                        navLinks.length
                    ) %
                    navLinks.length;

            }

        }


        navLinks[
            nextIndex
            ].focus();

    }
);



/* =====================================================
   CALLBACK
   MULTI-STEP FORM
===================================================== */

const formSteps =
    Array.from(
        document.querySelectorAll(
            ".form-step"
        )
    );

const nextStepButton =
    document.getElementById(
        "next-step"
    );

const backStepButton =
    document.getElementById(
        "back-step"
    );

const formStepText =
    document.getElementById(
        "form-step-text"
    );


let currentFormStep =
    0;


function updateStepLabel(stepIndex) {

    if (!formStepText) {
        return;
    }


    formStepText.textContent =
        `Step ${stepIndex + 1} of ${formSteps.length}`;

}


function showFormStep(
    stepIndex,
    callback
) {

    if (
        formSteps.length === 0
    ) {

        return;

    }


    formSteps.forEach(
        function (step) {

            step.classList.remove(
                "active"
            );

        }
    );


    formSteps[
        stepIndex
        ].classList.add(
        "active"
    );


    currentFormStep =
        stepIndex;


    if (
        typeof callback ===
        "function"
    ) {

        callback(
            stepIndex
        );

    }

}


if (
    formSteps.length > 0
) {

    showFormStep(
        0,
        updateStepLabel
    );

}


if (nextStepButton) {

    nextStepButton.addEventListener(
        "click",
        function () {

            showFormStep(
                1,
                updateStepLabel
            );


            playUiSound(600);

        }
    );

}


if (backStepButton) {

    backStepButton.addEventListener(
        "click",
        function () {

            showFormStep(
                0,
                updateStepLabel
            );


            playUiSound(480);

        }
    );

}