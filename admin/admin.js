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

const db = getFirestore(app);

const form = document.getElementById("formTitle");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.getElementById("title").value;
  let price = document.getElementById("body").value;
  let cal = document.getElementById("cal").value;
  let vol = document.getElementById("vol").value;

  if (
    name.lenght == 0 ||
    price.lenght == 0 ||
    cal.lenght == 0 ||
    vol.lenght == 0
  ) {
    alert("PLEASE ENTER INFORMATIONS");
  } else {
    try {
      const docRef = await addDoc(collection(db, "Drinks"), {
        name: name,
        price: price,
        cal: cal,
        volume: vol,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
});

const products = [
  {
    id: 0,
    name: "JAVA MONSTER MEAN BEAN",
    img: "../image/bean.webp",
  },
  {
    id: 1,

    img: "../image/ori.webp",
  },
  {
    id: 2,

    img: "../image/ultraa.webp",
  },
  {
    id: 3,

    img: "../image/juicee.webp",
  },
  {
    id: 4,

    img: "../image/zerosu.webp",
  },
  {
    id: 5,

    img: "../image/tea.webp",
  },
];
const productsItem = document.getElementById("getProduct");
console.log(productsItem);

const postQuery = query(collection(db, "Drinks"));
const output = document.getElementById("output");
onSnapshot(postQuery, (snapshot) => {
  output.innerHTML = "";
  snapshot.forEach((doc) => {
    const drink = doc.data();
    const postId = doc.id;

    for (let i = 0; i < products.length; i++) {
      output.innerHTML += ` 
    <div class="product" class="card row col-md8"  style="width: 10rem;" >
      <a href=""><img class="image" src="${products[i].img}" class="card-img-top" alt="..."></a>
      <div class="card-body">
        <a href="hj" class="product-name"><p>${drink.name}</p></a>
        <p class="product-price">${drink.price}</p>
        <p class="product-price">${drink.cal}</p>
        <p class="product-price">${drink.volume}</p>
        <button onclick="deleteData('${doc.id}')">Delete</button>
        <button onclick="editData('${doc.id}')">Edit</button>
      </div>
      
    </div>`;
    }
  });
});

window.deleteData = async function (id) {
  try {
    await deleteDoc(doc(db, "Drinks", id));
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
    await updateDoc(doc(db, "Drinks", id), {
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
