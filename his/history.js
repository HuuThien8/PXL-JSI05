import {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "../firebase.js";

const btnLogout = document.getElementById("signOut");
const btnLogin = document.getElementById("Login");
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email);
    btnLogout.classList.remove("d-none");
    btnLogin.classList.add("d-none");

    const uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});

btnLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.href = "../login/log.html";
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
});
