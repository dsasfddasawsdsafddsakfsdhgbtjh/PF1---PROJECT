const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

let total = 0;

cart.forEach(item => {

    total += item.price;

    checkoutItems.innerHTML += `
        <p>
            ${item.name}
            - ₱${item.price}
        </p>
    `;
});

checkoutTotal.textContent =
    `Total: ₱${total}`;

function placeOrder() {

    const fullName =
        document.getElementById(
            "fullName"
        ).value;

    const address =
        document.getElementById(
            "address"
        ).value;

    const phone =
        document.getElementById(
            "phone"
        ).value;

    if (
        !fullName ||
        !address ||
        !phone
    ) {
        alert(
            "Please complete all fields."
        );
        return;
    }

    const order = {
        customer: fullName,
        address: address,
        phone: phone,
        items: cart,
        total: total,
        date: new Date()
    };

    localStorage.setItem(
        "latestOrder",
        JSON.stringify(order)
    );

    localStorage.removeItem(
        "cart"
    );

    alert(
        "Order placed successfully!"
    );

    window.location.href =
        "order-success.html";
}