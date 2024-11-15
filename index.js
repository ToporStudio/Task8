let productsJson = `{
  "Allproducts": [
    {
      "name": "Classic Watch CL1",
      "price": 30,
      "id": "classic_cl1"
    },
    {
      "name": "Sport Watch TR1",
      "price": 25,
      "id": "sport_tr1"
    },
    {
      "name": "Sport Watch TR2",
      "price": 27,
      "id": "sport_tr2"
    },

    {
      "name": "Sport Watch TR3",
      "price": 38,
      "id": "sport_tr3"
    },

    {
      "name": "Sport Watch TR4",
      "price": 41,
      "id": "sport_tr4"
    },

    {
      "name": "Sport Watch TR5",
      "price": 43,
      "id": "sport_tr5"
    }
  ]
}`;
let products = JSON.parse(productsJson);

let cart = JSON.parse(localStorage.getItem("cart")) || {};
CartIndicator(cart);
//localStorage.removeItem("cart");

let tovdiv = document.createElement("div");
tovdiv.id = "tovdiv";
document.querySelector("main").append(tovdiv);

let tov = JSON.parse(productsJson)["Allproducts"];
//for( let a of tov)
for (let a of tov) {
  let tovcell = document.createElement("div");
  let tovtitle = document.createElement("p");
  let tovimage = document.createElement("img");
  let tovprice = document.createElement("p");
  let tovbutton = document.createElement("div");

  tovcell.id = a.id;
  tovcell.className = "tovarclass";

  tovtitle.innerText = a.name;
  tovtitle.className = "TovTitleClass";

  tovimage.src = `pics/${a.id}.png`;
  tovimage.alt = "product image";
  tovimage.className = "TovImageClass";

  tovprice.innerText = `price ${a.price} $`;
  tovprice.className = "TovPriceClass";

  tovbutton.innerHTML = `<div>В корзину<a href=""></a></div>`;
  tovbutton.className = "TovButtonClass";

  tovbutton.addEventListener("click", handler);

  tovcell.append(tovbutton, tovtitle, tovimage, tovprice);
  tovdiv.append(tovcell);
}

function handler(event) {
  let a = event.target;
  let elem = a.closest(".tovarclass");

  //console.log(CartAdd(elem.id));
  updateCart(CartAdd(elem.id));
}

function CartAdd(item) {
  for (let i in products.Allproducts) {
    if (item == products.Allproducts[i].id) {
      let obj = products.Allproducts[i];
      return obj;
    }
  }
}

function updateCart(obj) {
  if (cart[obj.id]) {
    cart[obj.id].amount += 1;
  } else {
    cart[obj.id] = { ...obj, amount: 1 };
  }

 CartIndicator(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function CartIndicator(cart) {
  let inCart = 0;
  let cartamount = 0;

  for (let i in cart) {
    cartamount =  +cart[i].amount;

    //console.log("cartamount= " + cartamount);

    if (cartamount) {
      inCart = inCart + cartamount;
    }
  }
  //console.log("inCart= " + inCart);
  inCartInd.innerText = inCart;
}
