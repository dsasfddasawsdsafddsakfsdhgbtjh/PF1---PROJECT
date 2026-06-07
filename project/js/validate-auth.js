(function () {
    function $(id) { return document.getElementById(id); }

    function setError(el, msg) {
        if (!el) return;
        el.textContent = msg || '';
        el.style.color = msg ? '#c23' : '';
        const input = el.previousElementSibling;
        if (input && input.tagName === 'INPUT') {
            input.classList.toggle('input-invalid', !!msg);
        }
    }

    function clearError(el) {
        if (!el) return;
        el.textContent = '';
        el.style.color = '';
        const input = el.previousElementSibling;
        if (input && input.tagName === 'INPUT') {
            input.classList.remove('input-invalid');
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = $('username').value.trim();
            const password = $('password').value;
            let ok = true;
            clearError($('usernameError'));
            clearError($('passwordError'));
            if (username.length < 3) { setError($('usernameError'), 'Username must be at least 3 characters'); ok = false; }
            if (password.length < 4) { setError($('passwordError'), 'Password must be at least 4 characters'); ok = false; }
            if (!ok) return;
            if (typeof login === 'function') login();
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = $('newUsername').value.trim();
            const email = $('email').value.trim();
            const password = $('newPassword').value;
            let ok = true;
            clearError($('newUsernameError'));
            clearError($('emailError'));
            clearError($('newPasswordError'));
            if (username.length < 3) { setError($('newUsernameError'), 'Username must be at least 3 characters'); ok = false; }
            if (!validateEmail(email)) { setError($('emailError'), 'Please enter a valid email'); ok = false; }
            if (password.length < 6) { setError($('newPasswordError'), 'Password must be 6+ characters'); ok = false; }
            if (!ok) return;
            if (typeof register === 'function') register();
        });
    }
})();
