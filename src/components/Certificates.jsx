import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Certificates.css';

const certificatesData = [
  {
    issuer: 'CodeAlpha',
    title: 'Machine Learning Internship',
    date: 'Oct 2025 - Jan 2026',
    desc: 'Completed a comprehensive internship focused on Machine Learning models and data pipelines.',
    link: 'https://drive.google.com/drive/folders/1pfar0ImllMvbkeRVpWu1y9sqNZujRwEF?usp=sharing',
    icon: '🏅',
    color: 'gold'
  },
  {
    issuer: 'CodeTech',
    title: 'MERN Stack Internship',
    date: 'Nov 2025 - Dec 2025',
    desc: 'Built scalable web applications using MongoDB, Express.js, React, and Node.js.',
    link: 'https://drive.google.com/drive/folders/1pfar0ImllMvbkeRVpWu1y9sqNZujRwEF?usp=sharing',
    icon: '💻',
    color: 'cyan'
  },
  {
    issuer: 'IIIT Nagpur',
    title: 'Senior Coordinator - Hospitality',
    date: 'Tantrafiesta Technical Fest',
    desc: 'Managed hospitality and coordination for Tantrafiesta, IIIT Nagpur\'s flagship technical fest.',
    icon: '🎪',
    color: 'pink'
  },
  {
    issuer: 'Industrial Workshop',
    title: 'Unity Hands-on Workshop',
    date: 'One Week Program',
    desc: 'Completed an intensive hands-on Unity workshop led by industrial specialist Rahul Kumar.',
    icon: '🎮',
    color: 'purple'
  },
  {
    issuer: 'Kaggle',
    title: 'Python Programming',
    date: 'March 2026',
    desc: 'Completed rigorous Python programming and data science fundamentals from Kaggle.',
    link: 'https://drive.google.com/drive/folders/1pfar0ImllMvbkeRVpWu1y9sqNZujRwEF?usp=sharing',
    icon: '🐍',
    color: 'blue'
  },
  {
    issuer: 'NVIDIA',
    title: 'CUDA Programming',
    date: 'Certification',
    desc: 'Completed comprehensive CUDA programming course for GPU-accelerated computing from NVIDIA.',
    link: 'https://www.linkedin.com/in/md-inzamamulhaque/overlay/Certifications/266456105/treasury/?profileId=ACoAAFHbNWUBv6fONXvAhKKGS-P4tNqgqELtRBg',
    icon: '⚡',
    color: 'green'
  }
];

const Certificates = () => {
  return (
    <section id="certificates" className="section certificates-section">
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
              <h2 className="section-title" style={{marginBottom: '0.5rem'}}>Certificates</h2>
              <div className="sec-rule"></div>
              <p className="sec-sub text-secondary">Credentials & milestones</p>
            </div>
          </div>
        </motion.div>

        <div className="certificates-slider">
          <div className="certificates-track">
            {/* First set */}
            {certificatesData.map((cert, index) => (
              <div key={`first-${index}`} className="cert-card glass-card">
                <div className={`cert-icon ${cert.color}`}>{cert.icon}</div>
                <div className="cert-content">
                  <div className="cert-issuer">{cert.issuer}</div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-desc">{cert.desc}</p>
                </div>
                <div className="cert-footer">
                  <div className={`cert-date badge-${cert.color}`}>{cert.date}</div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className={`cert-link link-${cert.color}`}>
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless scrolling */}
            {certificatesData.map((cert, index) => (
              <div key={`second-${index}`} className="cert-card glass-card">
                <div className={`cert-icon ${cert.color}`}>{cert.icon}</div>
                <div className="cert-content">
                  <div className="cert-issuer">{cert.issuer}</div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-desc">{cert.desc}</p>
                </div>
                <div className="cert-footer">
                  <div className={`cert-date badge-${cert.color}`}>{cert.date}</div>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className={`cert-link link-${cert.color}`}>
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="certificates-hint">Auto-scrolling — hover to pause</div>
      </div>
    </section>
  );
};

export default Certificates;
