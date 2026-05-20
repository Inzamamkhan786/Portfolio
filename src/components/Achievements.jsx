import React from 'react';
import { motion } from 'framer-motion';
import './Achievements.css';

const achievementsData = [
  {
    icon: '🏆',
    title: 'Render Riot — 1st Prize',
    desc: '1st place at Render Riot competition at IIIT Nagpur for a 3D project created and rendered in Blender.',
    badge: 'IIIT NAGPUR',
    color: 'gold'
  },
  {
    icon: '🎮',
    title: 'IIT BHU Game Jam — 2nd Prize',
    desc: 'Won 2nd prize at IIT BHU Game Development competition for building an interactive game under time constraints.',
    badge: 'IIT BHU',
    color: 'blue'
  },
  {
    icon: '⚡',
    title: '300+ DSA Problems',
    desc: 'Solved 300+ algorithmic problems on LeetCode and CodeChef covering arrays, graphs, DP, trees, and more.',
    badge: 'COMPETITIVE PROGRAMMING',
    color: 'green'
  },
  {
    icon: '🍴',
    title: 'CodeChef 2-Star',
    desc: 'Achieved a 2-Star rating on CodeChef with a maximum rating of 1484, competing consistently in Division contests.',
    badge: 'MAX RATING 1484',
    color: 'purple'
  },
  {
    icon: '🥽',
    title: 'AR/VR Developer',
    desc: 'Built VR Interview Simulation for Meta Quest 3 integrating Whisper AI and local LLM for real-time AI responses.',
    badge: 'UNITY + WEBXR',
    color: 'pink'
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="sec-bar">
            <div className="sec-line"></div>
            <div className="sec-info">
              <h2 className="section-title" style={{marginBottom: '0.5rem'}}>Achievements</h2>
              <div className="sec-rule"></div>
              <p className="sec-sub text-secondary">Recognitions & milestones</p>
            </div>
          </div>
        </motion.div>

        <div className="achievements-slider">
          <div className="achievements-track">
            {/* First set */}
            {achievementsData.map((item, index) => (
              <div key={`first-${index}`} className="achievement-card glass-card">
                <div className={`ac-icon ${item.color}`}>{item.icon}</div>
                <div className="ac-content">
                  <h3 className="ac-title">{item.title}</h3>
                  <p className="ac-desc">{item.desc}</p>
                </div>
                <div className={`ac-badge badge-${item.color}`}>{item.badge}</div>
              </div>
            ))}
            
            {/* Duplicate set for seamless scrolling */}
            {achievementsData.map((item, index) => (
              <div key={`second-${index}`} className="achievement-card glass-card">
                <div className={`ac-icon ${item.color}`}>{item.icon}</div>
                <div className="ac-content">
                  <h3 className="ac-title">{item.title}</h3>
                  <p className="ac-desc">{item.desc}</p>
                </div>
                <div className={`ac-badge badge-${item.color}`}>{item.badge}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="achievements-hint">Auto-scrolling — hover to pause</div>
      </div>
    </section>
  );
};

export default Achievements;
