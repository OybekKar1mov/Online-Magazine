import "../sass/style.scss";
import {
  signUp,
  signIn,
  getProduct,
  getCategories,
  getCart,
  createProduct,
  getFavorite,
  getProlife,
  getOrder,
  postOrder,
  deleteProfile,
  updateProduct,
  searchProduct,
} from "../api";
import { SignUp } from "./signUp";
import { SignIn } from "./signIn";
import { displayProduct, productEvent } from "./product";
import { displayCategory } from "./categories";
import { cartFunc, clrCart, displayCart } from "./cart";
import { collectProduct } from "./createProduct";
import { displayProfile } from "./profile";
import { Order } from "./orders";
import { displayOrder, orderEvent } from "./getOrders";
import { displayFavorite, FavoriteEvent } from "./favorite";
import { editProduct } from "./updateProd";
import Toastify from "toastify-js";
import socket from "./socket";

document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname;

  socket.on("/orders/new", (data) => {
    console.log("Ishladi", data);
  });

  if (page === "/index.html" || page === "/") {
    console.log(page);
    getProduct()
      .then((data) => {
        displayProduct(data.data.data);
        productEvent();
      })
      .catch((err) => {
        console.log(err);
      });
    getCategories()
      .then((data) => {
        displayCategory(data.data.payload);
      })
      .catch((err) => {
        // console.log(err);
        ToastAnalyse(err);
      });
    const formSearch = document.querySelector(".searchForm");
    formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchInput = document.querySelector(".searchInput");
      searchProduct(searchInput.value)
        .then((data) => {
          displayProduct(data.data.payload);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  if (page === "/signUp.html" || page === "/signUp") {
    const form = document.querySelector(".signUp");
    console.log(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new SignUp(
        form.name.value,
        form.lastName.value,
        form.email.value,
        form.password.value,
        form.phone.value
      );
      console.log(formData);

      signUp(formData)
        .then((data) => {
          console.log(data);
          if (data.success === true) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("userId", data.data.payload._id);
            location.href = "/";
          } else {
            Toastify({
              text: data.data.msg,
              duration: 4000,
              newWindow: true,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              onClick: function () {},
            }).showToast();
          }
        })
        .catch((err) => {
          alert(err.response.data.msg);
          ToastAnalyse(err);
        });
    });
  }

  if (page === "/signIn.html" || page === "/signIn") {
    const form = document.querySelector(".signIn");
    console.log(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new SignIn(form.email.value, form.password.value);
      console.log(formData);

      signIn(formData)
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userId", data.data.payload._id);
          location.href = "/";
        })
        .catch((err) => {
          ToastAnalyse(err);
        });
    });
  }

  if (page === "/cart.html" || page === "/cart") {
    getCart()
      .then((data) => {
        console.log(data.data);
        displayCart(data.data.payload.items);
        cartFunc();
      })
      .catch((err) => {
        console.log(err);
        ToastAnalyse(err);
      });
    clrCart();
  }

  if (page === "/createProduct.html" || page === "/createProduct") {
    const form = document.querySelector(".productForm");
    console.log(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new collectProduct(
        form.name.value,
        form.description.value,
        form.categoryId.value,
        form.price.value,
        form.salePrice.value,
        form.quantity.value
      );
      console.log(formData);

      createProduct(formData)
        .then((data) => {
          console.log(data);
          if (data.status == "200") {
            location.href = "/";
          }
        })
        .catch((err) => {
          alert(err);
          ToastAnalyse(err);
        });
    });
  }

  if (page === "/favorites.html" || page === "/favorites") {
    getFavorite()
      .then((data) => {
        console.log(data);
        displayFavorite(data.data.payload.items);
        FavoriteEvent();
      })
      .catch((err) => {
        console.log(err);
        ToastAnalyse(err);
      });
  }

  if (page === "/profile.html" || page === "/profile") {
    getProlife()
      .then((data) => {
        console.log(data);
        displayProfile(data.data.payload);
      })
      .catch((err) => {
        console.log(err);
        ToastAnalyse(err);
      });

    getProduct()
      .then((data) => {
        displayProduct(data.data.data);
      })
      .catch((err) => {
        console.log(err);
        ToastAnalyse(err);
      });

    const profilebtn = document.querySelector(".profilebtn");

    profilebtn.addEventListener("click", () => {
      deleteProfile();
      location.reload();
    });
  }

  if (page === "/orders.html" || page === "/orders") {
    const form = document.querySelector(".orderForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new Order(
        form.name.value,
        form.phone.value,
        form.address.value,
        form.city.value,
        form.zip.value,
        form.email.value
      );
      await getCart()
        .then((data) => {
          console.log(data);
          const itemId = data.payload?.items?.forEach((data) => {
            return {
              product: `${data.product._id}`,
              quantity: `${data.qty}`,
              allSum: `${data.total}`,
            };
          });
          let totals = 0;
          const total = data.payload?.items?.forEach((data) => {
            totals = totals + data.total;
          });
          postOrder(formData, itemId, totals).then((data) => {
            console.log(data);
          });
        })
        .catch((err) => {
          ToastAnalyse(err);
        });
    });
  }

  if (page === "/getOrders.html" || page === "/getOrders") {
    getOrder()
      .then((data) => {
        console.log(data);
        displayOrder(data.data.payload);
        orderEvent();
      })
      .catch((err) => {
        console.log(err);
        ToastAnalyse(err);
      });
  }

  if (page === "/productUpdate.html" || page === "/productUpdate") {
    const form = document.querySelector(".productEditForm");
    console.log(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new editProduct(
        form.name.value,
        form.description.value,
        form.categoryId.value,
        form.price.value,
        form.salePrice.value,
        form.quantity.value
      );
      console.log(formData);

      updateProduct(sessionStorage.getItem("id"), formData)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          ToastAnalyse(err);
        });
      location.assign("/");
    });
  }
});

export async function ToastAnalyse(display) {
  Toastify({
    text: display,
    duration: 4000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    onClick: function () {},
  }).showToast();
}
