
function domOrder(order) {
    const dsOrder = document.getElementById("listOrder");
    dsOrder.innerHTML += `
      <tr class="border-b bg-white hover:bg-gray-50">
              <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900">${
                order.id
              }</th>
              <td class="px-6 py-4">${new Date(
                order.createdAt
              ).toLocaleDateString()}</td>
              <td class="px-6 py-4">${order.phone}</td>
              <td class="px-6 py-4">${order.address}</td>
              <td class="px-6 py-4">${numberToVnd(order.total)}</td>           
              <td class="px-6 py-4">${
                order?.status?.name || "xác nhận"
              }</td>           
              <td class="px-6 py-4 text-right">
                <a href="/donhang.html?id=${
                  order.id
                }" class="font-medium text-blue-600 hover:underline">Xem</a>
              </td>
            </tr>    
    `;
}


async function loadOrder() {
    console.log("loadOrder");
    const orders = await getOrderService();
    orders.forEach(order => {
        domOrder(order);
    });
}
loadOrder();