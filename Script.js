// ═══════════════════════════════════════════════════════════════
//  CALCULATOR — Full-featured Expression Parser
//  Features: text input, 4dp output, variables, constants,
//            history, exception handling, keyboard support
// ═══════════════════════════════════════════════════════════════

// ── Constants (built-in, cannot be overridden) ───────────────
const CONSTANTS = { pi: Math.PI, e: Math.E };

// ── State ────────────────────────────────────────────────────
let variables = {};   // { name: number }
let history   = [];   // [{ id, expr, result }]

// ── DOM refs ─────────────────────────────────────────────────
const inputEl   = document.getElementById('expr-input');
const outputEl  = document.getElementById('output');
const varList   = document.getElementById('var-list');
const varError  = document.getElementById('var-error');
const varNameIn = document.getElementById('var-name');
const varValIn  = document.getElementById('var-value');
const histList  = document.getElementById('history-list');

// ═══════════════════════════════════════════════════════════════
//  OUTPUT DISPLAY
//  The text input is NEVER modified by the result — they are
//  completely separate elements.
// ═══════════════════════════════════════════════════════════════
function setOutput(text, type = 'normal') {
  outputEl.textContent = text;
  outputEl.className   = 'output-result';
  if (type === 'error') outputEl.classList.add('is-error');
  if (type === 'empty') outputEl.classList.add('is-empty');
}

// ═══════════════════════════════════════════════════════════════
//  TOKENIZER
//  Converts a raw expression string into an array of tokens.
//  e.g. "2*pi+sin(x)" → [2, '*', 3.14159, '+', 'sin', '(', 5, ')']
//
//  Whitespace is stripped first (requirement §2).
//  Variables and constants are resolved to their numeric values here.
// ═══════════════════════════════════════════════════════════════
const FUNCS = ['sin', 'cos', 'tan', 'sqrt'];

function tokenize(raw) {
  const s = raw.replace(/\s+/g, '');  // strip ALL whitespace
  if (!s) throw new Error('Empty expression');
  const t = [];
  let i = 0;

  // Combine constants + user variables into one lookup table
  const lookup = {};
  Object.entries(CONSTANTS).forEach(([k, v]) => lookup[k.toLowerCase()] = v);
  Object.entries(variables).forEach(([k, v]) => lookup[k.toLowerCase()] = Number(v));

  while (i < s.length) {
    const c = s[i];

    // ── Numbers (integers and decimals) ──
    if (/[0-9.]/.test(c)) {
      let n = '';
      while (i < s.length && /[0-9.]/.test(s[i])) n += s[i++];
      if ((n.match(/\./g) || []).length > 1) throw new Error('Invalid number: "' + n + '"');
      t.push(Number(n));
      continue;
    }

    // ── Identifiers: function names, constants, or variables ──
    if (/[a-z_]/i.test(c)) {
      let n = '';
      while (i < s.length && /[a-z0-9_]/i.test(s[i])) n += s[i++];
      const nl = n.toLowerCase();
      if (FUNCS.includes(nl))  { t.push(nl); continue; }       // function
      if (nl in lookup)        { t.push(lookup[nl]); continue; } // constant or variable
      throw new Error('Unknown identifier: "' + n + '"');
    }

    // ── Operators and parentheses ──
    if ('+-*/^()'.includes(c)) {
      const prev    = t[t.length - 1];
      const afterOp = typeof prev === 'string' && !FUNCS.includes(prev) && '+-*/^'.includes(prev);
      const isUnary = t.length === 0 || prev === '(' || afterOp || prev === 'UNARY_MINUS';
      // A '-' in unary position means negation, not subtraction
      t.push(c === '-' && isUnary ? 'UNARY_MINUS' : c);
      i++;
      continue;
    }

    throw new Error('Unexpected character: "' + c + '"');
  }
  return t;
}

// ═══════════════════════════════════════════════════════════════
//  RECURSIVE DESCENT PARSER
//  Each function handles one level of operator precedence,
//  always calling the next-higher level first — this is what
//  makes BODMAS / PEMDAS work automatically.
//
//  Precedence (lowest → highest):
//    parseAddSub  →  + −
//    parseMulDiv  →  * /
//    parsePow     →  ^   (right-associative)
//    parseUnary   →  unary −
//    parsePrimary →  numbers, functions, ( )
// ═══════════════════════════════════════════════════════════════
let toks = [], pos = 0;
const peek    = () => toks[pos];
const consume = () => toks[pos++];
const DEG     = Math.PI / 180;   // degree→radian conversion factor

// Remove floating-point noise (e.g. sin(180) = 1.22e-16 → 0)
// and guard against Infinity
function cleanNum(n) {
  if (!isFinite(n)) throw new Error('Result is ' + (n > 0 ? '+Infinity' : '-Infinity'));
  return Math.abs(n) < 1e-10 ? 0 : parseFloat(n.toPrecision(10));
}

