// script.js

document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = Array.from(document.getElementsByClassName("btn"));
    let currentInput = "";
    let operator = null;
    let previousInput = "";
    let isResultDisplayed = false;

    function updateDisplay(value) {
        display.innerText = value || "0";
    }

    function clear() {
        currentInput = "";
        operator = null;
        previousInput = "";
        updateDisplay(currentInput);
    }

    function calculate() {
        if (currentInput && previousInput && operator) {
            currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
            updateDisplay(currentInput);
            previousInput = "";
            operator = null;
            isResultDisplayed = true;
        }
    }

    function handleOperation(value) {
        if (currentInput) {
            if (previousInput) {
                calculate();
            } else {
                previousInput = currentInput;
            }
            operator = value;
            currentInput = "";
        }
    }

    function handleInput(value) {
        if (isResultDisplayed) {
            currentInput = value;
            isResultDisplayed = false;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = this.getAttribute("data-value");

            if (value === "C") {
                clear();
            } else if (value === "=") {
                calculate();
            } else if (["+", "-", "*", "/", "^"].includes(value)) {
                handleOperation(value);
            } else if (value === "sqrt") {
                if (currentInput) {
                    currentInput = Math.sqrt(currentInput);
                    updateDisplay(currentInput);
                    isResultDisplayed = true;
                }
            } else if (value === "±") {
                if (currentInput) {
                    currentInput = -currentInput;
                    updateDisplay(currentInput);
                }
            } else if (value === "%") {
                if (currentInput) {
                    currentInput = currentInput / 100;
                    updateDisplay(currentInput);
                }
            } else {
                handleInput(value);
            }
        });
    });

    document.addEventListener("keydown", function(event) {
        const key = event.key;

        if (key === "Escape") {
            clear();
        } else if (key === "Enter" || key === "=") {
            calculate();
        } else if (["+", "-", "*", "/", "^"].includes(key)) {
            handleOperation(key);
        } else if (key === "Backspace") {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        } else if (!isNaN(key) || key === ".") {
            handleInput(key);
        }
    });
});
