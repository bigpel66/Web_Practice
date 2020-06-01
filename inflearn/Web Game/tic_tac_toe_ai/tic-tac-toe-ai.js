const body = document.body;
const table = document.createElement('table');
const result = document.createElement('div');

const rows = [];
const cols = [];

let turn = 'X';
let isFull = false;

const init = (isDraw) => {
    if (isDraw) {
        result.textContent = 'Draw';
    } else {
        result.textContent = `${turn} is Victory`;
    }

    setTimeout(() => {
        isFull = false;
        turn = 'X';
        result.textContent = '';

        cols.forEach((row) => {
            row.forEach((col) => {
                col.textContent = '';
            });
        });
    }, 3000);
};

const checkResult = (whichRow, whichCol) => {
    if (
        cols[whichRow][0].textContent === turn &&
        cols[whichRow][1].textContent === turn &&
        cols[whichRow][2].textContent === turn
    ) {
        isFull = true;
    }
    if (
        cols[0][whichCol].textContent === turn &&
        cols[1][whichCol].textContent === turn &&
        cols[2][whichCol].textContent === turn
    ) {
        isFull = true;
    }
    if (
        cols[0][0].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][2].textContent === turn
    ) {
        isFull = true;
    }
    if (
        cols[0][2].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][0].textContent === turn
    ) {
        isFull = true;
    }
};

const callbackFunction = (event) => {
    if (turn === 'O') {
        return;
    }

    const whichRow = rows.indexOf(event.target.parentNode);
    const whichCol = cols[whichRow].indexOf(event.target);

    if (cols[whichRow][whichCol].textContent === '') {
        cols[whichRow][whichCol].textContent = turn;

        checkResult(whichRow, whichCol);

        if (isFull) {
            init();
        } else {
            const candidate = [];

            cols.forEach((row) => {
                row.forEach((col) => {
                    if (col.textContent === '') {
                        candidate.push(col);
                    }
                });
            });

            if (candidate.length === 0) {
                init(true);
            } else {
                turn = 'O';

                setTimeout(() => {
                    const choice =
                        candidate[Math.floor(Math.random() * candidate.length)];

                    choice.textContent = turn;

                    const xComPos = rows.indexOf(choice.parentNode);

                    const yComPos = cols[xComPos].indexOf(choice);

                    checkResult(xComPos, yComPos);

                    if (isFull) {
                        init();
                    } else {
                        turn = 'X';
                    }
                }, 1000);
            }
        }
    }
};

for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr');
    rows.push(row);
    cols.push([]);

    for (let j = 0; j < 3; j++) {
        const col = document.createElement('td');
        col.addEventListener('click', callbackFunction);
        cols[i].push(col);
        row.appendChild(col);
    }

    table.appendChild(row);
}

body.appendChild(table);
body.appendChild(result);
