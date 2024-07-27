import { app } from "../firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
const auth = getAuth(app);

import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const db = getFirestore(app);

const btnLogout = document.getElementById("signOut");
const btnLogin = document.getElementById("Login");
const cart = document.getElementById("Login");
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email);
    btnLogout.classList.remove("d-none");
    btnLogin.classList.add("d-none");
    cart.classList.add("d-none");
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

btnLogin.addEventListener("click", () => {
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

const postQuery = query(collection(db, "Product"));
const output = document.getElementById("BestSeller");
onSnapshot(postQuery, (snapshot) => {
  output.innerHTML = "";
  snapshot.forEach((doc) => {
    const product = doc.data();
    const postId = doc.id;

    output.innerHTML += ` 
    <div class="product" class="card row col-md-2"  style="width: 10rem;" >
      <a href="detail.html?id=${postId}"><img class="image" src="${product.img}" class="card-img-top" alt="..."></a>
    </div>`;
  });
});
