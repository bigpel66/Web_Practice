const body = document.body;
const table = document.createElement('table');
const result = document.createElement('div');

const rows = [];
const cols = [];

let turn = 'X';
let isFull = false;

const callbackFunction = (event) => {
    const whichRow = rows.indexOf(event.target.parentNode);
    const whichCol = cols[whichRow].indexOf(event.target);

    if (cols[whichRow][whichCol].textContent === '') {
        cols[whichRow][whichCol].textContent = turn;

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

        if (isFull) {
            result.textContent = turn + ' is Victory';

            turn = 'X';
            isFull = false;

            cols.forEach((row) => {
                row.forEach((col) => {
                    col.textContent = '';
                });
            });
        } else {
            if (turn === 'X') {
                turn = 'O';
            } else {
                turn = 'X';
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
