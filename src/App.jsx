import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400); // Wait briefly before hiding
          return 100;
        }
        return prev + 2; // Increment smoothly
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {loading && (
        <div id="loader" className="loader">
          <div className="loader-content">
            <div className="loader-logo-ring">
              <span className="loader-logo-text">I</span>
            </div>
            
            <h2 className="loader-name">MD INZAMAMUL HAQUE</h2>
            <p className="loader-roles">FULL STACK DEVELOPER | ML ENGINEER</p>
            
            <div className="loader-progress-container">
              <div className="loader-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            
            <p className="loader-status">Almost ready...</p>
            
            <div className="loader-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

      <div className={`app-container ${loading ? 'hidden' : 'visible'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Achievements />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;
