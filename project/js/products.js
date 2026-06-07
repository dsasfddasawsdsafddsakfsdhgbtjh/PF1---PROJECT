const products = [
    {
        id: 1,
        name: "Oversized Tee",
        price: 799,
        category: "shirt",
        image: "https://via.placeholder.com/300x400",
        description: "Comfortable oversized t-shirt."
    },
    {
        id: 2,
        name: "Baggy Jeans",
        price: 1499,
        category: "pants",
        image: "https://via.placeholder.com/300x400",
        description: "Relaxed fit denim jeans."
    },
    {
        id: 3,
        name: "Zip Hoodie",
        price: 1299,
        category: "hoodie",
        image: "https://via.placeholder.com/300x400",
        description: "Warm hoodie."
    },
    {
        id: 4,
        name: "Cargo Pants",
        price: 1699,
        category: "pants",
        image: "https://via.placeholder.com/300x400",
        description: "Streetwear cargo pants."
    }
];
const selectedId = Number(
    localStorage.getItem("selectedProduct")
);

const product = products.find(
    p => p.id === selectedId
);

const details = document.getElementById(
    "productDetails"
);

if (product) {

    details.innerHTML = `
        <div class="product-card">
            <img src="${product.image}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3>₱${product.price}</h3>

            <button onclick="addToCart()">
                Add To Cart
            </button>
        </div>
    `;
}

function addToCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart"))
        || [];

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added to cart!");
}