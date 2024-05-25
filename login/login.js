import {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase.js";

const login = document.getElementById("login");
login.addEventListener("submit", (event) => {
  event.preventDefault();
  let email = document.getElementById("exampleInputEmail1").value;
  let pw = document.getElementById("exampleInputPassword1").value;
  const gmailRegex = /^[a-zA-Z0-9]+@gmail.com$/;
  const emailValue = email.trim();

  if (email.length == 0 || pw.length == 0) {
    alert("Please check your username and gmail");
  } else if (!gmailRegex.test(emailValue)) {
    alert("Please check your gmail");
  } else if (
    //!pw.value.trim().match()lowerCase//
    pw.value.trim().length !== 8 ||
    !/[A-Z]/.test(pw.value) || //Kiểm tra chữ hoa, chữ thường, số//
    !/[a-z]/.test(pw.value) ||
    !/[0-9]/.test(pw.value)
  ) {
    alert("Please check your password");
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
