const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'AC') {
            currentInput = '';
            operator = '';
            display.innerText = '';
        } else if (value === 'C') {
            currentInput = currentInput.slice(0, -1);
            display.innerText = currentInput;
        } else if (value === '=') {
            calculate();
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (operator) calculate();
            operator = value;
            currentInput += ` ${operator} `;
            display.innerText = currentInput;
        } else {
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            display.innerText = currentInput;
        }
    });
});

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        display.innerText = currentInput;
        resultDisplayed = true;
    } catch {
        display.innerText = "Error";
    }
    operator = '';
}
