// components/RegistrationForm.js
import React, { useState } from 'react';
import '../styles/RegistrationForm.css'; 

const RegistrationForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phone });
    };

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
                <label htmlFor="name">Ім'я</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input 
                    type="text" 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit">Зареєструватися</button>
        </form>
    );
};

export default RegistrationForm;
