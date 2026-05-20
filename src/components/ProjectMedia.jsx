import React, { useState, useEffect } from 'react';

const ProjectMedia = ({ images, video, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (video) {
    return (
      <div className="project-media-wrapper" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <video 
          src={video} 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  if (images && images.length > 0) {
    return (
      <div className="project-media-wrapper" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`${title} - slide ${idx + 1}`} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: idx === currentIndex ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }} 
          />
        ))}
        {images.length > 1 && (
          <div style={{ position: 'absolute', bottom: '10px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '5px' }}>
            {images.map((_, idx) => (
              <span 
                key={idx} 
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: idx === currentIndex ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.4)',
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ProjectMedia;
