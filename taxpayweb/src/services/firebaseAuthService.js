// src/services/firebaseAuthService.js
import { auth } from '../firebaseConfig'; // Adjust the import path as necessary
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up new users
const signUpWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in existing users
const signInWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out the user
const signOutUser = () => {
  return signOut(auth);
};

export { signUpWithEmailPassword, signInWithEmailPassword, signOutUser };
