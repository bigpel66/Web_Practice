const table = document.querySelector('#table');
const score = document.querySelector('#score');
const button = document.querySelector('#button');

let isStart = false;
let dataOnTable = [];
let formerTable = [];

let isDragStart = false;
let isDragging = false;
let startCoord;
let endCoord;
let isChanged = false;

const checkWin = () => {
    let check = false;

    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {
            if (attr === 2048) {
                check = true;
            }
        });
    });

    return check;
};

const tableCompare = () => {
    let check = false;

    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {
            if (attr !== formerTable[i][j]) {
                check = true;
            }
        });
    });

    return check;
};

const makeCopyTableData = () => {
    formerTable = [];

    dataOnTable.forEach((row, i) => {
        formerTable.push([]);
        row.forEach((attr, j) => {
            formerTable[i].push(attr);
        });
    });
};

const handleRight = () => {
    let getScore = 0;
    const newData = [[], [], [], []];

    [0, 1, 2, 3].forEach((rowIndex) => {
        let currentValue = -1;

        [0, 1, 2, 3].forEach((colIndex) => {
            if (dataOnTable[rowIndex][colIndex] === 0) {
                if (
                    colIndex + 1 === dataOnTable[rowIndex].length &&
                    currentValue !== -1
                ) {
                    newData[rowIndex].unshift(currentValue);
                }
                return;
            }

            if (currentValue === dataOnTable[rowIndex][colIndex]) {
                currentValue = -1;
                newData[rowIndex].unshift(dataOnTable[rowIndex][colIndex] * 2);
                getScore += dataOnTable[rowIndex][colIndex] * 2;
            } else {
                if (currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
                currentValue = dataOnTable[rowIndex][colIndex];
                if (
                    colIndex + 1 === dataOnTable[rowIndex].length &&
                    currentValue !== -1
                ) {
                    newData[rowIndex].unshift(currentValue);
                }
            }
        });
    });

    score.textContent = Number(score.textContent) + getScore;

    makeCopyTableData();

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[fIter][3 - sIter] = newData[fIter][sIter] || 0;
        });
    });

    if (tableCompare()) {
        isChanged = true;
    }
};

const handleLeft = () => {
    let getScore = 0;
    const newData = [[], [], [], []];

    [0, 1, 2, 3].forEach((rowIndex) => {
        let currentValue = -1;

        [3, 2, 1, 0].forEach((colIndex) => {
            if (dataOnTable[rowIndex][colIndex] === 0) {
                if (colIndex - 1 === -1 && currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
                return;
            }

            if (currentValue === dataOnTable[rowIndex][colIndex]) {
                currentValue = -1;
                newData[rowIndex].unshift(dataOnTable[rowIndex][colIndex] * 2);
                getScore += dataOnTable[rowIndex][colIndex] * 2;
            } else {
                if (currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
                currentValue = dataOnTable[rowIndex][colIndex];
                if (colIndex - 1 === -1 && currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
            }
        });
    });

    score.textContent = Number(score.textContent) + getScore;

    makeCopyTableData();

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[fIter][sIter] = newData[fIter][sIter] || 0;
        });
    });

    if (tableCompare()) {
        isChanged = true;
    }
};

const handleDown = () => {
    let getScore = 0;
    const newData = [[], [], [], []];

    [0, 1, 2, 3].forEach((rowIndex) => {
        let currentValue = -1;

        [0, 1, 2, 3].forEach((colIndex) => {
            if (dataOnTable[colIndex][rowIndex] === 0) {
                if (
                    colIndex + 1 === dataOnTable[rowIndex].length &&
                    currentValue !== -1
                ) {
                    newData[rowIndex].unshift(currentValue);
                }
                return;
            }

            if (currentValue === dataOnTable[colIndex][rowIndex]) {
                currentValue = -1;
                newData[rowIndex].unshift(dataOnTable[colIndex][rowIndex] * 2);
                getScore += dataOnTable[colIndex][rowIndex] * 2;
            } else {
                if (currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
                currentValue = dataOnTable[colIndex][rowIndex];
                if (
                    colIndex + 1 === dataOnTable[rowIndex].length &&
                    currentValue !== -1
                ) {
                    newData[rowIndex].unshift(currentValue);
                }
            }
        });
    });

    score.textContent = Number(score.textContent) + getScore;

    makeCopyTableData();

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[3 - fIter][sIter] = newData[sIter][fIter] || 0;
        });
    });

    if (tableCompare()) {
        isChanged = true;
    }
};

