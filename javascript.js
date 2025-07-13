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

function updateDisplay(content) {
    if (content.length > 16) {
        alert("Number too big for the display!");
        return;
    }

    display.textContent = content;
    displayValue = parseInt(display.textContent);
}

function clearDisplay() {
    display.textContent = "";
    number1 = null;
    number2 = null;
    operator = "";
    displayValue = null;
}

let number1 = null;
let number2 = null;
let operator = "";
let displayValue = null;

const display = document.querySelector("#display");
const buttonGrid = document.querySelector("#button-container");
//Event for clicking the buttons
buttonGrid.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("button-digit")) {
        const content = display.textContent + target.textContent;
        updateDisplay(content);
    }
    else if (target.classList.contains("button-operator")) {
        if (operator || !displayValue) {
            return;
        }

        number1 = displayValue;
        operator = target.textContent;
        display.textContent = "";
        displayValue = null;
    }
    else {
        switch (target.id) {     
            case "button-equals":
                if (operator && displayValue) {
                    number2 = displayValue;
                    const result = operate(number1, number2, operator);
                    clearDisplay();
                    display.textContent = result;
                    displayValue = result;
                }
                break;
            case "button-del":
                clearDisplay();
                break;
        }
    }
});