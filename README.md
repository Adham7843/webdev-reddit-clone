# webdev-reddit-clone

LEARN project — web dev course: full-stack Reddit-style site (Node + React).

- Course map: `work/curriculum.md`
- App code: `work/build/reddit-clone/` (this is what GitHub holds alongside the zone)
  - `server/` — Node (Express) API: health, posts, voting, comments (in-memory first)
  - `client/` — React (Vite) feed UI

## Run it

```bash
# terminal 1 — API
cd work/build/reddit-clone/server
npm install
npm run dev
# → http://localhost:4000/api/health

# terminal 2 — UI
cd work/build/reddit-clone/client
npm install
npm run dev
# → http://localhost:5173 (proxies /api → :4000)
```
