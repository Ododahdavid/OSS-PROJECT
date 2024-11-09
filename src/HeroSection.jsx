import React from 'react';
import logo from './assets/logo.jpeg';
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero-section">
      <img src={logo} alt="Logo" className="hero-logo" />
      <h1>Product documentation your users will love</h1>
      <p>
        Forget building your own custom open source docs . With DocBook, you get beautiful 
        documentation for your users, and a branch-based Git workflow for your team.
      </p>
      <div className="hero-buttons">
        <button className="github-btn">Sign up with GitHub</button>
        <button className="start-free-btn">Start for free</button>
      </div>
    </section>
  );
}

export default HeroSection;
