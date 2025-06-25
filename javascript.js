function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(number1, number2, operator) {
    switch (operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);   
        case '*':
            return multiply(number1, number2);  
        case '/':
            return divide(number1, number2);  
    }
}

let number1;
let number2;
let operator;