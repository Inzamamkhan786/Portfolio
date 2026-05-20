import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import './Experience.css';

const experienceData = [
  {
    type: 'work',
    title: 'Machine Learning Intern',
    organization: 'CODEALPHA',
    date: '2 Months',
    bullets: [
      'Developed a Credit Score Prediction System evaluating income, credit utilization, and payment history to classify profiles as Good or Risky.',
      'Trained ML models using Scikit-learn with Pandas and NumPy for data preprocessing and feature engineering.',
      'Serialized trained models with Joblib and integrated predictions into a live web interface (HTML/CSS/JS).',
      'Achieved real-time probability output and gauge visualization for end-user credit assessment.',
      'Delivered production-ready code with clean documentation as part of internship deliverables.'
    ]
  },
  {
    type: 'education',
    title: 'B.Tech — Computer Science & Engineering',
    organization: 'IIIT NAGPUR',
    date: '2023 – 2027',
    bullets: [
      'Currently in 3rd Year, building production-grade full-stack and ML projects.',
      'Active competitive programmer on LeetCode and CodeChef with 300+ problems solved.',
      'Won 1st prize at Render Riot (Blender 3D) and 2nd prize at IIT BHU Game Jam.'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="section experience-section">
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
              <h2 className="section-title" style={{marginBottom: '0.5rem'}}>Experience</h2>
              <div className="sec-rule"></div>
              <p className="sec-sub text-secondary">Professional journey</p>
            </div>
          </div>
        </motion.div>

        <div className="timeline-container">
          {experienceData.map((item, index) => (
            <motion.div 
              key={index} 
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="timeline-dot-wrapper">
                <div className={`timeline-dot ${item.type}`}>
                  {item.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                </div>
                {index !== experienceData.length - 1 && <div className="timeline-line"></div>}
              </div>
              
              <div className="timeline-content glass-panel">
                <div className="timeline-head">
                  <div>
                    <div className={`timeline-org ${item.type}`}>{item.organization}</div>
                    <div className="timeline-title">{item.title}</div>
                  </div>
                  <div className="timeline-date">{item.date}</div>
                </div>
                
                <ul className="timeline-bullets">
                  {item.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
