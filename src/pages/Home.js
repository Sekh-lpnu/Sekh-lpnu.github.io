import React from 'react';
import Navbar from '../components/Navbar';  // імпорт навбару
import Footer from '../components/Footer';  // імпорт футера
import '../styles/Home.css';  // підключення стилів для цієї сторінки
import mainph4 from '../assets/mainph4.jpg';  // імпорт зображень
import mainph2 from '../assets/mainph2.jpg';
import mainph3 from '../assets/mainph3.jpg';
import Main2 from '../assets/Main2.jpg';


const Home = () => {
  return (
    <div>
      <Navbar />  
      
      <section id="main-content" className="main-content">
      <div className="hero" style={{ backgroundImage: `url(${Main2})` }}>
          <div className="text-container">
            <h1 className="mainhead">
              Українська 
              <br />
              <span className="subheading">Волонтерська Служба</span>
            </h1>
            <div className="description">
              Волонтерство — це не просто спільнота однодумців, а платформа спільних цінностей та світоглядів.
            </div>
          </div>
        </div>

        <div className="container">
          <div className="photo-gallery">
            <img src={mainph4} alt="Фото 1" />
            <img src={mainph2} alt="Фото 2" />
            <img src={mainph3} alt="Фото 3" />
          </div>

          <section id="about" className="details">
            <div className="container details__inner">
              <h2 className="details__title">Про нас</h2>
              <p className="details__subtitle">
                Українська Волонтерська Cлужба — громадська організація, заснована у 2017 році. Наша мета — розвивати культуру волонтерства та взаємодопомоги в Україні. З початку повномасштабної російсько-української війни ми надаємо різнобічну підтримку та продовжуємо створювати можливості для волонтерського руху.
                <br /><br />
                Волонтерство — це те, що допомагає нам, громадянам, змінювати країну зсередини та власноруч творити майбутнє, втілюючи в життя мрію про успішну Україну, де кожен має рівні можливості й може брати участь у вирішенні соціальних проблем. Завдяки волонтерству кожен може докласти зусиль для наближення перемоги та допомогти тим, хто цього потребує.
                <br /><br />
                Саме тому ми підтримуємо, навчаємо та об’єднуємо волонтерів з організаціями, яким потрібна допомога. Ми завжди поряд, щоб бути опорою та підтримкою для тих, хто дбає про інших.
                <br /><br />
                ВІЗІЯ
                <br />
                Ми прагнемо створити Україну, у якій кожна людина — незалежно від віку, статі, соціального статусу, культурного чи етнічного походження — може реалізувати себе в допомозі іншим.
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />  {/* Використовуємо Footer компонент */}
    </div>
  );
}

export default Home;
