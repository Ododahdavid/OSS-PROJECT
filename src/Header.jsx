import React, { useState } from 'react';
import logo from './assets/logo.jpeg';
import './Header.css';

function Header() {
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (item) => {
    setDropdown(dropdown === item ? null : item);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span className="product-name">DocBook</span>
      </div>
      <nav>
        <ul className="nav-links">
          {['Product', 'Features', 'Resources', 'Pricing'].map((item) => (
            <li
              key={item}
              onMouseEnter={() => toggleDropdown(item)}
              onMouseLeave={() => toggleDropdown(null)}
            >
              <a href="#">
                {item} 
                <span className={`dropdown-arrow ${dropdown === item ? 'active' : ''}`}>
                  ^
                </span>
              </a>
              {dropdown === item && (
                <div className="dropdown-card">
                  {item === 'Product' && (
                    <div className="dropdown-content">
                      <h4>Solutions</h4>
                      <ul>
                        <li>Public documentation</li>
                        <li>API documentation</li>
                        <li>Internal documentation</li>
                        <li>Enterprise</li>
                        <li>Open Source</li>
                      </ul>
                    </div>
                  )}
                  {item === 'Features' && (
                    <div className="dropdown-content">
                      <h4>Features</h4>
                      <ul>
                        <li>Visitor authentication</li>
                        <li>Git Sync</li>
                        <li>DocBook AI</li>
                        <li>Integrations</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Start for Free</button>
      </div>
    </header>
  );
}

export default Header;
