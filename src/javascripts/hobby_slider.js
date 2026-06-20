function initHobbySlider() {
    const section = document.querySelector('.hobby-of-day');
    if (!section) return;

    const track = section.querySelector('.hobby-track');
    const slides = section.querySelectorAll('.hobby-of-day-card');
    const buttons = section.querySelectorAll('.hobby-of-day-buttons button');

    if (!track || slides.length === 0 || buttons.length < 3) return;

    // порядок кнопок в разметке: назад / в каталог / вперёд
    const prevBtn = buttons[0];
    const catalogBtn = buttons[1];
    const nextBtn = buttons[2];

    const YESTERDAY_INDEX = 0;
    const TODAY_INDEX = 1;
    const TOMORROW_INDEX = slides.length - 1;

    const cardWidth = 590;
    const gap = 85;
    const step = cardWidth + gap;

    let currentIndex = TODAY_INDEX;

    function goToIndex(index) {
        currentIndex = index;

        const sliderWidth = section.offsetWidth;
        const offset = sliderWidth / 2 - cardWidth / 2 - currentIndex * step;

        track.style.transform = `translateX(${offset}px)`;

        updateCatalogButtonText();
    }

    // если ушли с "сегодняшней" карточки — кнопка предлагает вернуться к ней
    function updateCatalogButtonText() {
        catalogBtn.textContent =
            currentIndex === TODAY_INDEX ? 'в каталог' : 'сегодняшнее хобби';
    }

    // нажатая кнопка — оранжевая (primary), остальные две — белые (secondary)
    function setActiveButton(activeBtn) {
        buttons.forEach((btn) => {
            const isActive = btn === activeBtn;
            btn.classList.toggle('primary', isActive);
            btn.classList.toggle('secondary', !isActive);
        });
    }

    // клик всегда ведёт к фиксированной карточке, а не сдвигает на шаг от текущей
    prevBtn.addEventListener('click', () => {
        goToIndex(YESTERDAY_INDEX);
        setActiveButton(prevBtn);
    });

    nextBtn.addEventListener('click', () => {
        goToIndex(TOMORROW_INDEX);
        setActiveButton(nextBtn);
    });

    catalogBtn.addEventListener('click', () => {
        goToIndex(TODAY_INDEX);
        setActiveButton(catalogBtn);
    });

    window.addEventListener('resize', () => goToIndex(currentIndex));

    goToIndex(currentIndex);
}

export { initHobbySlider };