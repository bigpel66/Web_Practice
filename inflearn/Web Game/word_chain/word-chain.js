const body = document.body;
const word = document.createElement('div');
const form = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');
const result = document.createElement('div');

word.textContent = 'Jason';
button.textContent = 'Submit';

body.appendChild(word);
body.appendChild(form);
body.appendChild(result);
form.appendChild(input);
form.appendChild(button);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value[0] === word.textContent[word.textContent.length - 1]) {
        result.textContent = 'Correct!';
        word.textContent = input.value;
        input.value = '';
        input.focus();
    } else {
        result.textContent = 'Incorrect';
        input.value = '';
        input.focus();
    }
});
