// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASnQ_aUDlm8MTAtVnXhENHJ_zkKQOcgzE",
  authDomain: "x---clone.firebaseapp.com",
  projectId: "x---clone",
  storageBucket: "x---clone.firebasestorage.app",
  messagingSenderId: "29758576451",
  appId: "1:29758576451:web:bb21dfd673588ce7dfc1f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
