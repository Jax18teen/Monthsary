
/* =====================================
   OUR LITTLE UNIVERSE 🌷
   PAGE 1 — JavaScript
===================================== */

// 1. PASSWORD SETTINGS
// Example password: 20102026 (DDMMYYYY)
// Change this to your preferred password.
const PAGE_PASSWORD = "Surprise";

// Get HTML elements
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

const petalsContainer = document.getElementById("petals");

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");


// 2. CREATE FLOATING FLOWER PETALS 🌸
function createPetals() {
    const numberOfPetals = 24;

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement("span");

        petal.classList.add("petal");

        // Random horizontal position
        petal.style.left = Math.random() * 100 + "%";

        // Different falling speeds
        petal.style.setProperty(
            "--duration",
            (10 + Math.random() * 12) + "s"
        );

        // Start at different times
        petal.style.setProperty(
            "--delay",
            (-Math.random() * 20) + "s"
        );

        // Let the petals drift in the breeze
        petal.style.setProperty(
            "--drift",
            (-70 + Math.random() * 140) + "px"
        );

        // Random size
        const size = 0.6 + Math.random() * 0.8;
        petal.style.scale = size;

        petalsContainer.appendChild(petal);
    }
}

createPetals();


/* 5. PASSWORD LOGIN 💌 */

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === PAGE_PASSWORD) {

        errorMessage.textContent =
            "Welcome to our little universe, my love ♡";

        errorMessage.style.color = "#eaffef";

        // Save music position and playback state
        try {
            sessionStorage.setItem(
                "ourUniverseMusicTime",
                String(backgroundMusic.currentTime || 0)
            );

            sessionStorage.setItem(
                "ourUniverseMusicPlaying",
                String(!backgroundMusic.paused && !backgroundMusic.ended)
            );
        } catch (error) {
            console.warn("Could not save music state:", error);
        }

        // Prevent another login attempt
        passwordInput.disabled = true;

        const submitButton = loginForm.querySelector("button");
        submitButton.disabled = true;

        // Welcome animation
        const welcomeCard = document.querySelector(".welcome-card");
        welcomeCard.classList.add("success");

        // Go to Page 2 after animation
        setTimeout(function () {
            window.location.href = "./page2.html";
        }, 2800);

    } else {

        errorMessage.textContent =
            "Oops! Try again, my love ♡";

        errorMessage.style.color = "#fff1f5";

        passwordInput.select();
    }
});


// 4. BACKGROUND MUSIC 🎵
musicButton.addEventListener("click", async function () {

    if (backgroundMusic.paused) {

        try {
            await backgroundMusic.play();

            musicButton.textContent = "♫ Pause Music";

        } catch (error) {

            musicButton.textContent = "♫ Music unavailable";

            errorMessage.textContent =
                "Please add your song to assets/our-song.mp3 ♡";

            errorMessage.style.color = "#fff1f5";
        }

    } else {

        backgroundMusic.pause();

        musicButton.textContent = "♫ Play Music";
    }
});


// Keep the button label synchronized with the audio
backgroundMusic.addEventListener("play", function () {
    musicButton.textContent = "♫ Pause Music";
});

backg