import React, { useState } from 'react';
import Navbar from '../components/Navbar';  // Імпортуємо ваш компонент навбар
import Footer from '../components/Footer';  // Імпортуємо ваш компонент футер
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebasedb';  // Імпортуємо auth з Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';  // Імпортуємо функцію реєстрації з Firebase
import '../styles/Registration.css';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Паролі не співпадають');
            return;
        }

        try {
            // Використовуємо Firebase для реєстрації користувача
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Реєстрація успішна!');
            navigate('/login');  // Перехід на сторінку входу
        } catch (err) {
            setError(err.message);  // Виводимо помилку, якщо вона є
        }
    };

    return (
        <div className="registration-page">
            <Navbar /> {/* Використовуємо ваш Navbar компонент */}

            <section id="main-content-reg" className="main-content-reg">
                <div className="container">
                    <h1>Реєстрація</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Електронна пошта</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Введіть вашу електронну пошту"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Введіть ваш пароль"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm-password">Підтвердження пароля</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="Підтвердіть ваш пароль"
                            />
                        </div>

                        <button type="submit" className="btn">Зареєструватися</button>
                    </form>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <p>Вже маєте акаунт? 
                        <button onClick={handleNavigateToLogin}>Увійти</button>
                    </p>
                </div>
            </section>

            <Footer /> {/* Використовуємо ваш Footer компонент */}
        </div>
    );
};

export default Registration;
