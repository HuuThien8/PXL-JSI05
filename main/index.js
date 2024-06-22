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
      <a href=""><img class="image" src="${products[i].img}" class="card-img-top" alt="..."></a>

      <div class="card-body">
      
    </div>`;
  }
}
getProduct();

const products1 = [
  {
    id: 0,

    img: "../image/ultraa.webp",
  },
  {
    id: 1,

    img: "../image/u1.webp",
  },
  {
    id: 2,

    img: "../image/u2.webp",
  },
  {
    id: 3,

    img: "../image/u3.webp",
  },
  {
    id: 4,

    img: "../image/u4.webp",
  },
  {
    id: 5,

    img: "../image/u5.webp",
  },
];

const productsItem1 = document.getElementById("getProduct1");
console.log(productsItem1);

function getProduct1() {
  for (let i = 0; i < products1.length; i++) {
    productsItem1.innerHTML += ` 
    <div class="product" class="card row col-md8"  style="width: 10rem;" >
      <a href=""><img class="image" src="${products1[i].img}" class="card-img-top" alt="..."></a>

      <div class="card-body">
      
    </div>`;
  }
}
getProduct1();

const products2 = [
  {
    id: 0,

    img: "../image/juicee.webp",
  },
  {
    id: 1,

    img: "../image/j1.webp",
  },
  {
    id: 2,

    img: "../image/j2.webp",
  },
  {
    id: 3,

    img: "../image/j3.webp",
  },
  {
    id: 4,

    img: "../image/j4.webp",
  },
  {
    id: 5,

    img: "../image/j5.webp",
  },
];

const productsItem2 = document.getElementById("getProduct2");
console.log(productsItem1);

function getProduct2() {
  for (let i = 0; i < products1.length; i++) {
    productsItem2.innerHTML += ` 
    <div class="product" class="card row col-md8"  style="width: 10rem;" >
      <a href=""><img class="image" src="${products2[i].img}" class="card-img-top" alt="..."></a>

      <div class="card-body">
      
    </div>`;
  }
}
getProduct2();
