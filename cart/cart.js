import { app } from "../firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

const db = getFirestore(app);

const auth = getAuth(app);

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

const postQuery = query(collection(db, "Add"));
const output = document.getElementById("output");
onSnapshot(postQuery, (snapshot) => {
  output.innerHTML = "";
  snapshot.forEach((doc) => {
    const product = doc.data();
    const postId = doc.id;

    output.innerHTML += ` 
    <div class="product" class="card row col-md8"  style="width: 10rem;" >
      <a href=""><img class="image" src="${product.img}" class="card-img-top" alt="..."></a>
      <div class="card-body">
        <a href="hj" class="product-name"><p>${product.name}</p></a>
        <p class="product-price">${product.price}</p>
        <p class="product-price">${product.cal}</p>
        <p class="product-price">${product.volume}</p>
        <button class="delete" onclick="deleteData('${doc.id}')">Delete</button>
        
      </div>
      
    </div>`;
  });
});

window.deleteData = async function (id) {
  try {
    await deleteDoc(doc(db, "Add", id));
    console.log("Delete Success");
  } catch (error) {
    console.error(error);
  }
};
