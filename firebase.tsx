// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyByhz1J5cgBglY2iVRR8lYM9ObKuSparrA",

  authDomain: "e-commerce-68709.firebaseapp.com",

  projectId: "e-commerce-68709",

  storageBucket: "e-commerce-68709.firebasestorage.app",

  messagingSenderId: "453474223441",

  appId: "1:453474223441:web:a19e6bfb393321124e3f70"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// create auth variable to use firebase auth hooks //
export const auth = getAuth(app);