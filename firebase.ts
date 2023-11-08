import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBuyomkxV7vwdbnlARWrriR8Nfo8AYgvhE",
    authDomain: "invoice-app-275a0.firebaseapp.com",
    projectId: "invoice-app-275a0",
    storageBucket: "invoice-app-275a0.appspot.com",
    messagingSenderId: "726326595469",
    appId: "1:726326595469:web:88030feca5f99cbe0cb7c4",
    measurementId: "G-LNFF7512FE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth()