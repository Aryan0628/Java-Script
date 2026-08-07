# 02_BASICS — Arrays & Objects (Interview Quick Reference)

## Arrays

Arrays in JS are **resizable**, **not type-fixed**, and **zero-indexed**. Under the hood they are objects (so `typeof [] === "object"`).

### Mutating vs Non-Mutating Methods (🔥 Top Interview Question)

| Method | Mutates Original? | What it does |
|--------|:-:|---|
| `.push(el)` | ✅ | Add to **end** |
| `.pop()` | ✅ | Remove from **end** |
| `.unshift(el)` | ✅ | Add to **start** (slow — shifts all indices) |
| `.shift()` | ✅ | Remove from **start** (slow — shifts all indices) |
| `.splice(start, deleteCount)` | ✅ | Remove/insert elements **in-place**, returns removed items |
| `.slice(start, end)` | ❌ | Returns shallow copy of portion, `end` is **exclusive** |
| `.concat(arr)` | ❌ | Merges arrays, returns **new** array |
| `.flat(depth)` | ❌ | Flattens nested arrays |
| `.join(sep)` | ❌ | Array → **String** |

> **`slice` vs `splice`** — most commonly asked:
> - `slice(1, 3)` → returns elements at index 1, 2 (end exclusive). Original **untouched**.
> - `splice(1, 3)` → removes 3 elements starting at index 1. Original **mutated**.

### Combining Arrays

```js
// ❌ push() nests the array inside
marvel.push(dc)       // ['thor', ['superman', 'flash']]

// ✅ concat — returns new merged array
const all = marvel.concat(dc)

// ✅✅ Spread operator — preferred, works with 2+ arrays
const all = [...marvel, ...dc, ...anime]
```

### Useful Static Methods

```js
Array.isArray("hello")           // false — checks if value is an array
Array.from("Hitesh")             // ['H','i','t','e','s','h'] — iterable → array
Array.from({name: "hi"})         // [] ← plain objects aren't iterable, gives empty array!
Array.of(100, 200, 300)          // [100, 200, 300] — values → array
```

### Flattening Nested Arrays

```js
[1, [2, 3], [4, [5, 6]]].flat(Infinity)  // [1, 2, 3, 4, 5, 6]
// Infinity flattens ALL levels. Use a number for specific depth.
```

---

## Objects

Two ways to create: **Object literal `{}`** (non-singleton) vs **`Object.create()`** (singleton, via constructor).

### Accessing Properties

```js
obj.name              // dot notation — normal keys
obj["full name"]      // bracket notation — keys with spaces/special chars
obj[mySymbol]         // bracket notation — Symbol keys (ONLY way)
```

> Symbols as keys **don't show up** in `for...in` or `Object.keys()`. Access only via `obj[symbolVar]`.

### Nested Objects & Optional Chaining (`?.`)

```js
const user = { address: { city: "Delhi" } }
user.address?.city     // "Delhi"
user.phone?.number     // undefined (no error, even though phone doesn't exist)
```
> **Why `?.` matters**: Without it, accessing `user.phone.number` would throw `TypeError`. APIs often return incomplete objects — `?.` prevents crashes.

### Freezing Objects

```js
Object.freeze(obj)    // Makes object COMPLETELY immutable (shallow)
// No additions, deletions, or modifications. Fails silently (no error).
// ⚠️ Shallow freeze only — nested objects are still mutable!
```

### Merging Objects

```js
// Object.assign — first arg is target (gets mutated)
const merged = Object.assign({}, obj1, obj2)  // {} as target = safe

// Spread — cleaner, preferred
const merged = { ...obj1, ...obj2 }
// ⚠️ Later keys overwrite earlier ones if duplicated
```

### Essential Object Methods (return arrays)

```js
Object.keys(obj)       // ["id", "name"]        → array of keys
Object.values(obj)     // ["123ab", "Aryan"]     → array of values
Object.entries(obj)    // [["id","123ab"], ["name","Aryan"]] → array of [key, value]
obj.hasOwnProperty('id')  // true — checks own (not inherited) properties
```

### Destructuring (🔥 Used everywhere in React/interviews)

```js
const { courseInstructor: instructor } = course
// Extracts course.courseInstructor and renames it to `instructor`

// With defaults:
const { price = "free" } = course

// Nested:
const { fullname: { firstname } } = user
```

### JSON (JavaScript Object Notation)

```json
{
  "name": "aryan",
  "price": "999"
}
```
- Keys **must** be double-quoted strings (unlike JS objects).
- APIs return JSON → parse with `JSON.parse(str)`, stringify with `JSON.stringify(obj)`.
- API responses can also be **arrays of objects**: `[{...}, {...}]`.

---

## Interview One-Liners

1. **`typeof []`** → `"object"` — use `Array.isArray()` to check for arrays.
2. **Spread `...` is shallow** — nested objects/arrays still share references.
3. **`Object.freeze()` is shallow** — only top-level properties are frozen.
4. **`Array.from(obj)`** only works on **iterables** (strings, sets, maps) — plain objects return `[]`.
5. **`splice` mutates, `slice` doesn't** — mnemonic: spli**C**e = **C**hanges original.
6. **Optional chaining `?.`** short-circuits to `undefined` instead of throwing — essential for API data.
