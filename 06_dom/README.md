# 06_dom — Document Object Model (Interview Quick Reference)

**DOM** = browser's tree representation of HTML. `window` → `document` → `html` → `head`/`body` → elements → text nodes. JS reads & changes this tree.

## Selecting Elements

| Method | Returns | Live? | Has `forEach`? |
|---|---|:-:|:-:|
| `getElementById('title')` | single element / `null` | — | — |
| `querySelector('.heading')` | **first** match (any CSS selector) | — | — |
| `querySelectorAll('li')` | **NodeList** | ❌ static | ✅ |
| `getElementsByClassName('list-item')` | **HTMLCollection** | ✅ live | ❌ |
| `getElementsByTagName('li')` | HTMLCollection | ✅ live | ❌ |

```js
document.querySelector('#title')           // id
document.querySelector('.day')             // class
document.querySelector('li:nth-child(2)')  // any CSS selector
document.querySelector('li:first-child')
document.querySelector('li:last-child')

Array.from(document.getElementsByClassName('list-item')).forEach(...)  // HTMLCollection → array
```
> NodeList / HTMLCollection are **array-like, not arrays** — no `map`/`filter` until you `Array.from()` them.

---

## Reading / Writing Content (🔥 classic question)

| Property | Returns | Hidden (`display:none`) text? | Parses HTML? |
|---|---|:-:|:-:|
| `innerText` | visible, rendered text | ❌ excluded | ❌ |
| `textContent` | all text in the node | ✅ included | ❌ |
| `innerHTML` | HTML markup as string | ✅ | ✅ (⚠️ XSS risk with user input) |
| `outerHTML` | element **itself** + its content | ✅ | ✅ (setting it **replaces** the element) |

> That's why `01.html` has a hidden `<span>` inside the `<h1>`: `textContent` shows "test text", `innerText` doesn't.

## Attributes & Styles

```js
el.getAttribute('class')
el.setAttribute('title', 'generated title')   // ⚠️ overwrites the whole attribute value
el.id = 'main'
el.className = 'main'
el.classList.add('active') / .remove() / .toggle() / .contains()
el.style.backgroundColor = 'green'    // CSS props become camelCase
el.style.padding = '12px'
```

---

## Traversing (moving around the tree)

```js
parent.children                 // HTMLCollection of child ELEMENTS
parent.children[1].innerHTML
parent.firstElementChild
parent.lastElementChild
child.parentElement
child.nextElementSibling / previousElementSibling
parent.childNodes               // NodeList incl. TEXT nodes (whitespace/newlines) + comments
```
> **`children` vs `childNodes`**: `childNodes` also counts the line-breaks between tags as `#text` nodes, so its length is bigger.

---

## Creating Elements

```js
const div = document.createElement('div')   // created in memory, NOT on page yet
div.className = 'main'
div.id = Math.random() * 10
div.setAttribute('title', 'generated title')
div.style.backgroundColor = 'green'
div.appendChild(document.createTextNode('Chai aur code'))  // or div.innerText = '...'
document.body.appendChild(div)             // NOW it shows on page
```

### Reusable add function
```js
function addLanguage(name) {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(name))   // optimised: no HTML parsing
  document.querySelector('.language').appendChild(li)
}
```
> **Why `createTextNode`/`textContent` over `innerHTML`?** No HTML parsing → faster, and safe from script injection (XSS).

---

## Editing & Removing

```js
// Replace an element
const newLi = document.createElement('li')
newLi.textContent = 'Mojo'
document.querySelector('li:nth-child(2)').replaceWith(newLi)

// Replace via outerHTML
document.querySelector('li:first-child').outerHTML = '<li>Typescript</li>'

// Remove
document.querySelector('li:last-child').remove()
parent.removeChild(child)       // older way
```

Other insertion methods worth knowing: `append()` (multiple nodes/strings), `prepend()`, `insertBefore()`, `insertAdjacentHTML('beforeend', html)`.

---

## Interview One-Liners
1. **`querySelectorAll` → static NodeList (has forEach); `getElementsBy...` → live HTMLCollection (no forEach).**
2. **`innerText` (visible, CSS-aware) vs `textContent` (all text, faster) vs `innerHTML` (parses HTML, XSS risk).**
3. **`children` = elements only; `childNodes` = includes text/whitespace nodes.**
4. **`createElement` only creates in memory** — must `appendChild` to show it.
5. **`setAttribute` overwrites**; use `classList.add` to add a class.
6. **Script placement**: put `<script>` at end of `<body>` (or use `defer`) so elements exist before JS selects them.
