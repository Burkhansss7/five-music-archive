"use strict";


/* =========================================================
   FIVE. MUSIC API

   Public API:
   iTunes Search API

   Features:
   - fetch()
   - async / await
   - loading state
   - error handling
   - dynamic DOM rendering
   - localStorage
========================================================= */


const MUSIC_API_STORAGE_KEY =
    "fiveMusicSearch";



/* =========================================================
   ELEMENTS
========================================================= */

const musicForm =
    document.getElementById(
        "music-api-form"
    );


const musicInput =
    document.getElementById(
        "music-api-input"
    );


const musicButton =
    document.getElementById(
        "music-api-button"
    );


const musicError =
    document.getElementById(
        "music-api-error"
    );


const musicStatus =
    document.getElementById(
        "music-api-status"
    );


const musicResults =
    document.getElementById(
        "music-api-results"
    );



/* =========================================================
   ONLY RUN ON PAGE WITH API SECTION
========================================================= */

if (
    musicForm &&
    musicInput &&
    musicResults
) {


    /* =====================================================
       HELPERS
    ===================================================== */

    function clearMusicError() {

        musicError.textContent =
            "";

    }



    function showMusicError(
        message
    ) {

        musicError.textContent =
            message;

    }



    function setLoadingState(
        loading
    ) {


        if (loading) {


            musicButton.disabled =
                true;


            musicButton.innerHTML =
                `
                <span
                    class="spinner-border spinner-border-sm me-2"
                    aria-hidden="true">
                </span>

                Loading...
                `;


            musicStatus.innerHTML =
                `
                <div class="api-loading">

                    <span class="api-loading-dot"></span>

                    Connecting to the music catalog...

                </div>
                `;


        } else {


            musicButton.disabled =
                false;


            musicButton.textContent =
                "Search Catalog";

        }

    }



    function formatReleaseYear(
        releaseDate
    ) {


        if (!releaseDate) {

            return "—";

        }


        const date =
            new Date(
                releaseDate
            );


        return date.getFullYear();

    }



    function getArtwork(
        artworkUrl
    ) {


        if (!artworkUrl) {

            return "images/logo.png";

        }


        /*
           iTunes commonly returns 100x100 artwork.
           Request a larger version for our card.
        */

        return artworkUrl.replace(
            "100x100bb",
            "600x600bb"
        );

    }



    function escapeHTML(
        value
    ) {


        const element =
            document.createElement(
                "div"
            );


        element.textContent =
            value ?? "";


        return element.innerHTML;

    }



    /* =====================================================
       CREATE MUSIC CARD
    ===================================================== */

    function createMusicCard(
        track
    ) {


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "music-api-card";



        const artwork =
            getArtwork(
                track.artworkUrl100
            );


        const trackName =
            escapeHTML(
                track.trackName ||
                "Unknown Track"
            );


        const artistName =
            escapeHTML(
                track.artistName ||
                "Unknown Artist"
            );


        const albumName =
            escapeHTML(
                track.collectionName ||
                "Unknown Album"
            );


        const genre =
            escapeHTML(
                track.primaryGenreName ||
                "Music"
            );


        const year =
            formatReleaseYear(
                track.releaseDate
            );


        const trackUrl =
            track.trackViewUrl ||
            track.collectionViewUrl ||
            "#";



        card.innerHTML =
            `

            <div class="music-api-artwork">

                <img
                    src="${artwork}"
                    alt="${trackName} artwork">

                <span class="music-api-genre">
                    ${genre}
                </span>

            </div>


            <div class="music-api-card-content">


                <p class="music-api-artist">
                    ${artistName}
                </p>


                <h3>
                    ${trackName}
                </h3>


                <div class="music-api-meta">

                    <span>
                        ${albumName}
                    </span>

                    <span>
                        ${year}
                    </span>

                </div>


                <a
                    href="${trackUrl}"
                    class="music-api-link"
                    target="_blank"
                    rel="noopener noreferrer">

                    View on iTunes

                    <span>
                        ↗
                    </span>

                </a>


            </div>

            `;


        return card;

    }



    /* =====================================================
       DISPLAY RESULTS
    ===================================================== */

    function displayMusicResults(
        tracks,
        query
    ) {


        musicResults.innerHTML =
            "";


        if (
            !tracks ||
            tracks.length === 0
        ) {


            musicStatus.textContent =
                `No music found for "${query}".`;


            return;

        }



        musicStatus.textContent =
            `${tracks.length} tracks found for "${query}".`;



        tracks.forEach(
            function (track) {


                const card =
                    createMusicCard(
                        track
                    );


                musicResults.appendChild(
                    card
                );


            }
        );

    }



    /* =====================================================
       API REQUEST
    ===================================================== */

    async function searchMusic(
        artist
    ) {


        const query =
            artist.trim();



        clearMusicError();



        if (query === "") {


            showMusicError(
                "Please enter an artist name."
            );


            musicInput.focus();


            return;

        }



        /*
           Save the user's last API search.
           This helps preserve a user preference
           using localStorage.
        */

        localStorage.setItem(
            MUSIC_API_STORAGE_KEY,
            query
        );



        setLoadingState(
            true
        );


        musicResults.innerHTML =
            "";



        try {


            const parameters =
                new URLSearchParams({

                    term:
                    query,

                    media:
                        "music",

                    entity:
                        "song",

                    attribute:
                        "artistTerm",

                    country:
                        "US",

                    limit:
                        "8",

                    explicit:
                        "No"

                });



            const apiUrl =
                "https://itunes.apple.com/search?" +
                parameters.toString();



            const response =
                await fetch(
                    apiUrl
                );



            if (!response.ok) {


                throw new Error(
                    "API request failed with status " +
                    response.status
                );

            }



            const data =
                await response.json();



            displayMusicResults(
                data.results,
                query
            );



        } catch (error) {


            console.error(
                "FIVE. Music API error:",
                error
            );


            musicStatus.textContent =
                "The music catalog is currently unavailable.";


            showMusicError(
                "Unable to load music data. Check your internet connection and try again."
            );


        } finally {


            setLoadingState(
                false
            );


        }

    }



    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    musicForm.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            searchMusic(
                musicInput.value
            );


        }
    );



    /* =====================================================
       QUICK ARTIST BUTTONS
    ===================================================== */

    const quickButtons =
        document.querySelectorAll(
            ".music-quick-btn"
        );



    quickButtons.forEach(
        function (button) {


            button.addEventListener(
                "click",
                function () {


                    const artist =
                        button.dataset.artist;


                    musicInput.value =
                        artist;


                    searchMusic(
                        artist
                    );


                }
            );


        }
    );



    /* =====================================================
       RESTORE LAST SEARCH
    ===================================================== */

    const savedSearch =
        localStorage.getItem(
            MUSIC_API_STORAGE_KEY
        );



    const initialSearch =
        savedSearch ||
        "Yeat";


    musicInput.value =
        initialSearch;



    /*
       Automatically load initial API data
       when Home page opens.
    */

    searchMusic(
        initialSearch
    );


}