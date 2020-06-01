let isInit = true;
let isOver = false;
let openCount = 0;
let dataSet = [];

const tbody = document.querySelector('#table tbody');
const result = document.querySelector('#result');

const statusTable = {
    open: -1,
    question: -2,
    flag: -3,
    questionMine: -5,
    flagMine: -4,
    mine: 1,
    normal: 0,
};

const contextMenuClick = (event, rows, cols, mines) => {
    event.preventDefault();

    if (isOver) {
        return;
    }

    const yPos = Array.prototype.indexOf.call(
        event.currentTarget.parentNode.children,
        event.currentTarget
    );
    const xPos = Array.prototype.indexOf.call(
        event.currentTarget.parentNode.parentNode.children,
        event.currentTarget.parentNode
    );

    if (dataSet[xPos][yPos] === statusTable.open) {
        return;
    }

    if (['', 'X'].includes(event.currentTarget.textContent)) {
        event.currentTarget.textContent = '!';
        event.currentTarget.classList.add('flag');

        if (dataSet[xPos][yPos] === statusTable.normal) {
            dataSet[xPos][yPos] = statusTable.flag;
        } else {
            dataSet[xPos][yPos] = statusTable.flagMine;
        }
    } else if (event.currentTarget.textContent === '!') {
        event.currentTarget.textContent = '?';
        event.currentTarget.classList.remove('flag');
        event.currentTarget.classList.add('question');

        if (dataSet[xPos][yPos] == statusTable.flag) {
            dataSet[xPos][yPos] = statusTable.question;
        } else {
            dataSet[xPos][yPos] = statusTable.questionMine;
        }
    } else if (event.currentTarget.textContent === '?') {
        event.currentTarget.classList.remove('question');

        if (dataSet[xPos][yPos] === statusTable.question) {
            event.currentTarget.textContent = '';
            dataSet[xPos][yPos] = statusTable.normal;
        } else {
            dataSet[xPos][yPos] = statusTable.mine;
            event.currentTarget.textContent = 'X';
        }
    }

    if (isInit) {
        isInit = false;
        mineGenerate(rows, cols, mines, xPos, yPos, false);
    }
};

const tileClick = (event, rows, cols, mines) => {
    if (isOver) {
        return;
    }

    const yPos = Array.prototype.indexOf.call(
        event.currentTarget.parentNode.children,
        event.currentTarget
    );
    const xPos = Array.prototype.indexOf.call(
        event.currentTarget.parentNode.parentNode.children,
        event.currentTarget.parentNode
    );

    if (![statusTable.normal, statusTable.mine].includes(dataSet[xPos][yPos])) {
        return;
    }

    if (dataSet[xPos][yPos] === statusTable.mine) {
        isOver = true;
        event.currentTarget.textContent = 'ㅋ';
        event.currentTarget.classList.add('bomb');
        result.textContent = 'Defeat';
    } else {
        event.currentTarget.classList.add('open');
        openCount++;

        // surrounded
    }

    if (openCount === rows * cols - mines) {
        isOver = true;
        result.textContent = 'Victory';
    }

    if (isInit) {
        isInit = false;
        mineGenerate(rows, cols, mines, xPos, yPos, true);
    }
};

const mineIndex = (rows, cols, mines, startIndex, minePos) => {
    const candidate = Array(rows * cols)
        .fill()
        .map((element, index) => {
            return index;
        });

    candidate.splice(startIndex, 1);

    while (candidate.length > rows * cols - mines - 1) {
        minePos.push(
            candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        );
    }
};

const mineGenerate = (rows, cols, mines, xStart, yStart, isLeftClick) => {
    if (isLeftClick) {
        let minePos = [];

        mineIndex(rows, cols, mines, xStart * cols + yStart, minePos);

        minePos.sort((former, latter) => {
            return former - latter;
        });

        for (let i = 0; i < mines; i++) {
            const xPos = Math.floor(minePos[i] / cols);
            const yPos = minePos[i] % cols;

            tbody.children[xPos].children[yPos].textContent = 'X';

            dataSet[xPos][yPos] = statusTable.mine;
        }
    }
};

const tileGenerate = (rows, cols, mines) => {
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

        dataSet.push([]);

        for (let j = 0; j < cols; j++) {
            const col = document.createElement('td');
            col.addEventListener('contextmenu', (event) => {
                contextMenuClick(event, rows, cols, mines);
            });
            col.addEventListener('click', (event) => {
                tileClick(event, rows, cols, mines);
            });
            row.appendChild(col);

            dataSet[i].push(statusTable.normal);
        }
        tbody.appendChild(row);
    }
};

const startGame = () => {
    const rows = document.querySelector('#row').value;
    const cols = document.querySelector('#col').value;
    const mines = document.querySelector('#mine').value;

    isInit = true;
    isOver = false;
    openCount = 0;
    dataSet = [];

    tbody.innerHTML = '';
    result.innerHTML = '';

    tileGenerate(rows, cols, mines);
};

document.querySelector('#exec').addEventListener('click', startGame);
