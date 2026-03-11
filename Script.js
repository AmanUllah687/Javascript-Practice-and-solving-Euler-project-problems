// ============================================================
//  CALCULATOR JAVASCRIPT — fully explained step by step
// ============================================================


// ------------------------------------------------------------
// STEP 1: GRAB THE ELEMENTS FROM THE HTML
// ------------------------------------------------------------
// Before we can do anything, we need to get references to the
// HTML elements we want to read from or update.
// document.getElementById() finds an element by its id="..."

const resultDisplay    = document.getElementById('result');      // big number display
const expressionDisplay = document.getElementById('expression'); // small history line above

// Now grab every button using their IDs or classes
const numButtons   = document.querySelectorAll('.num');   // all digit buttons (0-9)
const btnAC        = document.getElementById('btn-ac');
const btnSign      = document.getElementById('btn-sign');
const btnPercent   = document.getElementById('btn-percent');
const btnDivide    = document.getElementById('btn-divide');
const btnMultiply  = document.getElementById('btn-multiply');
const btnSubtract  = document.getElementById('btn-subtract');
const btnAdd       = document.getElementById('btn-add');
const btnDot       = document.getElementById('btn-dot');
const btnEquals    = document.getElementById('btn-eq');


// ------------------------------------------------------------
// STEP 2: SET UP STATE VARIABLES
// ------------------------------------------------------------
// "State" means the data our calculator remembers at any moment.
// We use regular variables to store this.

let currentInput  = '0';   // what the user is currently typing  e.g. "42"
let previousInput = '';    // the first number before an operator e.g. "10"
let operator      = null;  // the chosen operator: '+', '-', '*', '/'
let justCalculated = false; // did we just press '=' ? (explained later)


// ------------------------------------------------------------
// STEP 3: UPDATE THE DISPLAY
// ------------------------------------------------------------
// This is a helper function we'll call every time something
// changes. It pushes our state variables onto the screen.

function updateDisplay() {
  resultDisplay.textContent = currentInput;

  // Show "previousInput operator" in the small expression line
  // e.g. "10 +" so the user remembers what they typed before
  if (operator && previousInput !== '') {
    expressionDisplay.textContent = previousInput + ' ' + operatorSymbol(operator);
  } else {
    expressionDisplay.textContent = '';
  }
}

// Small helper: converts our internal operator symbol ('*', '/')
// into the nicer display symbol ('×', '÷')
function operatorSymbol(op) {
  if (op === '*') return '×';
  if (op === '/') return '÷';
  return op; // '+' and '-' are already fine
}


// ------------------------------------------------------------
// STEP 4: HANDLE DIGIT BUTTON CLICKS  (0 – 9)
// ------------------------------------------------------------

function handleDigit(digit) {
  // If the user just pressed '=' and now presses a digit,
  // start fresh instead of appending to the result.
  if (justCalculated) {
    currentInput = digit;
    justCalculated = false;
    updateDisplay();
    return; // stop here, don't run the rest of the function
  }

  // Don't allow more than 12 digits — keeps the display tidy
  if (currentInput.replace('.', '').replace('-', '').length >= 12) return;

  // If the display is just '0', replace it with the digit.
  // Otherwise, append (stick) the digit onto the end.
  if (currentInput === '0') {
    currentInput = digit;
  } else {
    currentInput += digit;
  }

  updateDisplay();
}


// ------------------------------------------------------------
// STEP 5: HANDLE THE DECIMAL POINT ( . )
// ------------------------------------------------------------

function handleDot() {
  // If we just finished a calculation, start a new decimal number
  if (justCalculated) {
    currentInput = '0.';
    justCalculated = false;
    updateDisplay();
    return;
  }

  // Only add a dot if there isn't one already
  // e.g. we don't want "3.1.4"
  if (!currentInput.includes('.')) {
    currentInput += '.';
    updateDisplay();
  }
}


// ------------------------------------------------------------
// STEP 6: HANDLE OPERATOR BUTTONS  ( + − × ÷ )
// ------------------------------------------------------------

function handleOperator(op) {
  justCalculated = false;

  // If the user presses TWO operators in a row (e.g. 5 + then ×),
  // just swap the operator — don't calculate yet.
  if (operator && currentInput === '') {
    operator = op;
    updateDisplay();
    return;
  }

  // If there's already a pending calculation, finish it first.
  // e.g. user typed: 5 + 3 ×  → calculate 5+3=8, then set operator to ×
  if (operator && previousInput !== '') {
    calculate();
  }

  // Save what's on screen as the "first number" and store the operator
  previousInput = currentInput;
  currentInput  = '';   // clear screen so user can type the second number
  operator      = op;

  updateDisplay();
}


// ------------------------------------------------------------
// STEP 7: THE CORE CALCULATE FUNCTION
// ------------------------------------------------------------
// This is called when '=' is pressed, OR when chaining operators.

