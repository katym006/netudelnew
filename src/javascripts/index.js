import '../stylesheets/style.css'

// карточки тестов на главной
const container = document.querySelector('.popular-tests-cards'); 
const prevBtn = document.getElementById('next');
const nextBtn = document.getElementById('prev');

nextBtn.addEventListener('click', () => {
  const first = container.firstElementChild;
  container.appendChild(first);
});

prevBtn.addEventListener('click', () => {
  const last = container.lastElementChild;
  container.insertBefore(last, container.firstElementChild);
});

const cards = [
  document.getElementById('card1'),
  document.getElementById('card2'),
  document.getElementById('card3')
];


let order = [0, 1, 2];

function updateCards() {
  cards.forEach(card => {
    card.classList.remove('left', 'center', 'right');
  });

  cards[order[0]].classList.add('left');
  cards[order[1]].classList.add('center');
  cards[order[2]].classList.add('right');
}

nextBtn.addEventListener('click', () => {
  order.push(order.shift()); 
  updateCards();
});

prevBtn.addEventListener('click', () => {
  order.unshift(order.pop()); 
  updateCards();
});


