import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';  // Ваш компонент Navbar
import Footer from '../components/Footer';  // Ваш компонент Footer
import { useNavigate } from 'react-router-dom'; // Для переходу через React Router
import '../styles/MyInitiatives.css'; 

const MyInitiatives = () => {
    const [savedInitiatives, setSavedInitiatives] = useState([]);
    const [savedCounts, setSavedCounts] = useState({});
    const navigate = useNavigate(); // Ініціалізація navigate

    useEffect(() => {
        // Отримуємо збережені ініціативи та волонтерів з localStorage
        const savedInitiativesFromStorage = JSON.parse(localStorage.getItem("myInitiatives")) || [];
        const savedCountsFromStorage = JSON.parse(localStorage.getItem("volunteersNeeded")) || {};

        // Оновлюємо кількість волонтерів для кожної ініціативи
        const updatedInitiatives = savedInitiativesFromStorage.map((initiative) => {
            if (savedCountsFromStorage[initiative.title] !== undefined) {
                initiative.needed = savedCountsFromStorage[initiative.title];
            }
            return initiative;
        });

        setSavedInitiatives(updatedInitiatives);
        setSavedCounts(savedCountsFromStorage);
    }, []);

    const handleRemove = (initiative) => {
        // Оновлюємо список ініціатив, видаляючи вибрану
        const updatedInitiatives = savedInitiatives.filter(item => item.title !== initiative.title);
        setSavedInitiatives(updatedInitiatives);
        localStorage.setItem("myInitiatives", JSON.stringify(updatedInitiatives));

        // Оновлюємо кількість волонтерів
        const updatedSavedCounts = { ...savedCounts };
        if (initiative.needed !== "необмежено") {
            updatedSavedCounts[initiative.title] = (updatedSavedCounts[initiative.title] || 0) + 1;
            setSavedCounts(updatedSavedCounts);
            localStorage.setItem("volunteersNeeded", JSON.stringify(updatedSavedCounts));
        }
    };

    const handleAddInitiative = () => {
        navigate("/initiatives#initiatives-container");  // Використовуємо React Router для навігації
    };

    return (
        <div>
          <Navbar />
      
          <section id="my-initiatives" className="about__inner">
            <div className="container-myinit">
              <h2 className="about__title">Мої ініціативи</h2>
              <p className="about__description">
                Тут ви можете побачити ініціативи, до яких ви приєдналися. Дякуємо за вашу активність та внесок у розвиток спільноти!
              </p>
            
              {savedInitiatives.length === 0 ? (
                <p className='no-init'>У вас ще немає ініціатив</p>
              ) : (
                
                <div className="initiatives-list">
                  {savedInitiatives.map((initiative) => (
                    <div className="card" key={initiative.title}>
                      <img src={initiative.image} alt={initiative.title} className="card__image" />
                      <h3>{initiative.title}</h3>
                      <p>Дата: {new Date(initiative.date).toLocaleDateString("uk-UA")}</p>
                      <p>Місце: {initiative.location}</p>
                      <p>
                        Потрібно волонтерів:{" "}
                        <span className="needed-count">{initiative.needed}</span>
                      </p>
                      <button
                        className="remove-button"
                        onClick={() => handleRemove(initiative)}
                      >
                        Видалити
                      </button>
                    </div>
                  ))}
                </div>
              )}
      
              <button className="add-initiative-btn" onClick={handleAddInitiative}>
                Додати нову ініціативу
              </button>
            </div>
          </section>
      
          <Footer />
        </div>
      );
};

export default MyInitiatives;
