// Config
const API_URL = "http://ltweb:8081";
const token = localStorage.getItem("token") || ""; //jwt token

const PAGES = {
  login: "dangnhap.html",
  home: "index.html",
};
// tool



function numberToVnd(number) {
  var formatter = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(number);
}


if (token==="") {
  // navigate to login page
  window.location.href = PAGES.login;

}

const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
};

// User

async function fetchUser() {
  const users = await fetch(`${API_URL}/api/users/me`, {
    headers: { ...defaultHeader },
  }).then((res) => res.json());
  return users;
}

// product

async function addCartService(productId) {
  const cartItems = await fetch(`${API_URL}/api/cartItems`, {
    method: "POST",
    headers: { ...defaultHeader },
    body: JSON.stringify({
      productId: productId,
      quantity: 1,
    }),
  }).then((res) => res.json());
  return cartItems;
}


// Cart
async function getCartItemsService() {
  const cartItems = await fetch(`${API_URL}/api/cartItems`, {
    headers: { ...defaultHeader },
  }).then((res) => res.json());
  return cartItems;
}

async function removeCartItemService(cartItemId) {
  const cartItems = await fetch(`${API_URL}/api/cartItems/${cartItemId}`, {
    method: "DELETE",
    headers: { ...defaultHeader },
  });
  return cartItems;
}

async function updateCartItemService(cartItemId, quantity) {
  const cartItems = await fetch(`${API_URL}/api/cartItems/${cartItemId}`, {
    method: "PUT",
    headers: { ...defaultHeader },
    body: JSON.stringify({
      quantity: quantity,
    }),
  }).then((res) => res.json());
  return cartItems;
}


// order
async function createOrderService() {
  const order = await fetch(`${API_URL}/api/orders/create`, {
    method: "POST",
    headers: { ...defaultHeader },
  }).then((res) => res.json());
  return order;
}

async function getOrderService() {
  const order = await fetch(`${API_URL}/api/orders`, {
    headers: { ...defaultHeader },
  }).then((res) => res.json());
  return order;
}

async function getOrderByIdService(orderId) {
  const order = await fetch(`${API_URL}/api/orders/${orderId}`, {
    headers: { ...defaultHeader },
  }).then((res) => res.json());
  return order;
}