import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDNqfHEIZr6vT7b3vqakj5wIzbBmxyozLc",
    authDomain: "first-firebase-project-caf2b.firebaseapp.com",
    databaseURL: "https://first-firebase-project-caf2b-default-rtdb.firebaseio.com",
    projectId: "first-firebase-project-caf2b",
    storageBucket: "first-firebase-project-caf2b.appspot.com",
    messagingSenderId: "39709489558",
    appId: "1:39709489558:web:09e31c099960f3cc99c5b7",
    measurementId: "G-EKWP9NNXS2",
};

export const app = initializeApp(firebaseConfig);
