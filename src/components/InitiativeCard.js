import React, { useState } from 'react';
import { auth } from '../firebasedb';  // Імпортуємо автентифікацію

const InitiativeCard = ({ initiative, onJoin, isJoined }) => {
    const [userRating, setUserRating] = useState(0); // Оцінка користувача для цієї ініціативи
    const [isSubmitting, setIsSubmitting] = useState(false); // Стан для відправки оцінки

    const handleRating = async (rating) => {
        // Перевірка, чи авторизований користувач
        if (!auth.currentUser) {
            alert("Вам потрібно увійти, щоб залишити оцінку.");
            return;
        }

        // Оновлення оцінки для цієї ініціативи в локальному стейті
        setUserRating(rating);

        // Відправка оцінки на сервер
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/initiative/${initiative.id}/ratings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, userId: auth.currentUser.uid }),
            });

            if (!response.ok) {
                throw new Error("Помилка при збереженні оцінки");
            }

            alert("Оцінка успішно збережена!");
        } catch (error) {
            alert("Щось пішло не так: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card" key={initiative.id}>
            <img src={initiative.image} alt={initiative.title} className="card__image" />
            <h3>{initiative.title}</h3>
            <p>Дата: {new Date(initiative.date).toLocaleDateString("uk-UA")}</p>
            <p>Місце: {initiative.location}</p>
            <p>Потрібно волонтерів: <span className="needed-count">{initiative.needed}</span></p>

            {/* Оцінка ініціативи за допомогою зірок */}
            <div className="rating">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={`star ${star <= userRating ? 'filled' : ''}`}
                        onClick={() => handleRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <button 
                className="card__button"
                onClick={() => onJoin(initiative)} 
                disabled={isJoined || isSubmitting}
            >
                {isJoined ? "Ви приєдналися" : "Приєднатися"}
            </button>
        </div>
    );
};

export default InitiativeCard;
