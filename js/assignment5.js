"use strict";


/* =========================================================
   FIVE.
   ASSIGNMENT 5 CLEANED VERSION

   Features:
   - Greeting by time
   - Current time button
   - UI sound
   - Rating system
   - Dynamic artist archive
   - Category filtering
   - Interactive gallery
   - Keyboard navigation

   Old multi-step form was removed because
   authentication is now handled by auth.js.
========================================================= */



/* =========================================================
   UI SOUND
========================================================= */

let audioContext =
    null;



async function playUiSound(
    frequency = 520
) {


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



    if (
        audioContext.state ===
        "suspended"
    ) {

        await audioContext.resume();

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
        0.12,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.12
    );



    oscillator.connect(
        gain
    );


    gain.connect(
        audioContext.destination
    );



    oscillator.start();


    oscillator.stop(
        audioContext.currentTime + 0.12
    );

}



/* =========================================================
   GREETING
========================================================= */

function getGreetingByTime() {


    const hour =
        new Date().getHours();


    let period;



    if (
        hour >= 5 &&
        hour < 12
    ) {

        period =
            "morning";

    } else if (
        hour >= 12 &&
        hour < 18
    ) {

        period =
            "afternoon";

    } else {

        period =
            "evening";

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



/* =========================================================
   SHOW TIME
========================================================= */

function initializeTimeButton() {


    const greeting =
        document.getElementById(
            "greeting-message"
        );


    if (greeting) {

        greeting.textContent =
            getGreetingByTime();

    }



    const timeButton =
        document.getElementById(
            "show-time"
        );


    const timeOutput =
        document.getElementById(
            "time-output"
        );



    if (
        !timeButton ||
        !timeOutput
    ) {

        return;

    }



    timeButton.addEventListener(
        "click",
        function () {


            const now =
                new Date();


            timeOutput.textContent =
                now.toLocaleTimeString();


            timeOutput.classList.remove(
                "time-flash"
            );


            void timeOutput.offsetWidth;


            timeOutput.classList.add(
                "time-flash"
            );


            playUiSound(
                600
            );


        }
    );

}



/* =========================================================
   RATING
========================================================= */

function initializeRating() {


    const stars =
        document.querySelectorAll(
            ".rating-star"
        );


    const output =
        document.getElementById(
            "rating-output"
        );


    const ratingBox =
        document.getElementById(
            "rating-box"
        );



    if (
        stars.length === 0 ||
        !output
    ) {

        return;

    }



    stars.forEach(
        function (star) {


            star.addEventListener(
                "click",
                function () {


                    const rating =
                        Number(
                            star.dataset.rating
                        );



                    stars.forEach(
                        function (currentStar) {


                            const currentRating =
                                Number(
                                    currentStar.dataset.rating
                                );


                            currentStar.classList.toggle(
                                "selected",
                                currentRating <= rating
                            );


                            currentStar.setAttribute(
                                "aria-pressed",
                                currentRating <= rating
                                    ? "true"
                                    : "false"
                            );


                        }
                    );



                    output.textContent =
                        `Your rating: ${rating}/5`;



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
                        420 + rating * 70
                    );


                }
            );


        }
    );

}



/* =========================================================
   ARTIST DATA
========================================================= */

const artistArchive = {


    artists: [

        {

            name:
                "Yeat",

            category:
                "new-wave",

            categoryLabel:
                "New Wave",

            image:
                "images/yeat.jpg",

            description:
                "Experimental production, futuristic synths and unconventional vocal delivery.",

            link:
                "newwave.html#yeat"

        },


        {

            name:
                "Playboi Carti",

            category:
                "new-wave",

            categoryLabel:
                "New Wave",

            image:
                "images/carti.jpg",

            description:
                "Minimal lyrics, experimental vocals and a strong visual identity.",

            link:
                "newwave.html#carti"

        },


        {

            name:
                "Ken Carson",

            category:
                "new-wave",

            categoryLabel:
                "New Wave",

            image:
                "images/ken.jpg",

            description:
                "Aggressive electronic production and high-energy rage influences.",

            link:
                "newwave.html#ken"

        },


        {

            name:
                "Future",

            category:
                "icons",

            categoryLabel:
                "Icons",

            image:
                "images/future.jpg",

            description:
                "Melodic Atlanta trap and one of the defining voices of modern rap.",

            link:
                "icons.html#future"

        },


        {

            name:
                "Drake",

            category:
                "icons",

            categoryLabel:
                "Icons",

            image:
                "images/drake.jpg",

            description:
                "A combination of hip-hop, R&B, melody and global mainstream influence.",

            link:
                "icons.html#drake"

        }

    ],



    getArtists(
        category
    ) {


        if (
            category === "all"
        ) {

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



    count(
        category = "all"
    ) {

        return this.getArtists(
            category
        ).length;

    }


};



/* =========================================================
   CREATE ARTIST CARD
========================================================= */

function createArtistCard(
    artist
) {


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "dynamic-artist-card";



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


    content.className =
        "dynamic-artist-content";



    const category =
        document.createElement(
            "p"
        );


    category.className =
        "eyebrow";


    category.textContent =
        artist.categoryLabel;



    const title =
        document.createElement(
            "h3"
        );


    title.textContent =
        artist.name;



    const description =
        document.createElement(
            "p"
        );


    description.textContent =
        artist.description;



    const link =
        document.createElement(
            "a"
        );


    link.href =
        artist.link;


    link.className =
        "btn btn-outline-success btn-sm";


    link.textContent =
        "Explore";



    content.appendChild(
        category
    );


    content.appendChild(
        title
    );


    content.appendChild(
        description
    );


    content.appendChild(
        link
    );



    card.appendChild(
        image
    );


    card.appendChild(
        content
    );



    return card;

}



/* =========================================================
   RENDER ARTISTS
========================================================= */

function renderArtists(
    category = "all"
) {


    const artistList =
        document.getElementById(
            "artist-list"
        );


    const artistCount =
        document.getElementById(
            "artist-count"
        );



    if (!artistList) {

        return;

    }



    artistList.innerHTML =
        "";



    const artists =
        artistArchive.getArtists(
            category
        );



    artists.forEach(
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


        const label =
            artists.length === 1
                ? "artist"
                : "artists";


        artistCount.textContent =
            `${artists.length} ${label} in this collection.`;

    }

}



/* =========================================================
   ARTIST FILTER
========================================================= */

function initializeArtistFilters() {


    const buttons =
        document.querySelectorAll(
            ".artist-filter-btn"
        );



    if (
        buttons.length === 0
    ) {

        return;

    }



    buttons.forEach(
        function (button) {


            button.addEventListener(
                "click",
                function () {


                    buttons.forEach(
                        function (otherButton) {

                            otherButton.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );



                    const category =
                        button.dataset.category;


                    renderArtists(
                        category
                    );


                    playUiSound(
                        480
                    );


                }
            );


        }
    );

}



/* =========================================================
   INTERACTIVE GALLERY
========================================================= */

function initializeGallery() {


    const featuredImage =
        document.getElementById(
            "featured-image"
        );


    const thumbnails =
        document.querySelectorAll(
            ".archive-thumbnail"
        );


    const caption =
        document.getElementById(
            "gallery-caption"
        );



    if (
        !featuredImage ||
        thumbnails.length === 0
    ) {

        return;

    }



    thumbnails.forEach(
        function (thumbnail) {


            thumbnail.addEventListener(
                "click",
                function () {


                    const largeImage =
                        thumbnail.dataset.large;


                    const alt =
                        thumbnail.alt;



                    if (largeImage) {

                        featuredImage.src =
                            largeImage;

                    }


                    featuredImage.alt =
                        alt;



                    featuredImage.classList.remove(
                        "image-swap"
                    );


                    void featuredImage.offsetWidth;


                    featuredImage.classList.add(
                        "image-swap"
                    );



                    document
                        .querySelectorAll(
                            ".thumbnail-button"
                        )
                        .forEach(
                            function (button) {

                                button.classList.remove(
                                    "active"
                                );

                            }
                        );



                    const parentButton =
                        thumbnail.closest(
                            ".thumbnail-button"
                        );


                    if (parentButton) {

                        parentButton.classList.add(
                            "active"
                        );

                    }



                    if (caption) {

                        caption.textContent =
                            `Selected artist: ${alt}`;

                    }



                    playUiSound(
                        560
                    );


                }
            );


        }
    );

}



/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

function initializeKeyboardNavigation() {


    document.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight"
            ) {

                return;

            }



            const activeElement =
                document.activeElement;



            if (
                activeElement &&
                (
                    activeElement.tagName === "INPUT" ||
                    activeElement.tagName === "TEXTAREA" ||
                    activeElement.tagName === "SELECT"
                )
            ) {

                return;

            }



            const navigationLinks =
                Array.from(
                    document.querySelectorAll(
                        ".site-navbar .nav-link"
                    )
                ).filter(
                    function (link) {

                        return (
                            link.href &&
                            !link.classList.contains(
                                "auth-nav-logout"
                            )
                        );

                    }
                );



            if (
                navigationLinks.length === 0
            ) {

                return;

            }



            let currentIndex =
                navigationLinks.findIndex(
                    function (link) {

                        return link.classList.contains(
                            "active"
                        );

                    }
                );



            if (currentIndex === -1) {

                currentIndex =
                    0;

            }



            if (
                event.key ===
                "ArrowRight"
            ) {

                currentIndex =
                    (
                        currentIndex + 1
                    ) %
                    navigationLinks.length;

            } else {

                currentIndex =
                    (
                        currentIndex - 1 +
                        navigationLinks.length
                    ) %
                    navigationLinks.length;

            }



            window.location.href =
                navigationLinks[
                    currentIndex
                    ].href;


        }
    );

}



/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        initializeTimeButton();


        initializeRating();


        /*
           Render dynamic artist cards
           before search/filter interactions.
        */

        renderArtists(
            "all"
        );


        initializeArtistFilters();


        initializeGallery();


        initializeKeyboardNavigation();


    }
);