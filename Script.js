// ═══════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════
const CONSTANTS = { pi: Math.PI, e: Math.E };
let variables = {};   // { name: number }
let history   = [];   // [{ id, expr, result }]

// ═══════════════════════════════════════════════
//  DOM REFS
// ═══════════════════════════════════════════════
const inputEl    = document.getElementById('expr-input');
const outputEl   = document.getElementById('output');
const varListEl  = document.getElementById('var-list');
const varErrorEl = document.getElementById('var-error');
const varNameIn  = document.getElementById('var-name');
const varValIn   = document.getElementById('var-val');
const histListEl = document.getElementById('hist-list');

// ═══════════════════════════════════════════════
//  OUTPUT  (never touches the input field)
// ═══════════════════════════════════════════════
function setOutput(text, type = 'ok') {
  outputEl.textContent = text;
  outputEl.className = 'result-value';
  if (type === 'empty') outputEl.classList.add('empty');
  if (type === 'error') outputEl.classList.add('error');
}

// ═══════════════════════════════════════════════
//  TOKENIZER
//  Strips whitespace, resolves identifiers,
//  returns array of tokens.
// ═══════════════════════════════════════════════
const FUNCS = ['sin','cos','tan','sqrt'];

function tokenize(raw) {
  const s = raw.replace(/\s+/g, '');
  if (!s) throw new Error('Empty expression');
  const tokens = [];
  let i = 0;

  // Build combined lookup: constants + user variables
  const lookup = {};
  for (const [k,v] of Object.entries(CONSTANTS)) lookup[k] = v;
  for (const [k,v] of Object.entries(variables))  lookup[k] = Number(v);

  while (i < s.length) {
    const c = s[i];

    // ── Number ──
    if (/[0-9.]/.test(c)) {
      let n = '';
      while (i < s.length && /[0-9.]/.test(s[i])) n += s[i++];
      if ((n.match(/\./g)||[]).length > 1)
        throw new Error('Invalid number "' + n + '"');
      tokens.push(Number(n));
      continue;
    }

    // ── Identifier: function / constant / variable ──
    if (/[a-z_]/i.test(c)) {
      let id = '';
      while (i < s.length && /[a-z0-9_]/i.test(s[i])) id += s[i++];
      const key = id.toLowerCase();
      if (FUNCS.includes(key))  { tokens.push(key); continue; }
      if (key in lookup)        { tokens.push(lookup[key]); continue; }
      throw new Error('Unknown identifier "' + id + '"');
    }

    // ── Operator / parenthesis ──
    if ('+-*/^()'.includes(c)) {
      const prev    = tokens[tokens.length - 1];
      const prevIsOp = typeof prev === 'string' && !FUNCS.includes(prev) && '+-*/^'.includes(prev);
      const isUnary  = tokens.length === 0 || prev === '(' || prevIsOp || prev === 'U-';
      tokens.push(c === '-' && isUnary ? 'U-' : c);
      i++;
      continue;
    }

    throw new Error('Unexpected character "' + c + '"');
  }
  return tokens;
}

// ═══════════════════════════════════════════════
//  PARSER  (Recursive Descent)
//  Precedence: AddSub < MulDiv < Pow < Unary < Primary
// ═══════════════════════════════════════════════
let T = [], P = 0;
const peek    = () => T[P];
const consume = () => T[P++];
const RAD     = Math.PI / 180;

// Round out floating-point dust (e.g. sin(180) → 0 not 1.22e-16)
function tidy(n) {
  if (!isFinite(n)) throw new Error('Result is ' + (n > 0 ? '∞' : '-∞'));
  return Math.abs(n) < 1e-10 ? 0 : parseFloat(n.toPrecision(10));
}

function parseExpr()   { return parseAddSub(); }

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

function parsePow() {         // right-associative: 2^3^2 = 2^(3^2)
  let v = parseUnary();
  if (peek() === '^') { consume(); v = Math.pow(v, parsePow()); }
  return v;
}

function parseUnary() {
  if (peek() === 'U-') { consume(); return -parseUnary(); }
  return parsePrimary();
}

