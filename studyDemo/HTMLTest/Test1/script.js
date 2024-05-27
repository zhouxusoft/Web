document.addEventListener('scroll', function() {
    const target = document.querySelector('.target');
    const rect = target.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
        // Element is in view and within the buffer area
        target.style.left = '0';
    } else {
        // Element is out of the buffer area
        target.style.left = '-100%';
    }
});