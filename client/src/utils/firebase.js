// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-2-c254a.firebaseapp.com",
  projectId: "auth-2-c254a",
  storageBucket: "auth-2-c254a.appspot.com",
  messagingSenderId: "516920656751",
  appId: "1:516920656751:web:56030e3fdcd13a6f90de9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
