"use strict";


/* =========================================================
   FIVE. AUTHENTICATION SIMULATION
   Uses localStorage because the project has no backend.
========================================================= */


const FIVE_STORAGE = {

    user:
        "fiveUser",

    loggedIn:
        "fiveLoggedIn",

    session:
        "fiveSession"

};



/* =========================================================
   STORAGE HELPERS
========================================================= */

function getStoredUser() {

    const rawUser =
        localStorage.getItem(
            FIVE_STORAGE.user
        );


    if (!rawUser) {

        return null;

    }


    try {

        return JSON.parse(
            rawUser
        );

    } catch (error) {

        console.error(
            "Could not read stored FIVE. user.",
            error
        );

        return null;

    }

}



function saveUser(user) {

    localStorage.setItem(
        FIVE_STORAGE.user,
        JSON.stringify(
            user
        )
    );

}



function isLoggedIn() {

    const user =
        getStoredUser();


    const loginState =
        localStorage.getItem(
            FIVE_STORAGE.loggedIn
        );


    return (
        loginState === "true" &&
        user !== null
    );

}



function createSession(email) {

    localStorage.setItem(
        FIVE_STORAGE.loggedIn,
        "true"
    );


    localStorage.setItem(
        FIVE_STORAGE.session,
        email
    );

}



function logoutUser() {

    localStorage.removeItem(
        FIVE_STORAGE.loggedIn
    );


    localStorage.removeItem(
        FIVE_STORAGE.session
    );


    window.location.href =
        "index.html";

}



/* =========================================================
   VALIDATION HELPERS
========================================================= */

function normalizeEmail(email) {

    return email
        .trim()
        .toLowerCase();

}



function normalizePhone(phone) {

    return phone
        .trim()
        .replace(
            /[\s()-]/g,
            ""
        );

}



function isValidEmail(email) {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailRegex.test(
        email
    );

}



function isValidPhone(phone) {

    /*
       Accepts:
       +77001234567
       77001234567
       87001234567
       and international numbers
       from 10 to 15 digits.
    */

    const phoneRegex =
        /^\+?[0-9]{10,15}$/;


    return phoneRegex.test(
        phone
    );

}



function isStrongPassword(password) {

    /*
       Minimum:
       - 8 characters
       - one lowercase letter
       - one uppercase letter
       - one number
       - one special character
    */

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;


    return passwordRegex.test(
        password
    );

}



function setError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            message;

    }

}



function clearError(
    elementId
) {

    setError(
        elementId,
        ""
    );

}



/* =========================================================
   SIGN UP
========================================================= */

