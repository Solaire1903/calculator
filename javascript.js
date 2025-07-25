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
    if (content.toString().length > 16) {
        alert("Number too big for the display!");
        clearCalculatorState();
        return;
    }
    
    display.textContent = content;
    if (content === "") {
        displayValue = null;
    }
    else {
        displayValue = parseFloat(content);
    }
}

function addDigitToDisplay(event) {
    if (result !== null) {
        clearCalculatorState();
        result = null;
    }
    let content = display.textContent;
    if (event.type === "click") content += event.target.textContent;
    else if (event.type === "keydown") content += event.key;
    updateDisplay(content);
}

function registerOperator(event) {
    if (operator !== "" || displayValue === null) {
            return;
        }

        result = null;
        number1 = displayValue;
        if (event.type === "click") operator = event.target.textContent;
        else if (event.type === "keydown") operator = event.key;
        updateDisplay("");
}

function addDecimalToDisplay() {
    if (displayValue === null || display.textContent.includes('.')) {
        return;
    }
    
    const contentDecimal = display.textContent + '.';
    updateDisplay(contentDecimal);
}

function showResult() {
    if (operator !== "" && displayValue !== null) {
        number2 = displayValue;
        if (operator === "/" && number2 === 0) {
            alert("Don't divide by zero!");
            clearCalculatorState();
            return;
        }
        result = operate(number1, number2, operator);
        result = Math.round(result * 100) / 100;
        clearCalculatorState();
        updateDisplay(result);
    }
}

function removeLastInput() {
    const newContent = display.textContent.slice(0, -1);
    updateDisplay(newContent);
}

function clearCalculatorState() {
    number1 = null;
    number2 = null;
    operator = "";
    updateDisplay("");
}

let number1 = null;
let number2 = null;
let result = null;
let operator = "";
let displayValue = null;

const display = document.querySelector("#display");
const buttonGrid = document.querySelector("#button-container");

//Event handler for clicking the buttons
buttonGrid.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("button-digit")) {
        addDigitToDisplay(event);
    }
    else if (target.classList.contains("button-operator")) {
        registerOperator(event);
    }
    else {
        switch (target.id) {     
            case "button-decimal":
                addDecimalToDisplay();
                break;

            case "button-backspace":
                removeLastInput();
                break;

            case "button-equals":
                showResult();
                break;

            case "button-del":
                clearCalculatorState();
                break;
        }
    }
});

//Keyboard support
document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
        addDigitToDisplay(event);
    }
    else if ("+-*/".includes(event.key)) {
        registerOperator(event);
    }
    else {
        switch (event.key) {
            case ".":
                addDecimalToDisplay();
                break;
            case "Enter":
                showResult();
                break;
            case "Backspace":
                removeLastInput();
                break;
        }
    }
});