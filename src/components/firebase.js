// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_ydPgm2ShaTGSGaVLWuEDpHN15CV6Ei4",
  authDomain: "studentbuddies-e2513.firebaseapp.com",
  projectId: "studentbuddies-e2513",
  storageBucket: "studentbuddies-e2513.appspot.com",
  messagingSenderId: "392287934114",
  appId: "1:392287934114:web:644ebb86eaa87eafcfa9fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);