function parseAddSub() {
  let v = parseMulDiv();
  while (peek() === '+' || peek() === '-') {
    const op = consume(), r = parseMulDiv();
    v = op === '+' ? v + r : v - r;
  }
  return v;
}

function parseMulDiv() {
  let v = parsePow();
  while (peek() === '*' || peek() === '/') {
    const op = consume(), r = parsePow();
    if (op === '/' && r === 0) throw new Error('Division by zero');
    v = op === '*' ? v * r : v / r;
  }
  return v;
}

function parsePow() {       // right-associative: 2^3^2 = 2^(3^2) = 512
  let v = parseUnary();
  if (peek() === '^') { consume(); v = Math.pow(v, parsePow()); }
  return v;
}

function parseUnary() {
  if (peek() === 'UNARY_MINUS') { consume(); return -parseUnary(); }
  return parsePrimary();
}

function parsePrimary() {
  const t = peek();
  if (t === undefined) throw new Error('Incomplete expression — something is missing at the end');

  // Plain number (or already-resolved variable/constant value)
  if (typeof t === 'number') { consume(); return t; }

  // Function call: sin(…) cos(…) tan(…) sqrt(…)
  if (FUNCS.includes(t)) {
    const fn = consume();
    if (consume() !== '(') throw new Error('Expected "(" after ' + fn);
    const arg = parseAddSub();
    if (consume() !== ')') throw new Error('Expected ")" to close ' + fn + '(…)');
    if (fn === 'sqrt') {
      if (arg < 0) throw new Error('Cannot take √ of a negative number');
      return cleanNum(Math.sqrt(arg));
    }
    if (fn === 'tan' && Math.abs(arg % 180) === 90)
      throw new Error('tan(' + arg + '°) is undefined (vertical asymptote)');
    const rad = arg * DEG;   // convert degrees → radians
    if (fn === 'sin') return cleanNum(Math.sin(rad));
    if (fn === 'cos') return cleanNum(Math.cos(rad));
    if (fn === 'tan') return cleanNum(Math.tan(rad));
  }

  // Parenthesised sub-expression
  if (t === '(') {
    consume();
    const v = parseAddSub();
    if (consume() !== ')') throw new Error('Missing closing ")" — check your parentheses');
    return v;
  }

  throw new Error('Unexpected "' + t + '" in expression');
}

// ═══════════════════════════════════════════════════════════════
//  EVALUATE — main entry point
// ═══════════════════════════════════════════════════════════════
function evaluate(input) {
  const s = input.trim();
  if (!s) return null;
  toks = tokenize(s);
  pos  = 0;
  const result = parseAddSub();
  if (pos < toks.length)
    throw new Error('Unexpected "' + toks[pos] + '" — check your expression');
  return cleanNum(result);
}

// ═══════════════════════════════════════════════════════════════
//  CALCULATE & UPDATE OUTPUT
//  The text input is the single source of truth.
//  Output display is always derived from it, never overriding it.
// ═══════════════════════════════════════════════════════════════
function calculate() {
  const raw = inputEl.value;
  if (!raw.trim()) { setOutput('—', 'empty'); return; }
  try {
    const result = evaluate(raw);
    const display = result.toFixed(4);   // fixed 4 decimal places (§3)
    setOutput(display, 'normal');
    addHistory(raw, display);
  } catch (e) {
    setOutput(e.message, 'error');
  }
}

// ═══════════════════════════════════════════════════════════════
//  BUTTON → INPUT  (insert text at the current cursor position)
//  Buttons update the text input, not the output directly.
// ═══════════════════════════════════════════════════════════════
function insertAtCursor(text) {
  const el    = inputEl;
  const start = el.selectionStart ?? el.value.length;
  const end   = el.selectionEnd   ?? el.value.length;
  el.value    = el.value.slice(0, start) + text + el.value.slice(end);
  const cur   = start + text.length;
  el.selectionStart = el.selectionEnd = cur;
  el.focus();
  calculate();
}

function handleAC() {
  inputEl.value = '';
  setOutput('—', 'empty');
  inputEl.focus();
}