function initializeSignupForm() {

    const form =
        document.getElementById(
            "signup-form"
        );


    if (!form) {

        return;

    }


    const nameInput =
        document.getElementById(
            "signup-name"
        );


    const emailInput =
        document.getElementById(
            "signup-email"
        );


    const phoneInput =
        document.getElementById(
            "signup-phone"
        );


    const collectionInput =
        document.getElementById(
            "signup-collection"
        );


    const passwordInput =
        document.getElementById(
            "signup-password"
        );


    const confirmInput =
        document.getElementById(
            "signup-confirm-password"
        );


    const successMessage =
        document.getElementById(
            "signup-success"
        );



    form.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            clearError(
                "signup-name-error"
            );

            clearError(
                "signup-email-error"
            );

            clearError(
                "signup-phone-error"
            );

            clearError(
                "signup-collection-error"
            );

            clearError(
                "signup-password-error"
            );

            clearError(
                "signup-confirm-error"
            );


            successMessage.textContent =
                "";


            const name =
                nameInput.value.trim();


            const email =
                normalizeEmail(
                    emailInput.value
                );


            const phone =
                normalizePhone(
                    phoneInput.value
                );


            const collection =
                collectionInput.value;


            const password =
                passwordInput.value;


            const confirmPassword =
                confirmInput.value;


            let valid =
                true;



            /* NAME VALIDATION */

            if (name === "") {

                setError(
                    "signup-name-error",
                    "Please enter your name."
                );

                valid =
                    false;

            } else if (
                name.length < 2
            ) {

                setError(
                    "signup-name-error",
                    "Name must contain at least 2 characters."
                );

                valid =
                    false;

            } else if (
                /^\d+$/.test(
                    name
                )
            ) {

                setError(
                    "signup-name-error",
                    "Name cannot contain only numbers."
                );

                valid =
                    false;

            }



            /* EMAIL VALIDATION */

            if (email === "") {

                setError(
                    "signup-email-error",
                    "Please enter your email."
                );

                valid =
                    false;

            } else if (
                !isValidEmail(
                    email
                )
            ) {

                setError(
                    "signup-email-error",
                    "Please enter a valid email address."
                );

                valid =
                    false;

            }



            /* PHONE VALIDATION */

            if (phone === "") {

                setError(
                    "signup-phone-error",
                    "Please enter your phone number."
                );

                valid =
                    false;

            } else if (
                !isValidPhone(
                    phone
                )
            ) {

                setError(
                    "signup-phone-error",
                    "Enter 10–15 digits, for example +77001234567."
                );

                valid =
                    false;

            }



            /* COLLECTION */

            if (collection === "") {

                setError(
                    "signup-collection-error",
                    "Please choose a collection."
                );

                valid =
                    false;

            }



            /* PASSWORD */

            if (password === "") {

                setError(
                    "signup-password-error",
                    "Please create a password."
                );

                valid =
                    false;

            } else if (
                !isStrongPassword(
                    password
                )
            ) {

                setError(
                    "signup-password-error",
                    "Password needs 8+ characters, uppercase, lowercase, number and special character."
                );

                valid =
                    false;

            }



            /* CONFIRM PASSWORD */

            if (
                confirmPassword === ""
            ) {

                setError(
                    "signup-confirm-error",
                    "Please confirm your password."
                );

                valid =
                    false;

            } else if (
                password !==
                confirmPassword
            ) {

                setError(
                    "signup-confirm-error",
                    "Passwords do not match."
                );

                valid =
                    false;

            }



            if (!valid) {

                return;

            }



            /*
               This is a frontend simulation.
               A real website should NEVER store
               plain passwords in localStorage.
            */

            const user = {

                name:
                name,

                email:
                email,

                phone:
                phone,

                password:
                password,

                favoriteCollection:
                collection,

                createdAt:
                    new Date().toISOString()

            };


            saveUser(
                user
            );


            successMessage.textContent =
                "Account created successfully. Redirecting to Log In...";


            form.reset();


            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                900
            );


        }
    );

}



/* =========================================================
   LOGIN
========================================================= */

function initializeLoginForm() {

    const form =
        document.getElementById(
            "login-form"
        );


    if (!form) {

        return;

    }


    const emailInput =
        document.getElementById(
            "login-email"
        );


    const passwordInput =
        document.getElementById(
            "login-password"
        );


    const generalError =
        document.getElementById(
            "login-general-error"
        );


    const successMessage =
        document.getElementById(
            "login-success"
        );



    form.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            clearError(
                "login-email-error"
            );

            clearError(
                "login-password-error"
            );


            generalError.textContent =
                "";


            successMessage.textContent =
                "";


            const email =
                normalizeEmail(
                    emailInput.value
                );


            const password =
                passwordInput.value;


            let valid =
                true;



            if (email === "") {

                setError(
                    "login-email-error",
                    "Please enter your email."
                );

                valid =
                    false;

            } else if (
                !isValidEmail(
                    email
                )
            ) {

                setError(
                    "login-email-error",
                    "Please enter a valid email address."
                );

                valid =
                    false;

            }



            if (password === "") {

                setError(
                    "login-password-error",
                    "Please enter your password."
                );

                valid =
                    false;

            }



            if (!valid) {

                return;

            }



            const storedUser =
                getStoredUser();



            if (!storedUser) {

                generalError.textContent =
                    "No account was found. Please create an account first.";

                return;

            }



            const emailMatches =
                email ===
                normalizeEmail(
                    storedUser.email
                );


            const passwordMatches =
                password ===
                storedUser.password;



            if (
                !emailMatches ||
                !passwordMatches
            ) {

                generalError.textContent =
                    "Incorrect email or password.";

                return;

            }



            createSession(
                storedUser.email
            );


            successMessage.textContent =
                "Login successful. Opening your profile...";


            setTimeout(
                function () {

                    window.location.href =
                        "profile.html";

                },
                700
            );


        }
    );

}



/* =========================================================
   PROFILE PAGE
========================================================= */

