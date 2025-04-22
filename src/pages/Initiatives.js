import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from '../firebasedb'; // Імпорт бази даних

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Initiatives.css';
import mainph from '../assets/mainph.jpg';
import RegistrationForm from '../components/RegistrationForm';

const Initiatives = () => {
    const [initiativesData, setInitiativesData] = useState([]);
    const [filter, setFilter] = useState({ type: 'all', location: 'all', date: 'all' });
    const [savedCounts, setSavedCounts] = useState(JSON.parse(localStorage.getItem("volunteersNeeded")) || {});
    const [selectedInitiative, setSelectedInitiative] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRatings, setUserRatings] = useState({}); // Створюємо стан для рейтингу кожної ініціативи
    const [averageRating, setAverageRating] = useState(null); // Додаємо стан для збереження середнього рейтингу

    const auth = getAuth(); // Для доступу до автентифікації

    // Завантаження ініціатив з Firestore
    useEffect(() => {
        const fetchInitiatives = async () => {
            const querySnapshot = await getDocs(collection(db, "initiatives"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Отримуємо середній рейтинг для кожної ініціативи з вашого сервера
            for (let initiative of data) {
                const response = await fetch(`/api/initiative/${initiative.id}/ratings`);
                const result = await response.json();

                if (result.averageRating) {
                    initiative.averageRating = result.averageRating;  // Додаємо середній рейтинг
                } else {
                    initiative.averageRating = 0;  // Якщо рейтинг не знайдено
                }
            }

            setInitiativesData(data);
        };

        fetchInitiatives();
    }, [savedCounts]);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isModalOpen]);

    const handleJoin = (initiative) => {
        setSelectedInitiative(initiative);
        setIsModalOpen(true);
    };

    const handleRegister = (formData) => {
        let savedInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];

        if (!savedInitiatives.some(item => item.title === selectedInitiative.title)) {
            selectedInitiative.needed--;
            const updatedCounts = { ...savedCounts, [selectedInitiative.title]: selectedInitiative.needed };
            setSavedCounts(updatedCounts);
            localStorage.setItem("volunteersNeeded", JSON.stringify(updatedCounts));

            savedInitiatives.push({ ...selectedInitiative, user: formData });
            localStorage.setItem("myInitiatives", JSON.stringify(savedInitiatives));
        }

        setIsModalOpen(false);
    };

    const isJoined = (initiative) => {
        const savedInitiatives = JSON.parse(localStorage.getItem("myInitiatives")) || [];
        return savedInitiatives.some(item => item.title === initiative.title);
    };

    const handleRating = async (initiative, rating) => {
        if (!auth.currentUser) {
            alert("Будь ласка, увійдіть, щоб залишити оцінку");
            return;
        }

        const userId = auth.currentUser.uid;
        
        // Відправляємо оцінку на сервер
        const response = await fetch(`/api/initiative/${initiative.id}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating }),
        });

        if (response.ok) {
            alert("Вашу оцінку було успішно додано!");
            
            // Оновлюємо рейтинг на клієнті
            const updatedInitiative = { ...initiative };
            updatedInitiative.ratings = updatedInitiative.ratings || [];
            updatedInitiative.ratings.push({ userId, rating });

            const total = updatedInitiative.ratings.reduce((acc, item) => acc + item.rating, 0);
            const average = total / updatedInitiative.ratings.length;

            setUserRatings(prev => ({ ...prev, [initiative.id]: rating }));
            setAverageRating(average);
        } else {
            alert("Помилка при додаванні оцінки");
        }
    };

    const filterInitiatives = () => {
        const currentDate = new Date();
        const { type, location, date } = filter;

        return initiativesData.filter(initiative => {
            const isTypeMatch = type === 'all' || initiative.type === type;
            const isLocationMatch = location === 'all' || initiative.location === location;
            const isDateMatch = date === 'all' || new Date(initiative.date) >= currentDate;

            return isTypeMatch && isLocationMatch && isDateMatch;
        });
    };

    return (
        <div>
            <Navbar />
            <section id="initiatives" className="intro">
                <div className="init-container">
                    <h1 className="init-mainhead">Доступні ініціативи</h1>
                    <p className="init-subheading">Долучайтеся до наших волонтерських програм!</p>
                    <div className="init__intro-container">
                        <div className="init__intro-text">
                        <p>Ми віримо, що кожен може зробити свій внесок у покращення навколишнього світу. Наші волонтерські заходи охоплюють різні напрямки: від допомоги нужденним до створення комфортних громадських просторів. Кожен волонтер — це не просто людина, яка віддає свій час, але й частинка великої команди, яка змінює життя на краще.</p>
                        </div>
                        <div className="init__intro-image">
                            <img src={mainph} alt="Наші учасники" />
                        </div>
                    </div>

                    <h2 className="init-intro__title">Оберіть свою ініціативу</h2>

                    <div className="filter-container">
                        <select 
                            className="filter-dropdown"
                            onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))} 
                            value={filter.type}
                        >
                            <option value="all">Усі типи</option>
                            <option value="Екологія">Екологія</option>
                            <option value="Допомога тваринам">Допомога тваринам</option>
                            <option value="Соціальна підтримка">Соціальна підтримка</option>
                            <option value="Допомога військовим">Допомога військовим</option>
                            <option value="Протести">Протести</option>
                        </select>

                        <select 
                            className="filter-dropdown"
                            onChange={(e) => setFilter(prev => ({ ...prev, location: e.target.value }))} 
                            value={filter.location}
                        >
                            <option value="all">Усі місця</option>
                            <option value="Центральний парк">Центральний парк</option>
                            <option value="Сквер Дружби">Сквер Дружби</option>
                            <option value="Волонтерський центр">Волонтерський центр</option>
                            <option value="Центральний пляж">Центральний пляж</option>
                            <option value="Притулок 'Добрий друг'">Притулок 'Добрий друг'</option>
                        </select>

                        <select 
                            className="filter-dropdown"
                            onChange={(e) => setFilter(prev => ({ ...prev, date: e.target.value }))} 
                            value={filter.date}
                        >
                            <option value="all">Усі дати</option>
                            <option value="available">Доступні на майбутнє</option>
                        </select>
                    </div>

                    <div className="grid" id="initiatives-container">
                        {filterInitiatives().map(initiative => (
                            <div className="card" key={initiative.id}>
                                <img src={initiative.image} alt={initiative.title} className="card__image" />
                                <h3>{initiative.title}</h3>
                                <p>Дата: {initiative.date}</p>
                                <p>Місце: {initiative.location}</p>
                                <p>Потрібно волонтерів: {initiative.needed}</p>
                                <button
                                    className="card__button"
                                    onClick={() => handleJoin(initiative)}
                                    disabled={isJoined(initiative)}
                                >
                                    {isJoined(initiative) ? "Ви приєдналися" : "Приєднатися"}
                                </button>
                                {/* Кнопки для оцінки */}
                                {auth.currentUser && (
                                    <div className="rating-container">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span
                                                key={star}
                                                onClick={() => handleRating(initiative, star)}
                                                className={`star ${star <= (userRatings[initiative.id] || initiative.averageRating) ? 'filled' : ''}`}
                                            >
                                                &#9733;
                                            </span>
                                        ))}
                                        <p>Середній рейтинг: {initiative.averageRating.toFixed(2)}</p> {/* Виводимо середній рейтинг */}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isModalOpen && <RegistrationForm onSubmit={handleRegister} />}
            <Footer />
        </div>
    );
};

export default Initiatives;
