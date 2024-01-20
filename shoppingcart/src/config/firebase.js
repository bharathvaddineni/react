import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC0DfOINixy8Pq8GeFX807L6sBcW4Wx90U",
    authDomain: "ecommerce-c2724.firebaseapp.com",
    projectId: "ecommerce-c2724",
    storageBucket: "ecommerce-c2724.appspot.com",
    messagingSenderId: "945934637472",
    appId: "1:945934637472:web:f0f4e25dc9c919e3806cc5",
    measurementId: "G-G24H8MEWVD"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)