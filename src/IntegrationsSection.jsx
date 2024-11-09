import React from 'react';
import { motion } from 'framer-motion';
import './IntegrationsSection.css'; // Custom CSS file for layout

// Sample icons (replace with actual icons in your assets)
const icons = [
  { id: 1, icon: "📘", name: "GitBook" },
  { id: 2, icon: "🐙", name: "GitHub" },
  { id: 3, icon: "🛠️", name: "Tooling" },
  { id: 4, icon: "🔄", name: "Sync" },
  { id: 5, icon: "💻", name: "Dev" },
  { id: 6, icon: "📂", name: "Docs" },
  { id: 7, icon: "⚙️", name: "Automation" },
  { id: 8, icon: "🧑‍💻", name: "Developers" },
  { id: 9, icon: "☁️", name: "Cloud" },
];

const IntegrationsSection = () => {
  return (
    <div className="integrations-section">
      <div className="integrations-content">
        <motion.div
          className="title"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>Integrate with your stack</h2>
          <p>Install one of our verified integrations, or build your own with our API. Because a great knowledge management system should work with everything you use on a daily basis.</p>
          <button className="integrate-button">See our integrations →</button>
        </motion.div>

        <div className="icons-grid">
          {icons.map((icon, index) => (
            <motion.div
              key={icon.id}
              className="icon-container"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.2 }}
            >
              <span className="icon">{icon.icon}</span>
              <p>{icon.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;
