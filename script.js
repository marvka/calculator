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
function numButton(event) {
  let buttonNumber = event.target.textContent;
  numBuffer += buttonNumber;
  display.textContent += buttonNumber;
}
function equalsButton(event) {}
function clearButton(event) {
  num1 = '';
  num2 = '';
  numBuffer = '';
  operator = '';
  display.textContent = '';
}
function operatorButton(event) {
  // Allow negative number in numBuffer
  if (!numBuffer && !display.textContent && event.target.textContent == '-') {
    numBuffer += '-';
    display.textContent += '-';
  }
  // Change operator if already exists
  if (numBuffer == '' && isOperator(display.textContent.charAt(operatorIndex()))
  ) {
    let output = display.textContent.split('');
    output[operatorIndex()] = event.target.textContent;
    display.textContent = output.join('');
    operator = event.target.textContent;
  } else if (!numBuffer) {
      return;
  } // If there's no operator yet and only the first number entered by user
    else if (numBuffer && !num1 && !operator) {
      num1 = numBuffer;
      numBuffer = '';
      operator = event.target.textContent;
      display.textContent += ` ${operator} `;
  } else if (numBuffer && num1 !== '' && !num2) {
      num2 = numBuffer;
      num1 = operate(operator, num1, num2);
      numBuffer = '';
      num2 = '';
      operator = event.target.textContent;
      display.textContent = `${num1} ${operator} `;
  }
}
function dotButton(event) {
  if (numBuffer.includes('.')) {
    return;
  } else {
    numBuffer += '.';
    display.textContent += '.';
  }
}

// Main code
let num1,
  num2,
  numBuffer = '',
  operator;
let buttons = document.querySelectorAll('button');
let display = document.querySelector('#display');

buttons.forEach((button) => {
  if (isNumber(button.textContent)) {
    button.addEventListener('click', numButton);
  } else if (button.textContent === '=') {
    button.addEventListener('click', equalsButton);
  } else if (button.textContent === 'Clear') {
    button.addEventListener('click', clearButton);
  } else if (isOperator(button.textContent)) {
    button.addEventListener('click', operatorButton);
  } else if (button.textContent === '.') {
    button.addEventListener('click', dotButton);
  }
});
