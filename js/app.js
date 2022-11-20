const cart = document.querySelector("#cart");
const cartContainer = document.querySelector("#cart-list tbody");
const clearBtn = document.querySelector("#clear-btn");
const amount = document.querySelector("#amount");
const empty = document.querySelector("#empty");
const busy = document.querySelector("#busy");
const header = document.querySelector("#header");
const heroSection = document.querySelector("#hero");
const badge = document.querySelector("#icon-badge");
const cards = document.querySelectorAll(".card-container");
const sectionOptions = {
  rootMargin: "-800px 0px 0px 0px",
};
let cartItems = [];

// loads the all listeners
loadEvetListeners();
function loadEvetListeners() {
  // to add item to cart
  cards.forEach((card) => {
    card.addEventListener("click", addItem);
  });

  // to delete item from cart
  cart.addEventListener("click", deleteItem);

  // show item from localStorage
  document.addEventListener("DOMContentLoaded", () => {
    cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    showInCart();
    updateTotal();
  });

  // to clear cart
  clearBtn.addEventListener("click", () => {
    cartItems = []; // reset array of items
    clearHtml();
  });
}

// observer to change color of nav
const observer = new IntersectionObserver(function (entries, optionObserver) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
}, sectionOptions);

observer.observe(heroSection);

// Functions
// Add item to cart
function addItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-item")) {
    const selectedItem = e.target.parentElement.parentElement;
    readItemsInfo(selectedItem);
    updateTotal();
  }
}

// Delete item from cart
function deleteItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete-item")) {
    const itemId = e.target.getAttribute("data-id");

    // substract from item
    cartItems.map((item) => {
      if (itemId === item.id && item.qty > 1) {
        item.qty -= 1;
        return item;
      } else if (itemId === item.id) {
        cartItems = cartItems.filter((item) => item.id !== itemId);
        return item;
      }
    });
  }
  updateTotal();
  showInCart();
}

// Extract info from clicked element
function readItemsInfo(item) {
  console.log(item);
  // create an object with item info
  const itemInfo = {
    img: item.querySelector(".card-img").src,
    name: item.querySelector("h4").textContent,
    price: item.querySelector(".price").textContent,
    id: item.querySelector("button").getAttribute("data-id"),
    qty: 1,
  };

  // check if item on cart
  const inCart = cartItems.some((item) => item.id === itemInfo.id);

  if (inCart) {
    // add item to cart
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
  showInCart();
}

// show shopping cart on page
function showInCart() {
  //clear cart so theres not duplicate elements from prev arrange
  clearHtml();
  // add item name to cart
  cartItems.forEach((item) => {
    const { img, name, price, qty, id } = item;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src="${img}"></td>
    <td>${name}</td>
    <td>${price}</td>
    <td>${qty}</td>
    <td><a href="#" class="delete-item" data-id="${id}"> - </td>
    `;
    cartContainer.appendChild(row);
  });

  // Add cart to local storage
  sincStorage();
}

function sincStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function updateTotal() {
  let total = 0;
  cartItems.forEach((item) => {
    total += Number(item.price.replace("$", "")) * Number(item.qty);
  });

  if (total === 0) {
    empty.classList.remove("hidden");
    busy.classList.add("hidden");
    badge.classList.add("hidden");
  } else {
    empty.classList.add("hidden");
    busy.classList.remove("hidden");
    badge.classList.remove("hidden");
  }

  amount.textContent = `${total}`;
  console.log(empty, busy);
}

// clear items from html
function clearHtml() {
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}
