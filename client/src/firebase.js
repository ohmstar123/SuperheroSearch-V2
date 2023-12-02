// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLNkCXBN17hYmuT3f1WMQ3fZVDLBx1tNM",
  authDomain: "superheroes-login.firebaseapp.com",
  projectId: "superheroes-login",
  storageBucket: "superheroes-login.appspot.com",
  messagingSenderId: "52982107288",
  appId: "1:52982107288:web:86993068936a8b41ae14ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);