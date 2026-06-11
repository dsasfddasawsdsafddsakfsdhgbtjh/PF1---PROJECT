(function () {
    const REQUESTS_KEY = "cfSupportRequests";

    function getRequests() {
        try {
            return JSON.parse(localStorage.getItem(REQUESTS_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveRequest(request) {
        const requests = getRequests();
        requests.push(request);
        localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(element, text, type) {
        if (!element) {
            return;
        }

        element.textContent = text;
        element.className = "support-message is-" + type;
    }

    function setupSupportForm() {
        const form = document.getElementById("supportForm");

        if (!form) {
            return;
        }

        const message = document.getElementById("supportMessage");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim().toLowerCase();
            const topic = String(formData.get("topic") || "").trim();
            const body = String(formData.get("message") || "").trim();

            if (!name || !email || !topic || !body) {
                showMessage(message, "Please complete all fields.", "error");
                return;
            }

            if (!isValidEmail(email)) {
                showMessage(message, "Please enter a valid email address.", "error");
                return;
            }

            saveRequest({
                name: name,
                email: email,
                topic: topic,
                message: body,
                createdAt: new Date().toISOString()
            });

            form.reset();
            showMessage(message, "Message saved. This clone has no backend, so your request was stored in this browser.", "success");
        });
    }

    document.addEventListener("DOMContentLoaded", setupSupportForm);
})();
