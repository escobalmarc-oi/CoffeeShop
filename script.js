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


// ===== ABOUT AUTO PLAY =====
if (window.location.pathname.includes("about.html") && globalAudio) {

    document.addEventListener("click", () => {
        if (globalAudio.paused) {
            globalAudio.src = "audio/musicc.mp3";
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


// ===== PRODUCT PAGE (IBINALIK — WALANG BINAGO) =====
const popup = document.getElementById("popup");

if (popup) {

    const productName = document.getElementById("product-name");
    const productPrice = document.getElementById("product-price");
    const qtyText = document.getElementById("qty");
    const successMsg = document.getElementById("success-msg");
    const totalText = document.getElementById("total");

    const minusBtn = document.getElementById("minus");
    const plusBtn = document.getElementById("plus");
    const confirmBtn = document.getElementById("confirm");
    const cancelBtn = document.getElementById("cancel");

    let quantity = 1;
    let currentPrice = 0;

    document.querySelectorAll(".order-btn").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseInt(button.getAttribute("data-price"));

            productName.textContent = name;
            productPrice.textContent = price;

            currentPrice = price;
            quantity = 1;

            qtyText.textContent = quantity;
            successMsg.style.display = "none";

            updateTotal();
            popup.style.display = "flex";
        });
    });

    if (minusBtn) {
        minusBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                qtyText.textContent = quantity;
                updateTotal();
            }
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener("click", () => {
            if (quantity < 10) {
                quantity++;
                qtyText.textContent = quantity;
                updateTotal();
            }
        });
    }

    function updateTotal() {
        totalText.textContent = currentPrice * quantity;
    }

    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            successMsg.style.display = "block";

            setTimeout(() => {
                popup.style.display = "none";
            }, 2000);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            popup.style.display = "none";
        });
    }
}