function handleBackspace() {
  const el    = inputEl;
  const start = el.selectionStart;
  const end   = el.selectionEnd;
  if (start !== end) {
    // Delete selected text
    el.value = el.value.slice(0, start) + el.value.slice(end);
    el.selectionStart = el.selectionEnd = start;
  } else if (start > 0) {
    // Smart backspace: remove whole function+paren token if cursor is right after it
    const before = el.value.slice(0, start);
    const m = before.match(/(sqrt\(|sin\(|cos\(|tan\()$/);
    const del = m ? m[0].length : 1;
    el.value = before.slice(0, -del) + el.value.slice(end);
    el.selectionStart = el.selectionEnd = start - del;
  }
  el.focus();
  calculate();
}

function handleSign() {
  const v = inputEl.value.trim();
  if (!v) return;
  inputEl.value = (v.startsWith('-(') && v.endsWith(')')) ? v.slice(2, -1) : '-(' + v + ')';
  calculate();
  inputEl.focus();
}

function handlePercent() {
  const v = inputEl.value.trim();
  if (!v) return;
  inputEl.value = '(' + v + ')/100';
  calculate();
  inputEl.focus();
}

// ═══════════════════════════════════════════════════════════════
//  VARIABLES
// ═══════════════════════════════════════════════════════════════
// Reserved names: constants + function names cannot be used as variables
const RESERVED = new Set(['pi', 'e', 'sin', 'cos', 'tan', 'sqrt']);

function addVariable() {
  const name  = varNameIn.value.trim();
  const value = varValIn.value.trim();
  varError.textContent = '';

  if (!name)
    return showVarError('Variable name cannot be empty');
  if (!/^[a-z_][a-z0-9_]*$/i.test(name))
    return showVarError('Name must start with a letter; only letters, digits, and _ allowed');
  if (RESERVED.has(name.toLowerCase()))
    return showVarError('"' + name + '" is a reserved name (constant or function)');
  if (!value)
    return showVarError('Value cannot be empty');
  const num = Number(value);
  if (isNaN(num))
    return showVarError('"' + value + '" is not a valid number');

  variables[name.toLowerCase()] = num;
  varNameIn.value = '';
  varValIn.value  = '';
  renderVarList();
  calculate();           // re-evaluate current expression with new variable
  varNameIn.focus();
}

function showVarError(msg) { varError.textContent = msg; }

function deleteVariable(name) {
  delete variables[name.toLowerCase()];
  renderVarList();
  calculate();
}

function insertVarName(name) { insertAtCursor(name); }

function renderVarList() {
  const keys = Object.keys(variables);
  if (!keys.length) {
    varList.innerHTML = '<div class="var-empty">No variables yet</div>';
    return;
  }
  varList.innerHTML = keys.map(k => `
    <div class="var-item" title="Click to insert '${k}'" onclick="insertVarName('${k}')">
      <span class="var-name">${escHtml(k)}</span>
      <span class="var-eq">=</span>
      <span class="var-val">${escHtml(String(variables[k]))}</span>
      <button class="var-del" title="Delete" onclick="event.stopPropagation();deleteVariable('${k}')">✕</button>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
//  HISTORY
// ═══════════════════════════════════════════════════════════════
function addHistory(expr, result) {
  // Avoid duplicate consecutive entries
  if (history.length && history[0].expr === expr && history[0].result === result) return;
  history.unshift({ id: Date.now(), expr, result });
  if (history.length > 50) history.pop();  // cap at 50 items
  renderHistory();
}

function deleteHistory(id) {
  history = history.filter(h => h.id !== id);
  renderHistory();
}

function clearHistory() {
  history = [];
  renderHistory();
}

// Load a history expression back into the text input
function loadHistory(expr) {
  inputEl.value = expr;
  inputEl.focus();
  calculate();
}

function renderHistory() {
  if (!history.length) {
    histList.innerHTML = '<div class="hist-empty">No history yet</div>';
    return;
  }
  histList.innerHTML = history.map(h => `
    <div class="hist-item" title="Click to load" onclick="loadHistory(${JSON.stringify(h.expr)})">
      <div class="hist-expr">${escHtml(h.expr)}</div>
      <div class="hist-result">= ${escHtml(h.result)}</div>
      <div class="hist-footer">
        <button class="hist-del" title="Remove" onclick="event.stopPropagation();deleteHistory(${h.id})">✕ remove</button>
      </div>
    </div>
  `).join('');
}

// Prevent XSS in dynamically rendered content
function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════════════════════
//  EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════

// Live evaluation as the user types directly
inputEl.addEventListener('input', calculate);
inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); calculate(); }
});

// Digit buttons
document.querySelectorAll('.num')
  .forEach(b => b.addEventListener('click', () => insertAtCursor(b.dataset.val)));

// All data-insert buttons (operators, sci, constants, parens, dot)
document.querySelectorAll('[data-insert]')
  .forEach(b => b.addEventListener('click', () => insertAtCursor(b.dataset.insert)));

// Special buttons
document.getElementById('btn-ac').addEventListener('click', handleAC);
document.getElementById('btn-backspace').addEventListener('click', handleBackspace);
document.getElementById('btn-sign').addEventListener('click', handleSign);
document.getElementById('btn-percent').addEventListener('click', handlePercent);
document.getElementById('btn-eq').addEventListener('click', calculate);

// Variable form
document.getElementById('btn-add-var').addEventListener('click', addVariable);
varNameIn.addEventListener('keydown', e => { if (e.key === 'Enter') varValIn.focus(); });
varValIn.addEventListener('keydown',  e => { if (e.key === 'Enter') addVariable(); });

// History clear
document.getElementById('btn-clear-hist').addEventListener('click', clearHistory);

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
renderVarList();
renderHistory();
inputEl.focus();
