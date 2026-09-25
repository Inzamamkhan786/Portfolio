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
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

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

        <div 
          className="navbar-right desktop-only resume-dropdown-wrapper"
          onMouseEnter={() => setResumeDropdownOpen(true)}
          onMouseLeave={() => setResumeDropdownOpen(false)}
        >
          <button 
            type="button"
            className="btn btn-outline resume-btn"
            onClick={() => setResumeDropdownOpen(prev => !prev)}
            aria-expanded={resumeDropdownOpen}
          >
            Resume ▾
          </button>

          {resumeDropdownOpen && (
            <div className="resume-dropdown-menu glass-panel">
              <a 
                href="https://drive.google.com/file/d/1-TymIXKRXCmiTpAhXS64vUrL4aciM7N3/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="resume-dropdown-item"
              >
                <div className="dropdown-title">AI Engineer</div>
                <div className="dropdown-sub">haque_AI_Resume.pdf ↗</div>
              </a>
              <div className="dropdown-sep"></div>
              <a 
                href="https://drive.google.com/file/d/1GR_XUVljZNknCv1Zzf-JE4-iBt4QOhCQ/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="resume-dropdown-item"
              >
                <div className="dropdown-title">Software Developer</div>
                <div className="dropdown-sub">SDE / SWE Resume ↗</div>
              </a>
            </div>
          )}
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
          <div className="mobile-resume-container">
            <a 
              href="https://drive.google.com/file/d/1-TymIXKRXCmiTpAhXS64vUrL4aciM7N3/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary mobile-resume-btn"
            >
              AI Engineer Resume
            </a>
            <a 
              href="https://drive.google.com/file/d/1GR_XUVljZNknCv1Zzf-JE4-iBt4QOhCQ/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline mobile-resume-btn"
            >
              Software Developer Resume
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
