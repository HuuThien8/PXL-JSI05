import {
  app,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "../firebase.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email);
    const uid = user.uid;
  } else {
    // User is signed out
    // ...
  }
});

const btnLogout = document.getElementById("signOut");
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

function getProduct() {
  for (let i = 0; i < products.length; i++) {
    productsItem.innerHTML += ` 
    <div class="product" class="card row col-md8"  style="width: 10rem;" >
      <img class="image" src="${products[i].img}" class="card-img-top" alt="...">
      <div class="card-body">
      
    </div>`;
  }
}
getProduct();
