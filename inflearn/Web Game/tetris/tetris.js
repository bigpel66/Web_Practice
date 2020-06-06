const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const score = document.querySelector('#score');
const controls = document.querySelector('#bgm');
const tetris = document.querySelector('#tetris');

const colorData = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'navy',
    'violet',
];

let isStart = false;
let isPause = false;
let tickInterval;
let tetrisData = [];
let tetrisBlock = [
    {
        name: 's',
        center: false,
        numCode: 1,
        color: 'red',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [0, 1, 1],
            ],
        ],
    },
    {
        name: 't',
        center: true,
        numCode: 2,
        color: 'orange',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'z',
        center: true,
        numCode: 3,
        color: 'yellow',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'zr',
        center: true,
        numCode: 4,
        color: 'green',
        startRow: 1,
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ],
        ],
    },
    {
        name: 'l',
        center: true,
        numCode: 5,
        color: 'blue',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ],
            [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ],
            [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ],
        ],
    },
    {
        name: 'lr',
        center: true,
        numCode: 6,
        color: 'navy',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ],
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ],
        ],
    },
    {
        name: 'b',
        center: true,
        numCode: 7,
        color: 'violet',
        currentShapeIndex: 0,
        shape: [
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
        ],
    },
];
let nextBlock;
let currentBlock;
let blockCurrentPos = [0, 3];

const isActiveBlock = (value) => {
    return value > 0 && value < 10;
};

const isInvalidBlock = (value) => {
    return value === undefined || value >= 10;
};

const blockGenerate = () => {
    let isGameOver = false;

    if (!currentBlock) {
        currentBlock =
            tetrisBlock[Math.floor(Math.random() * tetrisBlock.length)];
    } else {
        currentBlock = nextBlock;
    }

    currentBlock.currentShapeIndex = 0;

    nextBlock = tetrisBlock[Math.floor(Math.random() * tetrisBlock.length)];

    nextToSubScreen();

    blockCurrentPos = [-1, 3];

    currentBlock.shape[0].slice(1).forEach((row, i) => {
        row.forEach((attr, j) => {
            if (attr && tetrisData[i][j + 3]) {
                isGameOver = true;
            }
        });
    });

    currentBlock.shape[0].slice(1).forEach((row, i) => {
        row.forEach((attr, j) => {
            if (attr) {
                tetrisData[i][j + 3] = currentBlock.numCode;
            }
        });
    });

    if (isGameOver) {
        resetGame();
        nextInit();
        dataToScreen();
        alert('Game Over');
    } else {
        dataToScreen();
    }
};

const nextToSubScreen = () => {
    const nextTable = document.querySelector('#next-table');

    nextTable.querySelectorAll('tr').forEach((row, i) => {
        Array.from(row.children).forEach((attr, j) => {
            if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j]) {
                nextTable.querySelectorAll('tr')[i].children[j].className =
                    colorData[nextBlock.numCode - 1];
            } else {
                nextTable.querySelectorAll('tr')[i].children[j].className =
                    'white';
            }
        });
    });
};

const dataToScreen = () => {
    tetrisData.forEach((row, i) => {
        row.forEach((attr, j) => {
            if (attr > 0) {
                tetris.children[i].children[j].className =
                    tetrisData[i][j] >= 10
                        ? colorData[tetrisData[i][j] / 10 - 1]
                        : colorData[tetrisData[i][j] - 1];
            } else {
                tetris.children[i].children[j].className = '';
            }
        });
    });
};

const checkRow = () => {
    const fullTupleIndex = [];

    tetrisData.forEach((row, i) => {
        let count = 0;
        row.forEach((attr, j) => {
            if (attr > 0) {
                count++;
            }
        });
        if (count === 10) {
            fullTupleIndex.push(i);
        }
    });

    const fullTupleCount = fullTupleIndex.length;

    tetrisData.filter((row, i) => {
        return !fullTupleIndex.includes(i);
    });

    for (let i = 0; i < fullTupleCount; i++) {
        tetrisData.unshift(Array(10).fill(0));
    }

    let currentScore = Number(score.textContent);
    currentScore += fullTupleCount ** 2;
    score.textContent = currentScore;
};

