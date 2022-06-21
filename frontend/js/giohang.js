// let user;
// async function fetchUser(){
//     const u  = await fetch('/api/users/me').then(res=>res.json())
//     user = u;
//     console.log("User",u)
// }
//fetchUser()
let listCart = getCartItem();

async function getCartItem()
{
  const carts = await getCartItemsService();
  // console.log(carts);
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
            <input class="${cart.id}" onchange="textChange(${cart.id})" type="number" value="${
    cart.quantity
  }">
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

  // const carts = await getCartItemsService();
  // console.log(carts);
  let total = 0;
  const carts = listCart;
  console.log(carts);
  carts.map((c) => {
    $(".san-phams").append(cartItem(c));
    total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
  });
  console.log(total);
  // document.getElementById("tongTienHang").innerHTML = numberToVnd(total); //`₫${total}`
  updateTotal();
}
loadCart();

async function updateTotal()
{
  let total =0;
  listCart.map((c) => {
    $(`.tong${c?.id}`).html(numberToVnd(c?.quantity * c?.product?.price));
    total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
  });
  document.getElementById("tongTienHang").innerHTML = numberToVnd(total); //`₫${total}`
}

async function updateSL(id,dau) {
  let quantity = Number($(`.${id}`).val());
  if (quantity > 1 && dau <0)
  {
    quantity = quantity+dau;
    const res = await updateCartItemService(id, quantity);
    console.log(res);
    $(`.${id}`).val(quantity);
    $(`.${id}`).html(quantity);
    
    // loadCart();
  }
  else 
  if (quantity<999 && dau >0)
  {
    quantity = quantity +dau;
    const res = await updateCartItemService(id, quantity);
    console.log(res);
    $(`.${id}`).val(quantity);
    $(`.${id}`).html(quantity);
    
    // loadCart();
  }
  else if (dau ==0)
  {
    const res = await updateCartItemService(id, quantity);
    console.log(res);
    $(`.${id}`).val(quantity);
    $(`.${id}`).html(quantity);
  }

  for (let i =0;i<listCart.length;i++)
    if (listCart[i].id == id) listCart[i].quantity = quantity;
    updateTotal();
    
}


async function textChange(id) {
  console.log({id});
  quantity = $(`.${id}`).val();
  $(`.${id}`).html(quantity);
  await updateSL(id,0);
}

async function xoa(id) {
  const res = await removeCartItemService(id);
  console.log(res);
  // loadCart();
  updateTotal();
}
