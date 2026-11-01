# 01_BASICS — JS Fundamentals (Interview Quick Reference)

## Variables (`let` vs `const` vs `var`)

| Keyword | Scope | Re-assign? | Re-declare? | Hoisted? | Interview Tip |
|---------|-------|-----------|-------------|----------|---------------|
| `const` | Block | ❌ | ❌ | Yes (TDZ) | **Default choice.** Objects/arrays declared with `const` can still be mutated — only the binding is immutable. |
| `let` | Block | ✅ | ❌ | Yes (TDZ) | Use when value needs to change (counters, accumulators). |
| `var` | Function | ✅ | ✅ | Yes (as `undefined`) | **Never use in modern JS.** Leaks out of `if/for` blocks. Hoisted with value `undefined` → source of silent bugs. |

> **TDZ (Temporal Dead Zone)**: `let`/`const` are hoisted but not initialized — accessing them before declaration throws `ReferenceError`. `var` is hoisted AND initialized to `undefined`.

---

## 7 Primitive Types (Stored in **Stack**, passed by **value**)

| Type | Example | `typeof` returns | Interview Gotcha |
|------|---------|-----------------|------------------|
| `number` | `42`, `3.14` | `"number"` | 64-bit float. Safe integer range: `-(2⁵³-1)` to `2⁵³-1` |
| `bigint` | `123n` | `"bigint"` | Can't mix with `number` in arithmetic without explicit conversion |
| `string` | `"hello"` | `"string"` | Immutable. Methods return new strings, never mutate. |
| `boolean` | `true/false` | `"boolean"` | Falsy values: `0, "", null, undefined, NaN, false` |
| `null` | `null` | ⚠️ `"object"` | **Classic JS bug.** `typeof null === "object"` is a historical mistake. |
| `undefined` | `undefined` | `"undefined"` | Variable declared but never assigned. |
| `symbol` | `Symbol('id')` | `"symbol"` | Always unique. `Symbol('x') !== Symbol('x')`. Used for non-colliding object keys. |

---

## Reference Types (Stored in **Heap**, passed by **reference**)

```
Arrays, Objects, Functions → all are typeof "object" (functions → "function")
```

**Why it matters in interviews:**
```js
let a = { name: "aryan" };
let b = a;          // b points to SAME heap object
b.name = "changed"; // a.name is also "changed" now
```
To create an independent copy → **Shallow**: `{...obj}` or `Object.assign()` | **Deep**: `structuredClone(obj)`

---

## Type Coercion & Comparisons

```js
"2" == 2    // true  → loose equality converts types
"2" === 2   // false → strict equality checks type + value ← ALWAYS USE THIS
```

**`null` comparison trap (asked in interviews):**
```js
null > 0    // false   — comparison converts null → 0, but result is false
null == 0   // false   — == only equates null with undefined, nothing else
null >= 0   // true    — >= converts null → 0, and 0 >= 0 is true
```
> **Rule**: `==` treats `null` and `undefined` as equal to each other and nothing else. Comparisons (`>`, `<`, `>=`) convert `null` to `0`.

---

## Strings

**Template literals** (always prefer over concatenation):
```js
`Hello ${name}, age ${age}`   // backticks + ${}
```

**Key methods** (all return new strings, originals are immutable):
| Method | What it does | Edge case to know |
|--------|-------------|-------------------|
| `.slice(start, end)` | Extracts substring | Supports **negative indices** (`-1` = last char) |
| `.substring(start, end)` | Extracts substring | Negative values treated as `0` |
| `.trim()` | Removes whitespace both ends | `.trimStart()` / `.trimEnd()` also exist |
| `.includes(str)` | Search check | Returns `boolean`, case-sensitive |
| `.split(sep)` | String → Array | `.split('')` splits every character |
| `.replace(old, new)` | Replace first match | `.replaceAll()` for all matches |

---

## Numbers & Math

```js
num.toFixed(2)           // "100.00" → returns STRING
num.toPrecision(4)       // "123.9"  → total significant digits
num.toLocaleString('en-IN') // "10,00,000" → Indian comma format
```

```js
new Number(100)          // Number OBJECT (wrapper) — avoid; typeof → "object"
num.toString()           // "100" → then .length works
```

**Math (static object):**
```js
Math.abs(-4)      // 4
Math.round(4.3)   // 4   (4.5 → 5)
Math.ceil(4.2)    // 5   → always UP
Math.floor(4.9)   // 4   → always DOWN
Math.min(1,2,3)   // 1   | Math.max(1,2,3) → 3
Math.random()     // 0 ≤ x < 1
```

**Random number in range `[min, max]`** (very common interview question):
```js
Math.floor(Math.random() * (max - min + 1)) + min
// ⚠️ Math.floor(Math.random()) * ... is WRONG → floor(0.x) is always 0 → always gives min
```

---

## Dates

```js
new Date()              // current date-time (type: object)
Date.now()              // milliseconds since Jan 1, 1970 (Unix epoch)
Math.floor(Date.now() / 1000)  // seconds since epoch
```

> ⚠️ **Months are 0-indexed**: January = `0`, December = `11`. This is a classic off-by-one bug source.

```js
new Date(2023, 0, 23)        // Mon Jan 23 2023  (year, monthIndex, day, hour, min)
new Date("2023-01-14")       // from string (YYYY-MM-DD)
d.toString() / d.toDateString() / d.toLocaleString() / d.toLocaleDateString() / d.toLocaleTimeString()
d.getTime()                  // ms since epoch for THAT date (useful to compare dates)
d.getDay()                   // weekday 0 (Sun) – 6 (Sat)
d.getMonth() + 1             // human month number
d.toLocaleString('default', { weekday: "long" })  // "Monday" — options object customises output
```

---

## Stack vs Heap (from `datatype_summary`)

```js
let a = "hitesh"; let b = a; b = "chai"   // a unchanged → primitives COPIED (stack)
let u1 = { email: "a@x.com" }; let u2 = u1; u2.email = "b@x.com"  // u1 ALSO changed → same heap reference
```
`typeof 123n` → `"bigint"`, `typeof function(){}` → `"function"`, `typeof []` / `typeof {}` → `"object"`.

---

## ⚠️ Mistakes in your practice files
- `toLocalString` → `toLocaleString`; `console.long` → `console.log`; `anotherstring` / `mycreatedate` / `newDay` → name mismatches.
- `Math.floor(4.2)` is **4**, not 5 (comment is wrong).
- `url.replace(...)` result isn't stored — strings are immutable, `url` stays the same.
- `datatype_summary`: `bigNumbe` vs `bigNumber` → that's why it printed `undefined`; real answer is `"bigint"`.
- `01_test.js`: `accountEmail` (capital E) ≠ `accountemail` → creates an accidental global (error in strict mode).

---

## Interview One-Liners to Remember

1. **`typeof null`** → `"object"` (bug, not by design)
2. **`typeof NaN`** → `"number"` (NaN = Not a Number, but its type IS number)
3. **`NaN === NaN`** → `false` (use `Number.isNaN()` to check)
4. **`0.1 + 0.2 !== 0.3`** → floating point precision issue → use `Math.abs(a - b) < Number.EPSILON`
5. **Symbols are always unique** → `Symbol('x') !== Symbol('x')`
6. **`"use strict"`** → Prevents silent errors (e.g., assigning to undeclared variables throws error)
