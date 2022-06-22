

let perPage = 20;
let page = 1;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has("page"))
  page = Number(urlParams.get("page"));
let start = (page-1)*perPage;
let end = perPage*page -1;
let lengthProduct = 0;
let numberPage=0;




const phantrang = document.getElementById("phan-trang");
const phantrang1 = document.getElementById("phan-trang-1");



function isInCart(productId, user) {
  for (let i = 0; i < user?.userCartItems?.length; i++) {
    if (user?.userCartItems[i].product.id === productId) {
      return true;
    }
  }
  // console.log("not in cart");
  // console.log(user)
  return false;
}


const dsSanPham = document.getElementById("ds-san-pham");

console.log(dsSanPham);

let sp = document.getElementsByClassName("san_pham");

async function addCart(productId) {

  const res = await addCartService(productId);
  await load();
  console.log(res);
  // alert("Đã thêm sản phẩm vào giỏ hàng")

  document.getElementById(`${productId}`).getElementsByClassName("nut_them_vao_gio_hang")[0].classList.add("disabled");
  var thongbao = document.getElementById("thongbao");
  thongbao.innerHTML = "Đã thêm sản phẩm vào giỏ hàng";


  thongbao.className ="show"
  setTimeout(function () {
    thongbao.className = thongbao.className.replace("show", "");
  }, 3000);
}

function mauSanPham(ten, anh, mota, gia, id,loai,trongGio) {
  return `<div id="${id}" class="san_pham">
            <div class="noi_dung_san_pham">
            <p class="ghi_chu">
              ${loai ? loai : "Thực phẩm"}
            </p>
            <img class="anh-minh_hoa_san_pham"
              src="${anh}" />
            <div class="can_le"></div>
            <h4 class="ten_san_pham">${ten}</h4>
            <p class="mo_ta_san_pham">${""}</p>
            <div class="gia_san_pham">
              <p>${numberToVnd(gia)}</p>
            </div>

             <button onClick="addCart(${id},1)" class="nut_them_vao_gio_hang ${
    trongGio ? " disabled " : ""
  }">
              Thêm vào giỏ hàng
            </button>
           
          </div>
        </div>`;
}

async function loadProduct() {
  
  
  dsSanPham.innerHTML="";
  let products = await searchProductService("");;
  if(urlParams.has("name")){
    products = await searchProductService(urlParams.get("name")|| "");
  }
  
  

  let user = await fetchUser()
  console.log(products.length);
  

  products.map((product,index) => {
    if (index >= start && index <= end)
    {
      dsSanPham.innerHTML += mauSanPham(
        product.name,
        product.image,
        "",
        product.price,
        product.id,
        product?.category?.name,
        isInCart(product.id, user)
      );
    }
  });

}

loadProduct();



// chờ page load xong
document.addEventListener("DOMContentLoaded", async () => {
  async function hienThiDanhMuc() {
    const danhmucs = await getCategoryService();
    console.log(danhmucs);
    danhmucs.map((danhmuc) => {
      const danhmuc1 = document.getElementById("danhmuc-nd");
      danhmuc1.innerHTML += `<a href="/?categoryId=${danhmuc.id}">${danhmuc.name}</a>`;
    }
    );
  }
  hienThiDanhMuc();
})
