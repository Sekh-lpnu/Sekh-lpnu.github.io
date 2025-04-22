import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Замість useHistory
import { getAuth, signOut } from 'firebase/auth';
import '../styles/Navbar.css'; // Ваші стилі

const Navbar = () => {
  const auth = getAuth(); // Отримуємо доступ до автентифікації
  const currentUser = auth.currentUser; // Перевірка, чи є авторизований користувач
  const navigate = useNavigate(); // Для навігації після виходу

  const handleLogout = async () => {
    try {
      await signOut(auth); // Вихід з акаунту
      navigate('/login'); // Перенаправлення на сторінку входу після виходу
    } catch (error) {
      console.error("Помилка при виході: ", error);
    }
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="nav__link__logo">УВС</Link> 
        <nav className="nav">
          <Link to="/initiatives" className="nav__link">Доступні ініціативи</Link>
          <Link to="/my-initiatives" className="nav__link">Мої ініціативи</Link>
          <Link to="/about" className="nav__link">Про нас</Link>
          
          {/* Якщо користувач авторизований, показуємо кнопку для виходу */}
          {currentUser ? (
            <button onClick={handleLogout} className="nav__link logout-button">Вийти</button>
          ) : (
            <Link to="/login" className="nav__link">Увійти</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
