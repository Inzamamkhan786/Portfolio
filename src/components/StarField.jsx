import React, { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    let animationFrameId;
    let timeoutId;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth * DPR;
      canvas.height = parent.offsetHeight * DPR;
      canvas.style.width = parent.offsetWidth + 'px';
      canvas.style.height = parent.offsetHeight + 'px';
    };
    
    resize();
    window.addEventListener('resize', resize);

    // Generate stars with varied sizes and colours
    const N = 320;
    const stars = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.004,
      col: Math.random() < 0.12 ? [179, 157, 219] : Math.random() < 0.08 ? [128, 222, 234] : [255, 255, 255],
    }));

    // Shooting star state
    let shot = null;
    const spawnShot = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const W = parent.offsetWidth;
      const H = parent.offsetHeight;
      shot = { 
        x: Math.random() * W * 0.6, 
        y: Math.random() * H * 0.4, 
        vx: 4 + Math.random() * 3, 
        vy: 1.5 + Math.random() * 2, 
        life: 1 
      };
      timeoutId = setTimeout(spawnShot, 4000 + Math.random() * 5000);
    };
    
    timeoutId = setTimeout(spawnShot, 2000);

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const W = parent.offsetWidth;
      const H = parent.offsetHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Nebula blobs
      [[0.15, 0.25, 140, 'rgba(0,100,160,0.07)'], [0.85, 0.65, 180, 'rgba(80,20,140,0.09)'], [0.5, 0.8, 100, 'rgba(0,150,120,0.05)']].forEach(([fx, fy, r, c]) => {
        const g = ctx.createRadialGradient(fx * W * DPR, fy * H * DPR, 0, fx * W * DPR, fy * H * DPR, r * DPR);
        g.addColorStop(0, c); 
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; 
        ctx.beginPath(); 
        ctx.arc(fx * W * DPR, fy * H * DPR, r * DPR, 0, Math.PI * 2); 
        ctx.fill();
      });

      // Stars
      stars.forEach(s => {
        s.phase += s.speed;
        const a = 0.35 + 0.65 * Math.abs(Math.sin(s.phase));
        const [r, g, b] = s.col;
        ctx.beginPath();
        ctx.arc(s.x * W * DPR, s.y * H * DPR, s.r * DPR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`;
        ctx.fill();
      });

      // Shooting star
      if (shot) {
        const tail = 60 * DPR;
        const grad = ctx.createLinearGradient(
          (shot.x - shot.vx * (tail / shot.vx)) * DPR, 
          (shot.y - shot.vy * (tail / shot.vy)) * DPR, 
          shot.x * DPR, 
          shot.y * DPR
        );
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(1, `rgba(255,255,255,${(shot.life * 0.7).toFixed(2)})`);
        
        ctx.beginPath(); 
        ctx.moveTo((shot.x - shot.vx * 20) * DPR, (shot.y - shot.vy * 20) * DPR); 
        ctx.lineTo(shot.x * DPR, shot.y * DPR);
        ctx.strokeStyle = grad; 
        ctx.lineWidth = 1.5 * DPR; 
        ctx.stroke();
        
        shot.x += shot.vx; 
        shot.y += shot.vy; 
        shot.life -= 0.012;
        
        if (shot.life <= 0 || shot.x > W || shot.y > H) shot = null;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }} 
    />
  );
};

export default StarField;
