let number1 = Math.floor(Math.random() * 9) + 1;
let number2 = Math.floor(Math.random() * 9) + 1;
let multiplicationResult = number1 * number2;

const body = document.body;
const word = document.createElement('div');
const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');
const result = document.createElement('div');

word.textContent = String(number1) + ' x ' + String(number2);
input.type = 'number';
button.textContent = 'Submit';

body.appendChild(word);
body.appendChild(form);
body.appendChild(result);
form.appendChild(input);
form.appendChild(button);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (multiplicationResult == Number(input.value)) {
        result.textContent = 'Correct!';
        number1 = Math.floor(Math.random() * 9) + 1;
        number2 = Math.floor(Math.random() * 9) + 1;
        multiplicationResult = number1 * number2;
        word.textContent = String(number1) + ' x ' + String(number2);
        input.value = '';
        input.focus();
    } else {
        result.textContent = 'Incorrect!';
        input.value = '';
        input.focus();
    }
});
