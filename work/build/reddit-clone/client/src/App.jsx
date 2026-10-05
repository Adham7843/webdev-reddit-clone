import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const r = await fetch("/api/posts");
      if (!r.ok) throw new Error(`API ${r.status}`);
      setPosts(await r.json());
    } catch (e) {
      setError("API offline — start the server (:4000). Showing seed.");
    }
  };

  useEffect(() => { load(); }, []);

  const vote = async (id, dir) => {
    setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, votes: p.votes + dir } : p)));
    try {
      await fetch(`/api/posts/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dir }),
      });
    } catch { /* optimistic already applied */ }
  };

  return (
    <div className="page">
      <header className="topbar"><span className="logo">reddit-clone</span><span className="tag">course build</span></header>
      <main className="feed">
        {error && <p className="warn">{error}</p>}
        {posts.length === 0 && !error && <p>Loading…</p>}
        {posts.map((p) => (
          <article key={p.id} className="post">
            <div className="votes">
              <button onClick={() => vote(p.id, 1)} aria-label="upvote">▲</button>
              <strong>{p.votes}</strong>
              <button onClick={() => vote(p.id, -1)} aria-label="downvote">▼</button>
            </div>
            <div>
              <div className="meta">{p.sub} · u/{p.author} · 💬 {p.comments ?? 0}</div>
              <h2>{p.title}</h2>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
