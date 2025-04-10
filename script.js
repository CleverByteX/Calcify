
const display = document.getElementById('display');
const historyBox = document.getElementById('history');
let current = '';
let memory = '';

function updateDisplay(value) {
  display.textContent = value;
}

function evaluateExpression(expr) {
  try {
    const result = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(result)) throw Error("Math error");
    historyBox.innerHTML += `<div>${expr} = ${result}</div>`;
    return result;
  } catch {
    return 'Error';
  }
}

document.querySelectorAll('.number').forEach(btn => {
  btn.addEventListener('click', () => {
    current += btn.textContent;
    updateDisplay(current);
  });
});

document.querySelectorAll('.function').forEach(btn => {
  btn.addEventListener('click', () => {
    const func = btn.dataset.func;
    switch (func) {
      case 'clear': current = ''; updateDisplay('0'); break;
      case 'clearEntry': current = ''; updateDisplay('0'); break;
      case 'backspace': current = current.slice(0, -1); updateDisplay(current || '0'); break;
      case 'negate': current = current.startsWith('-') ? current.slice(1) : '-' + current; updateDisplay(current); break;
      case 'percent': current = String(parseFloat(current) / 100); updateDisplay(current); break;
      case 'square': current = String(Math.pow(parseFloat(current), 2)); updateDisplay(current); break;
      case 'sqrt': current = String(Math.sqrt(parseFloat(current))); updateDisplay(current); break;
      case '1/x': current = String(1 / parseFloat(current)); updateDisplay(current); break;
      case 'add': current += '+'; updateDisplay(current); break;
      case 'subtract': current += '-'; updateDisplay(current); break;
      case 'multiply': current += '*'; updateDisplay(current); break;
      case 'divide': current += '/'; updateDisplay(current); break;
      case 'equals':
        current = String(evaluateExpression(current));
        updateDisplay(current);
        break;
    }
  });
});

document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});
