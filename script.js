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
    result = divide(num1, num2);
  }

  if (result % 1 && ('' + ('' + result).match(/\d+$/)).length > 4) {
    return result.toFixed(4);
  } else {
    return result;
  }
}

// Button functionality
function clear() {
  display.textContent = '';
}
function addNumber(event) {
  display.textContent += event.target.textContent;
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
  // Can't have two operators following one another
  if (/-?[\d.]+ [-+/*] $/.test(display.textContent)) {
    let string = display.textContent.split('');
    string[string.length - 2] = event.target.textContent;
    display.textContent = string.join('');
  }

  if (/^$/.test(display.textContent) && event.target.textContent == '-') {
    display.textContent += event.target.textContent; // Add a minus if display is empty
  } else if (/^-?[\d.]+$/.test(display.textContent)) {
    display.textContent += ` ${event.target.textContent} `; // Add operator if the first number has been entered
  } else if (/^-?[\d.]+ [-+/*] [\d.]+$/.test(display.textContent)) {
    display.textContent = `${operate()} ${event.target.textContent} `; // Operate on both numbers and use result as first number
  }
}

function addDot() {
  let currentNumber = display.textContent.match(/[\d.]+$/);
  if (!currentNumber || !currentNumber.toString().match(/\./g)) {
    display.textContent += '.';
  } else {
    return;
  }
}

// Main code
let buttons = document.querySelectorAll('button');
let display = document.querySelector('#display');

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
