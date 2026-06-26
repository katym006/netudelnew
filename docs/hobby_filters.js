/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/* unused harmony exports initHobbyFilters, setCardFilterData */
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// src/javascripts/hobby_filters.js

var TIME_GROUP_SELECTOR = '.hobby-filters-wrapper:nth-of-type(1) input[type="checkbox"]';
var PRICE_GROUP_SELECTOR = '.hobby-filters-wrapper:nth-of-type(2) input[type="checkbox"]';
var LEVEL_GROUP_SELECTOR = '.hobby-filters-wrapper:nth-of-type(3) input[type="checkbox"]';
function normalize(str) {
  return (str || '').toString().trim().toLowerCase();
}

// Приводим текстовые значения из Airtable к значениям value у чекбоксов
function mapTimeToFilterValue(time) {
  var t = normalize(time);
  if (t.includes('30') && t.includes('60')) return '30-60';
  if (t.includes('1') && t.includes('2')) return '1-2';
  if (t.includes('3') && t.includes('4')) return '3-4';
  return '';
}
function mapCostToFilterValue(cost) {
  var c = normalize(cost);
  if (c.includes('бесплат')) return 'free';
  if (c.includes('от')) return '1000plus';
  if (c.includes('до')) return '1000';
  return '';
}
function mapComplexityToFilterValue(complexity) {
  var l = normalize(complexity);
  if (l.includes('легк')) return 'easy';
  if (l.includes('средн')) return 'medium';
  if (l.includes('сложн')) return 'hard';
  return '';
}

// Вызывается при создании карточки (в hobby_card.js и search.js)
function setCardFilterData(cardEl) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    time = _ref.time,
    cost = _ref.cost,
    complexity = _ref.complexity;
  cardEl.dataset.time = mapTimeToFilterValue(time);
  cardEl.dataset.price = mapCostToFilterValue(cost);
  cardEl.dataset.level = mapComplexityToFilterValue(complexity);
}

// containerSelector / cardSelector — чтобы можно было переиспользовать на разных страницах
function initHobbyFilters() {
  var containerSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.S_Content';
  var cardSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.hobby-card';
  var container = document.querySelector(containerSelector);
  var timeCheckboxes = document.querySelectorAll(TIME_GROUP_SELECTOR);
  var priceCheckboxes = document.querySelectorAll(PRICE_GROUP_SELECTOR);
  var levelCheckboxes = document.querySelectorAll(LEVEL_GROUP_SELECTOR);
  if (!container) {
    // На этой странице нет динамического контейнера карточек
    // (например, hobbies.html — там своя статичная вёрстка и свой скрипт).
    // Возвращаем no-op, чтобы не падать и не мешать остальному коду.
    return function () {};
  }
  function applyFilters() {
    var selectedTimes = Array.from(timeCheckboxes).filter(function (c) {
      return c.checked;
    }).map(function (c) {
      return c.value;
    });
    var selectedPrices = Array.from(priceCheckboxes).filter(function (c) {
      return c.checked;
    }).map(function (c) {
      return c.value;
    });
    var selectedLevels = Array.from(levelCheckboxes).filter(function (c) {
      return c.checked;
    }).map(function (c) {
      return c.value;
    });
    var cards = Array.from(container.querySelectorAll(cardSelector));
    cards.forEach(function (card) {
      var timeMatch = selectedTimes.length === 0 || selectedTimes.includes(card.dataset.time);
      var priceMatch = selectedPrices.length === 0 || selectedPrices.includes(card.dataset.price);
      var levelMatch = selectedLevels.length === 0 || selectedLevels.includes(card.dataset.level);
      card.classList.toggle('hobby-card-hidden', !(timeMatch && priceMatch && levelMatch));
    });
  }
  [].concat(_toConsumableArray(timeCheckboxes), _toConsumableArray(priceCheckboxes), _toConsumableArray(levelCheckboxes)).forEach(function (checkbox) {
    checkbox.addEventListener('change', applyFilters);
  });
  applyFilters();
  return applyFilters;
}

/******/ })()
;