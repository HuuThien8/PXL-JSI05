import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANqhq6YAgtLcPxk110IMW4kZHFZlDeFDs",
  authDomain: "pxl-jsi05-demo.firebaseapp.com",
  projectId: "pxl-jsi05-demo",
  storageBucket: "pxl-jsi05-demo.appspot.com",
  messagingSenderId: "231382838574",
  appId: "1:231382838574:web:f5453a825a5ba3d62c5ebf",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function getTitleDetails(id) {
  try {
    const docRef = doc(db, "Product", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const content = docSnap.data();
      document.getElementById("img").innerHTML = content.image;
      document.getElementById("name").innerHTML = content.name;
      document.getElementById("price").innerHTML = content.price;
      document.getElementById("cal").innerHTML = content.cal;
      document.getElementById("vol").innerHTML = content.volume;
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
