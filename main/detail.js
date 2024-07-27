import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

import { app } from "../firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9gQZP2282KiEcJemi3ssicjV70nszsmo",
  authDomain: "pxl-jsi05-demo-db5d8.firebaseapp.com",
  projectId: "pxl-jsi05-demo-db5d8",
  storageBucket: "pxl-jsi05-demo-db5d8.appspot.com",
  messagingSenderId: "326560465030",
  appId: "1:326560465030:web:863eaa1e91f0b9df709107",
};

const auth = getAuth(app);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function getTitleDetails(id) {
  try {
    const docRef = doc(db, "Product", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const output = document.getElementById("output");
      const content = docSnap.data();

      document.getElementById("name").innerHTML = content.name;
      document.getElementById("price").innerHTML = content.price;
      document.getElementById("cal").innerHTML = content.cal;
      document.getElementById("vol").innerHTML = content.volume;
      output.innerHTML += ` 
    <div class="product" class="card row col-md-2"  style="width: 10rem;" >
      <div class="img"><img  src="${content.img}" id="img" class="card-img-top" alt="..."></div>
      <div class="button">
        <button id="add" type="button" onclick="Cart('${id}')" ><i class="fa-solid fa-cart-shopping"></i> ADD TO CART</button>
      </div>
    </div>`;
    } else {
      console.log("No such document!");
      document.getElementById("output").innerHTML = "Product not found!";
    }
  } catch (error) {
    // console.error("Error fetching:", error);
    // document.getElementById("output").innerHTML =
    //   "Error loading title details.";
  }
}

getTitleDetails(postId);
window.Cart = async function (id) {
  console.log(id);
  const docRef = doc(db, "Product", id);
  const docSnap = await getDoc(docRef);
  const content = docSnap.data();

  try {
    const docRefs = await addDoc(collection(db, "Add"), {
      name: content.name,
      price: content.price,
      cal: content.cal,
      volume: content.volume,
      img: content.img,
    });
    console.log(docRefs);
    alert("Product added to cart successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
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
