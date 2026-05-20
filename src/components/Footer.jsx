import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-content">
        <span className="copyright">© 2026 Md Inzamamul Haque · IIIT Nagpur</span>
        <div className="footer-links">
          <a href="#hero" className="flink">Home</a>
          <a href="#projects" className="flink">Projects</a>
          <a href="#contact" className="flink">Contact</a>
          <a 
            href="https://drive.google.com/file/d/14TOIMqb6eRBowGpGXBfHQrMNw4u-hwbg/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flink"
          >
            Resume ↗
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
