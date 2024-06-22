import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyC9gQZP2282KiEcJemi3ssicjV70nszsmo",
  authDomain: "pxl-jsi05-demo-db5d8.firebaseapp.com",
  projectId: "pxl-jsi05-demo-db5d8",
  storageBucket: "pxl-jsi05-demo-db5d8.appspot.com",
  messagingSenderId: "326560465030",
  appId: "1:326560465030:web:863eaa1e91f0b9df709107",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
