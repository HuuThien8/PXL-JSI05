import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9gQZP2282KiEcJemi3ssicjV70nszsmo",
  authDomain: "pxl-jsi05-demo-db5d8.firebaseapp.com",
  projectId: "pxl-jsi05-demo-db5d8",
  storageBucket: "pxl-jsi05-demo-db5d8.appspot.com",
  messagingSenderId: "326560465030",
  appId: "1:326560465030:web:863eaa1e91f0b9df709107",
};

const app = initializeApp(firebaseConfig);
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
      <div class="img"><img  src="${content.img}" class="card-img-top" alt="..."></div>
    </div>`;
    } else {
      console.log("No such document!");
      document.getElementById("output").innerHTML = "Product not found!";
    }
  } catch (error) {
    console.error("Error fetching:", error);
    document.getElementById("output").innerHTML =
      "Error loading title details.";
  }
}

getTitleDetails(postId);

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
