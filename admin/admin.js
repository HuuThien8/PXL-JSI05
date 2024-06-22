import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9gQZP2282KiEcJemi3ssicjV70nszsmo",
  authDomain: "pxl-jsi05-demo-db5d8.firebaseapp.com",
  projectId: "pxl-jsi05-demo-db5d8",
  storageBucket: "pxl-jsi05-demo-db5d8.appspot.com",
  messagingSenderId: "326560465030",
  appId: "1:326560465030:web:863eaa1e91f0b9df709107",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("formTitle");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.getElementById("title").value;
  let price = document.getElementById("body").value;
  let cal = document.getElementById("cal").value;
  let vol = document.getElementById("vol").value;

  try {
    const docRef = await addDoc(collection(db, "Drinks"), {
      name: name,
      price: price,
      cal: cal,
      vol: vol,
    });
    console.log("Submit success!");
    getData();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

const output = document.getElementById("output");

async function getData() {
  output.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Drinks"));
  querySnapshot.forEach((doc) => {
    output.innerHTML += `
        <h2>${doc.data().name}</h2>
        <p>${doc.data().price}</p>
        <p>${doc.data().cal}</p>
        <p>${doc.data().vol}</p>
        <button onclick="deleteData('${doc.id}')">Delete</button>
    `;
  });
}

window.deleteData = async function (id) {
  try {
    await deleteDoc(doc(db, "Drinks", id));
    console.log("Delete Success");
    getData();
  } catch (error) {
    console.error(error);
  }
};

getData();
