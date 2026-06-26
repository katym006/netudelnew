// src/javascripts/hobby_card.js
import arrowSvg from '../images/hobby-card-arrow.svg';
import { setCardFilterData } from './hobby_filters.js';

export function createHobbyCard(contentItem) {
    const {title, time, cost, complexity, image, desc} = contentItem;

    const cardItem = document.createElement('div');
    cardItem.classList.add('hobby-card');
    setCardFilterData(cardItem, { time, cost, complexity });

    const cardItemImage = document.createElement('div');
    cardItemImage.classList.add('hobby-card-image');
    const img = document.createElement('img');
    img.src = image[0].url;

    const cardItemBg = document.createElement('div');
    cardItemBg.classList.add('blur-bg');
    cardItemBg.innerText = '.';

    const cardItemDesc = document.createElement('div');
    cardItemDesc.classList.add('hobby-card-desc');

    const cardItemDescH = document.createElement('h3');
    cardItemDescH.classList.add('h3');
    cardItemDescH.innerText = title;

    const cardItemDescTags = document.createElement('div');
    cardItemDescTags.classList.add('hobby-card-tags');

    const cardItemDescTagTime = document.createElement('div');
    cardItemDescTagTime.classList.add('p2', 'hobby-card-tag');
    cardItemDescTagTime.innerText = time;

    const cardItemDescTagCost = document.createElement('div');
    cardItemDescTagCost.classList.add('p2', 'hobby-card-tag');
    cardItemDescTagCost.innerText = cost;

    const cardItemDescTagComplexity = document.createElement('div');
    cardItemDescTagComplexity.classList.add('p2', 'hobby-card-tag');
    cardItemDescTagComplexity.innerText = complexity;

    const cardItemDescP = document.createElement('p');
    cardItemDescP.classList.add('p2');
    cardItemDescP.innerText = desc;

    const cardItemDescButton = document.createElement('button');
    cardItemDescButton.classList.add('card-btn', 'green');
    cardItemDescButton.setAttribute('href', '#');
    cardItemDescButton.innerText = 'смотреть';
    const cardItemDescButtonImg = document.createElement('img');
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