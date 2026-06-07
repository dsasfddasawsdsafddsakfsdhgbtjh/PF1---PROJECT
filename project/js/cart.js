const cartContainer = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");
const clearCartBtn = document.getElementById("clearCartBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

if (cart.length === 0) {

    cartContainer.innerHTML = "<p>Your cart is empty.</p>";

} else {

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="product-card">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
               <p>₱${item.price}</p>
               <p>Quantity: ${item.quantity}</p>
            </div>
        `;
    });
}

totalPrice.textContent = `Total: ₱${total}`;

clearCartBtn.addEventListener("click", () => {

    localStorage.removeItem("cart");

    location.reload();
});