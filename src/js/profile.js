import configs from "../configs";

export function displayProfile(data = []) {
  console.log(data);
  let result = "";
  const profileMenuNode = document.querySelector(".user");
  console.log(profileMenuNode);
  const imgs = data.img ? data.img : configs.defaultImg + "400";
  result += `<div class="aboutUser">
      <img src="${imgs}" alt="User Image" />
      <div class="documentUser">
        <h3>Ваше Имя: ${data.name}</h3>
        <h3>Ваша Фамилия: ${data.lastName}</h3>
        <h3>Ваш email: ${data.email}</h3>
        <h3>Ваш номер телефона: ${data.phone}</h3>
      </div>
    </div>
    <div class="roleUser">
      <h4>Вы: ${data.role}</h4>
      <span class="span">Ваш ID: ${data._id}</span>
    </div>`;
  profileMenuNode.innerHTML = result;
}
