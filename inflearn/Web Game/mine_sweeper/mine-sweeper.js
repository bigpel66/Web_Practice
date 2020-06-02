let isInit = true;
let isOver = false;
let openCount = 0;
let dataSet = [];
let timerCount;
let timerCheck;

const tbody = document.querySelector('#table tbody');
const timerText = document.querySelector('#timer');
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

const openMineTiles = () => {
    const trBunch = Array.from(tbody.children);
    const tdBunch = [];

    trBunch.forEach((tr) => {
        tdBunch.push(Array.from(tr.children));
    });

    tdBunch.forEach((tr) => {
        tr.forEach((td) => {
            if (td.textContent === 'X') {
                td.textContent = 'ㅋ';
                td.classList.add('bomb');
            }
        });
    });
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

const checkNumberOfMinesNearTiles = (xPos, yPos) => {
    const dataNearTiles = [dataSet[xPos][yPos - 1], dataSet[xPos][yPos + 1]];

    if (dataSet[xPos + 1]) {
        for (let i = 0; i < 3; i++) {
            dataNearTiles.push(dataSet[xPos + 1][yPos + i - 1]);
        }
    }

    if (dataSet[xPos - 1]) {
        for (let i = 0; i < 3; i++) {
            dataNearTiles.push(dataSet[xPos - 1][yPos + i - 1]);
        }
    }

    const numberOfMines = dataNearTiles.filter((dataNearTile) => {
        return [
            statusTable.mine,
            statusTable.flagMine,
            statusTable.questionMine,
        ].includes(dataNearTile);
    }).length;

    return numberOfMines;
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

    if (isInit) {
        isInit = false;
        mineGenerate(rows, cols, mines, xPos, yPos, true);
    }

    if (![statusTable.normal, statusTable.mine].includes(dataSet[xPos][yPos])) {
        return;
    }

    if (dataSet[xPos][yPos] === statusTable.mine) {
        clearInterval(timerCheck);
        isOver = true;
        event.currentTarget.textContent = 'ㅋ';
        event.currentTarget.classList.add('bomb');
        result.textContent = 'Defeat';

        openMineTiles();
    } else {
        const numberOfMines = checkNumberOfMinesNearTiles(xPos, yPos);

        event.currentTarget.textContent = numberOfMines;
        event.currentTarget.classList.add('open');
        dataSet[xPos][yPos] = statusTable.open;
        openCount++;

        if (numberOfMines === 0) {
            const elementNearTiles = [
                tbody.children[xPos].children[yPos - 1],
                tbody.children[xPos].children[yPos + 1],
            ];

            if (tbody.children[xPos - 1]) {
                for (let i = 0; i < 3; i++) {
                    elementNearTiles.push(
                        tbody.children[xPos - 1].children[yPos + i - 1]
                    );
                }
            }

            if (tbody.children[xPos + 1]) {
                for (let i = 0; i < 3; i++) {
                    elementNearTiles.push(
                        tbody.children[xPos + 1].children[yPos + i - 1]
                    );
                }
            }

            elementNearTiles
                .filter((elementNearTile) => {
                    return !!elementNearTile;
                })
                .forEach((elementNearTile) => {
                    const parentRow = elementNearTile.parentNode;
                    const parentBody = parentRow.parentNode;

                    const yNear = Array.prototype.indexOf.call(
                        parentRow.children,
                        elementNearTile
                    );
                    const xNear = Array.prototype.indexOf.call(
                        parentBody.children,
                        parentRow
                    );

                    if (dataSet[xNear][yNear] !== statusTable.open) {
                        // const numberOfMinesNearTile = checkNumberOfMinesNearTiles(
                        //     xNear,
                        //     yNear
                        // );

                        // elementNearTile.textContent = numberOfMinesNearTile;
                        // elementNearTile.classList.add('open');
                        // dataSet[xNear][yNear] = statusTable.open;
                        // openCount++;

                        elementNearTile.click();
                    }
                });
        }
    }

    if (openCount === rows * cols - mines) {
        clearInterval(timerCheck);
        isOver = true;
        result.textContent = 'Victory';
    }
};

const mineIndex = (rows, cols, mines, startIndex, minePos) => {
    const candidate = Array(rows * cols)
        .fill()
        .map((element, index) => {
            return index;
        });

    let diff;

    if (startIndex !== -1) {
        candidate.splice(startIndex, 1);
        diff = 1;
    } else {
        diff = 0;
    }

    while (candidate.length > rows * cols - mines - diff) {
        minePos.push(
            candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
        );
    }
};

const mineGenerate = (rows, cols, mines, xStart, yStart, isLeftClick) => {
    let minePos = [];

    if (isLeftClick) {
        mineIndex(rows, cols, mines, xStart * cols + yStart, minePos);
    } else {
        mineIndex(rows, cols, mines, -1, minePos);
    }

    minePos.sort((former, latter) => {
        return former - latter;
    });

    for (let i = 0; i < mines; i++) {
        const xPos = Math.floor(minePos[i] / cols);
        const yPos = minePos[i] % cols;

        tbody.children[xPos].children[yPos].textContent = 'X';

        dataSet[xPos][yPos] = statusTable.mine;
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
    clearInterval(timerCheck);

    timerCount = 0;
    timerText.textContent = 'Starting...';

    timerCheck = setInterval(() => {
        timerText.textContent = `${timerCount++} Sec`;
    }, 1000);

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
