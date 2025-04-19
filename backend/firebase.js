// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0tymckDttt-WGJ4SOlrJRJy3BrdtzPl0",
  authDomain: "sensor-42237.firebaseapp.com",
  databaseURL: "https://sensor-42237-default-rtdb.firebaseio.com",
  projectId: "sensor-42237",
  storageBucket: "sensor-42237.firebasestorage.app",
  messagingSenderId: "519106140373",
  appId: "1:519106140373:web:db43fc256fd6325715ea5c",
  measurementId: "G-HDVR3JN342"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };