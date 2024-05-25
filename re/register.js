import {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
} from "../firebase.js";

const register = document.getElementById("register");
register.addEventListener("submit", (event) => {
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
    pw.length !== 8 ||
    !/[A-Z]/.test(pw) || //Kiểm tra chữ hoa, chữ thường, số//
    !/[a-z]/.test(pw) ||
    !/[0-9]/.test(pw)
  ) {
    alert("Please check your password");
  } else {
    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        window.location.href = "../login/log.html";
        console.log(email);
        alert("Register successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
});
