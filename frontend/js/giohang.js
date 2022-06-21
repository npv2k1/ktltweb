// let user;
// async function fetchUser(){
//     const u  = await fetch('/api/users/me').then(res=>res.json())
//     user = u;
//     console.log("User",u)
// }
//fetchUser()
function cartItem(cart) {
  return `
      <div class="ds-san-pham">
        <div class="tt-san-pham">
          <img src="${cart?.product?.image}" width="60">
          <span class="ten-san-pham-gio-hang">${cart?.product?.name}</span>
        </div>  
        <div class="tt-so-luong">
          <div class="so-luong">
            <button onclick="updateSL(${cart.id},${
    cart.quantity - 1
  })">-</button>
            <input onchange="textChange(${
              cart.id
            },this.value)" type="number" value="${cart.quantity}">
            <button onclick="updateSL(${cart.id},${
    cart.quantity + 1
  })">+</button>
          </div>
  
          <div class="tong">
            <span class="text-xs font-medium">${numberToVnd(
              cart?.quantity * cart?.product?.price
            )}</span>
          </div>
          <div class="xoa">
            <button onclick="xoa(${cart.id})">xóa</button>
          </div>
        </div>              
      </div>
    `;
}

async function loadCart() {
  document.querySelector(".san-phams").innerHTML = "";
  const carts = await getCartItemsService();
  console.log(carts);
  let total = 0;
  console.log(total);
  carts.map((c) => {
     document
       .querySelector(".san-phams")
       .insertAdjacentHTML("beforeend", cartItem(c));
    total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
  });
  console.log(total);
  document.getElementById("tongTienHang").innerHTML = numberToVnd(total); //`₫${total}`
}
loadCart();

async function updateSL(id, quantity) {
  const res = await updateCartItemService(id, quantity);
  console.log(res);
  loadCart();
}

async function textChange(id, quantity) {
  console.log({ id, quantity });
  await updateSL(id, quantity);
}

async function xoa(id) {
  const res = await removeCartItemService(id);
  console.log(res);
  loadCart();
}
