import {getPostTeasers} from './search_articles_data.js'
import articleArrowSvg from '../images/article-card-arrow.svg'

let content

document.addEventListener('DOMContentLoaded', () => {
    // если на странице нет контейнера для карточек — скрипту тут нечего делать
    if (!document.querySelector('.S_ArticlesContent')) return;

    getPostTeasers().then((data) => {
        content = data;
        console.log(content)
        initSearch();
    });
})

function initSearch() {
    const A_SearchInput = document.querySelector('.A_SearchInput');
    const A_SearchButton = document.querySelector('.A_SearchButton');
    const A_SearchDelete = document.querySelector('.A_SearchDelete');

    // на articles.html нет полей поиска с этими классами — выходим, чтобы не падать
    if (!A_SearchInput || !A_SearchButton || !A_SearchDelete) return;

    let requestText = getSearchRequest();

    if (requestText != undefined) {
        A_SearchInput.value = requestText;
        if (requestText.length >= 2) {
            A_SearchButton.classList.remove('disabled');
            A_SearchDelete.classList.remove('disabled');
        }
        else {
            A_SearchButton.classList.add('disabled');
            A_SearchDelete.classList.add('disabled');
        }
        searchContent (requestText);
    }
    else {
        createCards(content);
    }

    A_SearchInput.addEventListener('input', () => {
        requestText = A_SearchInput.value;
        if (requestText.length >= 2) {
            A_SearchButton.classList.remove('disabled');
            A_SearchDelete.classList.remove('disabled');
        }
        else {
            A_SearchButton.classList.add('disabled');
            A_SearchDelete.classList.add('disabled');
        }
    })

    A_SearchInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            requestText = A_SearchInput.value;
            setSearchRequest(requestText);
            searchContent (requestText)
        }
    })

    A_SearchButton.addEventListener('click', (event) => {
        if (!event.target.classList.contains('disabled')) {
            requestText = A_SearchInput.value;
            setSearchRequest(requestText);
            searchContent (requestText)
        }
    })

    A_SearchDelete.addEventListener('click', () => {
        deleteSearchRequest();
    })
}

function searchContent (requestText) {
    const container = document.querySelector('.S_ArticlesContent');
    if (!container) return;
    container.innerHTML = '';

    const contentItems = [];
    if (requestText.length >= 2) {
        content.forEach((contentItem) => {
            const nbspRegEx = /[\u202F\u00A0]/gm
            const punctuationRegEx = /[.,\/#!$%\^&\*;:{}=_`()]/gm
            let {id, title, tags, image, link} = contentItem;

            title = title.toLowerCase();
            title = title.replaceAll(nbspRegEx, ' ');
            title = title.replaceAll(punctuationRegEx, '');

            requestText = requestText.toLowerCase();

            if (title.includes(requestText)) {
                contentItems.push(contentItem);
            }
        })

        if (contentItems.length == 0) {
            container.innerText = 'Ничего не найдено!';
        }
        else {
            createCards(contentItems);
        }
    }
    else {
        deleteSearchRequest();
    }
}

function setSearchRequest(requestText) {
    const url = window.location.href.split('?')[0];
    window.location.replace(url + '?request=' + requestText);
}

function deleteSearchRequest() {
    const url = window.location.href.split('?')[0];
    window.location.replace(url);
}

function getSearchRequest () {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (searchParams.has('request')) {
        return searchParams.get('request')
    }
}

function createCards(content) {
    const container = document.querySelector('.S_ArticlesContent');
    if (!container) return;

    content.forEach((contentItem) => {
        let {id, title, tags, image, link} = contentItem;

        const cardArticleItem = document.createElement('div');
        cardArticleItem.classList.add('article-card');

        const cardArticleItemBg = document.createElement('div');
        cardArticleItemBg.classList.add('blur-bg')
        const bg = document.createElement('img')
        bg.src = '../images/blue_bg.svg'

        const cardArticleItemImage = document.createElement('div');
        cardArticleItemImage.classList.add('article-card-image');
        const cardArticleItemImageImage = document.createElement('img');
        cardArticleItemImageImage.src = image[0].url;

        const cardArticleItemDesc = document.createElement('div');
        cardArticleItemDesc.classList.add('article-card-desc')

        const cardArticleItemDescH = document.createElement('h3');
        cardArticleItemDescH.classList.add('h3')
        cardArticleItemDescH.innerText = title

        const cardArticleItemDescTags = document.createElement('div');
        cardArticleItemDescTags.classList.add('article-card-tags')
        cardArticleItemDescTags.classList.add('p2')
        cardArticleItemDescTags.innerText = tags

        const cardArticleItemDescButton = document.createElement('div')
        cardArticleItemDescButton.classList.add('card-btn')
        cardArticleItemDescButton.classList.add('blue')

        const cardArticleItemDescButtonLink = document.createElement('a')
        cardArticleItemDescButtonLink.href = link || '#'
        cardArticleItemDescButtonLink.innerText = 'смотреть'
        cardArticleItemDescButtonLink.target = '_blank'
        cardArticleItemDescButtonLink.rel = 'noopener noreferrer'

        const cardArticleItemDescButtonImg = document.createElement('img')
        cardArticleItemDescButtonImg.src = articleArrowSvg

        cardArticleItem.appendChild(cardArticleItemImage)
        cardArticleItem.appendChild(cardArticleItemDesc)

        cardArticleItemImage.appendChild(cardArticleItemBg)
        cardArticleItemImage.appendChild(cardArticleItemImageImage)

        cardArticleItemDesc.appendChild(cardArticleItemDescH)
        cardArticleItemDesc.appendChild(cardArticleItemDescTags)
        cardArticleItemDesc.appendChild(cardArticleItemDescButton)

        cardArticleItemDescButton.appendChild(cardArticleItemDescButtonLink)
        cardArticleItemDescButton.appendChild(cardArticleItemDescButtonImg)

        container.appendChild(cardArticleItem);
    })
}