const container = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const adminProducts =
    JSON.parse(
        localStorage.getItem("adminProducts")
    ) || [];

const allProducts = [
    ...products,
    ...adminProducts
];
function displayProducts(productList) {

    container.innerHTML = "";

    productList.forEach(product => {

        container.innerHTML += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₱${product.price}</p>

            <button onclick="viewProduct(${product.id})">
                View Details
            </button>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button onclick="addToWishlist(${product.id})">
                ❤️ Wishlist
            </button>
        </div>
        `;
    });
}

displayProducts(allProducts);

searchInput.addEventListener("keyup", () => {

    const keyword =
        searchInput.value.toLowerCase();

    const filtered =
        allProducts.filter(product =>
            product.name
                .toLowerCase()
                .includes(keyword)
        );

    displayProducts(filtered);
});

function addToCart(id) {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const product =
        products.find(
            p => p.id === id
        );

    const existingItem = cart.find(
        item => item.id === product.id
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added to cart!");
}

function addToWishlist(id) {

    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    const product =
        products.find(
            p => p.id === id
        );

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Added to wishlist!");
}
function filterProducts(category) {

    if (category === "all") {

        displayProducts(allProducts);

        return;
    }

    const filtered =
        products.filter(product =>
            product.category === category
        );

    displayProducts(filtered);
}

function viewProduct(id) {

    localStorage.setItem(
        "selectedProduct",
        id
    );

    window.location.href =
        "product.html";
}