/******/ (() => { // webpackBootstrap
document.addEventListener('DOMContentLoaded', function () {
  var accordion = document.getElementById('accordion');
  if (!accordion) return;
  var items = Array.from(accordion.querySelectorAll('.accordion-item'));
  items.forEach(function (item) {
    var head = item.querySelector('.accordion-head');
    var body = item.querySelector('.accordion-body');
    head.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // закрываем все остальные пункты аккордеона
      items.forEach(function (otherItem) {
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
    window.addEventListener('resize', function () {
      if (item.classList.contains('active')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
  function openItem(item) {
    var head = item.querySelector('.accordion-head');
    var body = item.querySelector('.accordion-body');
    item.classList.add('active');
    head.setAttribute('aria-expanded', 'true');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
  function closeItem(item) {
    var head = item.querySelector('.accordion-head');
    var body = item.querySelector('.accordion-body');
    item.classList.remove('active');
    head.setAttribute('aria-expanded', 'false');
    body.style.maxHeight = null;
  }
});
/******/ })()
;