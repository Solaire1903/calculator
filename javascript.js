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
//Event for clicking the buttons
buttonGrid.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("button-digit")) {
        if (result !== null) {
            clearCalculatorState();
            result = null;
        }
        const content = display.textContent + target.textContent;
        updateDisplay(content);
    }
    else if (target.classList.contains("button-operator")) {
        if (operator !== "" || displayValue === null) {
            return;
        }

        result = null;
        number1 = displayValue;
        operator = target.textContent;
        updateDisplay("");
    }
    else {
        switch (target.id) {     
            case "button-decimal":
                if (displayValue === null || display.textContent.includes('.')) {
                    return;
                }
                
                const contentDecimal = display.textContent + '.';
                updateDisplay(contentDecimal);
                break;

            case "button-backspace":
                const contentBackspace = display.textContent.slice(0, -1);
                updateDisplay(contentBackspace);
                break;

            case "button-equals":
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
                break;

            case "button-del":
                clearCalculatorState();
                break;
        }
    }
});

//Keyboard support
document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
        if (result !== null) {
            clearCalculatorState();
            result = null;
        }
        const content = display.textContent + e.key;
        updateDisplay(content);
    }
    else if ("+-*/".includes(e.key)) {
        if (operator !== "" || displayValue === null) {
            return;
        }

        result = null;
        number1 = displayValue;
        operator = e.key;;
        updateDisplay("");
    }
    else if (e.key === "Enter") {
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
})