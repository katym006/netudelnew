/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/javascripts/hobby_slider.js
function initHobbySlider() {
  var section = document.querySelector('.hobby-of-day');
  if (!section) return;
  var track = section.querySelector('.hobby-track');
  var slides = section.querySelectorAll('.hobby-of-day-card');
  var buttons = section.querySelectorAll('.hobby-of-day-buttons button');
  if (!track || slides.length === 0 || buttons.length < 3) return;

  // порядок кнопок в разметке: назад / в каталог / вперёд
  var prevBtn = buttons[0];
  var catalogBtn = buttons[1];
  var nextBtn = buttons[2];
  var YESTERDAY_INDEX = 0;
  var TODAY_INDEX = 1;
  var TOMORROW_INDEX = slides.length - 1;
  var cardWidth = 590;
  var gap = 85;
  var step = cardWidth + gap;
  var currentIndex = TODAY_INDEX;
  function goToIndex(index) {
    currentIndex = index;
    var sliderWidth = section.offsetWidth;
    var offset = sliderWidth / 2 - cardWidth / 2 - currentIndex * step;
    track.style.transform = "translateX(".concat(offset, "px)");
    updateCatalogButtonText();
  }

  // если ушли с "сегодняшней" карточки — кнопка предлагает вернуться к ней
  function updateCatalogButtonText() {
    catalogBtn.textContent = currentIndex === TODAY_INDEX ? 'в каталог' : 'сегодняшнее хобби';
  }

  // нажатая кнопка — оранжевая (primary), остальные две — белые (secondary)
  function setActiveButton(activeBtn) {
    buttons.forEach(function (btn) {
      var isActive = btn === activeBtn;
      btn.classList.toggle('primary', isActive);
      btn.classList.toggle('secondary', !isActive);
    });
  }

  // клик всегда ведёт к фиксированной карточке, а не сдвигает на шаг от текущей
  prevBtn.addEventListener('click', function () {
    goToIndex(YESTERDAY_INDEX);
    setActiveButton(prevBtn);
  });
  nextBtn.addEventListener('click', function () {
    goToIndex(TOMORROW_INDEX);
    setActiveButton(nextBtn);
  });
  catalogBtn.addEventListener('click', function () {
    if (currentIndex === TODAY_INDEX) {
      // кнопка в состоянии "в каталог" — переходим на страницу каталога
      window.location.href = 'hobbies.html';
    } else {
      // кнопка в состоянии "сегодняшнее хобби" — просто возвращаем слайдер в центр
      goToIndex(TODAY_INDEX);
      setActiveButton(catalogBtn);
    }
  });
  window.addEventListener('resize', function () {
    return goToIndex(currentIndex);
  });
  goToIndex(currentIndex);
  setActiveButton(catalogBtn); // фиксируем исходное активное состояние при загрузке
}

;// ./src/javascripts/index.js




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
initHobbySlider();
document.querySelectorAll('.card-nav').forEach(function (btn) {
  btn.addEventListener('click', function () {
    window.location.href = btn.dataset.href;
  });
});
/******/ })()
;