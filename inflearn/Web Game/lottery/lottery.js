const candidate = Array(45)
    .fill()
    .map((element, index) => {
        return index + 1;
    });

const shuffle = [];

while (candidate.length) {
    shuffle.push(
        candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
}

const numbers = shuffle.slice(0, 6).sort((former, latter) => {
    return former > latter;
});

const bonusNumber = shuffle[shuffle.length - 1];

const result = document.querySelector('#result');

const makeColor = (number, result) => {
    let backgroundColor;
    const ball = document.createElement('div');
    ball.textContent = number;
    ball.className = 'ball';

    if (number <= 10) {
        backgroundColor = 'red';
    } else if (number <= 20) {
        backgroundColor = 'orange';
    } else if (number <= 30) {
        backgroundColor = 'yellow';
    } else if (number <= 40) {
        backgroundColor = 'blue';
    } else {
        backgroundColor = 'green';
    }

    ball.style.background = backgroundColor;
    result.appendChild(ball);
};

for (let i = 0; i < numbers.length; i++) {
    setTimeout(() => {
        makeColor(numbers[i], result);
    }, (i + 1) * 1000);
}

setTimeout(() => {
    const bonusResult = document.querySelector('.bonus');
    makeColor(bonusNumber, bonusResult);
}, (numbers.length + 1) * 1000);
