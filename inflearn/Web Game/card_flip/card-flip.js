const wrapper = document.querySelector('#wrapper');
const button = document.querySelector('#start');

const rows = 3;
const cols = 4;
const colors = [
    'red',
    'red',
    'green',
    'green',
    'blue',
    'blue',
    'orange',
    'orange',
    'yellow',
    'yellow',
    'white',
    'white',
];
const candidate = colors.slice();
const isClickable = true;

const shuffleColors = () => {
    candidate.forEach(() => {
        candidate.push(
            candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        );
    });

    document.querySelectorAll('.card-back').forEach((cardBack, index) => {
        cardBack.style.backgroundColor = candidate[index];
    });
};

const flipCallback = (card) => {
    console.log(card);
};

const cardInitOpen = () => {
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000 + index * 100);
    });
};

const cardInitClose = () => {
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('flipped');
            }, 1000 + index * 100);
        });
    }, 5000);
};

const cardSetting = (rows, cols) => {
    for (let i = 0; i < cols; i++) {
        const div = document.createElement('div');
        for (let j = 0; j < rows; j++) {
            const card = document.createElement('div');
            const cardInner = document.createElement('div');
            const cardFront = document.createElement('div');
            const cardBack = document.createElement('div');
            card.classList.add('card');
            cardInner.classList.add('card-inner');
            cardFront.classList.add('card-front');
            cardBack.classList.add('card-back');

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);

            card.appendChild(cardInner);
            div.appendChild(card);
        }
        wrapper.appendChild(div);
    }
};

const cardClickEvent = () => {
    document.querySelectorAll('.card').forEach((card) => {
        return card.addEventListener('click', () => {
            flipCallback(card);
        });
    });
};

const startGame = () => {
    shuffleColors();
    cardInitOpen();
    cardInitClose();
    cardClickEvent();

    button.textContent = 'Restart';
};

button.addEventListener('click', startGame);

cardSetting(rows, cols);
