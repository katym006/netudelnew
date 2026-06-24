document.addEventListener('DOMContentLoaded', () => {
    const accordion = document.getElementById('accordion');
    if (!accordion) return;

    const items = Array.from(accordion.querySelectorAll('.accordion-item'));

    items.forEach((item) => {
        const head = item.querySelector('.accordion-head');
        const body = item.querySelector('.accordion-body');

        head.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // закрываем все остальные пункты аккордеона
            items.forEach((otherItem) => {
                if (otherItem !== item) {
                    closeItem(otherItem);
                }
            });

            if (isActive) {
                closeItem(item);
            } else {
                openItem(item);
            }
        });

        // на случай ресайза экрана пересчитываем высоту открытого пункта
        window.addEventListener('resize', () => {
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    function openItem(item) {
        const head = item.querySelector('.accordion-head');
        const body = item.querySelector('.accordion-body');

        item.classList.add('active');
        head.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
    }

    function closeItem(item) {
        const head = item.querySelector('.accordion-head');
        const body = item.querySelector('.accordion-body');

        item.classList.remove('active');
        head.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
    }
});