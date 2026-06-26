/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: createHobbyCard

;// ./src/images/hobby-card-arrow.svg
const hobby_card_arrow_namespaceObject = __webpack_require__.p + "images/hobby-card-arrow.svg";
;// ./src/javascripts/hobby_card.js
// src/javascripts/hobby_card.js


function createHobbyCard(contentItem) {
  var title = contentItem.title,
    time = contentItem.time,
    cost = contentItem.cost,
    complexity = contentItem.complexity,
    image = contentItem.image,
    desc = contentItem.desc;
  var cardItem = document.createElement('div');
  cardItem.classList.add('hobby-card');
  setCardFilterData(cardItem, {
    time: time,
    cost: cost,
    complexity: complexity
  });
  var cardItemImage = document.createElement('div');
  cardItemImage.classList.add('hobby-card-image');
  var img = document.createElement('img');
  img.src = image[0].url;
  var cardItemBg = document.createElement('div');
  cardItemBg.classList.add('blur-bg');
  cardItemBg.innerText = '.';
  var cardItemDesc = document.createElement('div');
  cardItemDesc.classList.add('hobby-card-desc');
  var cardItemDescH = document.createElement('h3');
  cardItemDescH.classList.add('h3');
  cardItemDescH.innerText = title;
  var cardItemDescTags = document.createElement('div');
  cardItemDescTags.classList.add('hobby-card-tags');
  var cardItemDescTagTime = document.createElement('div');
  cardItemDescTagTime.classList.add('p2', 'hobby-card-tag');
  cardItemDescTagTime.innerText = time;
  var cardItemDescTagCost = document.createElement('div');
  cardItemDescTagCost.classList.add('p2', 'hobby-card-tag');
  cardItemDescTagCost.innerText = cost;
  var cardItemDescTagComplexity = document.createElement('div');
  cardItemDescTagComplexity.classList.add('p2', 'hobby-card-tag');
  cardItemDescTagComplexity.innerText = complexity;
  var cardItemDescP = document.createElement('p');
  cardItemDescP.classList.add('p2');
  cardItemDescP.innerText = desc;
  var cardItemDescButton = document.createElement('button');
  cardItemDescButton.classList.add('card-btn', 'green');
  cardItemDescButton.setAttribute('href', '#');
  cardItemDescButton.innerText = 'смотреть';
  var cardItemDescButtonImg = document.createElement('img');
  cardItemDescButtonImg.src = arrowSvg;
  cardItem.appendChild(cardItemImage);
  cardItem.appendChild(cardItemDesc);
  cardItemImage.appendChild(img);
  cardItemImage.appendChild(cardItemBg);
  cardItemDesc.appendChild(cardItemDescH);
  cardItemDesc.appendChild(cardItemDescTags);
  cardItemDesc.appendChild(cardItemDescP);
  cardItemDescTags.appendChild(cardItemDescTagTime);
  cardItemDescTags.appendChild(cardItemDescTagCost);
  cardItemDescTags.appendChild(cardItemDescTagComplexity);
  cardItemDesc.appendChild(cardItemDescButton);
  cardItemDescButton.appendChild(cardItemDescButtonImg);
  return cardItem;
}
/******/ })()
;