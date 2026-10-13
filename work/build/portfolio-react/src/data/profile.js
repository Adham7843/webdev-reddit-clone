// All portfolio content lives here as plain data.
// The components read this file — they never hardcode content.
// Add a project by adding one object to `projects`. Nothing else changes.

export const profile = {
  name: "Adham Amr El Zeiny",
  shortName: "Adham Amr",
  role: "Web Developer — Node / Express / React",
  lede:
    "I build full-stack web apps and learn in public. Currently working through a web " +
    "development course by shipping real projects — an API, a React client, and the boring " +
    "parts in between.",
  location: "[ your city / country ]",
  email: "[ your email ]",
  github: "https://github.com/Adham7843",
};

// status values: "live" | "progress" | "building"
export const projects = [
  {
    id: "reddit-clone",
    title: "Reddit Clone",
    status: "progress",
    statusLabel: "In progress",
    description:
      "Full-stack Reddit-style site built as the capstone of a web development course. " +
      "Express API with posts, voting and threaded comments; React client that fetches the " +
      "feed rather than hardcoding it.",
    tags: ["Node", "Express", "React", "Vite"],
    links: [{ label: "Code", href: "https://github.com/Adham7843/webdev-reddit-clone" }],
  },
  {
    id: "bricks-breaker-privacy",
    title: "Bricks Breaker — Privacy Policy",
    status: "live",
    statusLabel: "Live",
    description:
      "Privacy policy page for Bricks Breaker by AZ GP Games, published to GitHub Pages. " +
      "A small, shipped, public web product.",
    tags: ["HTML", "CSS", "GitHub Pages"],
    links: [
      { label: "Code", href: "https://github.com/Adham7843/cannon-raid-bricks-breaker-privacy" },
      {
        label: "Live site",
        href: "https://adham7843.github.io/cannon-raid-bricks-breaker-privacy/",
      },
    ],
  },
  {
    id: "portfolio-static",
    title: "Developer Portfolio",
    status: "live",
    statusLabel: "HTML + CSS",
    description:
      "The same portfolio as a single static site — semantic HTML and a hand-written " +
      "stylesheet. No framework, no build step, no JavaScript.",
    tags: ["HTML", "CSS", "Responsive", "A11y"],
    links: [{ label: "Static version", href: "../portfolio/index.html", internal: true }],
  },
  {
    id: "portfolio-react",
    title: "Portfolio — React version",
    status: "building",
    statusLabel: "You are here",
    description:
      "This app. The portfolio rebuilt in React: split into components, driven by a data " +
      "file, with state for the mobile nav and project filtering.",
    tags: ["React", "Vite", "Components", "State"],
    links: [],
  },
];

export const skills = [
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Vite"] },
  { group: "Backend", items: ["Node.js", "Express", "REST API design", "JSON"] },
  { group: "Tools", items: ["Git", "GitHub", "GitHub Pages", "npm", "Postman"] },
  { group: "Practicing", items: ["Databases", "Auth / sessions", "Testing", "Accessibility"] },
];

export const about = {
  paragraphs: [
    "I'm Adham — a developer working through a full-stack web development course, building a " +
      "Reddit-style site from scratch with a Node/Express API and a React frontend. I care " +
      "about the whole path: designing a route, wiring the client to it, handling the error " +
      "states, and making it responsive.",
  ],
  facts: [
    { label: "Role", value: "Web developer (in training)" },
    { label: "Stack", value: "Node, Express, React, Vite" },
    { label: "GitHub", value: "@Adham7843", href: "https://github.com/Adham7843" },
    { label: "Location", value: "[ your city / country ]" },
  ],
};

export const cv = {
  experience: [
    {
      title: "Full-Stack Web Development Course",
      meta: "2026 — present",
      body:
        "Building a Reddit-style clone end to end: Express API, React client, voting, " +
        "comments and auth.",
    },
    {
      title: "Freelance / Contract Web Work",
      meta: "[ add client + dates ]",
      body:
        "Delivered the Bricks Breaker privacy policy page for AZ GP Games, published via " +
        "GitHub Pages.",
    },
  ],
  education: [
    {
      title: "Web Development",
      meta: "[ add school / platform ]",
      body:
        "Focus areas: HTTP & REST, React component design, responsive CSS, accessible forms.",
    },
    {
      title: "Game Development",
      meta: "AZ GP Games",
      body: "Part of AZ GP Games, shipping browser games including Bricks Breaker.",
    },
  ],
  downloadHref: "[ link to your CV PDF ]",
};

export const filters = ["all", "live", "progress", "building"];