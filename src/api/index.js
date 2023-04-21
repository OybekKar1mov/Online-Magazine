import axios from "../utils/axios";
import configs from "../configs";
import { ToastAnalyse } from "../js/app";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export async function signUp(query) {
  if (!query) {
    ToastAnalyse("Please insert required parametr");
  } else {
    let url = `auth/sign-up`;
    return axios.post(url, {
      name: query.name,
      lastName: query.lastName,
      email: query.email,
      phone: query.phone,
      password: query.password,
    });
  }
}

export function signIn(query) {
  if (!query) {
    ToastAnalyse("Please insert required parametr");
  } else {
    let url = `auth/sign-in`;
    return axios.post(url, {
      email: query.email,
      password: query.password,
    });
  }
}

export async function getProduct() {
  let url = `products/public`;
  return axios.get(url);
}

export async function getCategories() {
  let url = `categories/`;
  return axios.get(url);
}

export async function getCart() {
  let url = `cart/${userId}`;
  return axios.get(url);
}

export function deleteOneCart(id, items) {
  let url = `cart/${id}/remove`;

  return axios.put(url, {
    id: `${id}`,
    items: items,
  });
}

export async function getFavorite() {
  let url = `favorites/all/${userId}`;
  return axios.get(url);
}

export async function addFavorite(productId) {
  if (!productId) {
    throw "Please insert id parametr";
  }
  let url = `favorites/`;
  return axios.post(url, {
    productId: productId,
    userId: localStorage.getItem("userId"),
  });
}

export async function deleteFavoriteId(productId) {
  if (!productId) {
    throw "Please insert id parametr";
  }
  let url = `favorites/${productId}`;
  return axios.delete(url);
}

export async function addCart(id, _id) {
  if (!id && !_id) {
    throw "Please insert id parametr";
  }
  let url = `cart/${id}/add`;
  return axios.post(url, {
    product: _id,
    qty: 1,
    total: 3000,
  });
}

export async function clearCart(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `cart/${id}/empty`;
  return axios.delete(url);
}

export async function createProduct(query) {
  if (!query) {
    throw "Please insert query parametr";
  }
  let url = `products/`;
  return axios.post(url, {
    name: query.name,
    description: query.description,
    categoryId: query.categoryId,
    price: query.price,
    salePrice: query.salePrice,
    quantity: query.quantity,
  });
}

export async function getProlife() {
  let url = `auth/profile/`;
  return axios.get(url);
}

export async function getOrder() {
  let url = `orders/customer/${localStorage.userId}`;
  return axios.get(url);
}

export async function postOrder(customer, items, total) {
  let url = `orders/`;
  return axios.post(url, {
    cartId: localStorage.userId,
    customer: customer,
    items: items,
    total: total,
  });
}

export async function deleteProfile() {
  let url = `users/${localStorage.userId}/delete`;
  return axios.get(url);
}

export async function changeOrderStatus(id) {
  if (!id) {
    throw "Please insert id parametr";
  }
  let url = `orders/${id}/change-status`;
  return axios.put(url, {
    status: "completed",
  });
}

export async function otmenOrder(id) {
  let url = `orders/${id}/change-status`;
  return axios.put(url, {
    status: "canceled",
  });
}

export async function updateProduct(id, formData) {
  if ((!id, !formData)) {
    ToastAnalyse("Please insert required parametr");
  } else {
    let url = `products/${id}/edit`;
    return axios.put(url, formData);
  }
}

export function searchProduct(query) {
  if (!query) {
    ToastAnalyse("Please enter params");
  } else {
    let url = `products/search/${query}/page=${1}`;
    return axios.get(url);
  }
}

export function searchCategory(query) {
  if (!query) {
    ToastAnalyse("Please enter params");
  } else {
    let url = `products/category/${query}/`;
    return axios.get(url);
  }
}
