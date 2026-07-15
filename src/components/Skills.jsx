import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillsData = [
  {
    icon: '⚛️',
    title: 'Frontend Development',
    desc: 'Building fast, responsive web apps with React and modern CSS frameworks, focused on clean UX and smooth interactions.',
    tags: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript']
  },
  {
    icon: '🗄️',
    title: 'Backend Development',
    desc: 'Designing secure, scalable REST APIs with Node.js and Express.js. Authentication, middleware, and clean architecture patterns.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'PostgreSQL', 'MongoDB']
  },
  {
    icon: '🤖',
    title: 'Generative AI & AI Agents',
    desc: 'Designing autonomous multi-agent workflows, stateful graphs, and RAG pipelines using LangGraph and LangChain, integrated with local and cloud LLMs.',
    tags: ['LangGraph', 'LangChain', 'RAG', 'AI Agents', 'LLMs', 'Prompt Engineering']
  },
  {
    icon: '🧠',
    title: 'Machine Learning',
    desc: 'Developing ML models for classification, prediction, and data analysis using Python and Scikit-learn with real-world datasets.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Joblib']
  },
  {
    icon: '🏗️',
    title: 'System Design & LLD',
    desc: 'Designing scalable system architectures and applying Low-Level Design principles — SOLID, design patterns, clean code, and modular service structures.',
    tags: ['System Design', 'LLD', 'SOLID', 'Design Patterns', 'Clean Architecture']
  },
  {
    icon: '🥽',
    title: 'AR / VR Development',
    desc: 'Creating immersive extended-reality experiences using Unity and WebXR, including AI-integrated VR interview simulations for Meta Quest 3.',
    tags: ['Unity', 'WebXR', 'Meta Quest 3', 'Whisper AI', 'Ollama']
  },
  {
    icon: '⚡',
    title: 'DSA & Competitive Programming',
    desc: '300+ problems solved on LeetCode and CodeChef. Strong foundation in algorithms, data structures, and problem decomposition.',
    tags: ['C++', 'LeetCode', 'CodeChef', 'Algorithms']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="sec-bar">
            <div className="sec-line"></div>
            <div className="sec-info">
              <h2 className="section-title" style={{marginBottom: '0.5rem'}}>My Expertise</h2>
              <div className="sec-rule"></div>
              <p className="sec-sub text-secondary">What I build with</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillsData.map((skill, index) => (
            <motion.div key={index} className="skill-card glass-card" variants={itemVariants}>
              <div className="skill-icon-wrapper">
                <span className="skill-icon">{skill.icon}</span>
              </div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-desc">{skill.desc}</p>
              <div className="skill-tags">
                {skill.tags.map((tag, i) => (
                  <span key={i} className="skill-tag glass-panel">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
