const table = document.querySelector('#table');
const score = document.querySelector('#score');
const button = document.querySelector('#button');

let isStart = false;
let dataOnTable = [];

let isDragStart = false;
let isDragging = false;
let startCoord;
let endCoord;

const handleRight = () => {
    const newData = [[], [], [], []];

    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {});
    });

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[fIter][sIter] = newData[fIter][sIter] || 0;
        });
    });
};

const handleLeft = () => {
    const newData = [[], [], [], []];

    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {});
    });

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[fIter][sIter] = newData[fIter][sIter] || 0;
        });
    });
};

const handleDown = () => {
    const newData = [[], [], [], []];

    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {});
    });

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[fIter][sIter] = newData[fIter][sIter] || 0;
        });
    });
};

const handleUp = () => {
    const newData = [[], [], [], []];

    dataOnTable.forEach((row, i) => {
        row.forEach((attr, j) => {});
    });

    [0, 1, 2, 3].forEach((fIter) => {
        [0, 1, 2, 3].forEach((sIter) => {
            dataOnTable[fIter][sIter] = newData[fIter][sIter] || 0;
        });
    });
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
    if (isDragging) {
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
