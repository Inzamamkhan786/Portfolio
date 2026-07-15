import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import portrait from '../assets/portrait.png';
import './Hero.css';
import StarField from './StarField';

const Hero = () => {
  return (
    <section id="hero" className="hero-section section">
      <StarField />
      
      {/* Background Orbs */}
      <div className="bg-glow glow-cyan hero-glow-1"></div>
      <div className="bg-glow glow-purple hero-glow-2"></div>

      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-badge glass-panel">
            <div className="badge-dot"></div>
            <span>3rd Year · <strong>IIIT Nagpur</strong> · B.Tech CSE</span>
          </div>
          
          <h2 className="hero-greeting">HELLO, I'M</h2>
          <h1 className="hero-name">
            Md Inzamamul <br/> <span className="gradient-text">Haque</span>
          </h1>
          
          <div className="hero-roles">
            <span className="role-tag">Full Stack Developer</span>
            <span className="role-tag">AI Agent Engineer</span>
            <span className="role-tag">ML Engineer</span>
          </div>
          
          <p className="hero-description">
            I build scalable full-stack systems, design autonomous AI agents using LangChain & LangGraph, and craft intelligent ML models and immersive AR/VR experiences.
          </p>
          
          <div className="hero-actions">
            <a href="https://drive.google.com/file/d/1kX4nifmpOPD5wrVOWRlvwzWWukRsSJ7m/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Download Resume
            </a>
            <div className="hero-socials">
              <a href="https://github.com/Inzamamkhan786" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub size={22} />
              </a>
              <a href="https://www.linkedin.com/in/md-inzamamul-haque-831b09323/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{color: '#0A66C2'}}>
                <FaLinkedin size={22} />
              </a>
              <a href="https://leetcode.com/u/Inzamam8/" target="_blank" rel="noopener noreferrer" className="social-icon" style={{color: '#FFA116'}}>
                <SiLeetcode size={22} />
              </a>
              <a href="https://www.codechef.com/users/md_haque_123" target="_blank" rel="noopener noreferrer" className="social-icon" style={{color: '#5B4638'}}>
                <SiCodechef size={22} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="portrait-container">
            <div className="portrait-ring ring-1"></div>
            <div className="portrait-ring ring-2"></div>
            <img src={portrait} alt="Md Inzamamul Haque" className="portrait-image" />
            
            {/* Floating Badges */}
            <motion.div 
              className="floating-badge badge-react glass-panel"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              React.js
            </motion.div>
            <motion.div 
              className="floating-badge badge-ai glass-panel"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }}
            >
              AI Agents
            </motion.div>
            <motion.div 
              className="floating-badge badge-node glass-panel"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            >
              Node.js
            </motion.div>
            <motion.div 
              className="floating-badge badge-ml glass-panel"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2 }}
            >
              Machine Learning
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
