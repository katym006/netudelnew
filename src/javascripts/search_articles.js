import {getPostTeasers} from './search_articles_data.js'

let content

document.addEventListener('DOMContentLoaded', () => {
    getPostTeasers().then((data) => {
        content = data;
        console.log(content)
        //createCards(content);
        initSearch();
    });
})

function initSearch() {
    const A_SearchInput = document.querySelector('.A_SearchInput');
    const A_SearchButton = document.querySelector('.A_SearchButton');
    const A_SearchDelete = document.querySelector('.A_SearchDelete');

    //Получаем запрос из браузерной строки
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

    //Проверка на ввод текст в Инпуте
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

    //Проверка на нажатие Enter
    A_SearchInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            requestText = A_SearchInput.value;
            setSearchRequest(requestText);
            searchContent (requestText)
        }
    })

    //Проверка на клик по кнопке Поиск
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
    document.querySelector('.S_ArticlesContent').innerHTML = '';
    const contentItems = [];
    if (requestText.length >= 2) {
        content.forEach((contentItem) => {
            const nbspRegEx = /[\u202F\u00A0]/gm
            const punctuationRegEx = /[.,\/#!$%\^&\*;:{}=_`()]/gm
            let {id, title, tags, image} = contentItem;

            title = title.toLowerCase();
            title = title.replaceAll(nbspRegEx, ' ');
            title = title.replaceAll(punctuationRegEx, '');

            // description = description.toLowerCase();
            // description = description.replaceAll(nbspRegEx, ' ');
            // description = description.replaceAll(punctuationRegEx, '');

            requestText = requestText.toLowerCase();

            if (title.includes(requestText)) {
                contentItems.push(contentItem);
            }
        })

        //Публикуем релевантные посты
        if (contentItems.length == 0) {
            document.querySelector('.S_ArticlesContent').innerText = 'Ничего не найдено!';
        }
        else {
            createCards(contentItems);
            //setCardsByIds(contentItemsId);
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
    content.forEach((contentItem) => {
        let {id, title, tags, image} = contentItem;

        const cardArticleItem = document.createElement('div');
        cardArticleItem.classList.add('article-card');

        const cardArticleItemBg = document.createElement('div');
        cardArticleItemBg.classList.add('blur-bg')
        const bg = document.createElement('img')
        bg.src = '../images/blue_bg.svg'


        const cardArticleItemImage = document.createElement('div');
        cardArticleItemImage.classList.add('article-card-image');
        const img = document.createElement('img');
        img.src = image.url; 


        const cardArticleItemDesc = document.createElement('div');
        cardArticleItemDesc.classList.add('article-card-desc')

        const cardArticleItemDescH = document.createElement('h3');
        cardArticleItemDescH.classList.add('h3')
        cardArticleItemDescH.innerText = title

        const cardArticleItemDescTags = document.createElement('div');
        cardArticleItemDescTags.classList.add('article-card-tags')
        cardArticleItemDescTags.classList.add('p2')
        cardArticleItemDescTags.innerText = tags


        const cardArticleItemDescButton = document.createElement('button')
        cardArticleItemDescButton.classList.add('card-btn')
        cardArticleItemDescButton.classList.add('blue')
        cardArticleItemDescButton.setAttribute('href', '#');
        cardArticleItemDescButton.innerText = 'смотреть'
        const cardArticleItemDescButtonImg = document.createElement('img')
        cardArticleItemDescButtonImg.src = '../images/hobby-card-arrow.svg'

        cardArticleItem.appendChild(cardArticleItemImage)
        cardArticleItem.appendChild(cardArticleItemDesc)

        cardArticleItemImage.appendChild(cardArticleItemBg)

        cardArticleItemDesc.appendChild(cardArticleItemDescH)
        cardArticleItemDesc.appendChild(cardArticleItemDescTags)
        cardArticleItemDesc.appendChild(cardArticleItemDescButton)
        cardArticleItemDescButton.appendChild(cardArticleItemDescButtonImg)


        

        document.querySelector('.S_ArticlesContent').appendChild(cardArticleItem);
    })
}
