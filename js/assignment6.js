"use strict";


$(document).ready(function () {


    /* =====================================================
       JQUERY READY
    ===================================================== */

    console.log(
        "jQuery is ready!"
    );



    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        const scrollTop =
            $(window).scrollTop();


        const maxScroll =
            $(document).height() -
            $(window).height();


        let progress = 0;


        if (maxScroll > 0) {

            progress =
                scrollTop /
                maxScroll *
                100;

        }


        progress =
            Math.max(
                0,
                Math.min(
                    progress,
                    100
                )
            );


        $("#scroll-progress")
            .css(
                "width",
                progress + "%"
            );

    }


    $(window).on(
        "scroll resize",
        updateScrollProgress
    );


    updateScrollProgress();



    /* =====================================================
       SEARCH
    ===================================================== */

    const artistNames = [

        "Yeat",
        "Playboi Carti",
        "Ken Carson",
        "Future",
        "Drake"

    ];


    const $search =
        $("#artist-search");


    const $suggestions =
        $("#search-suggestions");


    const $count =
        $("#search-result-count");



    function escapeRegex(text) {

        return text.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

    }



    function filterArtists(query) {

        const searchValue =
            query
                .trim()
                .toLowerCase();


        let found = 0;


        $(".dynamic-artist-card")
            .each(function () {


                const $card =
                    $(this);


                const $title =
                    $card.find("h3");


                let original =
                    $title.attr(
                        "data-original-name"
                    );


                if (!original) {

                    original =
                        $title.text();


                    $title.attr(
                        "data-original-name",
                        original
                    );

                }


                $title.text(
                    original
                );


                const matches =
                    original
                        .toLowerCase()
                        .includes(
                            searchValue
                        );


                const visible =
                    searchValue === "" ||
                    matches;


                $card.toggle(
                    visible
                );


                if (visible) {

                    found++;

                }


                if (
                    searchValue !== "" &&
                    matches
                ) {

                    const regex =
                        new RegExp(
                            "(" +
                            escapeRegex(
                                query.trim()
                            ) +
                            ")",
                            "gi"
                        );


                    const highlighted =
                        original.replace(
                            regex,
                            '<mark class="search-highlight">$1</mark>'
                        );


                    $title.html(
                        highlighted
                    );

                }


            });


        if (!$count.length) {

            return;

        }


        if (searchValue === "") {

            $count.text(
                "Type an artist name to search."
            );

        } else {

            $count.text(
                found +
                (
                    found === 1
                        ? " artist found."
                        : " artists found."
                )
            );

        }

    }



    function showSuggestions(query) {

        if (!$suggestions.length) {

            return;

        }


        const value =
            query
                .trim()
                .toLowerCase();


        $suggestions.empty();


        if (value === "") {

            $suggestions.removeClass(
                "show"
            );

            return;

        }


        const matches =
            artistNames.filter(
                function (artist) {

                    return artist
                        .toLowerCase()
                        .includes(
                            value
                        );

                }
            );


        if (matches.length === 0) {

            $suggestions.removeClass(
                "show"
            );

            return;

        }


        matches.forEach(
            function (artist) {


                const $button =
                    $("<button>", {

                        class:
                            "search-suggestion-item",

                        type:
                            "button",

                        text:
                        artist

                    });


                $suggestions.append(
                    $button
                );

            }
        );


        $suggestions.addClass(
            "show"
        );

    }



    $search.on(
        "keyup",
        function () {


            const query =
                $(this).val();


            filterArtists(
                query
            );


            showSuggestions(
                query
            );

        }
    );



    $suggestions.on(
        "click",
        ".search-suggestion-item",
        function () {


            const artist =
                $(this).text();


            $search.val(
                artist
            );


            $suggestions.removeClass(
                "show"
            );


            filterArtists(
                artist
            );

        }
    );



    $(document).on(
        "click",
        function (event) {


            if (
                !$(event.target)
                    .closest(
                        ".jquery-search-wrapper"
                    )
                    .length
            ) {

                $suggestions.removeClass(
                    "show"
                );

            }

        }
    );



    $(".artist-filter-btn").on(
        "click",
        function () {


            setTimeout(
                function () {


                    if ($search.length) {

                        filterArtists(
                            $search.val()
                        );

                    }

                },
                0
            );

        }
    );



    /* =====================================================
       ANIMATED COUNTERS
    ===================================================== */

    let counterStarted =
        false;



    function startCounters() {

        if (counterStarted) {

            return;

        }


        const $section =
            $("#stats-section");


        if (!$section.length) {

            return;

        }


        const viewportBottom =
            $(window).scrollTop() +
            $(window).height();


        const sectionTop =
            $section.offset().top;


        if (
            viewportBottom <
            sectionTop + 100
        ) {

            return;

        }


        counterStarted =
            true;


        $(".stat-number")
            .each(function () {


                const $number =
                    $(this);


                const target =
                    Number(
                        $number.data(
                            "target"
                        )
                    );


                $({
                    value: 0
                }).animate(
                    {
                        value:
                        target
                    },
                    {

                        duration:
                            1400,

                        easing:
                            "swing",

                        step:
                            function () {

                                $number.text(
                                    Math.floor(
                                        this.value
                                    )
                                );

                            },

                        complete:
                            function () {

                                $number.text(
                                    target
                                );

                            }

                    }
                );

            });

    }


    $(window).on(
        "scroll",
        startCounters
    );


    startCounters();



    /* =====================================================
       TOAST SYSTEM
    ===================================================== */

    if (
        $("#jquery-toast").length === 0
    ) {

        $("body").append(
            '<div id="jquery-toast" class="jquery-toast" role="status"></div>'
        );

    }



    function showToast(message) {

        $("#jquery-toast")
            .stop(
                true,
                true
            )
            .text(
                message
            )
            .fadeIn(
                200
            )
            .delay(
                1800
            )
            .fadeOut(
                400
            );

    }



    /* =====================================================
       FORM SPINNER
    ===================================================== */

    $("#archive-form").on(
        "submit",
        function () {


            const $form =
                $(this);


            setTimeout(
                function () {


                    const errors =
                        $form
                            .find(
                                ".form-error"
                            )
                            .filter(
                                function () {

                                    return (
                                        $.trim(
                                            $(this).text()
                                        ) !== ""
                                    );

                                }
                            )
                            .length;


                    if (errors > 0) {

                        return;

                    }


                    const $button =
                        $("#profile-submit");


                    if (!$button.length) {

                        return;

                    }


                    const original =
                        $button.html();


                    $button
                        .prop(
                            "disabled",
                            true
                        )
                        .html(
                            '<span class="spinner-border spinner-border-sm me-2"></span>Please wait...'
                        );


                    setTimeout(
                        function () {


                            $button
                                .prop(
                                    "disabled",
                                    false
                                )
                                .html(
                                    original
                                );


                            showToast(
                                "Profile submitted successfully!"
                            );

                        },
                        1600
                    );

                },
                0
            );

        }
    );



    /* =====================================================
       COPY TO CLIPBOARD
    ===================================================== */

    function showCopyFeedback() {

        $("#copy-icon")
            .text(
                "✓"
            );


        $("#copy-label")
            .text(
                "Copied"
            );


        $("#copy-tooltip")
            .stop(
                true,
                true
            )
            .fadeIn(
                200
            )
            .delay(
                1200
            )
            .fadeOut(
                300
            );


        showToast(
            "Copied to clipboard!"
        );


        setTimeout(
            function () {

                $("#copy-icon")
                    .text(
                        "⧉"
                    );


                $("#copy-label")
                    .text(
                        "Copy"
                    );

            },
            1800
        );

    }



    $("#copy-text").on(
        "copy",
        function () {

            showCopyFeedback();

        }
    );



    $("#copy-button").on(
        "click",
        function () {


            const text =
                $("#copy-text").val();


            if (
                navigator.clipboard &&
                navigator.clipboard.writeText
            ) {


                navigator.clipboard
                    .writeText(
                        text
                    )
                    .then(
                        function () {

                            showCopyFeedback();

                        }
                    );


            } else {


                const input =
                    document.getElementById(
                        "copy-text"
                    );


                input.select();


                document.execCommand(
                    "copy"
                );

            }

        }
    );



    /* =====================================================
       LAZY LOADING
    ===================================================== */

    function lazyLoadImages() {


        const viewportBottom =
            $(window).scrollTop() +
            $(window).height() +
            150;


        $(".lazy-image")
            .each(function () {


                const $image =
                    $(this);


                const realSource =
                    $image.attr(
                        "data-src"
                    );


                if (!realSource) {

                    return;

                }


                const imageTop =
                    $image.offset().top;


                if (
                    imageTop <=
                    viewportBottom
                ) {


                    $image.attr(
                        "src",
                        realSource
                    );


                    $image.removeAttr(
                        "data-src"
                    );


                    $image.addClass(
                        "loaded"
                    );

                }

            });

    }


    $(window).on(
        "scroll resize",
        lazyLoadImages
    );


    lazyLoadImages();


});