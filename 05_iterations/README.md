# 05_iterations — Loops, Map, forEach, filter, map, reduce (Interview Quick Reference)

## Classic Loops

```js
for (let i = 0; i < 10; i++) { }             // for
for (let i = 1; i <= 10; i++)                 // nested → multiplication table
  for (let j = 1; j <= 10; j++) console.log(`${i}*${j}=${i*j}`)

let i = 0
while (i <= 10) { i += 2 }                    // while — checks condition FIRST

let score = 11
do { console.log(score); score++ } while (score <= 10)  // prints 11 once!
```
> **`do...while` runs at least once** — body first, condition later.

### `break` vs `continue`
| | Effect |
|---|---|
| `break` | **Exits** the loop completely (at 5 → stops, 6..20 never print) |
| `continue` | **Skips** this iteration only (5 skipped, 6..20 still print) |

---

## `for...of` — iterate **values** of iterables

```js
for (const num of [1, 2, 3]) {}          // 1, 2, 3
for (const ch of "Hello") {}             // H, e, l, l, o
for (const [key, value] of map) {}       // Map entries (destructured)
for (const [key, value] of myObject) {}  // ❌ TypeError: myObject is not iterable
```
**Iterables:** Array, String, Map, Set, NodeList, arguments. **NOT iterable:** plain objects.
Object fix → `for (const [k, v] of Object.entries(obj)) {}`

## `for...in` — iterate **keys** of objects

```js
const obj = { js: "javascript", cpp: "c++" }
for (const key in obj) console.log(`${key} → ${obj[key]}`)

for (const key in ["js","ruby","py"]) console.log(key)   // "0","1","2" — INDICES (as strings)
for (const key in map) {}                                 // prints NOTHING for a Map
```

### `for...of` vs `for...in` (🔥 frequent)
| | `for...of` | `for...in` |
|---|---|---|
| Gives | **values** | **keys** (property names / indices as strings) |
| Works on | iterables (array, string, Map, Set) | objects (and arrays, but not recommended) |
| Plain object | ❌ error | ✅ |
| Map | ✅ `[key, value]` | ❌ nothing |
| Also walks inherited (prototype) keys | — | ✅ (gotcha) |

---

## Map (data structure)

```js
const map = new Map()
map.set('IN', 'INDIA')
map.set('USA', 'United States')
map.set('IN', 'INDIA')        // duplicate key → overwritten, keys are UNIQUE
map.get('IN')  map.has('IN')  map.delete('IN')  map.size
```
| Map | Object |
|---|---|
| Keys can be **any type** (objects, functions) | Keys are strings/symbols |
| **Remembers insertion order** | Mostly ordered, but integer keys sorted first |
| Iterable with `for...of` | Not directly iterable |
| `.size` | `Object.keys(o).length` |

---

## `forEach`

```js
coding.forEach(function (item) { console.log(item) })
coding.forEach((item) => console.log(item))
coding.forEach(printMe)                        // pass function reference (no ())
coding.forEach((item, index, arr) => {})       // all 3 callback params
myCoding.forEach((item) => console.log(item.languageName))  // array of objects
```
- **Returns `undefined`** → `const values = arr.forEach(...)` is always `undefined`.
- **Cannot `break`** out of forEach (`return` inside only skips current item, like `continue`).

---

## `filter` — keep items where callback returns `true`

```js
nums.filter((n) => n > 4)               // [5..10] ✅ implicit return
nums.filter((n) => { n > 4 })           // [] ❌ braces = new scope, no return → undefined → falsy
nums.filter((n) => { return n > 4 })    // [5..10] ✅
```
> 🔥 **If you use `{}` you MUST write `return`.**

Real-world: filter books by genre / year → `books.filter(b => b.genre === "History")`.

## `map` — transform every item, returns new array of **same length**

```js
nums.map((n) => n + 10)
nums.map((n) => { return n + 10 })
```

### Chaining
```js
nums.map(n => n * 10).map(n => n + 1).filter(n => n >= 40)
```
Each step returns a new array → next method runs on it.

## `reduce` — boil array down to **one value**

```js
arr.reduce((acc, curr) => acc + curr, 0)    // 0 = initial value of acc
// [1,2,3]: acc=0,curr=1 → 1 ; acc=1,curr=2 → 3 ; acc=3,curr=3 → 6

cart.reduce((acc, item) => acc + item.price, 0)  // shopping cart total
```
- **Always pass the initial value** — without it, `acc` = first element (breaks with objects: you'd add an object + number), and an empty array throws **TypeError**.

---

## Which one to use? (🔥 "forEach vs map" asked a lot)
| Method | Returns | Mutates original? | Use for |
|---|---|:-:|---|
| `forEach` | `undefined` | ❌ | side effects (logging, DOM updates, pushing) |
| `map` | new array, same length | ❌ | transform each item |
| `filter` | new array, ≤ length | ❌ | select items |
| `reduce` | any single value | ❌ | sum, count, group, flatten |
| `for` / `for...of` | — | — | when you need `break`/`continue`/`await` |

---

## ⚠️ Mistakes in your practice files
- `01.js`: `console.log(\`Value of is ${index}\`)` → should be `${i}`; `constinue` → `continue`.
- `02.js`: `array[index]` → should be `array[arr]`.
- `05.js`: `console.log(val)` → should be `item`; `item.languagename` vs key `langaugename` (typo mismatch → `undefined`).
- `06.js`: `newnums4.push` → should be `newnums4.push(num)`; then log `newnums4`.

---

## Interview One-Liners
1. **`forEach` returns `undefined`**, can't `break`.
2. **`map` → same length; `filter` → subset; `reduce` → single value.**
3. **Arrow with `{}` needs `return`** — #1 cause of empty `filter` / `undefined` `map` results.
4. **`for...of` = values (iterables), `for...in` = keys (objects).** Plain objects aren't iterable.
5. **Map keys are unique**, any type, insertion-ordered.
6. **`do...while` executes at least once.**
7. **Give `reduce` an initial value.**
