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
            let {id, title, time, cost, complexity, image, desc} = contentItem;

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
        let {id, title, time, cost, complexity, image, desc} = contentItem;

        const cardItem = document.createElement('div');
        cardItem.classList.add('hobby-card');


        const cardItemImage = document.createElement('div');
        cardItemImage.classList.add('hobby-card-image');
        const img = document.createElement('img');
        img.src = image[0].url  

        const cardItemBg = document.createElement('div');
        cardItemBg.classList.add('blur-bg')
        cardItemBg.innerText = '.'


        const cardItemDesc = document.createElement('div');
        cardItemDesc.classList.add('hobby-card-desc')

        const cardItemDescH = document.createElement('h3');
        cardItemDescH.classList.add('h3')
        cardItemDescH.innerText = title

        const cardItemDescTags = document.createElement('div');
        cardItemDescTags.classList.add('hobby-card-tags')

        const cardItemDescTagTime = document.createElement('div')
        cardItemDescTagTime.classList.add('p2')
        cardItemDescTagTime.classList.add('hobby-card-tag')
        cardItemDescTagTime.innerText = time
        
        const cardItemDescTagCost = document.createElement('div')
        cardItemDescTagCost.classList.add('p2')
        cardItemDescTagCost.classList.add('hobby-card-tag')
        cardItemDescTagCost.innerText = cost

        const cardItemDescTagComplexity = document.createElement('div')
        cardItemDescTagComplexity.classList.add('p2')
        cardItemDescTagComplexity.classList.add('hobby-card-tag')
        cardItemDescTagComplexity.innerText = complexity

        const cardItemDescP = document.createElement('p');
        cardItemDescP.classList.add('p2')
        cardItemDescP.innerText = desc

        const cardItemDescButton = document.createElement('button')
        cardItemDescButton.classList.add('card-btn')
        cardItemDescButton.classList.add('green')
        cardItemDescButton.setAttribute('href', '#');
        cardItemDescButton.innerText = 'смотреть'
        const cardItemDescButtonImg = document.createElement('img')
        cardItemDescButtonImg.src = '../images/hobby-card-arrow.svg'


        cardItem.appendChild(cardItemImage);
        cardItem.appendChild(cardItemImage);
        cardItem.appendChild(cardItemDesc);
        
        cardItemImage.appendChild(img);
        cardItemImage.appendChild(cardItemBg);

        cardItemDesc.appendChild(cardItemDescH)
        cardItemDesc.appendChild(cardItemDescTags)
        cardItemDesc.appendChild(cardItemDescP)

        cardItemDescTags.appendChild(cardItemDescTagTime)
        cardItemDescTags.appendChild(cardItemDescTagCost)
        cardItemDescTags.appendChild(cardItemDescTagComplexity)

        cardItemDesc.appendChild(cardItemDescButton)
        cardItemDescButton.appendChild(cardItemDescButtonImg)

        

        document.querySelector('.S_Content').appendChild(cardItem);
    })
}




