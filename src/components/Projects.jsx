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
    title: 'Rentro — Vehicle Rental Platform',
    desc: 'A peer-to-peer vehicle rental ecosystem with Consumer and Provider roles. Features custom document verification (License/RC), pricing management, booking scheduling, and a real-time support chat system.',
    images: ['/images/rentro_dashboard.png', '/images/rentro_provider.png'],
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Multer', 'REST API'],
    codeLink: 'https://github.com/Inzamamkhan786/Rentro',
    demoLink: 'https://rentro-tau.vercel.app/'
  },
  {
    id: 3,
    category: 'fullstack',
    title: 'IngeneousStore — E-Commerce',
    desc: 'A full-stack e-commerce platform with product browsing, cart management, user authentication, delivery address flow, and complete order placement with COD support.',
    images: ['/images/E-Commerce1.png', '/images/E-Commerce2.png', '/images/E-Commerce3.png', '/images/E-Commerce4.png', '/images/E-Commerce5.png', '/images/E-Commerce6.png'],
    tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Tailwind CSS'],
    codeLink: 'https://github.com/Inzamamkhan786/E-commerce_Ingeneous_Store'
  },
  {
    id: 4,
    category: 'vr',
    title: 'AR/VR Interview Simulator',
    desc: 'An immersive VR interview simulator built for Meta Quest 3 with realistic office environments, AI-driven questions using Whisper AI for voice processing and Ollama for local LLM responses.',
    iframeVideo: 'https://drive.google.com/file/d/1VTkDSjnYetQ7YRkX46__qhGCdYoGVewi/preview',
    tags: ['Unity', 'WebXR', 'Meta Quest 3', 'Whisper AI', 'Ollama', 'Node.js'],
    demoLink: 'https://drive.google.com/file/d/1VTkDSjnYetQ7YRkX46__qhGCdYoGVewi/view?usp=sharing'
  },
  {
    id: 5,
    category: 'ml',
    title: 'NovaCRM — AI Marketing Platform',
    desc: 'An AI-native CRM and marketing platform featuring smart audience segmentation, multi-channel campaigns (Email, SMS, WhatsApp, RCS), async delivery simulation, and a GPT-4o-powered AI Assistant to orchestrate campaigns.',
    images: ['/images/novacrm_dashboard.png', '/images/novacrm_campaign.png'],
    tags: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'OpenAI API', 'Tailwind CSS'],
    codeLink: 'https://github.com/Inzamamkhan786/CRM_Marketing',
    demoLink: 'https://crm-marketing-n61t.vercel.app'
  },
  {
    id: 6,
    category: 'ml',
    title: 'Autonomous Blog Writing Agent',
    desc: 'A stateful multi-agent system built using LangGraph that orchestrates specialized agents—Planner, Researcher, Writer, and Editor—to collaboratively write, review, and refine comprehensive articles with citation support.',
    images: ['/images/blog_agent_dashboard.png', '/images/blog_agent_graph.png'],
    tags: ['LangGraph', 'LangChain', 'Streamlit', 'Python', 'Google Gemini'],
    codeLink: 'https://github.com/Inzamamkhan786/blog-writing-agent'
  },
  {
    id: 7,
    category: 'fullstack',
    title: 'Meowtopia',
    desc: 'A cat-focused web platform where users can explore cat breeds via public APIs, share cat-related content, and interact with a community of cat lovers.',
    images: ['/images/Cat1.png', '/images/Cat2.png', '/images/Cat3.png', '/images/Cat4.png'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Cat API'],
    codeLink: 'https://github.com/Inzamamkhan786/Meowtopia'
  },
  {
    id: 8,
    category: 'ml',
    title: 'Credit Score Prediction',
    desc: 'A machine learning model that evaluates financial parameters — income, credit utilization, late payments, credit lines — to predict whether an applicant has a Good or Risky credit profile.',
    images: ['/images/CreditScore1.png', '/images/CreditScore2.png'],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Machine Learning', 'Data Analysis']
  },
  {
    id: 9,
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
               btn === 'ml' ? 'AI & ML' : 'AR / VR'}
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
                  <ProjectMedia images={project.images} video={project.video} iframeVideo={project.iframeVideo} title={project.title} />
                  {!project.iframeVideo && (
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
                  )}
                </div>
                
                <div className="project-content">
                  <span className="project-badge">{
                    project.category === 'fullstack' ? 'Full Stack' : 
                    project.category === 'ml' ? 'AI & ML' : 'AR / VR'
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
