import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

import cloudStorageImg from '../assets/cloud_storage.png';
import ecommerceImg from '../assets/ecommerce.png';
import arVrImg from '../assets/ar_vr.png';
import meowtopiaImg from '../assets/meowtopia.png';
import creditScoreImg from '../assets/credit_score.png';
import asyncDocsImg from '../assets/async_docs.png';

import ProjectMedia from './ProjectMedia';

const projectsData = [
  {
    id: 1,
    category: 'fullstack',
    title: 'Cloud Storage System',
    desc: 'A full-stack cloud storage platform with user authentication, file upload/download, AWS S3 integration, duplicate-detection, and a per-operation storage billing system with usage dashboards.',
    images: ['/images/Billing1.png', '/images/Billing2.png', '/images/Billing3.png', '/images/Billing4.png', '/images/Billing5.png', '/images/Billing6.png'],
    tags: ['Node.js', 'Express.js', 'React', 'PostgreSQL', 'AWS S3', 'Tailwind CSS'],
    codeLink: 'https://github.com/Inzamamkhan786/Cloud-Storage-System',
    demoLink: 'https://drive.google.com/file/d/1_Cd99IGAlCLEkTtQg_ipNuRoqSYGPcvn/view?usp=sharing'
  },
  {
    id: 2,
    category: 'fullstack',
    title: 'IngeneousStore — E-Commerce',
    desc: 'A full-stack e-commerce platform with product browsing, cart management, user authentication, delivery address flow, and complete order placement with COD support.',
    images: ['/images/E-Commerce1.png', '/images/E-Commerce2.png', '/images/E-Commerce3.png', '/images/E-Commerce4.png', '/images/E-Commerce5.png', '/images/E-Commerce6.png'],
    tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    codeLink: 'https://github.com/Inzamamkhan786/E-commerce_Ingeneous_Store'
  },
  {
    id: 3,
    category: 'vr',
    title: 'AR/VR Interview Simulator',
    desc: 'An immersive VR interview simulator built for Meta Quest 3 with realistic office environments, AI-driven questions using Whisper AI for voice processing and Ollama for local LLM responses.',
    video: '/Videos/VN20260517_205627.mp4',
    tags: ['Unity', 'WebXR', 'Meta Quest 3', 'Whisper AI', 'Ollama', 'Node.js'],
    demoLink: 'https://drive.google.com/file/d/1VTkDSjnYetQ7YRkX46__qhGCdYoGVewi/view?usp=sharing'
  },
  {
    id: 4,
    category: 'fullstack',
    title: 'Meowtopia',
    desc: 'A cat-focused web platform where users can explore cat breeds via public APIs, share cat-related content, and interact with a community of cat lovers.',
    images: ['/images/Cat1.png', '/images/Cat2.png', '/images/Cat3.png', '/images/Cat4.png'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Cat API'],
    codeLink: 'https://github.com/Inzamamkhan786/Meowtopia'
  },
  {
    id: 5,
    category: 'ml',
    title: 'Credit Score Prediction',
    desc: 'A machine learning model that evaluates financial parameters — income, credit utilization, late payments, credit lines — to predict whether an applicant has a Good or Risky credit profile.',
    images: ['/images/CreditScore1.png', '/images/CreditScore2.png'],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Machine Learning', 'Data Analysis']
  },
  {
    id: 6,
    category: 'fullstack',
    title: 'Async Document System',
    desc: 'An asynchronous document processing platform where users can upload documents, track real-time processing status, and download results efficiently using background workers and queue-based architecture.',
    images: ['/images/Async1 (1).png', '/images/Async2.png', '/images/Async3.png', '/images/Async4.png', '/images/Async5.png'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    codeLink: 'https://github.com/Inzamamkhan786/async-document-system',
    demoLink: 'https://async-document-system.vercel.app'
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === filter);

  return (
    <section id="projects" className="section projects-section">
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
              <h2 className="section-title" style={{marginBottom: '0.5rem'}}>Projects</h2>
              <div className="sec-rule"></div>
              <p className="sec-sub text-secondary">What I've built</p>
            </div>
          </div>
        </motion.div>

        <div className="filter-row">
          {['all', 'fullstack', 'ml', 'vr'].map((btn) => (
            <button 
              key={btn}
              className={`filter-btn glass-panel ${filter === btn ? 'active' : ''}`}
              onClick={() => setFilter(btn)}
            >
              {btn === 'all' ? 'All' : 
               btn === 'fullstack' ? 'Full Stack' : 
               btn === 'ml' ? 'Machine Learning' : 'AR / VR'}
            </button>
          ))}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="project-card glass-card"
              >
                <div className="project-img-wrapper">
                  <ProjectMedia images={project.images} video={project.video} title={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.codeLink && (
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                          <FaGithub size={24} />
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link-icon">
                          <FaExternalLinkAlt size={22} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <span className="project-badge">{
                    project.category === 'fullstack' ? 'Full Stack' : 
                    project.category === 'ml' ? 'Machine Learning' : 'AR / VR'
                  }</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
