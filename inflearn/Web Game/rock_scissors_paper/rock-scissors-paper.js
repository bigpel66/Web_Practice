let imagePos = '0';

const RSP = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px',
};

const scoreTable = {
    rock: -1,
    scissors: 0,
    paper: 1,
};

const countDownText = document.getElementById('count');
const resultText = document.createElement('div');

let intervalRSP;
let intervalCount;

let count = 4;
let isStart = false;

const randomRSP = () => {
    intervalRSP = setInterval(() => {
        if (imagePos === RSP.rock) {
            imagePos = RSP.scissors;
        } else if (imagePos == RSP.scissors) {
            imagePos = RSP.paper;
        } else {
            imagePos = RSP.rock;
        }
        document.querySelector('#computer').style.background =
            'url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ' +
            imagePos +
            ' 0';
    }, 100);
};

const countDown = () => {
    countDownText.textContent = 'Count Down';
    intervalCount = setInterval(() => {
        if (count <= 0) {
            countDownText.textContent = 'Game Over';
            isStart = false;
            clearInterval(intervalCount);
            clearInterval(intervalRSP);
        } else {
            count -= 1;
            countDownText.textContent = count;
        }
    }, 1000);
};

const posToString = (pos) => {
    return Object.entries(RSP).find((element) => {
        return element[1] === pos;
    })[0];
};

const scoreCompare = (choice1, choice2) => {
    const myScore = scoreTable[choice1];
    const comScore = scoreTable[choice2];
    const diff = myScore - comScore;

    if (myScore === comScore) {
        return 2;
    } else if ([-1, 2].includes(diff)) {
        return 0;
    } else {
        return 1;
    }
};

const clickCallback = (event) => {
    if (count > 0) {
        isStart = false;
        clearInterval(intervalRSP);
        clearInterval(intervalCount);

        const myChoice = event.target.textContent.toLowerCase();
        const comChoice = posToString(imagePos);

        const result = scoreCompare(myChoice, comChoice);

        switch (result) {
            case 0:
                resultText.textContent = 'Win';
                break;
            case 1:
                resultText.textContent = 'Lose';
                break;
            case 2:
                resultText.textContent = 'Draw';
                break;
        }

        count = 4;
    } else {
        resultText.textContent = 'Game Over';
    }
};

const startCallback = () => {
    if (!isStart) {
        gameStart();
    }
};

const gameStart = () => {
    isStart = true;
    randomRSP();
    countDown();
};

document.querySelectorAll('.btn').forEach((element) => {
    element.addEventListener('click', clickCallback);
});

document.querySelector('.start_btn').addEventListener('click', startCallback);

document.body.appendChild(resultText);
