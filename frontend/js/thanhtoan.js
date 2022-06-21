function matHang(c) {
  return `
     <div class="mat-hang">
        <div>
            <span>
                <span>${c?.quantity}</span>
                <span>x</span>
                <span>${c.product?.name}</span> | <span>1lb</span>
            </span>
        </div>
        <span class="font-bold">${numberToVnd(c?.quantity * c?.product?.price)}</span>
    </div>
    `;
}

async function loadCart() {
  const carts = await getCartItemsService();
  console.log(carts);
  let total = 0;

  carts.map((c) => {
    $(".ds-mat-hang").append(matHang(c));
    total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
  });
  console.log(total);
  document.getElementById("tongTienHang").innerHTML = numberToVnd(total);
  document.getElementById("phiVanChuyen").innerHTML = numberToVnd(15000);
  document.getElementById("tongTien").innerHTML = numberToVnd(total + 15000);

}
loadCart();

async function makeOrder(){
  const res = await createOrderService()
  console.log(res)
  window.location.href = "/donhang.html?id=" + res.id;
}

async function loadUserInfo(){
  const user = await fetchUser();
  document.getElementById("sdt").value = user.phone;
  document.getElementById("diachi").textContent = user.address;
}

/* A comment. */
window.addEventListener("DOMContentLoaded", (event) => {
  loadUserInfo();
});