export function collectProduct(name, description, categoryId, price, salePrice, quantity) {
    try {
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.price = price;
        this.salePrice = salePrice;
        this.quantity = quantity;
    } catch (err) {
        console.log(err);
    }
}