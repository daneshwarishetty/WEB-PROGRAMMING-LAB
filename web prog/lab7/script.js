const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");
const messageDisplay = document.getElementById("message");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  resultDisplay.textContent = formatNumber(currentInput);
  expressionDisplay.textContent = previousInput !== null && operator
    ? `${formatNumber(previousInput)} ${operator}`
    : "";
}

function formatNumber(value) {
  if (value === "Error") return value;
  const number = Number(value);
  if (!Number.isFinite(number)) return "Error";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 10
  }).format(number);
}

function showMessage(text) {
  messageDisplay.textContent = text;
}

function enterNumber(number) {
  if (currentInput === "Error" || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === "0" ? number : currentInput + number;
  }
  updateDisplay();
  showMessage("Enter a number or choose an operation.");
}

function enterDecimal() {
  if (currentInput === "Error" || shouldResetDisplay) {
    currentInput = "0.";
    shouldResetDisplay = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function chooseOperator(nextOperator) {
  if (currentInput === "Error") return;
  if (operator && !shouldResetDisplay) calculate();
  previousInput = currentInput;
  operator = nextOperator;
  shouldResetDisplay = true;
  updateDisplay();
  showMessage("Enter the next number.");
}

function calculate() {
  if (operator === null || previousInput === null) return;

  const first = Number(previousInput);
  const second = Number(currentInput);
  let answer;

  switch (operator) {
    case "+": answer = first + second; break;
    case "−": answer = first - second; break;
    case "×": answer = first * second; break;
    case "÷":
      if (second === 0) {
        currentInput = "Error";
        expressionDisplay.textContent = "Cannot divide by zero";
        previousInput = null;
        operator = null;
        shouldResetDisplay = true;
        resultDisplay.textContent = "Error";
        showMessage("Division by zero is not allowed.");
        return;
      }
      answer = first / second;
      break;
    default: return;
  }

  expressionDisplay.textContent = `${formatNumber(previousInput)} ${operator} ${formatNumber(currentInput)} =`;
  currentInput = String(Number(answer.toPrecision(12)));
  previousInput = null;
  operator = null;
  shouldResetDisplay = true;
  resultDisplay.textContent = formatNumber(currentInput);
  showMessage("Calculation complete.");
}

function clearAll() {
  currentInput = "0";
  previousInput = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
  showMessage("Cleared. Ready for a new calculation.");
}

function deleteLast() {
  if (currentInput === "Error" || shouldResetDisplay) {
    currentInput = "0";
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
    if (currentInput === "-") currentInput = "0";
  }
  updateDisplay();
}

function toggleSign() {
  if (currentInput === "0" || currentInput === "Error") return;
  currentInput = currentInput.startsWith("-")
    ? currentInput.slice(1)
    : "-" + currentInput;
  updateDisplay();
}

function percentage() {
  if (currentInput === "Error") return;
  currentInput = String(Number(currentInput) / 100);
  updateDisplay();
}

document.querySelector(".keys").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) enterNumber(button.dataset.number);
  if (button.dataset.operator) chooseOperator(button.dataset.operator);

  switch (button.dataset.action) {
    case "clear": clearAll(); break;
    case "delete": deleteLast(); break;
    case "decimal": enterDecimal(); break;
    case "equals": calculate(); break;
    case "sign": toggleSign(); break;
    case "percent": percentage(); break;
  }
});

document.addEventListener("keydown", (event) => {
  if (/^[0-9]$/.test(event.key)) enterNumber(event.key);
  else if (event.key === ".") enterDecimal();
  else if (event.key === "+") chooseOperator("+");
  else if (event.key === "-") chooseOperator("−");
  else if (event.key === "*") chooseOperator("×");
  else if (event.key === "/") {
    event.preventDefault();
    chooseOperator("÷");
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
  } else if (event.key === "Backspace") deleteLast();
  else if (event.key === "Escape") clearAll();
});

updateDisplay();
