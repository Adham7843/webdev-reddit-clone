# reddit-clone (Node + React)

Reddit-style learning build. Server holds the API, client renders the feed.

## Endpoints (server, :4000)
- GET /api/health
- GET /api/posts — seed posts with votes + comment counts
- POST /api/posts/:id/vote { dir: 1 | -1 }
- GET /api/posts/:id/comments · POST /api/posts/:id/comments { author, body }
