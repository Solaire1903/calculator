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
    if (display.textContent.length + content.length > 16) {
        alert("Number too big for the display!");
        return;
    }

    display.textContent += content;
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
        updateDisplay(target.textContent);
    }
    else if (target.classList.contains("button-operator")) {
        if (displayValue) {
            number1 = displayValue;
            console.log(number1);
        }
        if (!operator && number1) {
            operator = target.textContent;
            console.log(operator);
        }
    }
    else {
        switch (target.id) {               
            case "button-del":
                clearDisplay();
                break;
        }
    }
});