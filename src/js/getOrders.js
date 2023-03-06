import { changeOrderStatus, otmenOrder } from "../api";

export async function displayOrder(data = []) {
  console.log(data);
  let result = "";
  const orderMenuNode = document.querySelector(".getOrderSection");
  console.log(orderMenuNode);
  data.forEach((order) => {
    result += `
    <div class="orderDisp" data-id="${order._id}">
    <div class="order_address">
        <h3>Your Address: ${order.shipping.address}</h3>
        <h3>Your City: ${order.shipping.city}</h3>
        <h3>Your Zip: ${order.shipping.zip}</h3>
      </div>
      <div class="order_data">
        <h3>Your Name: ${order.customerId.name}</h3>
        <h3>Your Email: ${order.customerId.email}</h3>
        <h3>Your Phone: ${order.customerId.phone}</h3>
        <h3>Your Payment Type: ${order.paymentType}</h3>

        <h4>Order Status: ${order.status}</h4>
        <button class="orderComplete">Complete</button>
        <button class="orderCancel">Cancel</button>
      </div>
      </div>`
  });
  orderMenuNode.innerHTML = result;
};

export function orderEvent() {
  const orders = document.querySelectorAll(".orderDisp");

  orders.forEach((order) => {
    order.addEventListener("click", (event) => {
      const element = event.target;
      const id = order?.dataset?.id;
      let complatedOrder = element
        .closest(".orderComplete")
        ?.classList.contains("orderComplete");
      if (complatedOrder) {
        if (!id) return;
        changeOrderStatus(id).then(({ data }) => {
          console.log(data);
          event.target.parentElement.remove();
        });
      }
      let cancelOrder = element
        .closest(".orderCancel")
        ?.classList.contains("orderCancel");
      if (cancelOrder) {
        if (!id) return;
        otmenOrder(id).then(({ data }) => {
          console.log(data);
        });
      }
    });
  });
}