let adminProducts =
    JSON.parse(
        localStorage.getItem("adminProducts")
    ) || [];

const productContainer =
    document.getElementById(
        "adminProducts"
    );

renderProducts();

function addProduct() {

    const name =
        document.getElementById(
            "productName"
        ).value;

    const price =
        document.getElementById(
            "productPrice"
        ).value;

    const category =
        document.getElementById(
            "productCategory"
        ).value;

    const image =
        document.getElementById(
            "productImage"
        ).value;

    const product = {
        id: Date.now(),
        name,
        price,
        category,
        image,
        description:
            "Added from admin dashboard"
    };

    adminProducts.push(product);

    localStorage.setItem(
        "adminProducts",
        JSON.stringify(adminProducts)
    );

    renderProducts();
}

function renderProducts() {

    productContainer.innerHTML = "";

    adminProducts.forEach(product => {

        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>₱${product.price}</p>

                <button
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            </div>
        `;
    });
}

function deleteProduct(id) {

    adminProducts =
        adminProducts.filter(
            product =>
                product.id !== id
        );

    localStorage.setItem(
        "adminProducts",
        JSON.stringify(adminProducts)
    );

    renderProducts();
}