function calculate() {
  // We need both numbers and an operator to do anything
  if (operator === null || previousInput === '' || currentInput === '') return;

  const a = parseFloat(previousInput); // convert string "10" → number 10
  const b = parseFloat(currentInput);  // convert string "5"  → number 5
  let result;

  // Perform the right maths based on the stored operator
  if (operator === '+') result = a + b;
  if (operator === '-') result = a - b;
  if (operator === '*') result = a * b;
  if (operator === '/') {
    // Special case: dividing by zero is not allowed
    if (b === 0) {
      currentInput  = 'Error';
      previousInput = '';
      operator      = null;
      updateDisplay();
      return;
    }
    result = a / b;
  }

  // Floating point numbers can produce ugly results like 0.1 + 0.2 = 0.30000000000000004
  // parseFloat(result.toPrecision(10)) cleans that up neatly
  result = parseFloat(result.toPrecision(10));

  // Put the result on screen and reset the operator/previous number
  currentInput  = String(result);
  previousInput = '';
  operator      = null;
  justCalculated = true; // remember we just finished a calculation

  updateDisplay();
}


// ------------------------------------------------------------
// STEP 8: HANDLE UTILITY BUTTONS  (AC, +/−, %)
// ------------------------------------------------------------

// AC = All Clear — reset everything back to the start
function handleAC() {
  currentInput   = '0';
  previousInput  = '';
  operator       = null;
  justCalculated = false;
  updateDisplay();
}

// +/− flips the sign of the current number
// e.g. 5 → -5,  -3.2 → 3.2
function handleSign() {
  if (currentInput === '0' || currentInput === '') return;
  if (currentInput.startsWith('-')) {
    currentInput = currentInput.slice(1); // remove the leading minus
  } else {
    currentInput = '-' + currentInput;    // add a leading minus
  }
  updateDisplay();
}

// % converts the number to a percentage (divides by 100)
// e.g. 75 → 0.75
function handlePercent() {
  if (currentInput === '' || currentInput === '0') return;
  currentInput = String(parseFloat(currentInput) / 100);
  updateDisplay();
}


// ------------------------------------------------------------
// STEP 9: HIGHLIGHT THE ACTIVE OPERATOR BUTTON
// ------------------------------------------------------------
// When an operator is selected we give it a highlighted style
// so the user can see which one is active.

const opButtons = [btnDivide, btnMultiply, btnSubtract, btnAdd];

function highlightOperator(activeBtn) {
  // First remove highlight from ALL operator buttons
  opButtons.forEach(btn => btn.classList.remove('active-op'));
  // Then add it only to the one that was just pressed
  if (activeBtn) activeBtn.classList.add('active-op');
}

// Remove the highlight once a calculation is done
function clearOperatorHighlight() {
  opButtons.forEach(btn => btn.classList.remove('active-op'));
}


// ------------------------------------------------------------
// STEP 10: ATTACH EVENT LISTENERS
// ------------------------------------------------------------
// An event listener "listens" for a click and runs a function.
// We now connect every button to the right handler function.

// Digit buttons — loop through all of them and attach a click handler
numButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    handleDigit(btn.dataset.val); // dataset.val reads the data-val="..." in the HTML
  });
});

// Decimal point
btnDot.addEventListener('click', handleDot);

// Utility buttons
btnAC.addEventListener('click', () => {
  handleAC();
  clearOperatorHighlight();
});
btnSign.addEventListener('click', handleSign);
btnPercent.addEventListener('click', handlePercent);

// Operator buttons
btnDivide.addEventListener('click', () => {
  handleOperator('/');
  highlightOperator(btnDivide);
});
btnMultiply.addEventListener('click', () => {
  handleOperator('*');
  highlightOperator(btnMultiply);
});
btnSubtract.addEventListener('click', () => {
  handleOperator('-');
  highlightOperator(btnSubtract);
});
btnAdd.addEventListener('click', () => {
  handleOperator('+');
  highlightOperator(btnAdd);
});

// Equals button
btnEquals.addEventListener('click', () => {
  calculate();
  clearOperatorHighlight();
});


// ------------------------------------------------------------
// STEP 11: KEYBOARD SUPPORT  (bonus!)
// ------------------------------------------------------------
// This lets users type on their keyboard as well as click buttons.
// 'keydown' fires whenever a key is pressed.

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key >= '0' && key <= '9') handleDigit(key);
  if (key === '.')               handleDot();
  if (key === '+')             { handleOperator('+'); highlightOperator(btnAdd); }
  if (key === '-')             { handleOperator('-'); highlightOperator(btnSubtract); }
  if (key === '*')             { handleOperator('*'); highlightOperator(btnMultiply); }
  if (key === '/')             { event.preventDefault(); handleOperator('/'); highlightOperator(btnDivide); }
  if (key === 'Enter' || key === '=') { calculate(); clearOperatorHighlight(); }
  if (key === 'Escape')        { handleAC(); clearOperatorHighlight(); }
  if (key === 'Backspace') {
    // Delete the last character when Backspace is pressed
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = '0';
    }
    updateDisplay();
  }
});


// ------------------------------------------------------------
// STEP 12: INITIALISE
// ------------------------------------------------------------
// Run updateDisplay once when the page loads so the screen
// shows '0' right away instead of being blank.

updateDisplay();