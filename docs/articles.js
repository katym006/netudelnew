/******/ (() => { // webpackBootstrap
// src/javascripts/articles.js
document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.querySelector('.hobby-header .search input');
  var searchBtn = document.querySelector('.hobby-header .search .search-icon');
  if (!searchInput) return;
  function goToSearch() {
    var q = searchInput.value.trim();
    if (q.length < 2) return; // минимум 2 символа, как и везде
    window.location.href = 'articles-search.html?request=' + encodeURIComponent(q);
  }
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') goToSearch();
  });
  if (searchBtn) {
    searchBtn.addEventListener('click', goToSearch);
  }
});
/******/ })()
;