function parsePrimary() {
  const t = peek();
  if (t === undefined) throw new Error('Incomplete expression — something is missing at the end');

  // Plain number (already-resolved variable / constant)
  if (typeof t === 'number') { consume(); return t; }

  // Function call
  if (FUNCS.includes(t)) {
    const fn = consume();
    if (consume() !== '(') throw new Error('Expected "(" after ' + fn);
    const arg = parseExpr();
    if (consume() !== ')') throw new Error('Expected ")" to close ' + fn + '(…)');

    if (fn === 'sqrt') {
      if (arg < 0) throw new Error('Cannot take √ of a negative number');
      return tidy(Math.sqrt(arg));
    }
    if (fn === 'tan' && Math.abs(arg % 180) === 90)
      throw new Error('tan(' + arg + '°) is undefined');
    const rad = arg * RAD;
    if (fn === 'sin') return tidy(Math.sin(rad));
    if (fn === 'cos') return tidy(Math.cos(rad));
    if (fn === 'tan') return tidy(Math.tan(rad));
  }

  // Parenthesised group
  if (t === '(') {
    consume();
    const v = parseExpr();
    if (consume() !== ')') throw new Error('Missing closing ")" — check your parentheses');
    return v;
  }

  throw new Error('Unexpected "' + t + '" in expression');
}

// ═══════════════════════════════════════════════
//  EVALUATE
// ═══════════════════════════════════════════════
function evaluate(raw) {
  const s = raw.trim();
  if (!s) return null;
  T = tokenize(s);
  P = 0;
  const result = parseExpr();
  if (P < T.length) throw new Error('Unexpected "' + T[P] + '" — check your expression');
  return tidy(result);
}

// ═══════════════════════════════════════════════
//  CALCULATE — reads input, writes output only
// ═══════════════════════════════════════════════
function calculate() {
  const raw = inputEl.value;
  if (!raw.trim()) { setOutput('—', 'empty'); return; }
  try {
    const num     = evaluate(raw);
    const display = num.toFixed(4);   // always 4 decimal places
    setOutput(display, 'ok');
    addHistory(raw, display);
  } catch (e) {
    setOutput(e.message, 'error');
  }
}

// ═══════════════════════════════════════════════
//  BUTTON → INPUT  (insert at cursor)
// ═══════════════════════════════════════════════
function insertAt(text) {
  const el  = inputEl;
  const s   = el.selectionStart ?? el.value.length;
  const e   = el.selectionEnd   ?? el.value.length;
  el.value  = el.value.slice(0, s) + text + el.value.slice(e);
  el.selectionStart = el.selectionEnd = s + text.length;
  el.focus();
  calculate();
}

function handleAC() {
  inputEl.value = '';
  setOutput('—', 'empty');
  inputEl.focus();
}