const tickFunction = () => {
    const blockNextPos = [blockCurrentPos[0] + 1, blockCurrentPos[1]];
    const activeBlocks = [];

    let isAvailableToGoDown = true;
    let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];

    for (
        let i = blockCurrentPos[0];
        i < blockCurrentPos[0] + currentBlockShape.length;
        i++
    ) {
        if (i < 0 || i >= 20) {
            continue;
        }

        for (
            let j = blockCurrentPos[1];
            j < blockCurrentPos[1] + currentBlockShape.length;
            j++
        ) {
            if (isActiveBlock(tetrisData[i][j])) {
                activeBlocks.push([i, j]);
                if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {
                    isAvailableToGoDown = false;
                }
            }
        }
    }

    if (!isAvailableToGoDown) {
        activeBlocks.forEach((block) => {
            tetrisData[block[0]][block[1]] *= 10;
        });
        checkRow();
        blockGenerate();
        return false;
    } else {
        for (let i = tetrisData.length - 1; i >= 0; i--) {
            const row = tetrisData[i];

            row.forEach((attr, j) => {
                if (
                    attr < 10 &&
                    tetrisData[i + 1] &&
                    tetrisData[i + 1][j] < 10
                ) {
                    tetrisData[i + 1][j] = attr;
                    tetrisData[i][j] = 0;
                }
            });
        }
        blockCurrentPos = blockNextPos;
        dataToScreen();
        return true;
    }
};

const nextInit = () => {
    const nextTable = document.querySelector('#next-table');

    nextTable.querySelectorAll('tr').forEach((row) => {
        Array.from(row.children).forEach((attr) => {
            attr.className = '';
        });
    });
};

const makeTile = () => {
    const fragment = document.createDocumentFragment();

    [...Array(20).keys()].forEach((row, i) => {
        const tr = document.createElement('tr');
        fragment.appendChild(tr);

        [...Array(10).keys()].forEach((attr, j) => {
            const td = document.createElement('td');
            tr.appendChild(td);
        });

        const tuple = Array(10).fill(0);

        tetrisData.push(tuple);
    });

    tetris.appendChild(fragment);
};

const startGame = () => {
    if (isStart) {
        isStart = false;
        setTimeout(() => {
            clearInterval(tickInterval);
        }, 500);
        isPause = true;
        startButton.textContent = 'Resume';
        controls.pause();
        controls.toggleAttribute('controls');
    } else {
        isStart = true;
        if (isPause) {
            setTimeout(() => {
                tickInterval = setInterval(tickFunction, 1000);
            }, 500);
        } else {
            tickInterval = setInterval(tickFunction, 1000);
            blockGenerate();
        }
        isPause = false;
        startButton.textContent = 'Pause';
        resetButton.style.display = 'inline-block';
        controls.volume = 0.03;
        controls.play();
        controls.toggleAttribute('controls');
    }
};

const resetGame = () => {
    isStart = false;
    clearInterval(tickInterval);
    resetButton.style.display = 'none';
    startButton.textContent = 'Start';
    score.textContent = 0;
    tetris.innerHTML = '';
    tetrisData = [];
    nextBlock = null;
    currentBlock = null;
    controls.pause();
    controls.removeAttribute('controls');
    controls.currentTime = 0;
    makeTile();
    nextInit();
};

const keyUpEvent = (event) => {
    if (isStart) {
        switch (event.code) {
            case 'ArrowUp':
                break;
            case 'Space':
                while (tickFunction()) {}
                break;
            default:
                break;
        }
    }
};

const keyDownEvent = (event) => {
    if (isStart) {
        switch (event.code) {
            case 'ArrowLeft':
                break;
            case 'ArrowRight':
                break;
            case 'ArrowDown':
                break;
            default:
                break;
        }
    }
};

makeTile();

controls.removeAttribute('controls');

window.addEventListener('keyup', keyUpEvent);
window.addEventListener('keydown', keyDownEvent);

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
