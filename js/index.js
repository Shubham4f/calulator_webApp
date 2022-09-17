class Caluclator {
    constructor(previousOperand, currentOperand) {
        this.previousDisplay = previousOperand;
        this.currentDisplay = currentOperand;
        this.clear();
    }

    clear() {
        this.previousOper = "";
        this.currentOper = "";
        this.operation = undefined;

    }

    delete() {
        this.currentOper = this.currentOper.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number == '.' && this.currentOper.includes('.')) {
            return;
        }
        this.currentOper = this.currentOper.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOper === ''){
            return;
        }
        if(this.previousOper !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOper = this.currentOper;
        this.currentOper=""
    }

    compute() {
        let ans;
        const prev = parseFloat(this.previousOper);
        const current = parseFloat(this.currentOper);
        if(isNaN(prev) || isNaN(current)){
            return;
        }
        switch(this.operation){
            case '+' :
                ans = prev + current;
                break;
            case '-' :
                ans = prev - current;
                break;
            case '*' :
                ans = prev * current;
                break;
            case '÷' :
                ans = prev / current;
                break;
            default :
                return
        }
        this.currentOper = ans.toString();
        this.operation = undefined;
        this.previousOper = "";
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intigerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let intigerDisplay;
        if (isNaN(intigerDigits)){
            intigerDisplay = "";
        }
        else {
            intigerDisplay = intigerDigits.toLocaleString();
        }
        if(decimalDigits != null){
            return `${intigerDisplay}.${decimalDigits}`;
        }
        else{
            return intigerDisplay;
        }

    }

    updateDispaly() {
        if(this.operation !=null){
            this.previousDisplay.innerText = `${this.getDisplayNumber(this.previousOper)} ${this.operation}`;
        }
        else{
            this.previousDisplay.innerText = this.getDisplayNumber(this.previousOper);
        }
        this.currentDisplay.innerText = this.getDisplayNumber(this.currentOper);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

const caluclator = new Caluclator(previousOperand, currentOperand);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        caluclator.appendNumber(button.innerText);
        caluclator.updateDispaly();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        caluclator.chooseOperation(button.innerText);
        caluclator.updateDispaly();
    });
});

equalButton.addEventListener('click', () => {
    caluclator.compute();
    caluclator.updateDispaly();
});

allClearButton.addEventListener('click', () =>{
    caluclator.clear();
    caluclator.updateDispaly();
});

deleteButton.addEventListener('click', () => {
    caluclator.delete();
    caluclator.updateDispaly();
});