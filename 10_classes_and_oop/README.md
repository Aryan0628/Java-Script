# 10_classes_and_oop — OOP, Prototypes, Classes, call/bind, Getters/Setters (Interview Quick Reference)

**JS is a prototype-based language.** Classes (ES6) are **syntactic sugar** over constructor functions + prototypes.

**Object** = collection of properties + methods (e.g. `"abc".toLowerCase()` — even strings get methods via prototypes).

**Parts of OOP in JS:** Object literal · Constructor function · Prototypes · Classes · Instances (`new`, `this`)
**4 Pillars:** Abstraction (hide details, e.g. `fetch` internals) · Encapsulation (wrap data + methods, restrict access) · Inheritance (`extends`) · Polymorphism (same method, different behaviour)

---

## Object Literal & `this`
```js
const user = {
  username: "hitesh",
  getUserDetails: function () { console.log(this) }  // this = the whole user object
}
```

## Constructor Functions & `new`
```js
function User(username, loginCount) {
  this.username = username        // left = property on new object, right = argument
  this.loginCount = loginCount
  this.greeting = function () { console.log(`welcome ${this.username}`) }
}
const userOne = new User("hitesh", 12)
const userTwo = new User("chai", 11)
userOne.constructor   // [Function: User]
```

### 🔥 What `new` does (4 steps)
1. Creates a **new empty object** (the instance).
2. Links its `__proto__` to `User.prototype`.
3. Calls the constructor with **`this` = the new object** (arguments get injected).
4. **Returns the new object** (unless the constructor explicitly returns another object).

> **Without `new`** (`User("hitesh")`): `this` = global object → both calls write onto the SAME global → `userOne` shows `userTwo`'s values. In strict mode/classes → TypeError.

---

## `call`, `apply`, `bind` (🔥 very common)

```js
function setUsername(username) { this.username = username }
function createUser(username, email) {
  setUsername.call(this, username)   // run setUsername with OUR `this`
  this.email = email
}
const chai = new createUser("chai", "chai@gmail.com")  // { username: "chai", email: ... }
```
Without `.call(this, ...)`, `setUsername`'s `this` would be global, so the username is lost.

| | Runs immediately? | Arguments | Returns |
|---|:-:|---|---|
| `fn.call(thisArg, a, b)` | ✅ | one by one | fn result |
| `fn.apply(thisArg, [a, b])` | ✅ | **array** | fn result |
| `fn.bind(thisArg, a, b)` | ❌ | one by one | **new function** with `this` fixed |

### `bind` — fixing `this` in event handlers (`13_bind.html`)
```js
class React {
  constructor() {
    this.server = "https://localhost:300"
    document.querySelector('button')
      .addEventListener('click', this.handleClick.bind(this))
  }
  handleClick() { console.log(this.server) }
}
```
Without `bind`, `this` inside the handler = the **button**, so `this.server` is `undefined`. (Alternative: arrow function `() => this.handleClick()`.)

---

## Prototypes & Prototype Chain

Every object has a hidden link `[[Prototype]]` (accessed as `__proto__`). If a property isn't found on the object, JS looks up the chain:
```
myArray → Array.prototype → Object.prototype → null
"str"   → String.prototype → Object.prototype → null
myFn    → Function.prototype → Object.prototype → null
```
> Arrays, strings, functions all eventually reach **Object.prototype** → "everything in JS is an object".

| `prototype` | `__proto__` |
|---|---|
| Property on **constructor functions/classes** | Property on **every object/instance** |
| Blueprint that instances will link to | The actual link to its parent prototype |
| `User.prototype` | `userOne.__proto__ === User.prototype` → `true` |

### Adding methods via prototype
```js
Object.prototype.hitesh = function () {}  // now available on ALL objects, arrays, strings, functions
Array.prototype.heyHitesh = function () {} // only arrays
heroPower.heyHitesh()   // ❌ TypeError — plain object isn't in Array's chain
myHeroes.hitesh()       // ✅ arrays inherit from Object.prototype

String.prototype.trueLength = function () {
  console.log(this.trim().length)   // `this` = the string it's called on
}
"chai aur code     ".trueLength()   // 13
```
> ⚠️ Modifying built-in prototypes is fine for learning, **bad in real projects** (conflicts, called "prototype pollution").

### Prototypal inheritance between objects
```js
const TASupport = { makeAssignment: 'JS', __proto__: teachingSupport }  // old way
Object.setPrototypeOf(teachingSupport, teacher)                        // modern way
const tea = Object.create(User)                                         // new object with User as prototype
```

### Prototype methods on constructors
```js
function createUser(username, score) { this.username = username; this.score = score }
createUser.prototype.increment = function () { this.score++ }
createUser.prototype.printMe = function () { console.log(`score is ${this.score}`) }
const chai = new createUser("chai", 25)
chai.printMe()     // ✅ works
const tea = createUser("tea", 250)
tea.printMe()      // ❌ TypeError: cannot read properties of undefined — forgot `new`
```
> Methods on `prototype` are **shared** by all instances (one copy in memory). Methods defined inside the constructor (`this.greet = fn`) are copied into every instance.

