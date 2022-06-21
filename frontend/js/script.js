

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



function isInCart(productId) {
  for (let i = 0; i < user?.userCartItems?.length; i++) {
    if (user?.userCartItems[i].product.id === productId) {
      return true;
    }
  }
  console.log("not in cart");
  console.log(user)
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

function mauSanPham(ten, anh, mota, gia, id) {
  return `<div id="${id}" class="san_pham">
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
  const products = await getProductService();
  console.log(products.length);
  lengthProduct = products.length;
  numberPage = Math.floor((lengthProduct+19)/20);
  products.map((product,index) => {
    if (index >= start && index <= end)
    {
      dsSanPham.innerHTML += mauSanPham(
        product.name,
        product.image,
        "",
        product.price,
        product.id
      );
    }
  });
  
  var html=`<div class="phantrang">`
  html+=`<button onclick="veTrangDau()" type="button" class="veTrangDau"><<</button>`
  html+=`<button onclick="truoc()" type="button" class="truoc"><</button>`
  if (page > 1)
    html+=`<button onclick="veTrangN(${page-1})" type="button" class="page">${page-1}</button>`
  html+=`<button type="button" class="tranghientai">${page}</button>`
  if (page < numberPage)
    html+=`<button onclick="veTrangN(${page+1})" type="button" class="page">${page +1}</button>`
  html+=`<button onclick="sau()" type="button" class="sau">></button>`
  html+=`<button onclick="denTrangCuoi()" type="button" class="denTrangCuoi">>></button>`
  html+=`</div>`;
  phantrang.innerHTML=html;
  phantrang1.innerHTML=html;
}

loadProduct();

async function getLoad()
{
  localOrigin = location.origin;
  localPathname = location.pathname;
  local = localOrigin+localPathname+"?page="+page;
  window.location=local;
}


async function settupPage(newPage)
{
  page = newPage;
  start = (page-1)*perPage;
  end = perPage*page -1;
  getLoad();
}

async function veTrangDau(){
  console.log("ve trang dau");
  settupPage(1);
}

async function truoc()
{
  console.log("trang truoc");
  if (page > 1)
    settupPage(page-1);
}

async function sau()
{
  console.log("trang sau");
  if (page < numberPage)
    settupPage(page+1);

}

async function denTrangCuoi()
{
  console.log("trang cuoi");
  settupPage(numberPage);

}

async function veTrangN(newPage)
{
  settupPage(newPage);
}



