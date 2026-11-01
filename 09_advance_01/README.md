# 09_advance_01 — XHR, Promises, async/await, fetch, Event Loop (Interview Quick Reference)

## Async in JS — the big picture

JS is **single-threaded & synchronous**. Slow tasks (network, timers, DB, file, crypto) are handed to the **browser / Node APIs**, and their callbacks come back through queues.

### Event Loop (🔥 must explain)
```
Call Stack  ←──  Event Loop checks: "is the stack empty?"
                     │
     ┌───────────────┴───────────────┐
Microtask Queue (HIGH priority)   Task / Callback Queue
- Promise .then/.catch/.finally   - setTimeout / setInterval
- await continuations             - DOM events (click, keydown)
- queueMicrotask                  - XHR callbacks
```
**Order:** all synchronous code → **all** microtasks → one macrotask → all microtasks → ...
```js
console.log(1)
setTimeout(() => console.log(2), 0)
Promise.resolve().then(() => console.log(3))
console.log(4)
// 1, 4, 3, 2
```
> That's why the `fetch().then()` result can show up before `setTimeout`-based logs — promise callbacks sit in the higher-priority microtask queue.

---

## XMLHttpRequest (old way, still asked)

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://api.github.com/users/hiteshchoudhary')
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    const data = JSON.parse(this.responseText)   // response is a STRING → parse it
    console.log(data.followers)
  }
}
xhr.send()     // actually sends the request
```
| `readyState` | Name | Meaning |
|:-:|---|---|
| 0 | UNSENT | created, `open()` not called |
| 1 | OPENED | `open()` called |
| 2 | HEADERS_RECEIVED | `send()` called, headers + status available |
| 3 | LOADING | downloading, partial data |
| 4 | DONE | complete |

> `this.responseText.followers` → `undefined` because it's a string. **API data comes as string → `JSON.parse()`** to get an object. `JSON.stringify()` does the reverse.

---

## Promises

A **Promise** = object representing the eventual completion or failure of an async operation.

**States:** `pending` → `fulfilled` (resolve) **or** `rejected` (reject). Once settled, it never changes.

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const error = false
    if (!error) resolve({ username: "chai" })   // value goes to .then
    else reject('ERROR: Something went wrong')  // reason goes to .catch
  }, 1000)
})

p.then((user) => user.username)         // returned value → next .then
 .then((name) => console.log(name))     // "chai"
 .catch((err) => console.log(err))      // handles rejection from ANY step above
 .finally(() => console.log("either resolved or rejected"))  // always runs
```
| | Connected to |
|---|---|
| `.then` | `resolve(value)` |
| `.catch` | `reject(reason)` or any thrown error |
| `.finally` | always, no arguments |

### 🔥 Classic mistake
```js
const username = p.then(user => user.username)
console.log(username)    // Promise { <pending> } — NOT the string!
```
A value returned inside `.then` is only available in the **next `.then`** (or via `await`). `.then` always returns a **new promise** → that's what makes chaining work.

---

## async / await (cleaner syntax over promises)

```js
async function consume() {
  try {
    const response = await p        // pauses THIS function until p settles
    console.log(response)
  } catch (error) {                 // rejection lands here
    console.log(error)
  }
}
```
- `async` function **always returns a Promise**.
- `await` only inside `async` functions (or top-level in ES modules).
- **No `try/catch` → rejected promise = unhandled error.** `.then` style uses `.catch`; `await` style uses `try/catch`.

---

## fetch

```js
// async/await
async function getAllUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()   // .json() is ALSO async → await it
    console.log(data)
  } catch (e) { console.log("E:", e) }
}

// .then
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
```

### 🔥 fetch only rejects on NETWORK errors
404 / 500 **do NOT reject** — the promise resolves with `response.ok === false`. Always check:
```js
if (!response.ok) throw new Error(`HTTP ${response.status}`)
```

**How fetch works internally (lecture):** calling `fetch()` does two things at once → (1) reserves memory for the response data with hidden `onFulfilled[]` / `onRejection[]` arrays, (2) starts the network request via browser/Node API. When the response arrives, data fills in and the queued functions run through the **microtask queue**.

---

## Promise combinators (not in your files, but frequently asked)
| Method | Resolves when | Rejects when |
|---|---|---|
| `Promise.all([..])` | **all** fulfil → array of values | **first** rejection |
| `Promise.allSettled([..])` | all settle → `[{status, value/reason}]` | never |
| `Promise.race([..])` | first to **settle** (either way) | first to settle is a rejection |
| `Promise.any([..])` | first to **fulfil** | all reject (`AggregateError`) |

**Callback hell** → nested callbacks inside callbacks (pyramid of doom) → Promises / async-await solve it.

---

## Interview One-Liners
1. **Promise states: pending → fulfilled / rejected** (settled = done, immutable).
2. **Microtasks (promises) run before macrotasks (setTimeout)**, after sync code.
3. **`.then` returns a new promise** → you can't pull the value out synchronously.
4. **`async` fn always returns a promise; handle errors with `try/catch`.**
5. **`fetch` doesn't reject on 404/500 — check `response.ok`.**
6. **`response.json()` is async** — needs `await`/`.then`.
7. **API responses are strings → `JSON.parse`.**
8. **XHR `readyState` 4 = DONE.**
