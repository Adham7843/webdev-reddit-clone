# Lab 04 — Todo App (TypeScript, no React)

A minimal TypeScript todo app matching the lab screenshot. **No React, no JSX,
no UI framework** — just TypeScript + the DOM + CSS, bundled by Vite.

Features: add, toggle complete, double-click to edit, Enter to save, Escape to
cancel, filter All / Active / Completed, delete one, clear completed, clear all,
and a live “items left” count.

The two sample todos (`See Lecture`, `Solve assignment`) match the screenshot.
Change `initialTodos` in `src/main.ts` to `[]` for an empty start. The app is
in-memory only — refreshing resets it.

## Run it

```bash
cd work/drills/04-todo-typescript
npm install
npm run dev
```

Open <http://localhost:5175>.

Type-check + production build:

```bash
npm run build
```

That runs `tsc --noEmit` first, then `vite build`. If a type is wrong, the build
stops before Vite runs.

## What is in each file

| File | What it contains |
| --- | --- |
| `index.html` | The static page shell: title, add form, filter buttons, empty `<ul>` for todos, footer, and the CSS link. |
| `src/types.ts` | The `Todo` object type and the `Filter` string-literal union. |
| `src/main.ts` | All the app logic: state, `render()`, DOM creation, event listeners, add/toggle/edit/delete/clear/filter functions. |
| `src/styles.css` | All styling (AI-assisted design). |
| `tsconfig.json` | TypeScript settings, including `strict: true`. |
| `vite.config.ts` | Vite dev-server config (port 5175). |
| `package.json` | Scripts + the only dependencies: TypeScript and Vite. No React. |

## Why no React?

TypeScript is a type system, not a UI framework. The browser already has
everything needed for this app:

- `document.createElement` builds elements.
- `addEventListener` handles clicks, submits, and keyboard events.
- `textContent` updates text safely.
- `render()` rebuilds the list whenever state changes.

React would only replace those DOM calls with components and JSX. This version
keeps the logic in one file so the TypeScript types are easy to see.

## The TypeScript types used

### 1. `Todo` — an object type

```ts
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
```

Describes the exact shape of one todo. `completed` can only be a boolean.

### 2. `Filter` — a string-literal union

```ts
export type Filter = "all" | "active" | "completed";
```

Only those three strings are allowed. `filter = "done"` is a compile error.

The state uses it directly:

```ts
let filter: Filter = "all";
```

### 3. `Todo[]` and `string | null`

```ts
let todos: Todo[] = [...initialTodos];
let editingId: string | null = null;
```

- `Todo[]` means an array of `Todo` objects (same as `Array<Todo>`).
- `string | null` means “a string, or null when nothing is being edited.”

### 4. A generic DOM helper

```ts
function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

const addForm = getElement<HTMLFormElement>("#add-form");
const addInput = getElement<HTMLInputElement>("#add-input");
const todoList = getElement<HTMLUListElement>("#todo-list");
```

`<T extends HTMLElement>` is a **generic**: the caller chooses the exact element
type. TypeScript then knows `addInput.value` exists because `addInput` is an
`HTMLInputElement`, not just a generic `HTMLElement`.

`document.querySelector<T>` returns `T | null`, so the `if (!element)` check
narrows it to `T` before returning it.

### 5. A type predicate (type guard)

```ts
function isFilter(value: string | undefined): value is Filter {
  return value === "all" || value === "active" || value === "completed";
}
```

The return type `value is Filter` is a **type predicate**. After this function
returns `true`, TypeScript treats `value` as a `Filter`:

```ts
const value = button.dataset.filter;
if (!isFilter(value)) return;

filter = value; // value is now typed as Filter
```

Without the guard, `dataset.filter` is `string | undefined` and could not be
assigned directly to `filter`.

### 6. DOM event narrowing

```ts
const target = event.target;
if (!(target instanceof Element)) return;

const button = target.closest<HTMLButtonElement>("button[data-filter]");
```

`event.target` is typed as `EventTarget | null`. The `instanceof Element` check
narrows it to `Element`, which has `closest()`. The `<HTMLButtonElement>` generic
tells TypeScript what `closest` should return.

### 7. Function return types

```ts
function getVisibleTodos(): Todo[]
function createTodoItem(todo: Todo): HTMLLIElement
function render(): void
```

These annotations document what each function returns. `void` means it returns
nothing.

### 8. `strict: true`

`tsconfig.json` enables strict checking. That is why the code checks the root
element / DOM lookups instead of assuming they exist:

```ts
if (!element) throw new Error(`Missing element: ${selector}`);
```

`noUnusedLocals` and `noUnusedParameters` are also on, so dead variables and
unused function parameters fail the build.

## How the app works

There is no framework and no virtual DOM. The pattern is:

```
state changes → render() runs → the todo list is rebuilt
```

`render()`:

1. Gets the filtered todos.
2. Clears the `<ul>` with `replaceChildren()`.
3. Creates one `<li>` per todo with `createTodoItem`.
4. Updates the items-left text.
5. Updates the active filter button and `aria-pressed`.
6. Focuses the edit input if one is open.

Event listeners use **event delegation**: one `click` listener on the `<ul>`
handles every toggle and delete button via `closest()`. The form, filter row,
and footer buttons each have their own listener.

| Feature | Where it lives |
| --- | --- |
| Add | `addForm` submit listener in `main.ts` |
| Toggle | `todoList` click listener → `toggleTodo` |
| Delete | `todoList` click listener → `deleteTodo` |
| Edit start | `todoList` dblclick listener |
| Save edit | edit input `keydown` → `saveEdit` |
| Cancel edit | Escape or blur → `cancelEdit` |
| Filters | `filters` click listener + `isFilter` |
| Items left | `render()` counts `!todo.completed` |
| Clear completed | `clearCompletedButton` listener |
| Clear all | `clearAllButton` listener |

All updates create new arrays/objects with `map`, `filter`, and spread; the
state is never mutated in place.

## Say this to the professor (60 seconds)

> “This is TypeScript only — no React. `index.html` has the static shell.
> `main.ts` holds the state: a `Todo[]` array, a `Filter` union, and an
> `editingId: string | null`. A `render()` function rebuilds the list from
> state. The `Todo` type describes each item. `Filter` restricts the filter
> values to three strings. A type predicate checks `data-filter` at runtime and
> tells TypeScript it is a `Filter`. A generic `getElement<T>` helper gives the
> correct DOM element type. Event listeners use `EventTarget` narrowing and
> `closest()` to handle clicks. `tsc --noEmit` checks everything before Vite
> builds the JavaScript.”

## Next steps

- Save todos in `localStorage` (then validate the parsed JSON at runtime).
- Add due dates (`dueDate?: string` — an optional property).
- Split `main.ts` into `todoStore.ts` and `render.ts` as it grows.