**Functions are objects too:** `multiply.power = 2` works; `multiply.prototype` → `{}`.

---

## ES6 Classes

```js
class User {
  constructor(username, email, password) {
    this.username = username; this.email = email; this.password = password
  }
  encryptPassword() { return `${this.password}abc` }   // goes on User.prototype automatically
}
const chai = new User("chai", "chai@gmail.com", 123)
```
Behind the scenes = constructor function + `User.prototype.encryptPassword = function(){}`.

**Classes vs constructor functions:** classes are **not hoisted** (TDZ), always run in **strict mode**, **must** be called with `new`.

### Inheritance — `extends` & `super`
```js
class Teacher extends User {
  constructor(username, email, password) {
    super(username)        // calls parent constructor — MUST come before using `this`
    this.email = email
  }
  addCourse() { console.log(`course added by ${this.username}`) }
}
const t = new Teacher("chai", "c@t.com", 123)
t.logMe()                  // ✅ inherited from User
new User("masala").addCourse()  // ❌ parent can't access child methods

t instanceof Teacher  // true
t instanceof User     // true  (chain: Teacher.prototype → User.prototype)
User instanceof Teacher // false (User is a class/function, not an instance)
```

### `static`
```js
class User {
  static createId() { return '123' }
}
User.createId()          // ✅ call on the class
new User().createId()    // ❌ TypeError: not a function — instances can't access
Teacher.createId()       // ✅ subclasses DO inherit statics
```
Use static for utility/helper methods that don't need instance data (`Math.max`, `Array.isArray`, `Object.keys` are all static).

---

## Getters & Setters

```js
class User {
  constructor(email, password) { this.email = email; this.password = password }  // these call the setters!
  get password()      { return this._password.toUpperCase() } // runs on READ
  set password(value) { this._password = value }            // runs on WRITE
}
```
- Store in a **different backing property** (`_password`). If the setter does `this.password = value` → it calls itself forever → **"Maximum call stack size exceeded"**.
- Getter without setter → assignment fails (TypeError inside classes since they're strict).
- `_name` = **convention** for "private"; real private fields: `#password` (ES2022).

**3 ways to define them:**
```js
// 1. class  (above)
// 2. object literal
const User = { _email: 'a@b.com', get email() { return this._email.toUpperCase() }, set email(v) { this._email = v } }
// 3. Object.defineProperty (inside constructor function)
Object.defineProperty(this, 'email', { get() { return this._email.toUpperCase() }, set(v) { this._email = v } })
```

---

## Property Descriptors (`12_mathpi.js`)

```js
Object.getOwnPropertyDescriptor(Math, "PI")
// { value: 3.14159..., writable: false, enumerable: false, configurable: false }
Math.PI = 5     // silently ignored (TypeError in strict mode)
```
| Flag | false means |
|---|---|
| `writable` | value can't be changed |
| `enumerable` | hidden from `for...in`, `Object.keys/entries` |
| `configurable` | can't delete the property or change its descriptor |

```js
Object.defineProperty(chai, 'name', { writable: false, enumerable: false })
for (const [k, v] of Object.entries(chai)) {
  if (typeof v !== 'function') console.log(`${k}: ${v}`)  // 'name' won't show (not enumerable)
}
```

---

## 4 Ways to Create Objects
1. **Object literal** `{ name: "chai" }` — quickest
2. **Constructor function** `new createUser("chai")` — old factory way
3. **ES6 class** `new User("chai")` — modern factory way
4. **`Object.create(proto)`** — directly links a prototype

---

## ⚠️ Mistakes in your practice files
- `02_oops.js`: `new Promise()` with no executor → TypeError. `User(...)` called without `new`.
- `03_call.js`: `setusername.call(this.username)` → should be `setusername.call(this, username)`.
- `04_prototypes.js`: `teeachingsupport` / `trachingsupport` spelling mismatch; `teacher.__proto__ = User` (User undefined).
- `05_Object.js`: `multiply(nums)` returns `num * 5` → ReferenceError (`nums` vs `num`).
- `07_inheritance.js`: `extends User` but class is `user`; `user instanceof teacher` is **false**, not true.
- `08_staticpop.js`: method is `createid`, called as `createId`; `iphone.createId()` → TypeError, not `undefined`.
- `10/11_*.js`: setters do `this.email = value` → infinite recursion; should be `this._email = value`.
- `12_mathpi.js`: `getOwnPropertyDescriptor(chai, "name")` (key goes inside); `Object.enteries` → `Object.entries`.

---

## Interview One-Liners
1. **Classes are syntactic sugar over prototypes.**
2. **`new`: create object → link prototype → bind `this` → return object.**
3. **`call` (args list), `apply` (args array) run now; `bind` returns a new function.**
4. **`prototype` is on constructors; `__proto__` is on instances.**
5. **Prototype chain ends at `Object.prototype` → `null`.**
6. **`super()` must be called before `this` in a child constructor.**
7. **Static methods: called on class, not on instances; inherited by subclasses.**
8. **Getter/setter must use a backing field (`_x`)** or recursion.
9. **`enumerable: false` hides a property from loops/`Object.keys`.**
10. **Event handler loses `this` → `bind(this)` or arrow function.**
