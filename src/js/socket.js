import { ToastAnalyse } from "./app";

const { io } = require("socket.io-client");
const socket = io("https://shopzone.onrender.com");
socket.on("disconnect", () => {
  ToastAnalyse("У вас нет доступа к интернету");
  // console.log("Отключено");
});
socket.on("connect", () => {
  ToastAnalyse("Вы снова подключены к сети");
  // console.log("Подключено");
});
export default socket;
