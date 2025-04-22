import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Initiatives from './pages/Initiatives';
import MyInitiatives from './pages/MyInitiatives'; // Якщо є ще така сторінка
import Login from './pages/Login'; // Якщо є сторінка для входу
import Registration from './pages/Registration';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Роут для головної сторінки */}
                <Route path="/" element={<Home />} />

                {/* Роут для сторінки "Про нас" */}
                <Route path="/about" element={<About />} />

                {/* Роут для сторінки з ініціативами */}
                <Route path="/initiatives" element={<Initiatives />} />

                {/* Роут для моїх ініціатив */}
                <Route path="/my-initiatives" element={<MyInitiatives />} />

                {/* Роут для сторінки входу */}
                <Route path="/login" element={<Login />} />

                {/* 404 сторінка для невизначених маршрутів */}
                <Route path="/registration" element={<Registration />} />
            </Routes>
        </Router>
    );
};

export default App;
