const cart = document.querySelector("#cart");
const cartContainer = document.querySelector("#cart-list tbody");
const emptyCartBtn = document.querySelector("#empty-cart-btn");
const itemsList = document.querySelector("#items-list");

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
    quantity: 1,
  };
  console.log(itemInfo);
}
