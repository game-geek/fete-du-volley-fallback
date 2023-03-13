import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY } from "./data";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "fete-du-volley.firebaseapp.com",
  projectId: "fete-du-volley",
  storageBucket: "fete-du-volley.appspot.com",
  messagingSenderId: "884762562507",
  appId: "1:884762562507:web:695ac119c8d833cf04304e",
};

// Initialize Firebase + Firestore
initializeApp(firebaseConfig);
export default getFirestore();

