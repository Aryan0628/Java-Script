# 03_BASICS — Functions, Scope, `this`, Arrow, IIFE, Execution Context (Interview Quick Reference)

## Functions Basics

```js
function add(a, b) {        // a, b → PARAMETERS
  return a + b
}
add(3, 4)                    // 3, 4 → ARGUMENTS
```

| Concept | Remember |
|---|---|
| No `return` | Function returns **`undefined`** (`const r = add(1,2)` → `undefined` if you only `console.log` inside) |
| Code after `return` | Never runs |
| Missing argument | Parameter is `undefined` (no error) |
| Default param | `function login(user = "guest") {}` |

**Checking for missing input:**
```js
if (username === undefined) { ... }   // only catches undefined
if (!username) { ... }                // catches undefined, null, "" (all falsy) ← usually better
```

### Rest Operator `...` (in parameters)
```js
function calc(...nums) { return nums }       // calc(200,300,400) → [200, 300, 400]
function calc(a, b, ...nums) { return nums } // calc(200,400,500,2000) → [500, 2000]
```
> Same `...` symbol: **Rest** = collects into array (function params). **Spread** = expands array/object (`[...arr]`, `{...obj}`). Rest param must be **last**.

### Passing Objects & Arrays
```js
function handleObject(obj) { console.log(`${obj.username} ${obj.price}`) }
handleObject(user)                          // pass variable
handleObject({ username: "sam", price: 99 }) // or pass object literal directly
```
> ⚠️ Typo in a key (`prcie`) → `obj.price` is `undefined`, no error. Objects/arrays are passed by **reference**, so mutating them inside the function changes the original.

---

## Scope

| Scope | Created by | `let`/`const` | `var` |
|---|---|:-:|:-:|
| Global | top of file | ✅ visible everywhere | ✅ |
| Function | `function(){}` | ✅ stays inside | ✅ stays inside |
| Block | `{}` of `if`, `for`, `while` | ✅ stays inside | ❌ **leaks out** |

```js
if (true) { let a = 10; const b = 20; var c = 30 }
console.log(a) // ReferenceError
console.log(b) // ReferenceError
console.log(c) // 30  ← var ignores block scope → why we avoid var
```

**Lexical (nested) scope** — inner can see outer, outer can NOT see inner:
```js
function one() {
  const username = "aryan"
  function two() {
    const website = "youtube"
    console.log(username)  // ✅ child accesses parent
  }
  console.log(website)     // ❌ ReferenceError — parent can't access child
  two()
}
```
> Siblings can't see each other's variables either. This "child sees parent" rule is the foundation of **closures** (see `11_fun_with_js`).

---

## Hoisting (🔥 Very common)

```js
addOne(5)                          // ✅ 6 — function DECLARATION is fully hoisted
function addOne(n) { return n + 1 }

addTwo(5)                          // ❌ ReferenceError: Cannot access 'addTwo' before initialization
const addTwo = function (n) { return n + 2 }   // function EXPRESSION — follows const/let rules (TDZ)
```

| Declared with | Hoisted? | Value before declaration line |
|---|---|---|
| `function foo(){}` | ✅ fully | the whole function (callable) |
| `var x` | ✅ | `undefined` |
| `var foo = function(){}` | ✅ (as var) | `undefined` → calling it = `TypeError: foo is not a function` |
| `let` / `const` (incl. arrow/expressions) | ✅ but in **TDZ** | `ReferenceError` |

---

## `this` Keyword

`this` = the **current context** (the object that is calling the function).

```js
const user = {
  username: "hitesh",
  welcome: function () { console.log(`${this.username}, welcome`) }
}
user.welcome()          // hitesh, welcome
user.username = "sam"
user.welcome()          // sam, welcome  ← this reads the CURRENT value
```