const handleUp = () => {
    let getScore = 0;
    const newData = [[], [], [], []];

    [0, 1, 2, 3].forEach((rowIndex) => {
        let currentValue = -1;

        [3, 2, 1, 0].forEach((colIndex) => {
            if (dataOnTable[colIndex][rowIndex] === 0) {
                if (colIndex - 1 === -1 && currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
                return;
            }

            if (currentValue === dataOnTable[colIndex][rowIndex]) {
                currentValue = -1;
                newData[rowIndex].unshift(dataOnTable[colIndex][rowIndex] * 2);
                getScore += dataOnTable[colIndex][rowIndex] * 2;
            } else {
                if (currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
                currentValue = dataOnTable[colIndex][rowIndex];
                if (colIndex - 1 === -1 && currentValue !== -1) {
                    newData[rowIndex].unshift(currentValue);
                }
            }
        });
    });

    score.textContent = Number(score.textContent) + getScore;

    makeCopyTableData();

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[fIter][sIter] = newData[sIter][fIter] || 0;
        });
    });

    if (tableCompare()) {
        isChanged = true;
    }
};

const setDirection = (start, end) => {
    const xDiff = end[0] - start[0];
    const yDiff = end[1] - start[1];

    if (xDiff > 0 && Math.abs(yDiff) < Math.abs(xDiff)) {
        return 'right';
    } else if (xDiff < 0 && Math.abs(yDiff) < Math.abs(xDiff)) {
        return 'left';
    } else if (yDiff > 0 && Math.abs(yDiff) > Math.abs(xDiff)) {
        return 'down';
    } else if (yDiff < 0 && Math.abs(yDiff) > Math.abs(xDiff)) {
        return 'up';
    }
};

const actionDirection = (direction) => {
    switch (direction) {
        case 'right':
            handleRight();
            break;
        case 'left':
            handleLeft();
            break;
        case 'down':
            handleDown();
            break;
        case 'up':
            handleUp();
            break;
    }
    dataToTable();
    if (isChanged) {
        isChanged = false;
        numberOnRandomTile();
    }
    if (checkWin()) {
        alert(`Score: ${score.textContent}`);
        gameInit();
    }
};

const drawTable = () => {
    const nodeFragment = document.createDocumentFragment();

    [0, 1, 2, 3].forEach((fIter) => {
        const tr = document.createElement('tr');
        dataOnTable.push([]);
        [0, 1, 2, 3].forEach((sIter) => {
            const td = document.createElement('td');
            dataOnTable[fIter].push(0);
            tr.appendChild(td);
        });
        nodeFragment.appendChild(tr);
    });

    table.appendChild(nodeFragment);
};

const dataToTable = () => {
    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {
            if (attr > 0) {
                table.children[i].children[j].textContent = attr;
            } else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
};

const numberOnRandomTile = () => {
    const emptyField = [];

    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {
            if (!attr) {
                emptyField.push([i, j]);
            }
        });
    });

    if (emptyField.length === 0) {
        const alertMessage = `Game Over: ${score.textContent} Score!`;
        alert(alertMessage);
        gameInit();
    } else {
        const randomTile =
            emptyField[Math.floor(Math.random() * emptyField.length)];

        dataOnTable[randomTile[0]][randomTile[1]] = 2;

        dataToTable();
    }
};

const gameInit = () => {
    isStart = false;
    dataOnTable = [];
    button.textContent = 'Start';
    table.innerHTML = '';
    startCoord = null;
    endCoord = null;
    drawTable();
    dataToTable();
};

const startGame = () => {
    if (isStart) {
        gameInit();
    } else {
        isStart = true;
        button.textContent = 'Restart';
        numberOnRandomTile();
    }
};

const mouseDownEvent = (event) => {
    if (!isDragStart) {
        isDragStart = true;
        startCoord = [event.clientX, event.clientY];
    }
};

const mouseMoveEvent = (event) => {
    if (isDragStart) {
        isDragging = true;
    }
};

const mouseUpEvent = (event) => {
    if (isDragging && isStart) {
        endCoord = [event.clientX, event.clientY];

        const direction = setDirection(startCoord, endCoord);

        actionDirection(direction);
    }

    startCoord = null;
    endCoord = null;
    isDragStart = false;
    isDragging = false;
};

gameInit();

window.addEventListener('mousedown', mouseDownEvent);

window.addEventListener('mousemove', mouseMoveEvent);

window.addEventListener('mouseup', mouseUpEvent);

button.addEventListener('click', startGame);
