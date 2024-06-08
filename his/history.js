import {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "../firebase.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email);
    const uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});

const btnLogout = document.getElementById("signOut");
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
