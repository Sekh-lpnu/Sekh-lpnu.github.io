// components/MyInitiatives.js
import React from 'react';

const MyInitiatives = () => {
    const myInitiatives = JSON.parse(localStorage.getItem('myInitiatives')) || [];

    return (
        <div>
            <h2>Мої ініціативи</h2>
            {myInitiatives.length === 0 ? (
                <p>Ще не приєдналися до жодної ініціативи.</p>
            ) : (
                <ul>
                    {myInitiatives.map((initiative, index) => (
                        <li key={index}>
                            <h3>{initiative.title}</h3>
                            <p>Дата: {new Date(initiative.date).toLocaleDateString("uk-UA")}</p>
                            <p>Місце: {initiative.location}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyInitiatives;
