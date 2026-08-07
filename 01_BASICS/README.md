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

**Random number in range `[min, max]`** (very common interview question):
```js
Math.floor(Math.random() * (max - min + 1)) + min
```

---

## Dates

```js
new Date()              // current date-time (type: object)
Date.now()              // milliseconds since Jan 1, 1970 (Unix epoch)
Math.floor(Date.now() / 1000)  // seconds since epoch
```

> ⚠️ **Months are 0-indexed**: January = `0`, December = `11`. This is a classic off-by-one bug source.

---

## Interview One-Liners to Remember

1. **`typeof null`** → `"object"` (bug, not by design)
2. **`typeof NaN`** → `"number"` (NaN = Not a Number, but its type IS number)
3. **`NaN === NaN`** → `false` (use `Number.isNaN()` to check)
4. **`0.1 + 0.2 !== 0.3`** → floating point precision issue → use `Math.abs(a - b) < Number.EPSILON`
5. **Symbols are always unique** → `Symbol('x') !== Symbol('x')`
6. **`"use strict"`** → Prevents silent errors (e.g., assigning to undeclared variables throws error)
