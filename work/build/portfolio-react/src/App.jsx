import { useState } from "react";
import { filters, projects } from "./data/profile.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Cv from "./components/Cv.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// The only piece of state App owns: which project filter is active.
// It lives up here (not inside Projects) because the filter bar and the
// project list are two different components that both need to know.
export default function App() {
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  const counts = filters.reduce((acc, key) => {
    acc[key] = key === "all" ? projects.length : projects.filter((p) => p.status === key).length;
    return acc;
  }, {});

  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects projects={visible} filter={filter} onFilter={setFilter} counts={counts} />
        <Skills />
        <Cv />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}