function initializeProfilePage() {

    const profileName =
        document.getElementById(
            "profile-name"
        );


    if (!profileName) {

        return;

    }



    if (!isLoggedIn()) {

        window.location.href =
            "login.html";

        return;

    }



    const user =
        getStoredUser();



    if (!user) {

        window.location.href =
            "login.html";

        return;

    }



    const profileEmail =
        document.getElementById(
            "profile-email"
        );


    const profilePhone =
        document.getElementById(
            "profile-phone"
        );


    const profileCollection =
        document.getElementById(
            "profile-collection"
        );


    const profileMemberSince =
        document.getElementById(
            "profile-member-since"
        );


    const profileAvatar =
        document.getElementById(
            "profile-avatar"
        );


    profileName.textContent =
        user.name;


    profileEmail.textContent =
        user.email;


    profilePhone.textContent =
        user.phone;


    if (
        user.favoriteCollection ===
        "new-wave"
    ) {

        profileCollection.textContent =
            "New Wave";

    } else if (
        user.favoriteCollection ===
        "icons"
    ) {

        profileCollection.textContent =
            "Icons";

    } else {

        profileCollection.textContent =
            "FIVE.";

    }



    const createdDate =
        new Date(
            user.createdAt
        );


    profileMemberSince.textContent =
        createdDate.toLocaleDateString(
            "en-US",
            {
                year:
                    "numeric",

                month:
                    "short",

                day:
                    "numeric"
            }
        );



    profileAvatar.textContent =
        user.name
            .charAt(0)
            .toUpperCase();



    const logoutButton =
        document.getElementById(
            "profile-logout"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutUser
        );

    }

}



/* =========================================================
   DYNAMIC NAVIGATION
========================================================= */

function createNavItem(
    label,
    href,
    extraClass = ""
) {

    const item =
        document.createElement(
            "li"
        );


    item.className =
        "nav-item auth-generated";


    const link =
        document.createElement(
            "a"
        );


    link.href =
        href;


    link.textContent =
        label;


    link.className =
        "nav-link " +
        extraClass;



    const currentPage =
        window.location.pathname
            .split("/")
            .pop();



    if (
        href === currentPage
    ) {

        link.classList.add(
            "active"
        );

    }


    item.appendChild(
        link
    );


    return item;

}



function updateAuthNavigation() {

    const navigations =
        document.querySelectorAll(
            ".navbar-nav"
        );


    navigations.forEach(
        function (navigation) {


            navigation
                .querySelectorAll(
                    ".auth-generated"
                )
                .forEach(
                    function (item) {

                        item.remove();

                    }
                );



            const themeButton =
                navigation.querySelector(
                    "#theme-toggle"
                );


            const themeItem =
                themeButton
                    ? themeButton.closest(
                        ".nav-item"
                    )
                    : null;



            if (isLoggedIn()) {


                const profileItem =
                    createNavItem(
                        "Profile",
                        "profile.html"
                    );



                const logoutItem =
                    document.createElement(
                        "li"
                    );


                logoutItem.className =
                    "nav-item auth-generated";



                const logoutButton =
                    document.createElement(
                        "button"
                    );


                logoutButton.type =
                    "button";


                logoutButton.className =
                    "nav-link auth-nav-logout";


                logoutButton.textContent =
                    "Log Out";


                logoutButton.addEventListener(
                    "click",
                    logoutUser
                );


                logoutItem.appendChild(
                    logoutButton
                );



                if (themeItem) {

                    navigation.insertBefore(
                        profileItem,
                        themeItem
                    );


                    navigation.insertBefore(
                        logoutItem,
                        themeItem
                    );

                } else {

                    navigation.appendChild(
                        profileItem
                    );


                    navigation.appendChild(
                        logoutItem
                    );

                }



            } else {


                const loginItem =
                    createNavItem(
                        "Log In",
                        "login.html"
                    );



                const signupItem =
                    document.createElement(
                        "li"
                    );


                signupItem.className =
                    "nav-item auth-generated";



                const signupLink =
                    document.createElement(
                        "a"
                    );


                signupLink.href =
                    "signup.html";


                signupLink.textContent =
                    "Sign Up";


                signupLink.className =
                    "btn btn-success btn-sm auth-signup-nav";


                signupItem.appendChild(
                    signupLink
                );



                if (themeItem) {

                    navigation.insertBefore(
                        loginItem,
                        themeItem
                    );


                    navigation.insertBefore(
                        signupItem,
                        themeItem
                    );

                } else {

                    navigation.appendChild(
                        loginItem
                    );


                    navigation.appendChild(
                        signupItem
                    );

                }

            }


        }
    );

}



/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        updateAuthNavigation();


        initializeSignupForm();


        initializeLoginForm();


        initializeProfilePage();


    }
);