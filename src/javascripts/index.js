import '../stylesheets/style.css'

const container = document.querySelector('.popular-tests-cards'); // родитель карточек
const prevBtn = document.getElementById('next');
const nextBtn = document.getElementById('prev');

// вперёд (первая карточка уходит в конец)
nextBtn.addEventListener('click', () => {
  const first = container.firstElementChild;
  container.appendChild(first);
});

// назад (последняя карточка становится первой)
prevBtn.addEventListener('click', () => {
  const last = container.lastElementChild;
  container.insertBefore(last, container.firstElementChild);
});

const cards = [
  document.getElementById('card1'),
  document.getElementById('card2'),
  document.getElementById('card3')
];


// текущий порядок (индексы карточек)
let order = [0, 1, 2];

// функция обновления классов
function updateCards() {
  cards.forEach(card => {
    card.classList.remove('left', 'center', 'right');
  });

  cards[order[0]].classList.add('left');
  cards[order[1]].classList.add('center');
  cards[order[2]].classList.add('right');
}

// кнопка "вперёд"
nextBtn.addEventListener('click', () => {
  order.push(order.shift()); // сдвиг влево
  updateCards();
});

// кнопка "назад"
prevBtn.addEventListener('click', () => {
  order.unshift(order.pop()); // сдвиг вправо
  updateCards();
});