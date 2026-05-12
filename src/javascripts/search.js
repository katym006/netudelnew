import {getPostTeasers} from './search_data.js'

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
    document.querySelector('.S_Content').innerHTML = '';
    const contentItems = [];
    if (requestText.length >= 2) {
        content.forEach((contentItem) => {
            const nbspRegEx = /[\u202F\u00A0]/gm
            const punctuationRegEx = /[.,\/#!$%\^&\*;:{}=_`()]/gm
            let {id, title, time, cost, complexity} = contentItem;

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
            document.querySelector('.S_Content').innerText = 'Ничего не найдено!';
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

/* function setCardsByIds(contentItemsId) {
    contentItemsId.forEach((id) => {
        content.forEach((contentItem) => {
            if (id === contentItem.id) {
                createCard(contentItem);
            }
        })
    })
} */

function createCards(content) {
    content.forEach((contentItem) => {
        let {id, title, time, cost, complexity} = contentItem;

        const cardItem = document.createElement('div');
        cardItem.classList.add('O_Article');

        const cardItemTitle = document.createElement('a');
        cardItemTitle.classList.add('A_ArticleTitle');
        cardItemTitle.innerText = title;
        // cardItemTitle.setAttribute('href', link);

        // const cardItemDescription = document.createElement('p');
        // cardItemDescription.classList.add('A_ArticleDesctiption');
        // cardItemDescription.innerText = description;

        cardItem.appendChild(cardItemTitle);
        // cardItem.appendChild(cardItemDescription);

        document.querySelector('.S_Content').appendChild(cardItem);
    })
}




