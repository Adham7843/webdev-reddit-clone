import type { Filter, Todo } from "./types";

// Sample data so the first run matches the lab screenshot.
// Change this to [] if you want to start with an empty list.
const initialTodos: Todo[] = [
  { id: "sample-1", text: "See Lecture", completed: false },
  { id: "sample-2", text: "Solve assignment", completed: false },
];

let todos: Todo[] = [...initialTodos];
let filter: Filter = "all";
let editingId: string | null = null;
let draft = "";

const CHECK_ICON = `
  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
    <path d="M3.5 8.5 6.4 11.2 12.5 4.8"
      fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

const TRASH_ICON = `
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l.9 13h9.2l.9-13M10 11v5M14 11v5"
      fill="none" stroke="currentColor" stroke-width="1.7"
      stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`;

// querySelector<T> returns T | null, so this helper throws if the HTML is missing.
function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing element: ${selector}`);
  return element;
}

const addForm = getElement<HTMLFormElement>("#add-form");
const addInput = getElement<HTMLInputElement>("#add-input");
const todoList = getElement<HTMLUListElement>("#todo-list");
const filters = getElement<HTMLDivElement>("#filters");
const itemsLeft = getElement<HTMLSpanElement>("#items-left");
const clearCompletedButton = getElement<HTMLButtonElement>("#clear-completed");
const clearAllButton = getElement<HTMLButtonElement>("#clear-all");

// A type guard: after this returns true, TypeScript treats value as a Filter.
function isFilter(value: string | undefined): value is Filter {
  return value === "all" || value === "active" || value === "completed";
}

function getVisibleTodos(): Todo[] {
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
}

function createTodoItem(todo: Todo): HTMLLIElement {
  const item = document.createElement("li");
  item.className = todo.completed ? "todo-item is-done" : "todo-item";

  const checkButton = document.createElement("button");
  checkButton.type = "button";
  checkButton.className = "todo-check";
  checkButton.dataset.id = todo.id;
  checkButton.setAttribute("aria-pressed", String(todo.completed));
  checkButton.setAttribute(
    "aria-label",
    todo.completed
      ? `Mark ${todo.text} as active`
      : `Mark ${todo.text} as completed`
  );
  checkButton.innerHTML = CHECK_ICON;
  item.append(checkButton);

  if (editingId === todo.id) {
    const editInput = document.createElement("input");
    editInput.className = "edit-input";
    editInput.value = draft;
    editInput.setAttribute("aria-label", "Edit todo");
    editInput.addEventListener("input", () => {
      draft = editInput.value;
    });
    editInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") saveEdit(todo.id);
      if (event.key === "Escape") cancelEdit();
    });
    editInput.addEventListener("blur", () => {
      // Let a click on another control finish before re-rendering.
      window.setTimeout(() => {
        if (editingId === todo.id) cancelEdit();
      }, 0);
    });
    item.append(editInput);
  } else {
    const text = document.createElement("span");
    text.className = "todo-text";
    text.dataset.id = todo.id;
    text.title = "Double-click to edit";
    text.textContent = todo.text;
    item.append(text);
  }

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.dataset.id = todo.id;
  deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);
  deleteButton.innerHTML = TRASH_ICON;
  item.append(deleteButton);

  return item;
}

function focusEditInput(): void {
  const editInput = todoList.querySelector<HTMLInputElement>(".edit-input");
  if (!editInput) return;
  editInput.focus();
  editInput.select();
}

function render(): void {
  const visibleTodos = getVisibleTodos();
  todoList.replaceChildren();

  if (visibleTodos.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty";
    emptyItem.textContent = "No todos to show.";
    todoList.append(emptyItem);
  } else {
    for (const todo of visibleTodos) {
      todoList.append(createTodoItem(todo));
    }
  }

  const left = todos.filter((todo) => !todo.completed).length;
  itemsLeft.textContent = `${left} ${left === 1 ? "item" : "items"} left`;

  for (const button of filters.querySelectorAll<HTMLButtonElement>(
    "button[data-filter]"
  )) {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }

  clearAllButton.disabled = todos.length === 0;
  focusEditInput();
}

function toggleTodo(id: string): void {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

function deleteTodo(id: string): void {
  todos = todos.filter((todo) => todo.id !== id);
  if (editingId === id) {
    editingId = null;
    draft = "";
  }
  render();
}

function saveEdit(id: string): void {
  const cleanDraft = draft.trim();
  if (cleanDraft) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: cleanDraft } : todo
    );
  }
  cancelEdit();
}

function cancelEdit(): void {
  editingId = null;
  draft = "";
  render();
}

function stopEditingIfMissing(): void {
  if (editingId && !todos.some((todo) => todo.id === editingId)) {
    editingId = null;
    draft = "";
  }
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = addInput.value.trim();
  if (!text) return;

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
  };

  todos = [...todos, newTodo];
  addInput.value = "";
  render();
  addInput.focus();
});

filters.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest<HTMLButtonElement>("button[data-filter]");
  if (!button) return;

  const value = button.dataset.filter;
  if (!isFilter(value)) return;

  filter = value;
  editingId = null;
  draft = "";
  render();
});

todoList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const checkButton = target.closest<HTMLButtonElement>(".todo-check");
  if (checkButton) {
    const id = checkButton.dataset.id;
    if (id) toggleTodo(id);
    return;
  }

  const deleteButton = target.closest<HTMLButtonElement>(".delete-button");
  if (deleteButton) {
    const id = deleteButton.dataset.id;
    if (id) deleteTodo(id);
  }
});

todoList.addEventListener("dblclick", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const text = target.closest<HTMLElement>(".todo-text");
  if (!text) return;

  const id = text.dataset.id;
  if (!id) return;

  const todo = todos.find((item) => item.id === id);
  if (!todo) return;

  editingId = id;
  draft = todo.text;
  render();
});

clearCompletedButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  stopEditingIfMissing();
  render();
});

clearAllButton.addEventListener("click", () => {
  todos = [];
  editingId = null;
  draft = "";
  render();
});

render();
