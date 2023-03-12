import { addCart, addFavorite } from "../api";

export function displayProduct(data = []) {
  console.log(data);
  let result = "";
  const productMenuNode = document.querySelector(".cards");
  console.log(productMenuNode);
  data.forEach((product) => {
    result += `<div class="card" data-id="${product._id}">
        <div class="cardImg">
        <img src="../img/cardImg.png" alt="Card Img" />
        </div>
<div class="cardText">
  <h3>${product.name}</h3>
  <i class="fa-solid fa-heart cartFavorite" data-id="${product._id}"></i>
  <i class="fa-solid fa-message-pen editPr" data-id="${product._id}"></i>
  <p>
  ${product.description}
  </p>
  <div class="cardStar">
    <img src="../img/star.png" alt="Star" />
    <img src="../img/star.png" alt="Star" />
    <img src="../img/star.png" alt="Star" />
    <img src="../img/star.png" alt="Star" />
    <img
      src="../img/non select star.png"
      alt="Non selected Star"
    />
  </div>
  <h2 class="priceH2">${product.salePrice}/кг <span>За ${product.quantity}гр.</span></h2>
  <button class="productBtn clickBtn" data-id="${product._id}">В корзину</button>
</div>
</div>`;
  });
  productMenuNode.innerHTML = result;
}

export function productEvent() {
  const carts = document.querySelectorAll(".card");
  carts.forEach((cart) => {
    cart.addEventListener("click", (event) => {
      const element = event.target;
      console.log(element);
      const id = cart?.dataset?.id;
      if (!id) return;
      let cartPlus = element
        ?.closest(".clickBtn")
        ?.classList.contains("clickBtn");
      if (cartPlus) {
        addCart(localStorage.userId, id).then(({ data }) => {
          console.log(data);
        });
      }
      let cartFavorite = element
        ?.closest(".cartFavorite")
        ?.classList.contains("cartFavorite");
      if (cartFavorite) {
        addFavorite(id).then(({ data }) => {
          console.log(data);
        });
      }
      let editProd = element?.closest(".editPr")?.classList.contains("editPr");
      if (editProd) {
        if (!id) return;
        history.pushState({ id }, null, "/updateProd.html");
        location.reload();
      }
    });
  });
}
