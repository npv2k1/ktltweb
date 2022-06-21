let user


async function load() {
  user = await fetchUser();
  document.getElementById("gioHangSL").innerText = user.userCartItems.length;
  document.getElementById("username").innerText = user.username;
  console.log('user :>> ', user);
}
load();
function chuyenTrang(url) {
  window.location.href = url;
}
async function logout(){
  localStorage.removeItem("token");
  window.location.href = "index.html";
}


// Danh muc
function hienThiDanhMuc() {
  document.getElementById("danhmuc-nd").style.display = "block";
}

window.onclick = function (e) {
  if (!e.target.matches(".danhmuc-nut")) {
    document.getElementById("danhmuc-nd").style.display = "none";
  }
};



/**
 * Hàm lặp qua tất cả các phần tử trong tài liệu và nếu nó tìm thấy một phần tử có
 * thuộc tính "include-html", nó thay thế nội dung của phần tử đó bằng nội dung của tệp
 * được chỉ định bởi giá trị thuộc tính
 * */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Lặp qua một bộ sưu tập tất cả các phần tử HTML: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*tìm kiếm các phần tử có một thuộc tính nhất định:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Thực hiện một yêu cầu HTTP bằng cách sử dụng giá trị thuộc tính làm tên tệp: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Xóa thuộc tính và gọi hàm này một lần nữa: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Thoát khỏi hàm: */
      return;
    }
  }
}
includeHTML();
