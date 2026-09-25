import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';

const ProjectMedia = ({ images, video, iframeVideo, thumbnail, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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

  if (iframeVideo) {
    const posterImg = thumbnail || (images && images[0]) || '/images/InterviewSimulation.png';

    if (!isPlaying) {
      return (
        <div 
          className="project-media-wrapper video-poster-wrapper" 
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative', 
            overflow: 'hidden', 
            cursor: 'pointer',
            backgroundColor: '#0B0F19'
          }}
          onClick={() => setIsPlaying(true)}
          role="button"
          tabIndex={0}
          aria-label={`Play ${title} demo video`}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsPlaying(true); }}
        >
          <img 
            src={posterImg} 
            alt={`${title} Thumbnail`} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }} 
            className="video-poster-img"
          />
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(11, 15, 25, 0.3), rgba(11, 15, 25, 0.7))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'background 0.3s ease'
            }}
            className="video-poster-overlay"
          >
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)',
                color: '#FFFFFF',
                paddingLeft: '3px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              className="video-play-btn"
            >
              <FaPlay size={20} />
            </div>
            <span 
              style={{ 
                color: '#F3F4F6', 
                fontSize: '0.82rem', 
                fontWeight: '600', 
                letterSpacing: '0.5px',
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              Click to Play Video
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="project-media-wrapper" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <iframe 
          src={iframeVideo.includes('?') ? `${iframeVideo}&autoplay=1` : `${iframeVideo}?autoplay=1`} 
          style={{ width: '100%', height: '100%', border: 'none', objectFit: 'cover' }}
          allow="autoplay; fullscreen; encrypted-media"
          title={`${title} Video`}
        ></iframe>
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
