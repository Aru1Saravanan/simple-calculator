class Calculator {
    constructor(previousDisplay, currentDisplay) {
        currentDisplay = this.currentDisplay;
        previousDisplay = this.previousDisplay;
        this.clearScreen();
    }

    clearScreen() {
        this.currentVal = '';
        this.previousVal = '';
        this.operation = undefined;
    }

    delete() {
        this.currentVal = this.currentVal.toString().slice(0, -1);
    }

    appendNumbers(num) {
        if (num === '.' && this.currentVal.includes('.')) return
        this.currentVal = this.currentVal.toString() + num.toString();
    }

    getOperation(op) {
        if (this.currentVal === "") return
        if (this.currentVal !== "") this.computeOp();
        this.operation = op;
        this.previousVal = this.currentVal;
        this.currentVal = "";
    }

    computeOp() {
        let computation;
        let previous = parseFloat(this.previousVal);
        let current = parseFloat(this.currentVal);
        if ((!bacisOps.includes(this.operation) && (isNaN(previous) || isNaN(current))) && (!singleOps.includes(this.operation) && isNaN(current))) return
        switch (this.operation) {
            case ("add"):
                computation = previous + current;
                break;
            case ("subtract"):
                computation = previous - current;
                break;
            case ("multiply"):
                computation = previous * current;
                break;
            case ("divide"):
                computation = previous / current;
                break;
            case ("fraction"):
                computation = 1 / previous;
                break;
            case ("sqrt"):
                computation = Math.sqrt(previous);
                break;
            case ("sqr"):
                computation = Math.pow(previous, 2);
                break;
            default:
                return
        }
        this.currentVal = computation;
        this.operation = undefined;
        this.previousVal = "";
    }

    negateNum() {
        let currentNum = parseFloat(this.currentVal);
        this.currentVal = -currentNum;
    }

    getNumbers(num) {
        const StringNum = num.toString();
        const intNum = parseFloat(StringNum.split('.')[0]);
        const floatNum = StringNum.split('.')[1];
        let displayInt;
        if (isNaN(intNum)) {
            displayInt = "";
        } else {
            displayInt = intNum.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (floatNum != null) {
            return `${displayInt}.${floatNum}`;
        } else {
            return displayInt;
        }
    }

    display() {
        currentDisplay.textContent = this.getNumbers(this.currentVal);
        if (this.operation != null) {
            switch (this.operation) {
                case ("add"):
                    previousDisplay.innerHTML = `${this.getNumbers(this.previousVal)} ${basicOperations[0]}`;
                    break;
                case ("subtract"):
                    previousDisplay.innerHTML = `${this.getNumbers(this.previousVal)} ${basicOperations[1]}`;
                    break;
                case ("multiply"):
                    previousDisplay.innerHTML = `${this.getNumbers(this.previousVal)} ${basicOperations[2]}`;
                    break;
                case ("divide"):
                    previousDisplay.innerHTML = `${this.getNumbers(this.previousVal)} ${basicOperations[3]}`;
                    break;
                case ("fraction"):
                    previousDisplay.innerHTML = `1 / (${this.getNumbers(this.previousVal)})`;
                    break;
                case ("sqrt"):
                    previousDisplay.innerHTML = `&radic;${this.getNumbers(this.previousVal)}`;
                    break;
                case ("sqr"):
                    previousDisplay.innerHTML = `${this.getNumbers(this.previousVal)}<sup>2</sup>`;
                    break;
                default:
                    return;
            }
        } else {
            previousDisplay.textContent = '';
        }
    }
}



const previousDisplay = document.querySelector(".previous-content");
const currentDisplay = document.querySelector(".current-content");
const numbers = document.querySelectorAll(".numbers");
const operation = document.querySelectorAll(".operand");
const clearAllBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");
const negateBtn = document.querySelector(".negation");
const basicOperations = ["+", "-", "×", "÷"];
const bacisOps = ["add", "subtract", "multiply", "divide"];
const singleOps = ["fraction", "sqrt", "sqr"];


const calc = new Calculator(previousDisplay, currentDisplay);

numbers.forEach(button => {
    button.addEventListener("click", () => {
        calc.appendNumbers(button.value);
        calc.display();
    });
});

operation.forEach(button => {
    button.addEventListener("click", () => {
        calc.getOperation(button.value);
        calc.display();
    });
});

negateBtn.addEventListener("click", () => {
    calc.negateNum();
    calc.display();
});

equalBtn.addEventListener("click", () => {
    calc.computeOp();
    calc.display();
});

deleteBtn.addEventListener("click", () => {
    calc.delete();
    calc.display();
});

clearAllBtn.addEventListener("click", () => {
    calc.clearScreen();
    calc.display();
});