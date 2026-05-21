import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled glass-panel' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-container container">
        <a href="#hero" className="navbar-logo">
          <span className="gradient-text">&lt;/&gt;</span> Inzamamul Haque
        </a>
        
        <div className="navbar-links desktop-only">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="nav-link">
              <span className="nav-num">0{index + 1}.</span> 
              <span className="nav-text">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="navbar-right desktop-only">
          <a href="https://drive.google.com/file/d/1kX4nifmpOPD5wrVOWRlvwzWWukRsSJ7m/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-outline resume-btn">
            Resume
          </a>
        </div>

        <div className="mobile-menu-btn mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="mobile-menu glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-num">0{index + 1}.</span> 
              <span className="nav-text">{link.name}</span>
            </a>
          ))}
          <a href="https://drive.google.com/file/d/1kX4nifmpOPD5wrVOWRlvwzWWukRsSJ7m/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-outline mobile-resume">
            Resume
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
