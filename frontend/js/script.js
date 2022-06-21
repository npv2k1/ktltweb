

let user;
async function load(){
    user = await fetchUser();
    document.getElementById("gioHangSL").innerText = user.userCartItems.length;
}
load();

function isInCart(productId) {
  for (let i = 0; i < user?.userCartItems?.length; i++) {
    if (user.userCartItems[i].product.id === productId) {
      return true;
    }
  }
  console.log("not in cart");
  return false;
}


function refreshPage() {
  var page_y = $(document).scrollTop();
  window.location.href = window.location.href + "?page_y=" + page_y;
}

const dsSanPham = document.getElementById("ds-san-pham");

console.log(dsSanPham);

let sp = document.getElementsByClassName("san_pham");

async function addCart(productId) {

  const res = await addCartService(productId);
  await load();
  console.log(res);
  // loadProduct();
}

const buttonTemplate = `
<div class="text-light flex h-7 w-full overflow-hidden rounded bg-[#009f7f] md:h-9">
  <button class="hover:bg-accent-hover cursor-pointer p-2 transition-colors duration-200 focus:outline-none">
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="stroke-2.5 h-3 w-3"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"></path></svg>
  </button>
  <div class="flex flex-1 items-center justify-center px-3 text-sm font-semibold">1</div>
  <button class="hover:bg-accent-hover cursor-pointer p-2 transition-colors duration-200 focus:outline-none" title="">
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="md:w-4.5 stroke-2.5 md:h-4.5 h-3.5 w-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
  </button>
</div>
`;

function mauSanPham(ten, anh, mota, gia, id) {
  return `<div class="san_pham">
          <div class="noi_dung_san_pham">
            <p class="ghi_chu">
              Thực phẩm
            </p>
            <img class="anh-minh_hoa_san_pham"
              src="${anh}" />
            <div class="can_le"></div>
            <h4 class="ten_san_pham">${ten}</h4>
            <p class="mo_ta_san_pham">${""}</p>
            <div class="gia_san_pham">
              <p>đ${gia}</p>
            </div>

             <button onClick="addCart(${id},1)" class="nut_them_vao_gio_hang ${isInCart(id)?" disabled ":""}">
              Thêm vào giỏ hàng
            </button>

           
          </div>
        </div>`;
}

async function loadProduct() {
  dsSanPham.innerHTML="";
  const products = await fetch("http://localhost:8081/api/products", {
      headers:{
          authorization: `Bearer ${localStorage.getItem("token")}`
      }
  }).then((res) => res.json());
  console.log(products);
  products.map((product) => {
    dsSanPham.innerHTML += mauSanPham(
      product.name,
      product.image,
      "",
      product.price,
      product.id
    );
  });
}

loadProduct();