| Where | `this` is |
|---|---|
| Inside object method (`obj.fn()`) | that object |
| Top-level in **Node** (CommonJS file) | `{}` (empty `module.exports`) |
| Top-level in **browser** | `window` |
| Regular function called plainly `fn()` | global object (non-strict) / `undefined` (strict mode) → `this.username` is `undefined` |
| Arrow function | **No own `this`** — borrows from surrounding (lexical) scope |
| With `new` | the newly created object |
| Event listener (regular fn) | the element that has the listener |

---

## Arrow Functions

```js
const add = (a, b) => { return a + b }    // explicit return (braces → must write return)
const add = (a, b) => a + b               // implicit return (no braces)
const add = (a, b) => (a + b)             // implicit return (parentheses ok)
const getUser = () => ({ username: "hitesh" })  // returning an OBJECT → wrap in ()
```
> ⚠️ `() => { username: "hitesh" }` returns **`undefined`** — JS reads `{}` as the function body, not an object.

**Arrow vs Regular function (interview table):**

| | Regular | Arrow |
|---|---|---|
| Own `this` | ✅ (depends on how called) | ❌ (lexical) |
| `arguments` object | ✅ | ❌ (use `...args`) |
| Can use with `new` | ✅ | ❌ |
| Hoisted | ✅ if declaration | ❌ (it's a `const`/`let` expression) |
| Good for object methods | ✅ | ❌ (`this` won't be the object) |
| Good for callbacks (`map`, `forEach`, `setTimeout`) | ok | ✅ |

`forEach` syntax: `arr.forEach((item, index, array) => { ... })`

---

## IIFE — Immediately Invoked Function Expression

```js
(function chai() { console.log("DB CONNECTED") })();        // named IIFE
((name) => { console.log(`DB CONNECTED ${name}`) })("hitesh"); // arrow IIFE with argument
```
- **Why**: runs immediately + creates its own scope → avoids **global scope pollution**. Common for DB connection or init code.
- ⚠️ **End each IIFE with `;`** — otherwise the next `(` is read as calling the previous one → error.
- Syntax: `( function definition )( call )`.

---

## How JavaScript Executes Code (Execution Context + Call Stack)

JS is **single-threaded** and runs code inside an **Execution Context**.

**Types:** Global Execution Context (one, `this` = global) → Function Execution Context (new one on every call) → (Eval context).

**Every context runs in 2 phases:**
1. **Memory Creation Phase** — scans code, allocates memory: `var` → `undefined`, functions → full definition, `let/const` → uninitialized (TDZ). *(This is why hoisting exists.)*
2. **Execution Phase** — runs line by line, assigns values, calls functions.

**Each function call** → new execution context (own memory + execution thread) → after `return`, context is **deleted**.

**Call Stack (LIFO):**
```
one() calls two() calls three()
Stack: [Global] → [Global, one] → [Global, one, two] → [.., three] → pops back as each returns
```
> Too much recursion → **"Maximum call stack size exceeded"** (stack overflow).

---

## ⚠️ Mistakes in your practice files (don't repeat in interview)
- `undefinded` → typo, should be `undefined` (would throw ReferenceError).
- `03_arrow.js` re-declares `function chai` and then `const chai` → **SyntaxError: Identifier 'chai' has already been declared**. (Run each example separately.)
- `array.forEach(...)` at the end — `array` isn't defined; it's just the syntax reference.

---

## Interview One-Liners
1. **Function declarations are hoisted; function expressions & arrows are not** (TDZ / `undefined`).
2. **No `return` → `undefined`.**
3. **`var` is function-scoped, `let`/`const` are block-scoped.**
4. **Arrow functions don't have their own `this` or `arguments`** — never use them as object methods.
5. **Returning an object from an arrow implicitly → wrap in `()`.**
6. **IIFE = run immediately + private scope**; always end with `;`.
7. **Every function call creates a new execution context**; call stack is LIFO.
8. **Rest (`...args`) collects, Spread (`...arr`) expands.**
