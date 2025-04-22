// About.js

import React from 'react';
import Navbar from '../components/Navbar.js'; // Відносний шлях для імпорту з іншої папки
import Footer from '../components/Footer.js';
import '../styles/About.css'; 
import team3 from '../assets/team3.jpeg'; 
import team2 from '../assets/team2.png';
import team from '../assets/team.jpg';
import team1 from '../assets/team.jpg';

const About = () => {
  return (
    <div>
      {/* Додаємо компонент Navbar */}
      <Navbar />

      {/* Блок "Про нас" */}
      <section id="about2" className="details2">
        <div className="container details__inner2">
          <h2 className="details__title2">Про нас</h2>
          <p className="details__subtitle2">
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

      {/* Блок "Наша команда" */}
      <section id="team" className="team">
        <h2 className="team__title">Наша команда</h2>
        <div className="team__members">
          {/* Член команди 1 */}
          <div className="team__member">
            <img src={team} alt="Член команди 1" />
            <div className="team__info">
              <p className="team__name">Анна Бондаренко</p>
              <p className="team__age">35 років</p>
              <p className="team__position">Координатор проектів</p>
              <p className="team__duration">В компанії: 3 роки</p>
            </div>
          </div>

          {/* Член команди 2 */}
          <div className="team__member">
            <img src={team2} alt="Член команди 2" />
            <div className="team__info">
              <p className="team__name">Наталія Калантаєнко</p>
              <p className="team__age">28 років</p>
              <p className="team__position">Менеджер по роботі з волонтерами</p>
              <p className="team__duration">В компанії: 2 роки</p>
            </div>
          </div>

          {/* Член команди 3 */}
          <div className="team__member">
            <img src={team1} alt="Член команди 3" />
            <div className="team__info">
              <p className="team__name">Анастасія Юрганова</p>
              <p className="team__age">40 років</p>
              <p className="team__position">Фінансовий аналітик</p>
              <p className="team__duration">В компанії: 5 років</p>
            </div>
          </div>

          {/* Член команди 4 */}
          <div className="team__member">
            <img src={team3} alt="Член команди 4" />
            <div className="team__info">
              <p className="team__name">Олена Гречко</p>
              <p className="team__age">30 років</p>
              <p className="team__position">PR-менеджер</p>
              <p className="team__duration">В компанії: 1 рік</p>
            </div>
          </div>
        </div>
      </section>

      {/* Блок "Цінності" */}
      <section id="values" className="values">
        <h2 className="values__title">НАШІ ЦІННОСТІ</h2>
        <div className="values__grid">
          <div className="value__item love">
            <h3>Любов</h3>
            <p>Волонтерство — це не просто спільнота однодумців, а платформа спільних цінностей та світоглядів. Ми переконані, що допомагаючи іншим, ти не тільки робиш добру справу, але й ділишся своєю любов’ю та теплом.</p>
          </div>

          <div className="value__item freedom">
            <h3>Свобода</h3>
            <p>Кожен з нас є вільним у виборі способу, часу та сфери свого волонтерства. Ми поважаємо свободу інших людей та не зазіхаємо на неї. Ми дозволяємо собі та іншим бути гнучкими та шукати свій шлях.</p>
          </div>

          <div className="value__item growth">
            <h3>Розвиток</h3>
            <p>Волонтерство є одним з найкращих джерел для саморозвитку. Роблячи добрі справи, ми професійно зростаємо, випробовуємо себе в чомусь новому та цілісно розкриваємо свій потенціал.</p>
          </div>

          <div className="value__item responsibility">
            <h3>Відповідальність</h3>
            <p>Ми несемо відповідальність за результат наших дій як перед собою, так і перед спільнотою, містом, країною, світом. Ми беремо відповідальність за вирішення тих проблем, які нас турбують.</p>
          </div>

          <div className="value__item love-ukraine">
            <h3>Любов до України</h3>
            <p>Як свідомі громадяни, ми любимо й цінуємо свою країну та прагнемо своїми діями зробити її більш успішною. Ми не підтримуємо агресію щодо України та активно боремося за її свободу.</p>
          </div>

          <div className="value__item unity">
            <h3>Єдність</h3>
            <p>Ми віримо в силу спільноти. Об’єднуючи зусилля, ми стаємо сильнішими та ефективнішими. Разом ми можемо подолати будь-які труднощі та досягти великих результатів.</p>
          </div>

          <div className="value__item respect">
            <h3>Повага</h3>
            <p>Ми ставимося з повагою до кожної людини, цінуємо її гідність та унікальність. Усі наші дії базуються на принципах толерантності та емпатії.</p>
          </div>

          <div className="value__item initiative">
            <h3>Ініціативність</h3>
            <p>Ми заохочуємо проявляти ініціативу, генерувати нові ідеї та втілювати їх у життя. Кожен може стати рушієм позитивних змін у своєму оточенні.</p>
          </div>
        </div>
      </section>

      {/* Додаємо компонент Footer */}
      <Footer />
    </div>
  );
}

export default About;
