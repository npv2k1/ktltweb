let phone;
let address;
let kt = 1;

let mainUser;

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
        <span class="font-bold">${numberToVnd(
    c?.quantity * c?.product?.price
  )}</span>
    </div>
    `;
}

async function loadCart() {
  const carts = await getCartItemsService();
  console.log(carts);
  let total = 0;

  carts.map((c) => {
    document
      .querySelector(".ds-mat-hang")
      .insertAdjacentHTML("beforeend", matHang(c));
    total += parseInt(c?.quantity || 0) * parseInt(c?.product?.price || 0);
  });
  console.log(total);
  document.getElementById("tongTienHang").innerHTML = numberToVnd(total);
  document.getElementById("phiVanChuyen").innerHTML = numberToVnd(15000);
  document.getElementById("tongTien").innerHTML = numberToVnd(total + 15000);
}
loadCart();

async function makeOrder() {
  const res = await createOrderService(phone, address);
  console.log(res);
  window.location.href = "/donhang.html?id=" + res.id;
}

async function loadUserInfo() {
  const user = await fetchUser();
  mainUser = user;
  phone = user.phone;
  address = user.address;
  document.getElementById("sdt").textContent = user.phone;
  console.log(user.phone);
  document.getElementById("diachi").textContent = user.address;
}

/* A comment. */
window.addEventListener("DOMContentLoaded", (event) => {
  loadUserInfo();
});

async function capnhat() {
  let html;
  if (kt == 1) {
    html = `    <div class="tieu-de">
                <div>
                    <span>1</span>
                    <p>Số liên hệ</p>
                </div>
                <button onclick="capnhat()" class="nutbtn">Cập nhật</button>
              </div>
              <div>
                <div>Điện thoại:</div>
                <input id="sdt" class="sdt-input rounded-lg" value="${mainUser.phone}">
              </div>

              <div>
              <div class="tieu-de">
                <div>
                    <span>2</span>
                    <p>Địa chỉ gửi</p>
                </div>
                <!-- <button class="nutbtn"> Thêm</button> -->
              </div>
              <div>
                <div class="dia-chi">
                    <div>
                        <p class="loai-dia-chi">Gửi từ:</p>
                        <p class="dia-chi-ct">30 Trần Phú, P.Mộ Lao, Hà Đông, Hà Nội</p>
                    </div>
                </div>
              </div>
              </div>

              <div>
              <div class="tieu-de">
                <div>
                    <span>3</span>
                    <p>Địa chỉ nhận</p>
                </div>
              </div>
              <div>
                <input id="diachi" class="sdt-input rounded-lg" value="${mainUser.address}">
              </div>

              </div>

              </div>
          `;
    kt = 0;
  } else if (kt == 0) {
    mainUser.phone = document.getElementById("sdt").value;
    mainUser.address = document.getElementById("diachi").value;
    phone = mainUser.phone;
    address = mainUser.address;

    html = `  <div class="tieu-de">
                  <div>
                      <span>1</span>
                      <p>Số liên hệ</p>
                  </div>
                  <button onclick="capnhat()" class="nutbtn">Cập nhật</button>
              </div>
              <div>
                  <div class="dia-chi">
                      <div id="headlessui-radiogroup-option-13" role="radio" aria-checked="true" tabindex="0">
                          <div>
                              <p class="loai-dia-chi">Số điện thoại: </p>
                              <p id="sdt" class="dia-chi-ct">${mainUser.phone}</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div>
              <div class="tieu-de">
                  <div>
                      <span>2</span>
                      <p>Địa chỉ gửi</p>
                  </div>
                  <!-- <button class="nutbtn"> Thêm</button> -->
              </div>
              <div>
                  <div class="dia-chi">
                      <div>
                          <p class="loai-dia-chi">Gửi từ:</p>
                          <p class="dia-chi-ct">30 Trần Phú, P.Mộ Lao, Hà Đông, Hà Nội</p>
                      </div>
                  </div>
              </div>
              </div>

              <div>
              <div class="tieu-de">
                  <div>
                      <span>3</span>
                      <p>Địa chỉ nhận</p>
                  </div>
                  <!-- <button class="nutbtn"> Thêm</button> -->
              </div>
              <div>
                  <div class="dia-chi">
                      <div id="headlessui-radiogroup-option-13" role="radio" aria-checked="true" tabindex="0">
                          <div>
                              <p class="loai-dia-chi">Nơi nhận:</p>
                              <p id="diachi" class="dia-chi-ct">${mainUser.address}</p>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
                `;
    kt = 1;
  }

  document.getElementsByClassName("thong-tin-ca-nhan")[0].innerHTML = html;
}
