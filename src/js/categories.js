export function displayCategory(data = []) {
    console.log(data);
    let result = "";
    const categoryMenuNode = document.querySelector(".tabBarUl");
    console.log(categoryMenuNode);
    data.forEach((category) => {
        result += `<li data-id="${category._id}"><a href="#">${category.name}</a></li>`
    });
    categoryMenuNode.innerHTML = result;
}