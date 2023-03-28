import configs from "../configs";
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

// window.addEventListener("load", () => {
const loader = document.querySelector("main");

//   loader.classList.add("loader-hidden");
// });

document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname;

  // socket.on("/orders/new", (data) => {
  //   console.log("Ishladi", data);
  //   alert(data);
  // });

  if (page === "/index.html" || page === "/") {
    console.log(page);
    getProduct()
      .then((data) => {
        displayProduct(data.data.data);
        productEvent();
      })
      .catch((err) => {
        console.log(err);
        // loader.remove();
      });
    getCategories()
      .then((data) => {
        displayCategory(data.data.payload);
      })
      .catch((err) => {
        console.log(err);
        loader.remove();
      });

    // Debounce

    const debounce = (fn, ms) => {
      let timeout;
      return function () {
        const fnCall = () => {
          fn.apply(this, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
      };
    };

    function onChange(e) {
      if (e.target.value) {
        return searchProduct(e.target.value)
          .then((data) => {
            displayProduct(data.data.payload);
          })
          .catch((err) => {
            console.log(err);
            ToastAnalyse(err.response.data.msg);
          });
      } else {
        getProduct()
          .then((data) => {
            displayProduct(data.data.data);
            productEvent();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    onChange = debounce(onChange, 300);
    document.querySelector(".searchInput").addEventListener("keyup", onChange);

    // Link to signIn or Profile

    const profileA = document.querySelector(".profileA");

    profileA.addEventListener("click", () => {
      if (localStorage.getItem("token")) {
        location.assign("/profile.html");
      } else {
        location.assign("/signIn.html");
      }
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
          if (data.data.success === true) {
            console.log(data);
            localStorage.token = data.data.token;
            localStorage.userId = data.data.user._id;
            localStorage.user = JSON.stringify(data.data.user.role);
            location.assign("/index.html");
          } else {
            ToastAnalyse(data.data.msg);
          }
        })
        .catch((err) => {});
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
        .catch((err) => {});
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
        loader.remove();
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
        loader.remove();
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
        loader.remove();
      });

    const profilebtn = document.querySelector(".deleteProfile");

    profilebtn.addEventListener("click", () => {
      deleteProfile();
      location.reload();
    });

    const logoutProfile = document.querySelector(".logoutProfile");
    logoutProfile.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
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
        .catch((err) => {});
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
        loader.remove();
      });
  }

  if (page === "/productUpdate.html" || page === "/productUpdate") {
    const form = document.querySelector(".productEditForm");
    console.log(form);
    console.log(history.state.id);
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

      updateProduct(history.state.id, formData)
        .then((data) => {
          console.log(data);
          location.assign("/");
        })
        .catch((err) => {});
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
