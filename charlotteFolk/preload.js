(function () {
    const CART_KEY = "cfCartItems";

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveCart(items) {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        updateCartCount();
    }

    function parsePrice(priceText) {
        const cleanedPrice = (priceText || "").replace(/[^\d.]/g, "");
        return Number(cleanedPrice) || 0;
    }

    function formatMoney(amount) {
        return "PHP " + amount.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function normalizeImageUrl(url) {
        if (!url) {
            return "";
        }

        if (url.startsWith("//")) {
            return "https:" + url;
        }

        return url;
    }

    function getProductFromCard(card) {
        const titleLink = card.querySelector(".product-card-title");
        const image = card.querySelector(".product-primary-image, .product-featured-image-link img");
        const price = card.querySelector(".amount");
        const productUrl = titleLink ? titleLink.getAttribute("href") : "";

        return {
            id: productUrl || (titleLink ? titleLink.textContent.trim() : Date.now().toString()),
            title: titleLink ? titleLink.textContent.trim() : "Charlotte Folk Item",
            price: parsePrice(price ? price.textContent : "0"),
            priceText: price ? price.textContent.trim() : "PHP 0.00",
            image: normalizeImageUrl(image ? image.getAttribute("src") || image.dataset.src : ""),
            url: productUrl || "#",
            quantity: 1
        };
    }

    function addToCart(product) {
        const cart = getCart();
        const existingItem = cart.find(function (item) {
            return item.id === product.id;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }

        saveCart(cart);
        showCartNotice(product.title + " added to cart.");
    }

    function showCartNotice(message) {
        let notice = document.querySelector(".cf-cart-notice");

        if (!notice) {
            notice = document.createElement("div");
            notice.className = "cf-cart-notice";
            notice.setAttribute("role", "status");
            document.body.appendChild(notice);
        }

        notice.textContent = message;
        notice.classList.add("is-visible");

        window.clearTimeout(showCartNotice.timer);
        showCartNotice.timer = window.setTimeout(function () {
            notice.classList.remove("is-visible");
        }, 1800);
    }

    function updateCartCount() {
        const count = getCart().reduce(function (total, item) {
            return total + item.quantity;
        }, 0);
        const cartLinks = document.querySelectorAll(".thb-secondary-cart, [data-cart-link]");

        cartLinks.forEach(function (link) {
            let bubble = link.querySelector(".cf-cart-count");

            if (!bubble) {
                bubble = document.createElement("span");
                bubble.className = "cf-cart-count";
                link.appendChild(bubble);
            }

            bubble.textContent = count;
            bubble.hidden = count === 0;
        });
    }

    function addCartStyles() {
        if (document.getElementById("cf-cart-styles")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "cf-cart-styles";
        style.textContent = `
            .cf-add-cart-button {
                width: 100%;
                margin-top: 10px;
                min-height: 38px;
                border: 1px solid #151515;
                background: #151515;
                color: #fff;
                cursor: pointer;
                font: inherit;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .cf-wishlist-button {
                background: #fff;
                color: #151515;
                border-color: #151515;
            }

            .cf-wishlist-button:hover {
                background: #f2f2f2;
            }

            .cf-add-cart-button:hover {
                background: #333;
            }

            .cf-cart-count {
                display: inline-grid;
                place-items: center;
                min-width: 18px;
                height: 18px;
                margin-left: 6px;
                padding: 0 5px;
                border-radius: 999px;
                background: #151515;
                color: #fff;
                font-size: 11px;
                line-height: 1;
            }

            .cf-cart-notice {
                position: fixed;
                right: 18px;
                bottom: 18px;
                z-index: 9999;
                max-width: min(320px, calc(100vw - 36px));
                padding: 13px 16px;
                border: 1px solid #151515;
                background: #fff;
                color: #151515;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
                font-size: 14px;
                opacity: 0;
                transform: translateY(10px);
                pointer-events: none;
                transition: opacity 160ms ease, transform 160ms ease;
            }

            .cf-cart-notice.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    function addToWishlist(product) {
        const cart = getCart();
        const existingItem = cart.find(function (item) {
            return item.id === product.id && item.type === "wishlist";
        });

        const wishlistItem = Object.assign({}, product, { type: "wishlist" });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(wishlistItem);
        }

        saveCart(cart);
        showCartNotice(product.title + " added to wishlist.");
    }

    function setupProductCards() {
        const cards = document.querySelectorAll("product-card");

        cards.forEach(function (card) {
            const info = card.querySelector(".product-card-info") || card;

            if (card.querySelector(".cf-add-cart-button")) {
                // Still ensure wishlist button exists even if cart button already injected.
            } else {
                const addButton = document.createElement("button");
                addButton.className = "cf-add-cart-button";
                addButton.type = "button";
                addButton.textContent = "Add to cart";

                addButton.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    addToCart(getProductFromCard(card));
                });

                info.appendChild(addButton);
            }

            if (card.querySelector(".cf-wishlist-button")) {
                return;
            }

            const wishlistButton = document.createElement("button");
            wishlistButton.className = "cf-add-cart-button cf-wishlist-button";
            wishlistButton.type = "button";
            wishlistButton.textContent = "Wishlist";

            wishlistButton.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                addToWishlist(getProductFromCard(card));
            });

            info.appendChild(wishlistButton);
        });
    }

    function renderCartPage() {
        const cartRoot = document.getElementById("cartItems");

        if (!cartRoot) {
            return;
        }

        const cart = getCart();
        const emptyState = document.getElementById("emptyCart");
        const cartSummary = document.getElementById("cartSummary");
        const subtotalEl = document.getElementById("cartSubtotal");

        cartRoot.innerHTML = "";

        if (cart.length === 0) {
            if (emptyState) {
                emptyState.hidden = false;
            }
            if (cartSummary) {
                cartSummary.hidden = true;
            }
            return;
        }

        if (emptyState) {
            emptyState.hidden = true;
        }
        if (cartSummary) {
            cartSummary.hidden = false;
        }

        let subtotal = 0;

        cart.forEach(function (item, index) {
            subtotal += item.price * item.quantity;

            const row = document.createElement("article");
            row.className = "cart-item";
            row.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item__details">
                    <h2>${item.title}</h2>
                    <p>${formatMoney(item.price)}${item.type === "wishlist" ? " <strong>(wishlist)</strong>" : ""}</p>
                    <div class="quantity-control">
                        <button type="button" data-cart-action="decrease" data-cart-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-cart-action="increase" data-cart-index="${index}">+</button>
                    </div>
                </div>
                <div class="cart-item__total">
                    <strong>${formatMoney(item.price * item.quantity)}</strong>
                    <button type="button" data-cart-action="remove" data-cart-index="${index}">Remove</button>
                </div>
            `;
            cartRoot.appendChild(row);
        });

        if (subtotalEl) {
            subtotalEl.textContent = formatMoney(subtotal);
        }
    }

    function setupCartPageControls() {
        const cartRoot = document.getElementById("cartItems");
        const clearButton = document.getElementById("clearCart");
        const checkoutButton = document.getElementById("checkoutButton");

        if (!cartRoot) {
            return;
        }

        cartRoot.addEventListener("click", function (event) {
            const button = event.target.closest("[data-cart-action]");

            if (!button) {
                return;
            }

            const cart = getCart();
            const index = Number(button.dataset.cartIndex);
            const action = button.dataset.cartAction;

            if (!cart[index]) {
                return;
            }

            if (action === "increase") {
                cart[index].quantity += 1;
            }

            if (action === "decrease") {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) {
                    cart.splice(index, 1);
                }
            }

            if (action === "remove") {
                cart.splice(index, 1);
            }

            saveCart(cart);
            renderCartPage();
        });

        if (clearButton) {
            clearButton.addEventListener("click", function () {
                saveCart([]);
                renderCartPage();
            });
        }

        if (checkoutButton) {
            checkoutButton.addEventListener("click", function () {
                if (getCart().length === 0) {
                    showCartNotice("Your cart is empty.");
                    return;
                }

                showCartNotice("Checkout is not connected in this static clone.");
            });
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        addCartStyles();
        setupProductCards();
        updateCartCount();
        renderCartPage();
        setupCartPageControls();
    });
})();
