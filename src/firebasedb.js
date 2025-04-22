import { initializeApp } from "firebase/app";  // Імпортуємо ініціалізацію Firebase
import { getFirestore } from "firebase/firestore";  // Імпорт Firestore
import { getAuth } from "firebase/auth";  // Імпорт автентифікації

// Твоя конфігурація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2gsnAv0To-F30CsoFVckzeu5tUwsAZww",
  authDomain: "uvobd-30d85.firebaseapp.com",
  projectId: "uvobd-30d85",
  storageBucket: "uvobd-30d85.firebasestorage.app",
  messagingSenderId: "1087887885049",
  appId: "1:1087887885049:web:e99f7310e9eeb5dced5828",
  measurementId: "G-4BN83040K9"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація Firestore
const db = getFirestore(app);

// Ініціалізація автентифікації
const auth = getAuth(app);

// Експортуємо доступ до Firestore та автентифікації
export { auth };
export default db;
