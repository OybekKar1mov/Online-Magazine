import { addCart, deleteFavoriteId } from "../api";

export function displayFavorite(data = []) {
  console.log(data);
  let result = "";
  const productMenuNode = document.querySelector(".cards");
  console.log(productMenuNode);
  data.forEach((product) => {
    // Description cut
    const originalText = product.description;
    const maxLength = 60;

    const cuttedText = cutText(originalText, maxLength);
    // img set
    const imgs = product.img ? product.img : configs.defaultImg + "400";
    result += `<div class="card" data-id="${product._id}">
        <div class="cardImg">
        <img src="${imgs}" alt="Card Img" />
        </div>
<div class="cardText">
  <h3>${product.name}</h3>
  <i class="fa-solid fa-trash-can favoriteDel" data-id="${product._id}"></i>
  <p>
  ${cuttedText}
  </p>
  <h2 class="priceH2">${product.salePrice}/кг <span>За ${product.quantity}гр.</span></h2>
  <button class="productBtn clickBtn" data-id="${product._id}">В корзину</button>
</div>
</div>`;
  });
  productMenuNode.innerHTML = result;
}

export function FavoriteEvent() {
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
      let favoriteDelete = element
        ?.closest(".favoriteDel")
        ?.classList.contains("favoriteDel");
      if (favoriteDelete) {
        deleteFavoriteId(id).then(({ data }) => {
          console.log(data);
        });
      }
    });
  });
}

function cutText(text, maxLength) {
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + "...";
  }
  return text;
}
