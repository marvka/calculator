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
function operate(operator, num1, num2) {
  num1 = +num1;
  num2 = +num2;
  switch (operator) {
    case '+':
      return add(num1, num2);
      break;
    case '-':
      return subtract(num1, num2);
      break;
    case '*':
      return multiply(num1, num2);
      break;
    case '/':
      return divide(num1, num2);
      break;
    default:
      return 'Error';
  }
}

// Function to check type of value
function isOperator(value) {
  return /[-+/*]/.test(value);
}
function isNumber(value) {
  return /[0-9]/.test(value);
}

// Helper functions
function operatorIndex() {
  return display.textContent.length - 2;
}

// Button functionality
function clear() {
  display.textContent = '';
}

// Main code
let buttons = document.querySelectorAll('button');
let display = document.querySelector('#display');

buttons.forEach((button) => {
  if (isNumber(button.textContent)) {
    button.addEventListener('click', numButton);
  } else if (button.textContent === '=') {
    button.addEventListener('click', equalsButton);
  } else if (button.textContent === 'Clear') {
    button.addEventListener('click', clear);
  } else if (isOperator(button.textContent)) {
    button.addEventListener('click', operatorButton);
  } else if (button.textContent === '.') {
    button.addEventListener('click', dotButton);
  }
});
