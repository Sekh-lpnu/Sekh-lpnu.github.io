document.addEventListener("DOMContentLoaded", function () {
    const initiativesData = [
        { title: "Плетіння сіток для військових", date: [2025, 2, 10], location: "Центральний парк", needed: 15, image: "1initiatives.jpg" },
        { title: "Мирний протест", date: [2025, 2, 12], location: "Сквер Дружби", needed: "необмежено", image: "3initiatives.jpg" },
        { title: "Збір продуктів для нужденних", date: [2025, 2, 15], location: "Волонтерський центр", needed: 10, image: "4initiatives.jpg" },
        { title: "Висадка дерев", date: [2025, 2, 20], location: "Центральний парк", needed: 20, image: "7initiatives.jpg" },
        { title: "Прибирання сміття", date: [2025, 2, 22], location: "Центральний пляж", needed: 50, image: "6initiatives.jpg" },
        { title: "Допомога притулку для тварин", date: [2025, 2, 25], location: "Притулок 'Добрий друг'", needed: 12, image: "5initiatives.jpg" }
    ];

    const today = new Date();
    const initiativesContainer = document.querySelector("#initiatives .grid"); // Правильний селектор
    const myInitiativesContainer = document.querySelector("#my-initiatives .container-myinit");

    if (!initiativesContainer) {
        console.error("Container for initiatives not found!");
        return;
    }

    // Завантажуємо збережені ініціативи користувача
    const savedInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];

    initiativesData.forEach((initiative) => {
        const eventDate = new Date(...initiative.date);
        if (eventDate < today) return; // Приховуємо прострочені ініціативи

        const card = createCard(initiative);
        initiativesContainer.appendChild(card);
    });

    // Відображаємо збережені ініціативи
    savedInitiatives.forEach((initiative) => {
        const myCard = createCard(initiative, true);
        myInitiativesContainer.appendChild(myCard);
    });

    function createCard(initiative, isMyInitiative = false) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${initiative.image}" alt="${initiative.title}" class="card__image">
            <h3>${initiative.title}</h3>
            <p>Дата: ${new Date(...initiative.date).toLocaleDateString("uk-UA")}</p>
            <p>Місце: ${initiative.location}</p>
            <p>Потрібно волонтерів: <span class="needed-count">${initiative.needed}</span></p>
            ${!isMyInitiative ? '<button class="card__button">Приєднатися</button>' : ''}
        `;

        if (!isMyInitiative) {
            const button = card.querySelector(".card__button");
            button.addEventListener("click", function () {
                if (initiative.needed !== "необмежено" && initiative.needed > 0) {
                    initiative.needed--;
                    card.querySelector(".needed-count").textContent = initiative.needed;
                }

                this.textContent = "Ви приєдналися";
                this.disabled = true;

                const myCard = createCard(initiative, true);
                myInitiativesContainer.appendChild(myCard);

                // Зберігаємо в LocalStorage
                savedInitiatives.push(initiative);
                localStorage.setItem("myInitiatives", JSON.stringify(savedInitiatives));
            });
        }

        return card;
    }
});
