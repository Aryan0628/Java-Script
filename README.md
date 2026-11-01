# JavaScript — Interview Revision Index

Each folder has its own `README.md` quick reference. Read them in this order:

| # | Folder | Covers |
|---|---|---|
| 1 | [01_BASICS](01_BASICS/README.md) | let/const/var, 7 primitives, stack vs heap, coercion, strings, numbers, Math, dates |
| 2 | [02_BASICS](02_BASICS/README.md) | Array methods (slice/splice), spread, flat, objects, `?.`, freeze, destructuring, JSON |
| 3 | [03_BASICS](03_BASICS/README.md) | Functions, rest, scope, hoisting, `this`, arrow functions, IIFE, execution context, call stack |
| 4 | [04_control_flow](04_control_flow/README.md) | if/else, switch, truthy/falsy, `??` vs `||`, ternary |
| 5 | [05_iterations](05_iterations/README.md) | for/while/do-while, for-of vs for-in, Map, forEach, filter, map, reduce |
| 6 | [06_dom](06_dom/README.md) | Selecting, innerText vs textContent vs innerHTML, traversal, create/edit/remove |
| 7 | [07_projects](07_projects/README.md) | Color switcher, BMI, clock, number guessing game |
| 8 | [08_events](08_events/README.md) | addEventListener, event object, bubbling/capturing, delegation, timers |
| 9 | [09_advance_01](09_advance_01/README.md) | XHR, Promises, async/await, fetch, event loop, Promise.all & co. |
| 10 | [10_classes_and_oop](10_classes_and_oop/README.md) | `new`, call/apply/bind, prototypes, classes, extends, static, getters/setters, descriptors |
| 11 | [11_fun_with_js](11_fun_with_js/README.md) | Lexical scope, closures |

---

## 🔥 Last-minute rapid fire (night before the interview)

1. `let`/`const` block scope + TDZ · `var` function scope, hoisted as `undefined`.
2. Primitives copied by value (stack) · objects shared by reference (heap).
3. `typeof null` → `"object"` · `typeof NaN` → `"number"` · `NaN !== NaN`.
4. `==` coerces, `===` doesn't · `null == undefined` is true · `null >= 0` is true.
5. 8 falsy: `false 0 -0 0n "" null undefined NaN` · `[]` and `{}` are truthy.
6. `??` only for null/undefined; `||` for any falsy.
7. `splice` mutates, `slice` doesn't · `push/pop/shift/unshift` mutate.
8. Spread & `Object.freeze` are **shallow** · deep copy → `structuredClone`.
9. Function declarations hoisted; expressions/arrows aren't.
10. Arrow functions: no own `this`, no `arguments`, can't `new`; return object → `({})`.
11. `forEach` returns `undefined` · `map` same length · `filter` subset · `reduce` one value (give initial value).
12. Arrow with `{}` needs `return`.
13. `for...of` values (iterables) · `for...in` keys (objects).
14. `querySelectorAll` → static NodeList · `getElementsBy*` → live HTMLCollection.
15. `innerText` visible · `textContent` all · `innerHTML` parses HTML (XSS).
16. Bubbling child→parent (default) · capturing parent→child · `stopPropagation` vs `preventDefault`.
17. Event delegation = one listener on parent.
18. Event loop: sync → microtasks (promises) → macrotasks (setTimeout).
19. `fetch` doesn't reject on 404 → check `response.ok` · `response.json()` is async.
20. `async` fn always returns a Promise · errors via `try/catch`.
21. `new`: create obj → link prototype → bind `this` → return.
22. `call(this, a, b)` · `apply(this, [a, b])` · `bind` returns new fn.
23. `prototype` on constructors, `__proto__` on instances · chain ends at `null`.
24. Classes = sugar over prototypes · `super()` before `this` · static not on instances.
25. Closure = function + lexical environment · `var` in loop → `3 3 3`, `let` → `0 1 2`.
