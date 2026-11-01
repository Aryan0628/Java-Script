# 04_control_flow — if/else, switch, Truthy/Falsy, `??`, Ternary (Interview Quick Reference)

## if / else if / else

```js
if (2 == "2")  { }  // ✅ runs   — == converts types
if (2 === "2") { }  // ❌ skipped — === checks type + value

if (balance < 500) { ... }
else if (balance < 750) { ... }
else { ... }
```
Operators: `<  >  <=  >=  ==  !=  ===  !==` → **always prefer `===` / `!==`**.

**Logical operators:** `&&` (all true), `||` (any true), `!` (not).
```js
if (loggedIn && debitCard) {}      // both needed
if (loggedIn || loggedInFromGoogle) {}  // either one
```

> ⚠️ Shorthand without braces only covers **one statement**: `if (x) a(); b();` → `b()` ALWAYS runs. Writing `if (x) a(), b();` (comma) makes it one statement but is unreadable — **always use `{}`**.

---

## switch

```js
switch (month) {
  case 1: console.log("January"); break;
  case 3: console.log("March");   break;
  default: console.log("default"); break;
}
```
| Point | Detail |
|---|---|
| Comparison | **strict (`===`)** → `case "3"` won't match `3` |
| No `break` | **Fall-through** — all cases below the match also run (until a break), *including* `default` |
| `default` | Runs when nothing matches; can be placed anywhere |
| Use when | One variable compared against many fixed values |

---

## Truthy & Falsy (🔥 Must memorise)

**Falsy (only 8):** `false`, `0`, `-0`, `0n` (BigInt), `""`, `null`, `undefined`, `NaN`

**Everything else is truthy**, including the traps:
`"0"`, `"false"`, `" "` (space string), `[]` (empty array), `{}` (empty object), `function(){}`

```js
if (userEmail) { "got" } else { "don't have" }   // "" → falsy → else
```

### Checking empty array / object
```js
if (arr.length === 0) { /* empty array */ }               // [] itself is truthy!
if (Object.keys(obj).length === 0) { /* empty object */ } // {} itself is truthy!
```

### Weird `==` results (asked to test coercion knowledge)
```js
false == 0      // true
false == ''     // true
0 == ''         // true
null == undefined // true
null == 0       // false
NaN == NaN      // false
[] == false     // true  (but [] is truthy in if!)
```
> Moral: `==` coerces types unpredictably → **use `===`**.

---

## Nullish Coalescing `??`

Returns the right side **only when left is `null` or `undefined`**.
```js
5 ?? 10              // 5
null ?? 10           // 10
undefined ?? 15      // 15
null ?? 10 ?? 20     // 10  (first non-null/undefined value)
0 ?? 10              // 0   ← 0 is NOT null/undefined
```

### `??` vs `||` (🔥 interview favourite)
| Expression | `||` result | `??` result |
|---|---|---|
| `0 ___ 10` | `10` | `0` |
| `"" ___ "default"` | `"default"` | `""` |
| `null ___ 10` | `10` | `10` |
| `undefined ___ 10` | `10` | `10` |

> `||` falls back on **any falsy** value. `??` falls back **only on null/undefined** → safer when `0` or `""` are valid values (e.g. score = 0, from API/DB).

---

## Ternary Operator

```js
condition ? valueIfTrue : valueIfFalse

const price = 100
price >= 80 ? console.log("more than 80") : console.log("less than 80")
const label = age >= 18 ? "adult" : "minor"   // best use: choosing a value
```
> Avoid nesting ternaries — use `if/else` for readability.

---

## ⚠️ Mistakes in your practice files
- `false=''` → that's **assignment** (SyntaxError), meant `false == ''`.
- `undefinded` / `nul` → typos (ReferenceError).
- `userEmail.length === 0` comment says "Array is empty" — it's checking a **string**.
- Ternary messages reversed: `price >= 80` should print "more than 80".
- `switch(key){ case value: ... }` at the top is just the syntax template — `key`/`value` don't exist.

---

## Interview One-Liners
1. **8 falsy values** — `false, 0, -0, 0n, "", null, undefined, NaN`. Everything else truthy.
2. **`[]` and `{}` are truthy** — check `.length` / `Object.keys().length`.
3. **`switch` uses `===`** and **falls through** without `break`.
4. **`??` only for null/undefined; `||` for any falsy.**
5. **`if` without braces covers only one statement.**
