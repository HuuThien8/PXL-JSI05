import { app } from "../firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
const auth = getAuth(app);

const login = document.getElementById("Login");
login.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = document.getElementById("exampleInputEmail1").value;
  let pw = document.getElementById("exampleInputPassword1").value;

  if (email.length == 0 || pw.length == 0) {
    alert("Please check your username and gmail");
  } else {
    signInWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.href = "../main/index.html";
        alert("Login successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
});
