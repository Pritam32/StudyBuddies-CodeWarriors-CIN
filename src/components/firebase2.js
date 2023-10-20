import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

 const firebaseConfig = {
  apiKey: "AIzaSyA_ydPgm2ShaTGSGaVLWuEDpHN15CV6Ei4",
  authDomain: "studentbuddies-e2513.firebaseapp.com",
  projectId: "studentbuddies-e2513",
  storageBucket: "studentbuddies-e2513.appspot.com",
  messagingSenderId: "392287934114",
  appId: "1:392287934114:web:644ebb86eaa87eafcfa9fb"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };