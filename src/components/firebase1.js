// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_ydPgm2ShaTGSGaVLWuEDpHN15CV6Ei4",
  authDomain: "studentbuddies-e2513.firebaseapp.com",
  projectId: "studentbuddies-e2513",
  storageBucket: "studentbuddies-e2513.appspot.com",
  messagingSenderId: "392287934114",
  appId: "1:392287934114:web:644ebb86eaa87eafcfa9fb"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase  



export {firebase};