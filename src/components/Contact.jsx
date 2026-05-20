import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaCode, FaFileAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    
    setIsSending(true);
    setStatus('');

    const formData = new FormData(formRef.current);
    const templateParams = {
      name: formData.get('name'),
      email: formData.get('email'),
      title: formData.get('title'),
      message: formData.get('message')
    };

    emailjs.send(
      'service_rafkbra',
      'template_cdjcmxu',
      templateParams,
      { publicKey: 'YjMU-SL9rCDj5n357' }
    )
    .then(() => {
      setStatus('success');
      setIsSending(false);
      formRef.current.reset();
      
      setTimeout(() => setStatus(''), 5000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      setStatus('error');
      setIsSending(false);
    });
  };

  return (
    <section id="contact" className="section contact-section">
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
              <h2 className="section-title" style={{marginBottom: '0.5rem'}}>Get In Touch</h2>
              <div className="sec-rule"></div>
              <p className="sec-sub text-secondary">Let's work together</p>
            </div>
          </div>
        </motion.div>

        <div className="contact-wrap">
          <motion.div 
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="open-badge">
              <div className="open-dot"></div> Open for opportunities
            </div>
            
            <h3 className="contact-heading">
              Let's Build<br/>
              <span className="text-gradient">Something</span><br/>
              Together
            </h3>
            
            <p className="contact-desc">
              Looking for internships, freelance projects, or collaboration on full-stack or ML work. Always happy to discuss interesting ideas!
            </p>

            <a href="mailto:haquemdinzamamul3@gmail.com" className="contact-email glass-panel">
              <div className="em-icon">
                <FaEnvelope size={24} />
              </div>
              <div className="em-text">
                <div className="em-label">Email me at</div>
                <div className="em-val">haquemdinzamamul3@gmail.com</div>
              </div>
              <span className="em-arrow">→</span>
            </a>

            <div className="social-row">
              <a href="https://github.com/Inzamamkhan786" target="_blank" rel="noopener noreferrer" className="soc-link" title="GitHub">
                <FaGithub size={22} />
              </a>
              <a href="https://www.linkedin.com/in/md-inzamamul-haque-831b09323/" target="_blank" rel="noopener noreferrer" className="soc-link" title="LinkedIn">
                <FaLinkedin size={22} />
              </a>
              <a href="https://leetcode.com/u/Inzamam8/" target="_blank" rel="noopener noreferrer" className="soc-link" title="LeetCode">
                <FaCode size={22} />
              </a>
              <a href="https://www.codechef.com/users/md_haque_123" target="_blank" rel="noopener noreferrer" className="soc-link" title="CodeChef">
                <span className="soc-text-icon">CC</span>
              </a>
              <a href="https://drive.google.com/file/d/14TOIMqb6eRBowGpGXBfHQrMNw4u-hwbg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="soc-link" title="Resume">
                <FaFileAlt size={22} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            className="contact-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="form-header">
              <FaPaperPlane className="form-icon" />
              <span>Send a Message</span>
            </div>
            
            <form ref={formRef} onSubmit={sendEmail} className="contact-form glass-card">
              <div className="form-row">
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  placeholder="Your name" 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="Email address" 
                  required 
                />
              </div>
              
              <input 
                type="text" 
                name="title" 
                className="form-input" 
                placeholder="Subject" 
                required 
              />
              
              <textarea 
                name="message" 
                className="form-textarea" 
                placeholder="Tell me about your project or opportunity..." 
                required
              ></textarea>
              
              <button 
                type="submit" 
                className={`btn-send ${status === 'success' ? 'success' : ''}`}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : 'Send Message'}
              </button>
              
              {status === 'error' && (
                <div className="form-error">
                  ❌ Could not send. Email me directly at haquemdinzamamul3@gmail.com
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
