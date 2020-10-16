// Basic calculating functions
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  return num1 / num2;
}
function operate() {
  let num1 = +display.textContent.match(/^-?[\d.]+/);
  let num2 = +display.textContent.match(/[\d.]+$/);
  let operator = display.textContent.match(
    /(?:^-?[\d.]+ )([-+/*])(?: [\d.]+)/
  )[1];
  let result;

  if (operator === '+') {
    result = add(num1, num2);
  } else if (operator === '-') {
    result = subtract(num1, num2);
  } else if (operator === '*') {
    result = multiply(num1, num2);
  } else if (operator === '/') {
    if (!num2) {
      divideByZeroError = true;
      return "Can't divide by zero";
    }
    result = divide(num1, num2);
  }

  if (result % 1 && ('' + ('' + result).match(/\d+$/)).length > 4) {
    return result.toFixed(4);
  } else {
    return result;
  }
}

// Helper functions
function setKey(event) {
  if (event.key) {
    return event.key;
  } else {
    return event.target.textContent;
  }
}

// Button functionality
function clear() {
  display.textContent = '';
}
function addNumber(event) {
  let key = setKey(event);
  if (divideByZeroError) {
    display.textContent = key;
    divideByZeroError = false;
  } else {
    display.textContent += key;
  }
}
function equals() {
  if (/^-?\d+ [-+/*] $/.test(display.textContent)) {
    display.textContent = display.textContent.substring(
      0,
      display.textContent.length - 3
    );
  } else if (/^-?[\d.]+ [-+/*] [\d.]+$/.test(display.textContent)) {
    display.textContent = operate();
  }
}
function addOperator(event) {
  let key = setKey(event);

  if (divideByZeroError && key === '-') {
    display.textContent = key;
    divideByZeroError = false;
  } else if (divideByZeroError) {
    return;
  }
  // Can't have two operators following one another
  if (/-?[\d.]+ [-+/*] $/.test(display.textContent)) {
    let string = display.textContent.split('');
    string[string.length - 2] = key;
    display.textContent = string.join('');
  }

  if (/^$/.test(display.textContent) && key == '-') {
    display.textContent += key; // Add a minus if display is empty
  } else if (/^-?[\d.]+$/.test(display.textContent)) {
    display.textContent += ` ${key} `; // Add operator if the first number has been entered
  } else if (/^-?[\d.]+ [-+/*] [\d.]+$/.test(display.textContent)) {
    display.textContent = `${operate()} ${key} `; // Operate on both numbers and use result as first number
  }
}
function addDot() {
  let currentNumber = display.textContent.match(/[\d.]+$/);
  if (divideByZeroError) {
    display.textContent = '.';
    divideByZeroError = false;
  } else if (!currentNumber || !currentNumber.toString().match(/\./g)) {
    display.textContent += '.';
  } else {
    return;
  }
}

// Main code
let buttons = document.querySelectorAll('button');
let display = document.querySelector('#display');
let divideByZeroError = false;

buttons.forEach((button) => {
  if (/[0-9]/.test(button.textContent)) {
    button.addEventListener('click', addNumber);
  } else if (button.textContent === '=') {
    button.addEventListener('click', equals);
  } else if (button.textContent === 'Clear') {
    button.addEventListener('click', clear);
  } else if (/[-+/*]/.test(button.textContent)) {
    button.addEventListener('click', addOperator);
  } else if (button.textContent === '.') {
    button.addEventListener('click', addDot);
  }
});

window.addEventListener('keydown', (e) => {
  if (/[0-9]/.test(e.key)) {
    addNumber(e);
  } else if (/=|(Enter)/.test(e.key)) {
    equals();
  } else if (/[-+/*]/.test(e.key)) {
    addOperator(e);
  } else if (/\./.test(e.key)) {
    addDot();
  } else if (/(Backspace)/.test(e.key)) {
    if (display.textContent.charAt(display.textContent.length - 1) == ' ') {
      display.textContent = display.textContent.substring(
        0,
        display.textContent.length - 3
      );
    } else {
      display.textContent = display.textContent.substring(
        0,
        display.textContent.length - 1
      );
    }
  }
  console.log(e.key);
});
