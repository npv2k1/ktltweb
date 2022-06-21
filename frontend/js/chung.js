function chuyenTrang(url) {
  window.location.href = url;
}

async function load() {
  user = await fetchUser();
  document.getElementById("gioHangSL").innerText = user.userCartItems.length;
  document.getElementById("username").innerText = user.username;
  console.log('user :>> ', user);
}
load();

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



function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
includeHTML();
