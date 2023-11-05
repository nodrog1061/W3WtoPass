// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-ch-AJzQxWs8BMfA1_Lex9FQvpm6UIb0",
  authDomain: "w3w-to-pass.firebaseapp.com",
  projectId: "w3w-to-pass",
  storageBucket: "w3w-to-pass.appspot.com",
  messagingSenderId: "244353487130",
  appId: "1:244353487130:web:ae6077070be4c8c7a9dca3",
  measurementId: "G-K41TEYE73B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase
export let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const mapsApiKey = "AIzaSyAi-pm6nTGkIqzVu04RnhBY3hGqtYLnBFE";

export const w3wApiKey = "YD5LXE1M";
