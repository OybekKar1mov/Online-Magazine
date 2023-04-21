import { searchCategory } from "../api";
import { displayProduct } from "./product";

export function displayCategory(data = []) {
  console.log(data);
  let result = "";
  const categoryMenuNode = document.querySelector(".tabBarUl");
  console.log(categoryMenuNode);
  data.forEach((category) => {
    result += `<li data-id="${category._id}" class="categories"><a href="#">${category.name}</a></li>`;
  });
  categoryMenuNode.innerHTML = result;
}

export function categoryEvent() {
  const carts = document.querySelectorAll(".categories");
  carts.forEach((cart) => {
    cart.addEventListener("click", (event) => {
      const element = event.target;
      console.log(element);
      const id = cart?.dataset?.id;
      if (!id) return;
      let cartPlus = element
        ?.closest(".categories")
        ?.classList.contains("categories");
      if (cartPlus) {
        searchCategory(id)
          .then(({ data }) => {
            if (data.success === true) {
              console.log(data);
              displayProduct(data.data);
            }
          })
          .catch((err) => {
            ToastAnalyse(err.response.data.msg);
          });
      }
    });
  });
}
