document.addEventListener("DOMContentLoaded", function () {
    const initiativesContainer = document.getElementById("initiatives-container");
    const filterDropdown = document.getElementById("initiative-filter"); // Випадаючий список

    let initiativesData = [
        { title: "Плетіння сіток для військових", date: "2025-03-10", location: "Центральний парк", needed: 15, image: "1initiatives.jpg" },
        { title: "Мирний протест", date: "2025-03-18", location: "Сквер Дружби", needed: 200, image: "3initiatives.jpg" },
        { title: "Збір продуктів для нужденних", date: "2025-03-15", location: "Волонтерський центр", needed: 16, image: "4initiatives.jpg" },
        { title: "Висадка дерев", date: "2025-03-20", location: "Центральний парк", needed: 20, image: "7initiatives.jpg" },
        { title: "Прибирання сміття", date: "2025-03-22", location: "Центральний пляж", needed: 50, image: "6initiatives.jpg" },
        { title: "Допомога притулку для тварин", date: "2025-03-25", location: "Притулок 'Добрий друг'", needed: 12, image: "5initiatives.jpg" }
    ];

    let savedCounts = JSON.parse(localStorage.getItem("volunteersNeeded")) || {};

    // Оновлення кількості волонтерів на основі збережених даних
    initiativesData.forEach(initiative => {
        if (savedCounts[initiative.title] !== undefined) {
            initiative.needed = savedCounts[initiative.title]; // Встановлюємо правильну кількість волонтерів для кожної ініціативи
        }
    });

    // Функція для створення карток ініціатив
    function createInitiatives(initiatives) {
        initiativesContainer.innerHTML = ''; // Очищаємо контейнер перед додаванням нових карток

        initiatives.forEach((initiative) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${initiative.image}" alt="${initiative.title}" class="card__image">
                <h3>${initiative.title}</h3>
                <p>Дата: ${new Date(initiative.date).toLocaleDateString("uk-UA")}</p>
                <p>Місце: ${initiative.location}</p>
                <p>Потрібно волонтерів: <span class="needed-count">${initiative.needed}</span></p>
                <button class="card__button">Приєднатися</button>
            `;

            const button = card.querySelector(".card__button");
            const neededCount = card.querySelector(".needed-count");

            let savedInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];

            // Перевірка, чи користувач вже приєднався до цієї ініціативи
            if (savedInitiatives.some(item => item.title === initiative.title)) {
                button.textContent = "Ви приєдналися";
                button.disabled = true;
            }

            button.addEventListener("click", function () {
                let savedInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];

                // Якщо ініціатива ще не в списку, додаємо її
                if (!savedInitiatives.some(item => item.title === initiative.title)) {
                    initiative.needed--; // Зменшуємо кількість волонтерів
                    savedCounts[initiative.title] = initiative.needed; // Оновлюємо кількість в savedCounts
                    localStorage.setItem("volunteersNeeded", JSON.stringify(savedCounts)); // Зберігаємо в localStorage

                    savedInitiatives.push(initiative);
                    localStorage.setItem("myInitiatives", JSON.stringify(savedInitiatives)); // Зберігаємо ініціативу в списку користувача
                }

                // Оновлюємо відображену кількість волонтерів на картці
                neededCount.textContent = initiative.needed;
                this.textContent = "Ви приєдналися";
                this.disabled = true;
            });

            initiativesContainer.appendChild(card);
        });
    }

    // Фільтруємо ініціативи за поточною датою
    function filterAvailableInitiatives() {
        const currentDate = new Date();
        const availableInitiatives = initiativesData.filter(initiative => new Date(initiative.date) >= currentDate);
        createInitiatives(availableInitiatives); // Створюємо картки для доступних ініціатив
    }

    // Показуємо всі ініціативи
    function showAllInitiatives() {
        createInitiatives(initiativesData);
    }

    // Обробник для випадаючого списку
    filterDropdown.addEventListener("change", function () {
        if (filterDropdown.value === "available") {
            filterAvailableInitiatives(); // Фільтрація доступних ініціатив
        } else {
            showAllInitiatives(); // Показати всі ініціативи
        }
    });

    // Початковий показ усіх ініціатив
    showAllInitiatives();
});
