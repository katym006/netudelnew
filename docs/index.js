/******/ (() => { // webpackBootstrap
/******/ 	"use strict";


// карточки тестов на главной
var container = document.querySelector('.popular-tests-cards');
var prevBtn = document.getElementById('next');
var nextBtn = document.getElementById('prev');
nextBtn.addEventListener('click', function () {
  var first = container.firstElementChild;
  container.appendChild(first);
});
prevBtn.addEventListener('click', function () {
  var last = container.lastElementChild;
  container.insertBefore(last, container.firstElementChild);
});
var cards = [document.getElementById('card1'), document.getElementById('card2'), document.getElementById('card3')];
var order = [0, 1, 2];
function updateCards() {
  cards.forEach(function (card) {
    card.classList.remove('left', 'center', 'right');
  });
  cards[order[0]].classList.add('left');
  cards[order[1]].classList.add('center');
  cards[order[2]].classList.add('right');
}
nextBtn.addEventListener('click', function () {
  order.push(order.shift());
  updateCards();
});
prevBtn.addEventListener('click', function () {
  order.unshift(order.pop());
  updateCards();
});

// фигуры
document.addEventListener('DOMContentLoaded', function () {
  var shapes = document.querySelectorAll('.main-figures');
  function moveShapes() {
    var scrollY = window.scrollY; // сколько прокручено сверху

    shapes.forEach(function (shape) {
      var speed = parseFloat(shape.dataset.speed) || 0.4; // скорость движения
      var move = scrollY * speed * -1; // отрицательное = вверх при скролле вниз

      shape.style.transform = "translateY(".concat(move, "px)");
    });
  }

  // Запускаем при скролле
  window.addEventListener('scroll', moveShapes, {
    passive: true
  });

  // Первый вызов
  moveShapes();
});
var burger = document.getElementById("burger");
var menu = document.querySelector(".header-menu");
burger.addEventListener("click", function () {
  menu.classList.toggle("active");
  burger.classList.toggle("active");
});
/******/ })()
;