const wishlistContainer =
    document.getElementById(
        "wishlistContainer"
    );

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];

if (wishlist.length === 0) {

    wishlistContainer.innerHTML =
        "<p>No items in wishlist.</p>";

} else {

    wishlist.forEach(item => {

        wishlistContainer.innerHTML += `
        <div class="product-card">
            <img src="${item.image}">
            <h3>${item.name}</h3>
            <p>₱${item.price}</p>
        </div>
        `;
    });
}

document
    .getElementById("clearWishlist")
    .addEventListener("click", () => {

        localStorage.removeItem(
            "wishlist"
        );

        location.reload();
    });