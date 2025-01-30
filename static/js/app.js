function start() {
    const mobileMenu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('open-menu-btn');

    openBtn.addEventListener('click', () => {
        if (mobileMenu.style.display === 'block') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'block';
        }
    });
}

start();
