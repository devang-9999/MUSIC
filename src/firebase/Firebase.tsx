// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCcDHrhmeR1yh6W-RZbASnExGcd6zq546w",
  authDomain: "music-app-10637.firebaseapp.com",
  databaseURL: "https://music-app-10637-default-rtdb.firebaseio.com",
  projectId: "music-app-10637",
  storageBucket: "music-app-10637.firebasestorage.app",
  messagingSenderId: "1065376843827",
  appId: "1:1065376843827:web:ab4328acb94eaca1d6fb46",
  measurementId: "G-TJCQGE1MPG"
};
const app = initializeApp(firebaseConfig);

export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

