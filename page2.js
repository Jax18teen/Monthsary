/* ========================================
   OUR LITTLE UNIVERSE - PAGE 2
   Photo Focus Memories
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const memoryCards = document.querySelectorAll(".memory-card");
    const focusBackdrop = document.getElementById("focusBackdrop");
    const memoryDetail = document.getElementById("memoryDetail");

    const detailTitle = document.getElementById("detailTitle");
    const detailMessage = document.getElementById("detailMessage");

    const closeButton = document.getElementById("closeMemory");

    let activeCard = null;

    // Customize these messages for your own memories.
    const memories = [
        {
            title: "Our First Meet♡",
            message:
                "စစချင်းတွေ့တဲ့နေ့ကတည်းကသတိထားမိသွားတာကတော့ G-Fattရဲ့ သီချင်းတွေ တော်တော်များများလိုက်ဆိုနိုင်တာကိုစပြီးသတိထားမိသွားတာ အယ့်ကနေပဲ ရက်ပ်ပါမလေးကိုစကြွေတော့တာပါပဲ"
        },
        {
            title: "My First Guitar String Ring ✨",
            message:
                "ဒီတစ်ခုကတော့ပြောရမှာခက်သား ရည်းစားမဖြစ်ခင် ပြိုင်စရာလူတွေရှိခဲ့တော့ မောင်မောင်ဘက်ပါလာအောင်ဆိုပြီး ဘယ်သူ့ကိုမှမလုပ်ဖူးပေးတဲ့ ဂစ်တာကြိုးလက်စွပ်လေးစလုပ်ပေးဖူးတာပဲ ဟီးဟီး မဲဆွယ်လိုက်တာ"
        },
        {
            title: "Your Smile, My Happiness 🌷",
            message:
                "ဒါလေးကတော့ မောင်မောင်အရမ်းသဘောကျတဲ့အရာပဲ မောင်မောင်တို့ရည်းစားမဖြစ်ခင်ကတည်းက မောင်မောင်ကလေးလေးကိုပျော်စရာတွေကြီးပဲပေးချင်ခဲ့တာ အမြဲဝမ်းနည်းစရာတွေ နာကျင်စရာတွေကြုံခဲ့ရ‌တော့ မောင်မောင်လုပ်ပေးနိုင်သလောက်အရာတွေနဲ့ ပျော်စေချင်တာ အက်တာကြောင့်မို့လို့ မောင်မောင်ကလေးလေးအပြုံးလေးတွေကိုအရမ်းသဘောကျတာ"
        },
        {
            title: "Just You and Me 💕",
            message:
                "ဒါကတော့ ဘဝမှာ မိန်းကလေးတစ်ယောက်ကို video call ခေါ်ပြီး အိပ်တာစောင့်ပေးဖူးတာပဲ မှတ်မှတ်ရရ မင်းခန့်ကိုတောင်စလိုက်သေးတယ် သားကြီးငါကင်းစောင့်ပေးနေတယ်ဆိုပြီး ဟီး တစ်ကယ်တော့ ကိုယ့်ဘာသာ ရည်းစားလေးပေါက်ကရလုပ်မှာစိတ်ပူပြီးမအိပ်နိုင်ခဲ့တာပါ"
        },
        {
            title: "My Favorite Nickname From You🌙",
            message:
                "ဒီဟာကတော့ ဘာရယ်မှမဟုတ်ပါဘူး မတွဲရသေးခင် သူများကို ငြင်းမလိုလိုလက်ခံမလိုလိုနဲ့ အရှိန်တက်အောင်လုပ်နေတဲ့အချိန် အက်လိုလေးခေါ်လိုက်တဲ့အချိန် ဝမ်းနည်းပြီးငိုနေတာပါတိတ်သွားလောက်အောင် အရမ်းသဘောကျသွားလို့ အက်လိုခေါ်တာလေးကို"
        },
        {
            title: "More Memories to Come ♾️",
            message:
                "ဒါက အတူရှိတာ ပထမဆုံးလပဲရှိသေးတာမို့ မမျှော်လင့်ထားတဲ့ အရာတွေ ပျော်စရာတွေ အမှတ်တရတွေ အများကြီးဖန်တီးပေးဦးမှာမို့လို့ ဆက်ပြီးစောင့်ကြည့်ပေးပါဦးဗျာ"
        }
    ];

    // Open a selected memory.
    function openMemory(card) {

        const index = Number(card.dataset.memory);

        if (!Number.isInteger(index) ||
            index < 0 ||
            index >= memories.length) {
            return;
        }

        // Remove the previous focus.
        memoryCards.forEach((item) => {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        // Focus the chosen photo.
        activeCard = card;
        activeCard.classList.add("active");
        activeCard.setAttribute("aria-pressed", "true");

        // Display its personal memory.
        detailTitle.textContent = memories[index].title;
        detailMessage.textContent = memories[index].message;

        // Activate background blur.
        document.body.classList.add("has-focus");

        // Show the caption panel.
        memoryDetail.hidden = false;

        // Keep the caption panel visible on smaller screens.
        window.requestAnimationFrame(() => {
            memoryDetail.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        });
    }

    // Close the selected memory.
    function closeMemory() {

        if (!activeCard) {
            return;
        }

        const previousCard = activeCard;

        previousCard.classList.remove("active");
        previousCard.setAttribute("aria-pressed", "false");

        activeCard = null;

        document.body.classList.remove("has-focus");

        memoryDetail.hidden = true;

        // Return keyboard focus to the selected photo.
        previousCard.focus({ preventScroll: true });
    }

    // Handle photo clicks.
    memoryCards.forEach((card) => {

        card.setAttribute("aria-pressed", "false");

        card.addEventListener("click", () => {

            // Clicking the same photo again closes it.
            if (activeCard === card) {
                closeMemory();
                return;
            }

            openMemory(card);
        });

        // Show a graceful fallback if an image is missing.
        const img = card.querySelector("img");

        img.addEventListener("error", () => {
            img.alt = "Photo unavailable. Please check the image file.";
            img.style.opacity = "0.35";
        });

    });

    // Close button.
    closeButton.addEventListener("click", closeMemory);

    // Click the dark backdrop to close.
    focusBackdrop.addEventListener("click", closeMemory);

    // Escape key closes the selected memory.
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && activeCard) {
            closeMemory();
        }

    });

});

// ========================================
// PAGE 2 — FLOATING FLOWER PETALS 🌸
// Reused from Page 1
// ========================================

function createPetals() {
    const petalsContainer = document.getElementById("petals");

    if (!petalsContainer) return;

    // Prevent duplicate petals if initialized again
    if (petalsContainer.children.length > 0) return;

    const numberOfPetals = 24;

    for (let i = 0; i < numberOfPetals; i++) {
        const petal = document.createElement("span");

        petal.classList.add("petal");

        // Random horizontal position
        petal.style.left = Math.random() * 100 + "%";

        // Random falling speed
        petal.style.setProperty(
            "--duration",
            (10 + Math.random() * 12) + "s"
        );

        // Different starting times
        petal.style.setProperty(
            "--delay",
            (-Math.random() * 20) + "s"
        );

        // Gentle breeze movement
        petal.style.setProperty(
            "--drift",
            (-70 + Math.random() * 140) + "px"
        );

        // Random size
        const size = 0.6 + Math.random() * 0.8;
        petal.style.scale = String(size);

        petalsContainer.appendChild(petal);
    }
}

// Create petals when the page is ready
createPetals();