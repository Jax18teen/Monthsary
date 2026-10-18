const music = document.getElementById("backgroundMusic");

const TIME_KEY = "ourUniverseMusicTime";
const PLAYING_KEY = "ourUniverseMusicPlaying";

let savedTime = Number(sessionStorage.getItem(TIME_KEY)) || 0;
let wasPlaying = sessionStorage.getItem(PLAYING_KEY) === "true";

// Restore the saved song position
music.addEventListener("loadedmetadata", () => {
    if (savedTime > 0 && savedTime < music.duration) {
        music.currentTime = savedTime;
    }

    if (wasPlaying) {
        music.play().catch(() => {
            // Browser may require the user to tap Play.
            console.log("Tap the music button to continue playback.");
        });
    }
}, { once: true });

// Save progress while the song plays
music.addEventListener("timeupdate", () => {
    if (!music.paused) {
        sessionStorage.setItem(TIME_KEY, music.currentTime);
        sessionStorage.setItem(PLAYING_KEY, "true");
    }
});

// Save the final position before changing pages
window.addEventListener("pagehide", () => {
    if (!music.paused && !music.ended) {
        sessionStorage.setItem(TIME_KEY, music.currentTime);
        sessionStorage.setItem(PLAYING_KEY, "true");
    } else {
        sessionStorage.setItem(TIME_KEY, music.currentTime);
        sessionStorage.setItem(PLAYING_KEY, "false");
    }
});