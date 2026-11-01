# 07_projects — DOM Projects (Interview Quick Reference)

Four mini projects. For each one: what it does, the key code, and the concepts to explain if someone asks about it.

---

## 01 — Color Switcher
Click a color box → page background changes.

```js
const buttons = document.querySelectorAll('.button')
const body = document.querySelector('body')

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    body.style.backgroundColor = e.target.id   // id IS the color name
  })
})
```
**Concepts:** `querySelectorAll` + `forEach` → attach a listener to each button · `e.target` = the element that was clicked.
> Your file has 5 `if` blocks that all do the same thing → one line `body.style.backgroundColor = e.target.id` is enough.
> **Improvement to mention:** *event delegation* — one listener on the parent `.canvas`, check `e.target.classList.contains('button')`.

---

## 02 — BMI Calculator
Form with height (cm) + weight (kg) → shows BMI + category.

```js
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()                         // stop form from reloading the page / sending to server
  const height = parseInt(document.querySelector('#height').value)  // read INSIDE handler
  const weight = parseInt(document.querySelector('#weight').value)
  const results = document.querySelector('#results')

  if (isNaN(height) || height <= 0) results.innerHTML = 'Please give a valid height'
  else if (isNaN(weight) || weight <= 0) results.innerHTML = 'Please give a valid weight'
  else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2)
    // < 18.6 Underweight · 18.6–24.9 Normal · > 24.9 Overweight
    results.innerHTML = `<span>${bmi}</span>`
  }
})
```
**Concepts:**
- **Why read values inside the handler?** Outside, they'd be read on page load → always empty.
- **`e.preventDefault()`** — form `submit` by default reloads the page.
- **`.value` is always a string** → `parseInt` / `parseFloat` / `Number()`. `parseInt("")` → `NaN`, so check with `isNaN()`.
- **BMI formula** = weight(kg) / (height(m))² — cm → m means `/10000` for height².
- `toFixed(2)` returns a **string**.

> ⚠️ Bugs in your file: height check uses `if` and weight uses `if/else` — so when height is invalid but weight is valid, the `else` runs and overwrites the error. Make the second one `else if`. Also `height === ''` is never true after `parseInt` (it's `NaN`).

---

## 03 — Digital Clock

```js
const clock = document.getElementById('clock')
setInterval(() => {
  clock.innerHTML = new Date().toLocaleTimeString()
}, 1000)
```
**Concepts:** `setInterval(fn, ms)` repeats every `ms` · create a **new** `Date` each tick (otherwise time freezes) · `toLocaleTimeString()` → "10:45:12 AM".

---

## 04 — Number Guessing Game
Random number 1–100, 10 attempts, shows previous guesses, "too low / too high", restart.

**Structure (good to explain in interview — separate functions per job):**
| Function | Job |
|---|---|
| `validateGuess(guess)` | `isNaN`, `< 1`, `> 100` → alert; else push to `prevGuess`, check if attempts over |
| `checkGuess(guess)` | equal → win + `endGame()`; less → "too low"; greater → "too high" |
| `displayGuess(guess)` | clear input, append guess, `numGuesses++`, update remaining |
| `displayMessage(msg)` | write message into `.lowOrHi` |
| `endGame()` | disable input (`setAttribute('disabled','')`), show "Start new game" button, `playGame = false` |
| `newGame()` | reset random number, arrays, counters, `removeAttribute('disabled')`, `removeChild(p)` |

```js
let randomNumber = parseInt(Math.random() * 100 + 1)   // 1..100
submit.addEventListener('click', (e) => {
  e.preventDefault()
  validateGuess(parseInt(userInput.value))
})
```
**Concepts:** game **state** in variables (`prevGuess`, `numGuesses`, `playGame`) · `setAttribute`/`removeAttribute` for disabling · creating & removing elements dynamically · `innerHTML +=` to append text.

> ⚠️ Bugs in your file: in `newGame()` you wrote `randomnumber` (lowercase n) → creates a new global and the **real number never resets**. `remaining` shows `10 - numGuesses` but `numGuesses` starts at 1, so the count is off by one.

---

## Interview One-Liners from these projects
1. **`e.target`** = element that triggered the event (vs `e.currentTarget` = element with the listener).
2. **Always `e.preventDefault()`** on form submit when handling it with JS.
3. **Input `.value` is a string** — convert before math; validate with `isNaN`.
4. **Read input values inside the event handler**, not at page load.
5. **`setInterval` for repeating work, `setTimeout` for one-time delay.**
6. **Event delegation** — one listener on a parent instead of many on children (better performance, works for elements added later).
