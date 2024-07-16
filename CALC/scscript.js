document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    document.getElementById('clear').addEventListener('click', clearDisplay);
    document.getElementById('equals').addEventListener('click', calculateResult);

    function handleButtonClick() {
        const value = this.getAttribute('data-value');
        if (!value) return;

        if (isOperator(value)) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function handleOperator(value) {
        if (firstOperand && operator && currentInput) {
            firstOperand = operate(firstOperand, currentInput, operator);
            display.textContent = firstOperand;
        } else {
            firstOperand = currentInput;
        }

        operator = value;
        currentInput = '';
        display.textContent = `${firstOperand} ${operator}`;
        shouldResetDisplay = true;
    }

    function handleNumber(value) {
        if (shouldResetDisplay) {
            currentInput = '';
            shouldResetDisplay = false;
        }
        
        if (value === '.' && currentInput.includes('.')) return;

        currentInput += value;
        display.textContent = currentInput;
    }

    function clearDisplay() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        display.textContent = '';
    }

    function calculateResult() {
        if (firstOperand && operator && currentInput) {
            currentInput = operate(firstOperand, currentInput, operator);
            display.textContent = currentInput;
            firstOperand = '';
            operator = '';
            shouldResetDisplay = true;
        }
    }

    function operate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return b !== 0 ? (a / b).toString() : 'Error';
            default:
                return '';
        }
    }
});
