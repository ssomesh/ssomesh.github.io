(function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function updateAriaLabel() {
        var isDark = document.body.classList.contains('dark-mode');
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateAriaLabel();

    toggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        var theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateAriaLabel();
    });
})();
