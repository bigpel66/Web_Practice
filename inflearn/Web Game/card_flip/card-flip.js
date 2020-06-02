const wrapper = document.querySelector('#wrapper');
const button = document.querySelector('#start');
const result = document.querySelector('#result');

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

let isClickable = false;
let isStartable = true;
let startTime;
let EndTime;

let candidate = [];
let clickArr = [];
let finishArr = [];

const shuffleColors = () => {
    candidate = colors.slice();

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
    if (isClickable && !finishArr.includes(card)) {
        card.classList.toggle('flipped');

        if (clickArr.includes(card)) {
            clickArr.splice(clickArr.indexOf(card), 1);
        } else {
            clickArr.push(card);
        }

        if (clickArr.length == 2) {
            if (
                clickArr[0].querySelector('.card-back').style
                    .backgroundColor ===
                clickArr[1].querySelector('.card-back').style.backgroundColor
            ) {
                clickArr.forEach((element) => {
                    finishArr.push(element);
                });
                clickArr = [];

                if (finishArr.length == rows * cols) {
                    endTime = Date.now();
                    const diff = (endTime - startTime) / 1000;
                    result.textContent = `You Completed in ${diff} Seconds`;
                    finishArr = [];
                    button.textContent = 'Start New Game';
                    alert(`${diff} Seconds!`);
                }
            } else {
                isClickable = false;

                setTimeout(() => {
                    isClickable = true;
                    clickArr.forEach((element) => {
                        element.classList.toggle('flipped');
                    });

                    clickArr.splice(0, clickArr.length);
                }, 1000);
            }
        }
    }
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
        setTimeout(() => {
            startTime = Date.now();
            isClickable = true;
            isStartable = true;
            button.textContent = 'Restart';
        }, 1000 + (rows * cols + (rows * cols) / 2) * 100);
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
    if (isStartable) {
        isStartable = false;
        isClickable = false;

        wrapper.innerHTML = '';

        cardSetting(rows, cols);
        shuffleColors();
        cardInitOpen();
        cardInitClose();
        cardClickEvent();

        startTime = null;
        endTime = null;
        candidate = [];
        clickArr = [];
        finishArr = [];
        result.textContent = '';
    }
};

button.addEventListener('click', startGame);

cardSetting(rows, cols);
