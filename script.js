const operatorBtns = document.querySelectorAll('.operators');
const numberBtns = document.querySelectorAll('.number');
const decimalBtn = document.querySelector('.decimal');
const resultBtn = document.querySelector('.result');


const allClearBtn = document.getElementById('all-clear');
const clearBtn = document.getElementById('only-clear');


let inputField;


document.addEventListener('DOMContentLoaded', () => {
    inputField = document.getElementById('input-value');
    handleKeyboardInput();
    inputField.focus();
});

window.addEventListener('resize', handleKeyboardInput);

function handleKeyboardInput() {
    if (window.innerWidth <= 500) {
        // inputField.setAttribute('readonly', true);
        inputField.addEventListener('keydown', preventKeyboardInput);
    } else {
        // inputField.removeAttribute('readonly');
        inputField.removeEventListener('keydown', preventKeyboardInput);
    }

    inputField.focus();
}

function preventKeyboardInput(event) {
    event.preventDefault();
}

function handleInput(event) {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', '+', '-', '*', '/', '.'];
    const value = inputField.value;

    if (!validKeys.includes(event.key)) {
        event.preventDefault();
    }
    if (event.key === '.') {
        const lastPart = value.split(/[\+\-\*\/]/).pop();

        if (lastPart && !lastPart.includes('.')) {
            return;
        }
        else if (lastPart === "") {
            inputField.value += "0.";
            event.preventDefault();
        }
        else {
            event.preventDefault();
        }
    }

    if (event.key === 'Enter') {
        inputField.value = evaluate(inputField.value);
    }

    if (isOperator(event.key)) {
        console.log(value.length);
        if (value.length == 0) {
            inputField.value = "0";
        }
        else if (value.length > 0 && isOperator(value.charAt(value.length - 1))) {
            event.preventDefault();
        }
    }
}

function isOperator(key) {
    const operators = ['+', '-', '*', '/'];
    if (operators.includes(key))
        return true;
    return false;
}

function evaluate(expression) {
    let result = eval(expression);
    if (result === Infinity || result === -Infinity) {
        window.alert("Error: Cannot divide by zero");
        return "";
    }
    else {
        return result;
    }
}

numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => {
        inputField.value += numberBtn.textContent;
        inputField.focus();
    });
});

operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", () => {
        const value = inputField.value;
        if (value.length == 0) {
            inputField.value = "0" + operatorBtn.textContent;
        }
        else if (value.length > 0 && !isOperator(value.charAt(value.length - 1))) {
            inputField.value += operatorBtn.textContent;
        }
        inputField.focus();
    });
});

decimalBtn.addEventListener("click", () => {
    const value = inputField.value;
    const lastPart = value.split(/[\+\-\*\/]/).pop();

    if (lastPart && !lastPart.includes('.')) {
        inputField.value += ".";
    }
    else if (lastPart === "") {
        inputField.value += "0.";
    }
    inputField.focus();
});

allClearBtn.addEventListener("click", () => {
    inputField.value = "";
    inputField.focus();
});

clearBtn.addEventListener("click", () => {
    var currInputValue = document.getElementById('input-value').value;
    console.log(currInputValue);
    if (currInputValue.length > 0) {
        inputField.value = currInputValue.substring(0, currInputValue.length - 1);
    }
    inputField.focus();
});

resultBtn.addEventListener('click', () => {
    inputField.value = evaluate(inputField.value);
});