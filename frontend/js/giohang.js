let listCart = getCartItem();

async function getCartItem() {
  const carts = await getCartItemsService();

  listCart = carts;
  return carts;
}

getCartItem();

function cartItem(cart) {
  return `
      <div class="ds-san-pham sanpham${cart.id}">
        <div class="tt-san-pham">
          <img src="${cart?.product?.image}" width="60">
          <span class="ten-san-pham-gio-hang">${cart?.product?.name}</span>
        </div>  
        <div class="tt-so-luong">
          <div class="so-luong">
            <button onclick="updateSL(${cart.id},${-1})">-</button>
            <input class="${cart.id}" onchange="textChange(${
    cart.id
  })" type="number" value="${cart.quantity}">
            <button onclick="updateSL(${cart.id},${1})">+</button>
          </div>
  
          <div class="tong">
            <span class="text-xs font-medium tong${cart.id}">${numberToVnd(
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
  await getCartItem();

  let total = 0;
  const carts = listCart;
  console.log(carts);
  carts.map((c) => {
    document.querySelector(`.san-phams`).innerHTML += cartItem(c);

    total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
  });
  console.log(total);

  updateTotal();
}
loadCart();

async function updateTotal() {
  let total = 0;
  listCart.map((c) => {
    document.querySelector(`.tong${c?.id}`).innerHTML = numberToVnd(
      c?.quantity * c?.product?.price
    );
    total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
  });
  document.getElementById("tongTienHang").innerHTML = numberToVnd(total);
}

async function updateSL(id, dau) {
  let quantity = Number(document.getElementsByClassName(`${id}`)[0].value);
  if (quantity > 1 && dau < 0) {
    quantity = quantity + dau;
    const res = await updateCartItemService(id, quantity);
    console.log(res);
    document.getElementsByClassName(`${id}`)[0].value = quantity;
    document.getElementsByClassName(`${id}`)[0].innerHTML = quantity;
  } else if (quantity < 999 && dau > 0) {
    quantity = quantity + dau;
    const res = await updateCartItemService(id, quantity);
    console.log(res);
    document.getElementsByClassName(`${id}`)[0].value = quantity;
    document.getElementsByClassName(`${id}`)[0].innerHTML = quantity;
  } else if (dau == 0) {
    const res = await updateCartItemService(id, quantity);
    console.log(res);
    document.getElementsByClassName(`${id}`)[0].value = quantity;
    document.getElementsByClassName(`${id}`)[0].innerHTML = quantity;
  }

  for (let i = 0; i < listCart.length; i++)
    if (listCart[i].id == id) listCart[i].quantity = quantity;
  updateTotal();
}

async function textChange(id) {
  console.log({ id });
  quantity = document.getElementsByClassName(`${id}`)[0].value;
  document.getElementsByClassName(`${id}`)[0].innerHTML = quantity;
  await updateSL(id, 0);
}

async function xoa(id) {
  const res = await removeCartItemService(id);
  console.log(res);

  document.getElementsByClassName(`sanpham${id}`)[0].remove();
  let i = 0;
  while (listCart[i].id != id) i++;
  listCart.splice(i, 1);
  updateTotal();
}
