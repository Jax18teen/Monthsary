/* ========================================
   MG MG'S KALAYLAY — PAGE 3
   Secret Envelope & Final Surprise
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Elements
    const passwordForm = document.getElementById("passwordForm");
    const passwordInput = document.getElementById("secretPassword");
    const passwordError = document.getElementById("passwordError");
    const togglePassword = document.getElementById("togglePassword");

    const passwordSection = document.getElementById("passwordSection");
    const envelopeSection = document.getElementById("envelopeSection");
    const openEnvelope = document.getElementById("openEnvelope");
    const surpriseContent = document.getElementById("surpriseContent");

    const surpriseVideo = document.getElementById("surpriseVideo");

    // Change this if you want to use a different password.
    const SECRET_PASSWORD = "2092026";

    let envelopeOpened = false;

    /* ------------------------------------
   1. Create floating flower petals 🌸
------------------------------------ */

function createPetals() {
    const petalsContainer = document.getElementById("petals");

    if (!petalsContainer) return;

    // Prevent duplicate petals
    if (petalsContainer.children.length > 0) return;

    const fragment = document.createDocumentFragment();
    const numberOfPetals = 24;

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement("span");

        petal.className = "petal";

        petal.style.left = Math.random() * 100 + "%";

        petal.style.setProperty(
            "--duration",
            (10 + Math.random() * 12) + "s"
        );

        petal.style.setProperty(
            "--delay",
            (-Math.random() * 20) + "s"
        );

        petal.style.setProperty(
            "--drift",
            (-70 + Math.random() * 140) + "px"
        );

        const size = 0.6 + Math.random() * 0.8;
        petal.style.scale = String(size);

        fragment.appendChild(petal);
    }

    petalsContainer.appendChild(fragment);
}

createPetals();

    /* ------------------------------------
       2. Show / hide password
    ------------------------------------ */

    togglePassword.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";

        passwordInput.type = isHidden ? "text" : "password";

        togglePassword.setAttribute(
            "aria-label",
            isHidden ? "Hide password" : "Show password"
        );
    });

    /* ------------------------------------
       3. Check password
    ------------------------------------ */

    passwordForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === SECRET_PASSWORD) {

            passwordError.textContent = "";

            passwordSection.hidden = true;
            envelopeSection.hidden = false;

            // Move focus to the envelope for keyboard users.
            openEnvelope.focus({ preventScroll: true });

            envelopeSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            passwordError.textContent =
                "Not quite, my love. Try our special number again. ♡";

            passwordInput.value = "";
            passwordInput.focus();

            passwordInput.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(5px)" },
                    { transform: "translateX(-3px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 280,
                    easing: "ease-in-out"
                }
            );
        }
    });

    /* ------------------------------------
       4. Open the envelope
    ------------------------------------ */

    openEnvelope.addEventListener("click", () => {

        if (envelopeOpened) return;

        envelopeOpened = true;

        openEnvelope.classList.add("is-open");

        openEnvelope.setAttribute("aria-expanded", "true");

        openEnvelope.setAttribute(
            "aria-label",
            "Your love letter is open"
        );

        openEnvelope.disabled = true;

        // Let the envelope animation finish before revealing the letter.
        window.setTimeout(() => {

            surpriseContent.hidden = false;

            surpriseContent.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Keep keyboard navigation within the natural document flow.
            const letterHeading = surpriseContent.querySelector("h2");

            if (letterHeading) {
                letterHeading.setAttribute("tabindex", "-1");
            }

        }, 950);
    });

    /* ------------------------------------
       5. Video error handling
    ------------------------------------ */

    if (surpriseVideo) {

        surpriseVideo.addEventListener("error", () => {

            let message = document.getElementById("videoError");

            if (!message) {
                message = document.createElement("p");
                message.id = "videoError";
                message.className = "video-note";
                message.setAttribute("role", "alert");

                surpriseVideo.parentElement.insertAdjacentElement(
                    "afterend",
                    message
                );
            }

            message.textContent =
                "The video could not be loaded. Please check that " +
                "our-video.mp4 is in the same folder as page3.html.";

        });

        surpriseVideo.addEventListener("loadedmetadata", () => {

            const message = document.getElementById("videoError");

            if (message) {
                message.remove();
            }

        });
    }

});

document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("backgroundMusic");
    const video = document.getElementById("surpriseVideo");

    if (!music || !video) return;

    // Try to autoplay background music when Page 3 loads
    music.volume = 0.35;

    music.play().catch(() => {
        // Some browsers require the user to interact first.
        console.log("Music autoplay was blocked by the browser.");
    });

    // Pause music when the surprise video starts playing
    video.addEventListener("play", () => {
        music.pause();
    });

    // Resume music when the video is paused
    video.addEventListener("pause", () => {
        if (!video.ended) {
            music.play().catch(() => {});
        }
    });

    // Resume music after the video finishes
    video.addEventListener("ended", () => {
        music.play().catch(() => {});
    });
});