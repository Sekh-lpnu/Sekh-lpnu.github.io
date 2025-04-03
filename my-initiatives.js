document.addEventListener("DOMContentLoaded", function () {
    const myInitiativesContainer = document.querySelector(".container-myinit");

    let savedInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];
    let savedCounts = JSON.parse(localStorage.getItem("volunteersNeeded")) || {};

    savedInitiatives.forEach((initiative) => {
        if (savedCounts[initiative.title] !== undefined) {
            initiative.needed = savedCounts[initiative.title];
        }

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${initiative.image}" alt="${initiative.title}" class="card__image">
            <h3>${initiative.title}</h3>
            <p>Дата: ${new Date(initiative.date).toLocaleDateString("uk-UA")}</p>
            <p>Місце: ${initiative.location}</p>
            <p>Потрібно волонтерів: <span class="needed-count">${initiative.needed}</span></p>
            <button class="remove-button">Видалити</button>
        `;

        const removeButton = card.querySelector(".remove-button");
        removeButton.addEventListener("click", function () {
            savedInitiatives = savedInitiatives.filter(item => item.title !== initiative.title);
            localStorage.setItem("myInitiatives", JSON.stringify(savedInitiatives));

            if (initiative.needed !== "необмежено") {
                savedCounts[initiative.title] = (savedCounts[initiative.title] || 0) + 1;
                localStorage.setItem("volunteersNeeded", JSON.stringify(savedCounts));
            }

            card.remove();
        });

        myInitiativesContainer.appendChild(card);
    });

    // Обробник події для кнопки "Додати нову ініціативу"
    const addInitiativeBtn = document.querySelector(".add-initiative-btn");

    if (addInitiativeBtn) {
        addInitiativeBtn.addEventListener("click", function () {
            window.location.href = "initiatives.html#initiatives-container"; // Додаємо хеш для переходу
        });
    }

    // Якщо є хеш у URL, скролимо до цього блоку
    if (window.location.hash === "#initiatives-container") {
        const targetElement = document.getElementById("initiatives-container");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "auto" });
        }
    }
});
