// Import the functions you need from the SDKs you need

// TODO MOVE THE API KEY AND AUTH DOMAIN IN ENV
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgKBj4DL9tbM_HelAWwfWVMTu-4VUK0X8",
  authDomain: "at-home-convenience.firebaseapp.com",
  databaseURL:
    "https://at-home-convenience-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "at-home-convenience",
  storageBucket: "at-home-convenience.appspot.com",
  messagingSenderId: "948813304022",
  appId: "1:948813304022:web:8917ab26c6c15f8462b977",
  measurementId: "G-6169JM9JRJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
