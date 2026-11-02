# Lab 03 — Movies Watch List (React)

A small React app for the movies you watch: add/remove titles, give a 1–5 star
rating, and write a review. The list is saved in the browser with
`localStorage`, so it survives a refresh.

**AI was used for the CSS only.** The React is deliberately basic — one state
array in `App.jsx`, controlled inputs, `map`/`filter`, and props.

## Run it

```bash
cd work/drills/03-movies-watchlist
npm install
npm run dev
```

Open the URL Vite prints (default <http://localhost:5174>).

Production check:

```bash
npm run build
npm run preview
```

The app starts empty. To reset it, open DevTools → Application → Local Storage
and delete the `movies-watchlist` key.

## Requirements → where they live

| Requirement | Code |
| --- | --- |
| Add a movie | `MovieForm.jsx` → `onAdd` → `addMovie` in `App.jsx` |
| Remove a movie | `MovieCard.jsx` → `onRemove` → `removeMovie` in `App.jsx` |
| Add a comment/review | Controlled `<textarea>` in `MovieCard.jsx` |
| Add a star rating | Five star buttons in `MovieCard.jsx` |
| Show the rating in emojis | `"⭐".repeat(movie.stars)` in `MovieCard.jsx` |

## The React ideas used (all from the official docs)

### 1. One state array, passed down as props

`App.jsx` owns the list:

```jsx
const [movies, setMovies] = useState(loadMovies);
```

Each movie is a plain object:

```js
{ id: "…", title: "Arrival", stars: 4, review: "Loved the ending." }
```

`MovieCard` never changes the array itself. It receives `movie`, `onUpdate`,
and `onRemove` as props and calls them. The state stays in one place — this is
called *lifting state up*.

Docs: [Sharing state between components](https://react.dev/learn/sharing-state-between-components)

### 2. A controlled input

`MovieForm` keeps the text field in state and always forces the input to show
that state:

```jsx
const [title, setTitle] = useState("");

<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
/>
```

On submit we prevent the page refresh, send the title up to `App`, then clear
the field.

Docs: [Reacting to input with state](https://react.dev/learn/reacting-to-input-with-state) ·
[`<input>` reference](https://react.dev/reference/react-dom/components/input)

### 3. Updating an array without mutating it

Add (newest first):

```jsx
setMovies((current) => [newMovie, ...current]);
```

Remove:

```jsx
setMovies((current) => current.filter((movie) => movie.id !== id));
```

Update one movie (stars or review):

```jsx
setMovies((current) =>
  current.map((movie) =>
    movie.id === id ? { ...movie, ...changes } : movie
  )
);
```

Never `movies.push(...)` or `movie.stars = 5`. React needs a **new array** and
a **new object** to see the change.

Docs: [Updating arrays in state](https://react.dev/learn/updating-arrays-in-state) ·
[Updating objects in state](https://react.dev/learn/updating-objects-in-state)

### 4. Rendering a list with a stable key

```jsx
{movies.map((movie) => (
  <MovieCard key={movie.id} movie={movie} … />
))}
```

`key` must be stable and unique. We create `crypto.randomUUID()` when a movie is
added; the array index would be a bad key because removing a movie shifts the
indexes.

Docs: [Rendering lists](https://react.dev/learn/rendering-lists)

### 5. Saving with `useEffect`

```jsx
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}, [movies]);
```

The effect runs after render, and only again when `movies` changes. The lazy
initializer `useState(loadMovies)` reads the saved list once on startup.

Docs: [`useEffect` reference](https://react.dev/reference/react/useEffect) ·
[You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)

## The whole app in five sentences (say this out loud)

1. `App` holds the movies array in `useState`, loaded from `localStorage`.
2. `MovieForm` has one controlled input and sends the typed title up on submit.
3. `App` adds a new movie object to the front of the array.
4. Each `MovieCard` gets one movie plus callback props; clicking a star or typing
   a review calls `onUpdate`, and Remove calls `onRemove`.
5. `useEffect` writes the new array back to `localStorage` after every change.

## File map

```
03-movies-watchlist/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # mounts <App /> into #root
    ├── App.jsx               # state + add/remove/update/save
    ├── App.css               # styling (AI-assisted)
    └── components/
        ├── MovieForm.jsx     # controlled form
        └── MovieCard.jsx     # stars, review, remove
```

## Possible next steps

- Edit a movie title after adding it.
- Sort by rating, or filter “rated / not rated”.
- Add a `watchedOn` date input.
- Replace `localStorage` with the Express API from the Reddit clone (same
  state shape; swap the effect for `fetch`).
