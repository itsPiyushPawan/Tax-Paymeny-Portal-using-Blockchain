// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpUnG3tol7rHCv0uKVj1bMu_FwKm9Ru4Q",
  authDomain: "taxchain2.firebaseapp.com",
  databaseURL: "https://taxchain2-default-rtdb.firebaseio.com",
  projectId: "taxchain2",
  storageBucket: "taxchain2.appspot.com",
  messagingSenderId: "166055096188",
  appId: "1:166055096188:web:b474d98db75a0e5bdcbef9",
  measurementId: "G-MHJQFC2DZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and export it
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
