// ===== GLOBAL AUDIO PLAYER =====
const globalAudio = document.getElementById("globalAudio");
const btn = document.getElementById("music-btn");

if (globalAudio) {

    // Load last state (FOR MUSIC PAGE ONLY)
    window.addEventListener("load", () => {
        const savedSrc = localStorage.getItem("musicSrc");
        const isPlaying = localStorage.getItem("isPlaying");

        // 👉 wag gamitin saved music sa ABOUT page
        if (!window.location.pathname.includes("about.html")) {
            if (savedSrc) {
                globalAudio.src = savedSrc;

                if (isPlaying === "true") {
                    // optional: pwede mo i-play kung gusto mo
                }
            }
        }
    });

    // 🔥 ONE FUNCTION (FIXED)
    window.togglePlay = function (src = null) {

        // =========================
        // 👉 ABOUT PAGE (force own music)
        // =========================
        if (window.location.pathname.includes("about.html")) {

            const aboutMusic = "audio/musicc.mp3";

            // always override kahit may ibang music
            if (!globalAudio.src.includes(aboutMusic)) {
                globalAudio.src = aboutMusic;
            }

            if (globalAudio.paused) {
                globalAudio.play();
                if (btn) btn.innerHTML = "☕";
            } else {
                globalAudio.pause();
                if (btn) btn.innerHTML = "▶";
            }

            return;
        }

        // =========================
        // 👉 MUSIC PAGE (normal behavior)
        // =========================
        if (src) {
            if (globalAudio.src.includes(src)) {
                if (globalAudio.paused) {
                    globalAudio.play();
                    localStorage.setItem("isPlaying", "true");
                } else {
                    globalAudio.pause();
                    localStorage.setItem("isPlaying", "false");
                }
            } else {
                globalAudio.src = src;
                globalAudio.play();

                localStorage.setItem("musicSrc", src);
                localStorage.setItem("isPlaying", "true");
            }
        }
    };
}


// ===== ABOUT AUTO PLAY (CLICK REQUIRED SA MOBILE) =====
if (window.location.pathname.includes("about.html") && globalAudio) {

    document.addEventListener("click", () => {
        if (globalAudio.paused) {
            globalAudio.src = "audio/musicc.mp3"; // force about music
            globalAudio.play();
            if (btn) btn.innerHTML = "☕";
        }
    }, { once: true });

}


// ===== STOP PAG LUMIPAT NG PAGE =====
window.addEventListener("beforeunload", () => {
    if (globalAudio) {
        globalAudio.pause();
    }
});