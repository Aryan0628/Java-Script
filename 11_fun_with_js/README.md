# 11_fun_with_js — Lexical Scope & Closures (Interview Quick Reference)

## Lexical Scope
Scope is decided by **where a function is written** in the code (not where it's called).

```js
function init() {
  var name = "Mozilla"
  function displayName() {
    console.log(name)   // ✅ inner function can access outer's variables
  }
  displayName()
}
init()
```
- Inner → can access outer ✅
- Outer → can NOT access inner ❌
- Two sibling inner functions → can NOT access each other's variables ❌

```js
function outer() { let username = "hitesh" }
console.log(username)   // ❌ ReferenceError — only exists inside outer
```

---

## Closure (🔥 asked in almost every JS interview)

> **A closure is a function bundled together with its lexical environment.** When a function is returned from another function, it carries the **whole lexical scope** (outer variables) with it — not just its own code.

```js
function makeFunc() {
  const name = "Mozilla"
  function displayName() { console.log(name) }
  return displayName          // returned WITHOUT calling ()
}
const myFunc = makeFunc()     // makeFunc has finished executing...
myFunc()                      // ...but "Mozilla" is still printed — closure remembers `name`
```
Normally a function's variables are deleted after it returns (its execution context is removed). A closure keeps them **alive** because the inner function still references them.

### Practical example — function factory for click handlers
```js
// Repetitive: one handler per button
document.getElementById("orange").onclick = function () { document.body.style.backgroundColor = "orange" }
document.getElementById("green").onclick  = function () { document.body.style.backgroundColor = "green" }

// With closure: one function generates handlers
function clickHandler(color) {
  return function () {                       // remembers `color`
    document.body.style.backgroundColor = color
  }
}
document.getElementById("orange").onclick = clickHandler("orange")
document.getElementById("green").onclick  = clickHandler("green")
```
> `onclick` needs a **function**, not a result. `clickHandler("orange")` returns a function → perfect. (500 buttons? Still one function.)

---

## Must-know closure examples (common follow-ups)

### Counter / data privacy (encapsulation)
```js
function createCounter() {
  let count = 0                     // private — no outside access
  return {
    increment: () => ++count,
    getCount: () => count
  }
}
const c = createCounter()
c.increment(); c.increment()
c.getCount()   // 2
c.count        // undefined
```

### 🔥 Classic `var` in loop question
```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 100)   // 3 3 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i), 100)   // 0 1 2
```
- `var` → one shared `i` (function scope); by the time callbacks run, loop finished → `3`.
- `let` → new `i` per iteration (block scope); each callback closes over its own copy.

### Once-only function
```js
function once(fn) {
  let done = false
  return (...args) => { if (!done) { done = true; return fn(...args) } }
}
```

**Real-world uses of closures:** data privacy / module pattern · function factories · event handlers & callbacks · `setTimeout` callbacks · memoization / caching · debounce & throttle · React hooks (`useState`) rely on closures.

**Downside:** variables kept alive → more memory if closures are held unnecessarily.

---

## ⚠️ Mistakes in your practice file
- `const myfunc = makeFunc()` then `myFunc()` → ReferenceError (capital F).
- `console.log(username)` outside `outer()` → ReferenceError, stops the rest of that script.
- Last line sets the **orange** button to `clickHandler("red")` — works, but turns the page red.

---

## Interview One-Liners
1. **Closure = function + its lexical environment** (remembers outer variables after outer returns).
2. **Lexical scope = decided by where code is written**; inner sees outer, not vice versa.
3. **`var` in loop + setTimeout → same value repeated; `let` fixes it.**
4. **Closures give private variables** (counter, module pattern).
5. **Return the function, don't call it** — `return inner`, not `return inner()`.
