const body = document.body;
const screen = document.querySelector('#screen');
const result = document.querySelector('#result');
const tbody = document.querySelector('#table tbody');
const restartText = document.createElement('div');

let startTime;
let endTime;
let ranks = [];
let interval;

const makeRankTable = () => {
    tbody.innerHTML = '';

    for (let i = 0; i < ranks.length; i++) {
        const tr = document.createElement('tr');

        tr.textContent = ranks[i];
        tbody.appendChild(tr);
    }
};

const clickToStart = () => {
    if (screen.classList.contains('waiting')) {
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = 'Press on Green Light!';

        result.textContent = '';

        interval = setTimeout(() => {
            startTime = Date.now();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 2000);
    } else if (screen.classList.contains('ready')) {
        if (!startTime) {
            clearInterval(interval);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = "Don't Haste to Click";

            restartText.textContent = 'Press to Re-Start';
            screen.appendChild(restartText);
        } else {
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = 'Click Now!';
        }
    } else if (screen.classList.contains('now')) {
        endTime = Date.now();

        const diff = endTime - startTime;
        ranks.push(diff);
        ranks.sort((former, latter) => {
            return former - latter;
        });

        makeRankTable();

        startTime = null;
        endTime = null;

        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = 'Press to Start';

        result.textContent = `Your Reaction Time: ${String(diff)}ms`;
    }
};

screen.addEventListener('click', clickToStart);
