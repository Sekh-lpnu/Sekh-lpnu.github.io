import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Імпортуємо необхідні методи з Firebase
import Navbar from '../components/Navbar';  // Імпортуємо ваш компонент навбар
import Footer from '../components/Footer';  // Імпортуємо ваш компонент футер
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // Для відображення помилки
    const navigate = useNavigate();  // Ініціалізація хука для навігації
    const auth = getAuth();  // Отримуємо доступ до автентифікації Firebase

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Вхід через Firebase
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/my-initiatives');  // Перехід на сторінку ініціатив після успішного входу
        } catch (err) {
            setError('Невірний email або пароль');  // Якщо сталася помилка, показуємо її
        }
    };

    return (
        <div className="login-page">
            <Navbar /> 
            <section id="main-content-log" className="main-content-log">
                <div className="container">
                    <h1>Вхід до аккаунту</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Електронна пошта</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="Введіть вашу електронну пошту"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="Введіть ваш пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn">Увійти</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Показуємо помилку, якщо вона є */}
                    <p>Ще не маєте акаунту? <Link to="/registration">Зареєструйтесь</Link></p>
                </div>
            </section>
            <Footer /> {/* Використовуємо ваш Footer компонент */}
        </div>
    );
};

export default Login;
