// src/javascripts/hobbies.js
import { initHobbyFilters } from './hobby_filters.js';

document.addEventListener('DOMContentLoaded', () => {
    initHobbyFilters(); // фильтры на статичных карточках каталога

    const searchInput = document.querySelector('.hobby-header .search input');
    const searchBtn = document.querySelector('.hobby-header .search .search-icon');
    if (!searchInput) return;

    function goToSearch() {
        const q = searchInput.value.trim();
        if (q.length < 2) return; // как и на странице поиска — минимум 2 символа
        window.location.href = 'search.html?request=' + encodeURIComponent(q);
    }

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') goToSearch();
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', goToSearch);
    }
});