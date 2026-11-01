# 08_events — Events, Timers & Projects (Interview Quick Reference)

JS runs **sequentially (synchronously)** line by line. Events (click, keypress, mouse move, scroll) and timers are handled **asynchronously** — the browser calls your function later.

## Attaching Events

```js
el.onclick = function () {}                              // ❌ property way — only ONE handler, fewer features
el.addEventListener('click', function (e) {}, false)     // ✅ preferred — multiple handlers, control over phase
```
Old/other ways you may hear about: `attachEvent()` (old IE), jQuery `.on()`.

| `onclick` | `addEventListener` |
|---|---|
| Second assignment **overwrites** the first | Can add **many** listeners |
| No capture option | 3rd arg / options: `{ capture, once, passive }` |
| Remove: `el.onclick = null` | Remove: `removeEventListener(type, sameFnRef)` |

## The Event Object `e`
Passed automatically to the handler. Important properties:

| Category | Properties |
|---|---|
| General | `type`, `timeStamp`, `defaultPrevented` |
| Element | `target` (what was clicked), `currentTarget` (where listener is), `srcElement`, `toElement` |
| Mouse position | `clientX/Y` (viewport), `screenX/Y` (screen), `pageX/Y` (document) |
| Keyboard | `key` (`"a"`, `" "`), `code` (`"KeyA"`, `"Space"`), `keyCode` (65, **deprecated**), `altKey`, `ctrlKey`, `shiftKey` |

---

## Event Propagation (🔥 MOST asked events question)

When you click a `<li>` inside `<ul>` inside `<div>`, the event travels in 3 phases:
```
1. CAPTURING  : window → document → div → ul → li    (top → down)
2. TARGET     : li
3. BUBBLING   : li → ul → div → document → window    (bottom → up)   ← DEFAULT
```
```js
el.addEventListener('click', fn, false)  // false (default) → fires in BUBBLING phase
el.addEventListener('click', fn, true)   // true → fires in CAPTURING phase
```
- Bubbling: child's handler runs **first**, then parent's. Capturing: parent's runs first.
- **`e.stopPropagation()`** — stop the event from travelling further.
- **`e.preventDefault()`** — stop the browser's default action (link navigation `<a href>`, form submit reload). *Does not stop propagation.*

### Event Delegation
Put **one** listener on the parent, use bubbling to catch child clicks:
```js
document.querySelector('#images').addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    e.target.parentNode.remove()   // remove the clicked image's <li>
  }
})
```
✅ Fewer listeners (memory) · ✅ works for elements added later.

---

## Timers

```js
const id = setTimeout(fn, 2000)    // run ONCE after 2s, returns an id
clearTimeout(id)                   // cancel before it fires

const id2 = setInterval(fn, 1000, "hi")  // run EVERY 1s; extra args ("hi") are passed to fn
clearInterval(id2)                 // stop it
```
- Pass the **function reference** (`changeText`), not a call (`changeText()`) — a call runs immediately.
- Delay is a **minimum**, not a guarantee (callback waits for the call stack to be empty — event loop).
- `setTimeout(fn, 0)` still runs **after** current synchronous code.
- In `3.html`, `clearInterval` is called right after `setInterval` → interval never fires. Clear it from a button click instead.

---

## Projects

### 01 — Start / Stop logger
```js
let intervalId
start.addEventListener('click', () => { intervalId = setInterval(sayDate, 1000) })
stop.addEventListener('click', () => { clearInterval(intervalId) })
```
Store the id in an **outer** variable so the stop handler can reach it.

### 02 — Random Background Color (every second)
```js
const randomColor = () => {
  const hex = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) color += hex[Math.floor(Math.random() * 16)]
  return color
}
let intervalId
const start = () => { if (!intervalId) intervalId = setInterval(() => document.body.style.backgroundColor = randomColor(), 1000) }
const stop  = () => { clearInterval(intervalId); intervalId = null }
```
> 🔥 **Why `if (!intervalId)`?** Clicking Start multiple times would create multiple intervals and Stop would only clear the last one. **Why `= null` after clear?** So Start works again.

### 03 — Keyboard key-code viewer
```js
window.addEventListener('keydown', (e) => {
  insert.innerHTML = `Key: ${e.key === ' ' ? 'Space' : e.key} | KeyCode: ${e.keyCode} | Code: ${e.code}`
})
```
`keydown` fires on press (and repeats while held), `keyup` on release. Prefer `e.key` / `e.code` — `keyCode` is deprecated.

---

## ⚠️ Mistakes in your practice files
- `2.html`: `querySelecto` → `querySelector`, `clearTiemout` → `clearTimeout`, stray `cons` at the end.
- `1.html`: multiple elements with the same `id="photoshop"` — ids must be unique.
- Project `index.html` files: `<a href="_blank" href="...">` → should be `target="_blank"`.

---

## Interview One-Liners
1. **Bubbling (default) = child → parent; Capturing = parent → child** (3rd arg `true`).
2. **`stopPropagation` stops travel; `preventDefault` stops default browser action.**
3. **`e.target` vs `e.currentTarget`** — clicked element vs element holding the listener.
4. **Event delegation** — one parent listener using bubbling.
5. **`setTimeout` once, `setInterval` repeat; both return an id to clear.**
6. **Timer delay is minimum time, not exact** (event loop).
7. **`addEventListener` > `onclick`** (multiple handlers, phase control, removable).
