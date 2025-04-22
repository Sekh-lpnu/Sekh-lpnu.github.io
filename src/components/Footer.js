import React from 'react';
import '../styles/Footer.css'; 


const Footer = () => {
  return (
    <footer className="footer__inner">
      <div className="container">
        <p className="footer__text">© 2017 - 2025 Українська Волонтерська Служба</p>
        <p className="footer__text">Зв'яжіться з нами: example@email.com | +380 123 456 789</p>
        <p className="footer__text">Слідкуйте за нами в соцмережах: Facebook | Instagram | Twitter</p>
      </div>
    </footer>
  );
}

export default Footer;
