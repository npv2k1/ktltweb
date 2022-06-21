async function getOrder() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get("id");
  console.log(c);
  let order = await getOrderByIdService(c);
  console.log("Order", order);

  document.getElementById("orderId").innerHTML = order.id;
  order.orderItems.forEach((item) => {
    console.log(item);
    document.getElementById("danhsachmathang").innerHTML += `
            <tr>
                <td>${item.product.name}</td>
                <td>${item.quantity}</td>
                <td>${numberToVnd(item.price)}</td>
                <td>${numberToVnd(item.quantity * item.price)}</td>
            </tr>
            `;
  });

  document.getElementById("tongTienHang").innerHTML = numberToVnd(order.total);
  document.getElementById("phiVanChuyen").innerHTML = numberToVnd(15000);
  document.getElementById("tongTien").innerHTML = numberToVnd(
    order.total + 15000
  );
  document.getElementById("tongTienH").innerHTML = numberToVnd(
    order.total + 15000
  );
  document.getElementById("ngayMua").innerHTML = new Date(
    order.createdAt
  ).toLocaleDateString();
  document.getElementById("tongMatHang").innerHTML = order.orderItems.length;
  document.getElementById("ttdonhang").innerHTML =
    order?.status?.name || "Đã xác nhận";
}
getOrder();
