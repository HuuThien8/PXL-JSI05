import { app } from "../firebase.js";
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

const form = document.getElementById("formTitle");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.getElementById("title").value;
  let price = document.getElementById("body").value;
  let cal = document.getElementById("cal").value;
  let vol = document.getElementById("vol").value;
  const img = document.getElementById("img").files[0];

  if (
    name.lenght == 0 ||
    price.lenght == 0 ||
    cal.lenght == 0 ||
    vol.lenght == 0
  ) {
    alert("PLEASE ENTER INFORMATIONS");
  } else {
    const storage = getStorage();
    const imgPath = "Products/" + new Date().valueOf();
    const storageRef = ref(storage, imgPath);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, img).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");
      const url = await getDownloadURL(storageRef);

      try {
        const docRef = await addDoc(collection(db, "Product"), {
          name: name,
          price: price,
          cal: cal,
          volume: vol,
          img: url,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  }
});

const postQuery = query(collection(db, "Product"));
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
        <button onclick="deleteData('${doc.id}')">Delete</button>
        <button onclick="editData('${doc.id}')">Edit</button>
      </div>
      
    </div>`;
  });
});

window.deleteData = async function (id) {
  try {
    await deleteDoc(doc(db, "Product", id));
    console.log("Delete Success");
  } catch (error) {
    console.error(error);
  }
};

window.editData = async function (id) {
  try {
    const newName = prompt(" Enter new name");
    const newPrice = prompt(" Enter new price");
    const newCal = prompt(" Enter new cal");
    const newVol = prompt(" Enter new vol");
    await updateDoc(doc(db, "Users", id), {
      name: newName,
      price: newPrice,
      cal: newCal,
      volume: newVol,
    });

    console.log("Edit Success");
  } catch (error) {
    console.error(error);
  }
};
