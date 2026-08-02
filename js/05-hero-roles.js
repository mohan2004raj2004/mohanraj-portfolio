/* ============== HERO ROLE ROTATOR ============== */

(function () {

    const list = document.getElementById('roleList');

    if (!list) return;

    const items = list.querySelectorAll('li');

    if (!items.length) return;

    let current = 0;

    /* Initial position */
    list.style.transform = 'translateY(0)';
    list.style.transition = 'transform 0.6s ease-in-out';

    setInterval(() => {

        current = (current + 1) % items.length;

        /* Current LI height */
        const itemHeight = items[0].getBoundingClientRect().height;

        list.style.transform =
            `translateY(-${current * itemHeight}px)`;

    }, 3000);

})();