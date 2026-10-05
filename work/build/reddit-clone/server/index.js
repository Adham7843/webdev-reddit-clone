import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

// In-memory seed (course step 1 — swap for a DB later)
let posts = [
  { id: "1", sub: "r/webdev", title: "I rebuilt Reddit to learn full-stack", author: "you", votes: 128, createdAt: Date.now() - 3600e3 },
  { id: "2", sub: "r/reactjs", title: "Showoff Saturday — post your clone", author: "coursemate", votes: 42, createdAt: Date.now() - 7200e3 },
];
let comments = { 1: [{ author: "mentor", body: "Good start — now add voting persistence." }] };

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "reddit-clone-server" }));
app.get("/api/posts", (_req, res) => {
  const withCounts = posts.map((p) => ({ ...p, comments: (comments[p.id] || []).length }));
  res.json(withCounts.sort((a, b) => b.votes - a.votes));
});
app.post("/api/posts/:id/vote", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "not found" });
  const dir = req.body?.dir === -1 ? -1 : 1;
  post.votes += dir;
  res.json(post);
});
app.get("/api/posts/:id/comments", (req, res) => res.json(comments[req.params.id] || []));
app.post("/api/posts/:id/comments", (req, res) => {
  const { author = "anon", body = "" } = req.body || {};
  if (!body.trim()) return res.status(400).json({ error: "empty comment" });
  (comments[req.params.id] ||= []).push({ author, body });
  res.status(201).json({ ok: true });
});

app.listen(PORT, () => console.log(`server on http://localhost:${PORT}`));
