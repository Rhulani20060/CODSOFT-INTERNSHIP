document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".inputs button");

    let currentInput = "";
    let operator = null;
    let previousInput = "";
    let result = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (value === "ON" || value === "AC") {
                currentInput = "";
                previousInput = "";
                operator = null;
                result = null;
                display.value = "";
                display.disabled = false;  
            } else if (value === "OFF") {
                
                display.value = "";
                display.disabled = true;  // Disable the display
                currentInput = "";
                previousInput = "";
                operator = null;
                result = null;
            } else if (value === "Del") {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (value === "=") {
                if (operator && currentInput) {
                    result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                    display.value = result;
                    previousInput = result;
                    currentInput = "";
                    operator = null;
                }
            } else if (value === "+" || value === "-" || value === "*" || value === "/") {
                if (currentInput) {
                    if (result !== null) {
                        previousInput = result;
                        result = null;
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput = "";
                }
            } else {
                if (value === "." && currentInput.includes(".")) {
                }
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    function calculate(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num1 / num2;
            default:
                return num2;
        }
    }
});
