const khung = document.querySelector(".khung"),
  dangKy = document.querySelector(".dangky-link"),
  dangNhap = document.querySelector(".dangnhap-link");

// js code xuất hiện đăng ký và đăng nhập
dangKy.addEventListener("click", () => {
  khung.classList.add("active");
});
dangNhap.addEventListener("click", () => {
  khung.classList.remove("active");
});

// kiểm tra định dạng email
const kiemTraEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//kiểm tra các trường nhập của đăng nhập
function xacnhan(event) {
  var giatriemail = document.getElementById("email").value.trim();
  var giatrimatkhau = document.getElementById("matkhau").value.trim();
  var email = document.getElementById("email");
  var matkhau = document.getElementById("matkhau");

  if (giatriemail == "") {
    email.style.border = "1px solid #ff8471";
    loi("loi_email", "Email không được bỏ trống");
  } else if (!kiemTraEmail(giatriemail)) {
    email.style.border = "1px solid #ff8471";
    loi("loi_email", "Email sai");
  } else {
    email.style.border = "1px solid #7b5be4";
    loi("loi_email", "");
  }

  if (giatrimatkhau == "") {
    matkhau.style.border = "1px solid #ff8471";
    loi("loi_mat_khau", "Mật khẩu không được bỏ trống");
  } else if (giatrimatkhau.length < 8) {
    matkhau.style.border = "1px solid #ff8471";
    loi("loi_mat_khau", "Mật khẩu phải nhiều hơn 8 kí tự");
  } else {
    matkhau.style.border = "1px solid #7b5be4";
    loi("loi_mat_khau", "");
  }

  if (
    giatriemail == "" ||
    giatrimatkhau == "" ||
    !kiemTraEmail(giatriemail) ||
    giatrimatkhau.length < 8
  ) {
    return false;
  } else {
    return true;
  }
}

function loi(id, message) {
  document.getElementById(id).innerHTML = message;
}

//kiểm tra các trường nhập của đăng ký
function xacnhandangky(event) {
  var giatriemaildangky = document.getElementById("emaildangky").value.trim();
  var giatritendangky = document.getElementById("tendangky").value.trim();
  var giatrimatkhaudangky = document
    .getElementById("matkhaudangky")
    .value.trim();
  var giatrimatkhaudangkynhaplai = document
    .getElementById("matkhaudangkynhaplai")
    .value.trim();

  var emaildangky = document.getElementById("emaildangky");
  var tendangky = document.getElementById("tendangky");
  var matkhaudangky = document.getElementById("matkhaudangky");
  var matkhaudangkynhaplai = document.getElementById("matkhaudangkynhaplai");

  if (giatriemaildangky == "") {
    emaildangky.style.border = "1px solid #ff8471";
    loidangky("loi_emaildangky", "Email không được bỏ trống");
  } else if (!kiemTraEmail(giatriemaildangky)) {
    emaildangky.style.border = "1px solid #ff8471";
    loidangky("loi_emaildangky", "Email sai");
  } else {
    emaildangky.style.border = "1px solid #7b5be4";
    loidangky("loi_emaildangky", "");
  }

  if (giatritendangky == "") {
    tendangky.style.border = "1px solid #ff8471";
    loidangky("loi_tendangky", "Tên không được bỏ trống");
  } else {
    tendangky.style.border = "1px solid #7b5be4";
    loidangky("loi_tendangky", "");
  }

  if (giatrimatkhaudangky == "") {
    matkhaudangky.style.border = "1px solid #ff8471";
    loidangky("loi_mat_khaudangky", "Mật khẩu không được bỏ trống");
  } else if (giatrimatkhaudangky.length < 8) {
    matkhaudangky.style.border = "1px solid #ff8471";
    loidangky("loi_mat_khaudangky", "Mật khẩu phải nhiều hơn 8 kí tự");
  } else {
    matkhaudangky.style.border = "1px solid #7b5be4";
    loidangky("loi_mat_khaudangky", "");
  }

  if (giatrimatkhaudangkynhaplai == "") {
    matkhaudangkynhaplai.style.border = "1px solid #ff8471";
    loidangky("loi_mat_khaudangkynhaplai", "Mật khẩu không được bỏ trống");
  } else if (giatrimatkhaudangkynhaplai.length < 8) {
    matkhaudangkynhaplai.style.border = "1px solid #ff8471";
    loidangky("loi_mat_khaudangkynhaplai", "Mật khẩu phải nhiều hơn 8 kí tự");
  } else {
    matkhaudangkynhaplai.style.border = "1px solid #7b5be4";
    loidangky("loi_mat_khaudangkynhaplai", "");
  }
  console.log("btn dang ký")
  
  if (
    giatriemaildangky == "" ||
    giatrimatkhaudangky == "" ||
    !kiemTraEmail(giatriemaildangky) ||
    giatrimatkhaudangky.length < 8 ||
    giatritendangky == "" ||
    giatrimatkhaudangkynhaplai == "" ||
    giatrimatkhaudangkynhaplai.length < 8
  ) {
   
    return false;
  } else {
    dangky();
    return true;
  }

}

function loidangky(id, message) {
  document.getElementById(id).innerHTML = message;
}
const api = "http://localhost:8081";

async function dangnhap(event) {
  event.preventDefault();
  fetch(`http://localhost:8081/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("email").value,
      password: document.getElementById("matkhau").value,
    }),
  })
    .then((res) => res.json())
    .then((dt) => {
      console.log(dt);
      localStorage.setItem("token", dt.token);
      // navigation home
      window.location.href = "index.html";
    });
}
async function dangky() {
  
  const res = await fetch(`http://localhost:8081/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById("emaildangky").value,
      password: document.getElementById("matkhaudangky").value,
      username: document.getElementById("tendangky").value,
    }),
  })
  // reload
  window.location.href = "dangnhap.html";
  


   
}
