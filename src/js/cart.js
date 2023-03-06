import { addCart, clearCart, deleteOneCart, getCart } from "../api";

export function displayCart(data = []) {
  console.log(data);
  let totalPrice = 0;
  let result = "";
  const cartMenuNode = document.querySelector(".cartMenu");
  const priceNode = document.querySelector(".totalPrice");
  data.forEach((cart) => {
    const product = cart.product;
    result += `<div class="cart" data-id="${cart._id}">
    <i class="fa-solid fa-trash-arrow-up cartTrash" data-id="${cart._id}"></i>
        <h4>${product.name}</h4>
        <div class="cartPcs">
          <button class="btnMinus">-</button>
          <h4 class="displayPcs">${cart.qty}</h4>
          <button class="btnPlus">+</button>
        </div>
        <h3>${cart.qty * product.salePrice + "so'm"}</h3>
      </div>`
    totalPrice += product.salePrice * cart.qty;
  });
  cartMenuNode.innerHTML = result;
  priceNode.innerHTML = totalPrice + ` so'm`;

}

export function clrCart() {
  const clearBtn = document.querySelector(".clearBtn");

  clearBtn.addEventListener("click", () => {
    clearCart(localStorage.userId);
    location.reload();
  });
};

// export function cartEvent() {
//   const carts = document.querySelectorAll(".cart");

//   carts.forEach((cart) => {
//     cart.addEventListener("click", (event) => {
//       const element = event.target;
//       const id = cart?.dataset?.id;
//       let cartPlus = element
//         .closest(".btnPlus")
//         ?.classList.contains("btnPlus");
//       if (cartPlus) {
//         if (!id) return;
//         addCart(localStorage.userId, id).then(({ data }) => {
//           console.log(data);
//         });
//       }
//     });
//   })
// };

export function cartFunc() {
  const cartNode = document.querySelectorAll(".cart");

  cartNode.forEach((cart) => {
    cart.addEventListener("click", (event) => {
      const id = event.target.closest(".cart")?.dataset?.id;
      if (!id) return;
      let result = 1;
      console.log("sas");

      console.log(id, "asdas");
      const isMenuBtn = event.target
        .closest(".cartTrash")
        ?.classList.contains("cartTrash");
      const cartadd = event.target
        .closest(".btnPlus")
        ?.classList.contains("btnPlus");
      if (isMenuBtn) {
        getCart().then(({ data }) => {
          const itemId = data.payload.items.filter((item) => {
            return item.product._id != id;
          });
          console.log(itemId);
          const dataCart = data.payload?.items?.forEach((data) => {
            return {
              product: `${data.product._id}`,
              quantity: `${data.qty}`,
              allSum: `${data.total}`,
            };
          });
          console.log(dataCart);
          deleteOneCart(localStorage.userId, dataCart ? dataCart : {}).then(
            (data) => {
              console.log(data);
              event.target.parentElement.parentElement.remove();
            }
          );
        });
      }
      let results;
      if (cartadd) {
        let datasd = event.target.previousElementSibling.innerHTML;

        addCart(localStorage.userId, id).then(({ data }) => {
          console.log(data);
          results = datasd;
          event.target.parentElement.children[1].innerHTML = ++results;
        });
      }
    });
  });
}
