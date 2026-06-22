/**
 * Shared Wishlist Utility
 * Manages wishlist operations across the site
 */

const WishlistUtil = {
    // Get current logged-in user
    getCurrentUser() {
        return localStorage.getItem('cfLoggedInUser') || 'guest';
    },

    // Get wishlist storage key for user
    getWishlistKey() {
        return 'cfWishlist_' + this.getCurrentUser();
    },

    // Load wishlist
    load() {
        try {
            return JSON.parse(localStorage.getItem(this.getWishlistKey())) || [];
        } catch (e) {
            return [];
        }
    },

    // Save wishlist
    save(items) {
        localStorage.setItem(this.getWishlistKey(), JSON.stringify(items));
    },

    // Check if item is in wishlist
    has(productId) {
        return this.load().some(item => item.id === productId);
    },

    // Add to wishlist
    add(productId, title, url) {
        const items = this.load();
        if (!items.some(i => i.id === productId)) {
            items.unshift({
                id: productId,
                title: title || 'Untitled',
                url: url || '',
                addedAt: new Date().toISOString()
            });
            this.save(items);
            this.notify('Added to wishlist');
            return true;
        }
        return false;
    },

    // Remove from wishlist
    remove(productId) {
        const items = this.load().filter(i => i.id !== productId);
        this.save(items);
        this.notify('Removed from wishlist');
    },

    // Clear all
    clear() {
        this.save([]);
    },

    // Show notification
    notify(msg) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; 
            background: #151515; color: #fff; 
            padding: 12px 16px; border-radius: 4px; 
            z-index: 9999; font-family: "Roboto Condensed", sans-serif;
            font-size: 14px;
        `;
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    },

    // Create wishlist button for product
    createButton(productId, title, url) {
        const btn = document.createElement('button');
        btn.className = 'wishlist-btn';
        btn.dataset.productId = productId;
        btn.style.cssText = `
            background: transparent; border: 1px solid #151515;
            color: #151515; padding: 8px 12px; cursor: pointer;
            font-size: 12px; text-transform: uppercase; font-weight: 700;
            font-family: "Roboto Condensed", sans-serif;
        `;

        const updateText = () => {
            const currentUser = this.getCurrentUser();
            if (currentUser === 'guest') {
                btn.textContent = '♡ Log in to wishlist';
                return;
            }
            btn.textContent = this.has(productId) ? '♥ Wishlisted' : '♡ Wishlist';
        };

        updateText();
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentUser = this.getCurrentUser();
            if (currentUser === 'guest') {
                this.notify('Please log in to use wishlist');
                setTimeout(() => window.location.href = 'login.html', 1000);
                return;
            }

            if (this.has(productId)) {
                this.remove(productId);
            } else {
                this.add(productId, title, url);
            }
            updateText();
        });
        
        return btn;
    }
};
