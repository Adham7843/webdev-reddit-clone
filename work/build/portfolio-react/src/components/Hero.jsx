import { profile } from "../data/profile.js";

export default function Hero() {
  return (
    <section className="hero">
      <h1>{profile.name}</h1>
      <p className="role">{profile.role}</p>
      <p className="hero-lede">{profile.lede}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#projects">
          View projects
        </a>
        <a className="btn" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub profile
        </a>
      </div>
    </section>
  );
}