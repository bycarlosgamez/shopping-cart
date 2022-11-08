const cart = document.querySelector("#cart");
const cartContainer = document.querySelector("#cart-list tbody");
const emptyCartBtn = document.querySelector("#empty-cart-btn");
const itemsList = document.querySelector("#items-list");
let cartItems = [];

// loads the all listeners
loadEvetListeners();
function loadEvetListeners() {
  itemsList.addEventListener("click", addItem);
}

// Functions
function addItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-to-cart")) {
    const selectedItem = e.target.parentElement.parentElement;
    readItemsInfo(selectedItem);
  }
}

// Extract info from clicked element
function readItemsInfo(item) {
  console.log(item);
  // create an object with item info
  const itemInfo = {
    img: item.querySelector("img").src,
    name: item.querySelector("h4").textContent,
    price: item.querySelector(".price span").textContent,
    id: item.querySelector("a").getAttribute("data-id"),
    qty: 1,
  };

  // check if item on cart
  const inCart = cartItems.some((item) => item.id === itemInfo.id);

  if (inCart) {
    // update cart
    const items = cartItems.map((item) => {
      if (item.id === itemInfo.id) {
        item.qty += 1;
        return item; // returns updated object
      } else {
        return item; // returns new objects
      }
    });
    cartItems = [...items];
  } else {
    // add itemInfo object to cart
    cartItems = [...cartItems, itemInfo];
  }

  console.log(cartItems);
  shoppingCart();
}

// show shopping cart on page
function shoppingCart() {
  //clear cart so theres not duplicate elements from prev arrange
  clearHtmlCart();
  // add item name to cart
  cartItems.forEach((item) => {
    const { img, name, price, qty, id } = item;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${img}"></td>
    <td>${name}</td>
    <td>${price}</td>
    <td>${qty}</td>
    <td><a href="#" class="delete-item" data-id="${id}"> X </td>
    `;
    cartContainer.appendChild(row);
  });
}

// delete items from cart
function clearHtmlCart() {
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}
