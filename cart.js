/*

let containerProducts = document.querySelector(".container-products");
let productHeader = document.querySelector(".product-header");
let productTitle = document.querySelector(".product-title");
let price = document.querySelector(".price");
let quantity = document.querySelector(".quantity");

*/
let products = document.querySelector(".products");

let cart = JSON.parse(localStorage.getItem("cart")) || {};

updateCart();

function updateCart() {
  products.innerHTML = "";
  CartIndicator(cart);
  for (let elem in cart) {
    //console.log(elem);
    let totalq = 0;
    let productTitle = document.createElement("div");
    let productPrice = document.createElement("div");
    let productAmount = document.createElement("div");
    let productTotal = document.createElement("div");
    let productCell = document.createElement("div");

    //productTitle.innerText = cart[elem].name;
    htmlTittleBuild(productTitle, cart[elem]);
    productTitle.className = "productTitle";
    productPrice.innerText = `$ ${cart[elem].price}`;
    productPrice.className = productPrice;

    htmlAmountBuild(productAmount, cart[elem]);
    //productAmount.innerText = cart[elem].amount;
    productAmount.className = "productAmount";

    totalq = cart[elem].price * cart[elem].amount;
    productTotal.innerText = `$ ${totalq}`;
    productTotal.className = "productTotal";

    productCell.append(productTitle, productPrice, productAmount, productTotal);
    productCell.id = cart[elem].id;
    productCell.className = "productCell";

    products.append(productCell);
  }

  let productSumm = document.createElement("div");
  let pSummtitle = document.createElement("p");
  let pSumm = document.createElement("p");
  pSumm.className = "pSumm";
  pSummtitle.className = "pSummtitle";
  productSumm.append(pSummtitle);
  productSumm.append(pSumm);
  htmlSummBuild(productSumm, cart);
  productSumm.className = "productSumm";

  products.append(productSumm);
}

function htmlTittleBuild(tittlediv, obj) {
  let titleButton = document.createElement("div");
  titleButton.innerHTML = `<div>X<a href=""></a></div>`;
  titleButton.className = "titleButton";
  titleButton.addEventListener("click", titlebuttonHandler);

  let titleImage = document.createElement("img");
  titleImage.src = `pics/${obj.id}.png`;
  titleImage.className = "titleImage";

  let titleName = document.createElement("p");
  titleName.innerText = obj.name;
  tittlediv.append(titleButton, titleImage, titleName);
}

function htmlAmountBuild(amountdiv, obj) {
  let AmountdecButton = document.createElement("div");
  AmountdecButton.innerHTML = `<div>&#9668; <a href=""></a></div>`;
  AmountdecButton.className = "decButton";
  AmountdecButton.addEventListener("click", decButtonHandler);

  let AmountincButton = document.createElement("div");
  AmountincButton.innerHTML = `<div> &#9658; <a href=""></a></div>`;
  AmountincButton.className = "incButton";
  AmountincButton.addEventListener("click", incButtonHandler);

  let Amount = document.createElement("p");
  Amount.className = "valAmount";
  Amount.innerText = obj.amount;

  amountdiv.append(AmountdecButton, Amount, AmountincButton);
}

function htmlSummBuild(elem, obj) {
  let sum = 0;

  for (i in cart) {
    sum = sum + obj[i].amount * obj[i].price;
  }
  console.log(sum);

  //elem.innerText = "Summ"+(sum);
}

function titlebuttonHandler(event) {
  let a = event.target;
  let elem = a.closest(".productCell");
  cartManipulator("del", elem.id);

  //alert("del tovar");
}

function incButtonHandler(event) {
  let a = event.target;
  let elem = a.closest(".productCell");
  //alert(elem.id);
  cartManipulator("inc", elem.id);
}

function decButtonHandler(event) {
  let a = event.target;
  let elem = a.closest(".productCell");
  //alert(elem.id);
  cartManipulator("dec", elem.id);
}

function cartManipulator(ops, id) {
  //alert(ops + "    " + id);

  if (ops == "inc") {
    cart[id].amount = cart[id].amount + 1;
    updateStorage();
    updateCart();
  }
  if (ops == "dec" && cart[id].amount != 0) {
    cart[id].amount = cart[id].amount - 1;
    updateStorage();
    updateCart();
  }

  if (ops == "del") {
    el = document.getElementById(id);
    el.remove();
    console.log(id);
    console.log(cart[id]);
    delete cart[id];
    updateStorage();
    updateCart();
  }
}

function updateStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function CartIndicator(cart) {
  let inCart = 0;
  let cartamount = 0;

  for (let i in cart) {
    cartamount = +cart[i].amount;

    //console.log("cartamount= " + cartamount);

    if (cartamount) {
      inCart = inCart + cartamount;
    }
  }
  //console.log("inCart= " + inCart);
  inCartInd.innerText = inCart;
}
