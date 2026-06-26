// src/javascripts/hobby_filters.js

const TIME_GROUP_SELECTOR  = '.hobby-filters-wrapper:nth-of-type(1) input[type="checkbox"]';
const PRICE_GROUP_SELECTOR = '.hobby-filters-wrapper:nth-of-type(2) input[type="checkbox"]';
const LEVEL_GROUP_SELECTOR = '.hobby-filters-wrapper:nth-of-type(3) input[type="checkbox"]';

function normalize(str) {
    return (str || '').toString().trim().toLowerCase();
}

// Приводим текстовые значения из Airtable к значениям value у чекбоксов
function mapTimeToFilterValue(time) {
    const t = normalize(time);
    if (t.includes('30') && t.includes('60')) return '30-60';
    if (t.includes('1') && t.includes('2'))   return '1-2';
    if (t.includes('3') && t.includes('4'))   return '3-4';
    return '';
}

function mapCostToFilterValue(cost) {
    const c = normalize(cost);
    if (c.includes('бесплат')) return 'free';
    if (c.includes('от'))      return '1000plus';
    if (c.includes('до'))      return '1000';
    return '';
}

function mapComplexityToFilterValue(complexity) {
    const l = normalize(complexity);
    if (l.includes('легк'))  return 'easy';
    if (l.includes('средн')) return 'medium';
    if (l.includes('сложн')) return 'hard';
    return '';
}

// Вызывается при создании карточки (в hobby_card.js и search.js)
function setCardFilterData(cardEl, { time, cost, complexity } = {}) {
    cardEl.dataset.time  = mapTimeToFilterValue(time);
    cardEl.dataset.price = mapCostToFilterValue(cost);
    cardEl.dataset.level = mapComplexityToFilterValue(complexity);
}

// containerSelector / cardSelector — чтобы можно было переиспользовать на разных страницах
function initHobbyFilters(containerSelector = '.S_Content', cardSelector = '.hobby-card') {
    const container = document.querySelector(containerSelector);

    const timeCheckboxes  = document.querySelectorAll(TIME_GROUP_SELECTOR);
    const priceCheckboxes = document.querySelectorAll(PRICE_GROUP_SELECTOR);
    const levelCheckboxes = document.querySelectorAll(LEVEL_GROUP_SELECTOR);

    if (!container) {
        // На этой странице нет динамического контейнера карточек
        // (например, hobbies.html — там своя статичная вёрстка и свой скрипт).
        // Возвращаем no-op, чтобы не падать и не мешать остальному коду.
        return () => {};
    }

    function applyFilters() {
        const selectedTimes  = Array.from(timeCheckboxes).filter(c => c.checked).map(c => c.value);
        const selectedPrices = Array.from(priceCheckboxes).filter(c => c.checked).map(c => c.value);
        const selectedLevels = Array.from(levelCheckboxes).filter(c => c.checked).map(c => c.value);

        const cards = Array.from(container.querySelectorAll(cardSelector));

        cards.forEach((card) => {
            const timeMatch  = selectedTimes.length === 0  || selectedTimes.includes(card.dataset.time);
            const priceMatch = selectedPrices.length === 0 || selectedPrices.includes(card.dataset.price);
            const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(card.dataset.level);

            card.classList.toggle('hobby-card-hidden', !(timeMatch && priceMatch && levelMatch));
        });
    }

    [...timeCheckboxes, ...priceCheckboxes, ...levelCheckboxes].forEach((checkbox) => {
        checkbox.addEventListener('change', applyFilters);
    });

    applyFilters();

    return applyFilters;
}

export { initHobbyFilters, setCardFilterData };