function handleBS() {
  const el = inputEl;
  const s  = el.selectionStart, e = el.selectionEnd;
  if (s !== e) {
    el.value = el.value.slice(0, s) + el.value.slice(e);
    el.selectionStart = el.selectionEnd = s;
  } else if (s > 0) {
    // Smart delete: remove whole function token if cursor is right after it
    const before = el.value.slice(0, s);
    const m = before.match(/(sqrt\(|sin\(|cos\(|tan\()$/);
    const del = m ? m[0].length : 1;
    el.value = before.slice(0, -del) + el.value.slice(e);
    el.selectionStart = el.selectionEnd = s - del;
  }
  el.focus();
  calculate();
}

function handleSign() {
  const v = inputEl.value.trim();
  if (!v) return;
  inputEl.value = (v.startsWith('-(') && v.endsWith(')')) ? v.slice(2,-1) : '-(' + v + ')';
  calculate(); inputEl.focus();
}

function handlePct() {
  const v = inputEl.value.trim();
  if (!v) return;
  inputEl.value = '(' + v + ')/100';
  calculate(); inputEl.focus();
}

// ═══════════════════════════════════════════════
//  VARIABLES
// ═══════════════════════════════════════════════
const RESERVED = new Set(['pi','e','sin','cos','tan','sqrt']);

function addVariable() {
  const name  = varNameIn.value.trim();
  const value = varValIn.value.trim();
  varErrorEl.textContent = '';

  if (!name)
    return (varErrorEl.textContent = 'Name cannot be empty');
  if (!/^[a-z_][a-z0-9_]*$/i.test(name))
    return (varErrorEl.textContent = 'Name: letters, digits, _ only; must start with a letter');
  if (RESERVED.has(name.toLowerCase()))
    return (varErrorEl.textContent = '"' + name + '" is reserved (constant or function)');
  if (!value)
    return (varErrorEl.textContent = 'Value cannot be empty');
  const num = Number(value);
  if (isNaN(num))
    return (varErrorEl.textContent = '"' + value + '" is not a valid number');

  variables[name.toLowerCase()] = num;
  varNameIn.value = varValIn.value = '';
  renderVarList();
  calculate();
  varNameIn.focus();
}

function deleteVar(name) {
  delete variables[name];
  renderVarList();
  calculate();
}

function renderVarList() {
  const keys = Object.keys(variables);
  if (!keys.length) {
    varListEl.innerHTML = '<div class="empty-msg">No variables yet</div>';
    return;
  }
  varListEl.innerHTML = keys.map(k => `
    <div class="var-row" title="Click to insert '${esc(k)}'" onclick="insertAt('${esc(k)}')">
      <span class="var-row-name">${esc(k)}</span>
      <span class="var-row-eq">=</span>
      <span class="var-row-val">${esc(String(variables[k]))}</span>
      <button class="var-row-del" title="Delete" onclick="event.stopPropagation();deleteVar('${esc(k)}')">✕</button>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════
//  HISTORY
// ═══════════════════════════════════════════════
function addHistory(expr, result) {
  // Skip duplicate of most-recent entry
  if (history.length && history[0].expr === expr && history[0].result === result) return;
  history.unshift({ id: Date.now(), expr, result });
  if (history.length > 50) history.pop();
  renderHistory();
}

function deleteHist(id) {
  history = history.filter(h => h.id !== id);
  renderHistory();
}

function clearHistory() { history = []; renderHistory(); }

function loadHistory(expr) {
  inputEl.value = expr;
  inputEl.focus();
  calculate();
}

function renderHistory() {
  if (!history.length) {
    histListEl.innerHTML = '<div class="empty-msg">No history yet</div>';
    return;
  }
  histListEl.innerHTML = history.map(h => `
    <div class="hist-card" title="Click to reload expression"
         onclick="loadHistory(${JSON.stringify(h.expr)})">
      <div class="hist-card-expr">${esc(h.expr)}</div>
      <div class="hist-card-result">= ${esc(h.result)}</div>
      <div class="hist-card-foot">
        <button class="hist-card-del"
                onclick="event.stopPropagation();deleteHist(${h.id})">✕ remove</button>
      </div>
    </div>
  `).join('');
}

// XSS-safe HTML escaping
function esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ═══════════════════════════════════════════════
//  EVENT LISTENERS
// ═══════════════════════════════════════════════

// Live evaluation on every keystroke in the text input
inputEl.addEventListener('input', calculate);
inputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); calculate(); }
});

// Digit buttons
document.querySelectorAll('.num-btn')
  .forEach(b => b.addEventListener('click', () => insertAt(b.dataset.val)));

// All data-insert buttons (operators, sci, constants, dot, parens)
document.querySelectorAll('[data-insert]')
  .forEach(b => b.addEventListener('click', () => insertAt(b.dataset.insert)));

// Special buttons
document.getElementById('btn-ac') .addEventListener('click', handleAC);
document.getElementById('btn-bs') .addEventListener('click', handleBS);
document.getElementById('btn-sign').addEventListener('click', handleSign);
document.getElementById('btn-pct') .addEventListener('click', handlePct);
document.getElementById('btn-eq')  .addEventListener('click', calculate);

// Variable form
document.getElementById('btn-add-var').addEventListener('click', addVariable);
varNameIn.addEventListener('keydown', e => { if(e.key==='Enter') varValIn.focus(); });
varValIn .addEventListener('keydown', e => { if(e.key==='Enter') addVariable(); });

// History
document.getElementById('btn-clear-hist').addEventListener('click', clearHistory);

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════
renderVarList();
renderHistory();
inputEl.focus();