document.addEventListener('DOMContentLoaded', function() {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';
    let shouldResetScreen = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            // Handle different button types
            if (value === 'AC') {
                clearAll();
            } else if (value === 'DEL') {
                deleteLastChar();
            } else if (value === '=') {
                calculate();
            } else if ('+-*/%'.includes(value)) {
                handleOperator(value);
            } else {
                appendNumber(value);
            }

            updateDisplay();
        });
    });

    function clearAll() {
        currentInput = '';
        previousInput = '';
        currentOperator = '';
    }

    function deleteLastChar() {
        currentInput = currentInput.slice(0, -1);
    }

    function appendNumber(number) {
        if (shouldResetScreen) {
            currentInput = '';
            shouldResetScreen = false;
        }
        currentInput += number;
    }

    function handleOperator(operator) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        currentOperator = operator;
        previousInput = currentInput;
        shouldResetScreen = true;
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return;

        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (currentOperator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        currentInput = computation.toString();
        currentOperator = '';
        previousInput = '';
        shouldResetScreen = true;
    }

    function updateDisplay() {
        result.value = currentInput || '0';
    }

    // Initialize display
    updateDisplay();
}); 