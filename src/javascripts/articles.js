// src/javascripts/articles.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.hobby-header .search input');
    const searchBtn = document.querySelector('.hobby-header .search .search-icon');
    if (!searchInput) return;

    function goToSearch() {
        const q = searchInput.value.trim();
        if (q.length < 2) return; // минимум 2 символа, как и везде
        window.location.href = 'articles-search.html?request=' + encodeURIComponent(q);
    }

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') goToSearch();
    });

    if (searchBtn) {
        searchBtn.addEventListener('click', goToSearch);
    }
});