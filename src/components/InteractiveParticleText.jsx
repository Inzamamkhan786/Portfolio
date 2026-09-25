import React, { useEffect, useRef } from 'react';

export default function InteractiveParticleText({
  line1 = 'Md Inzamamul',
  line2 = 'Haque',
  className = '',
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const pointerState = pointerRef.current;

    const rebuildParticles = () => {
      const rect = wrapper.getBoundingClientRect();
      const width = Math.floor(rect.width) || 480;
      const height = Math.floor(rect.height) || 150;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

      // Physical canvas dimensions (retina/HiDPI ready)
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Logical offscreen canvas for sampling exact pixel coordinates
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offscreenContext = offscreen.getContext('2d');
      if (!offscreenContext) return;

      offscreenContext.clearRect(0, 0, width, height);
      offscreenContext.textAlign = 'left';
      offscreenContext.textBaseline = 'middle';

      const fontStack = "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

      // Dynamically calculate font size to comfortably fit the container
      const testSize = 54;
      offscreenContext.font = `800 ${testSize}px ${fontStack}`;
      const testL1W = offscreenContext.measureText(line1).width;

      const scaleW = (width * 0.94) / testL1W;
      const scaleH = (height * 0.42) / testSize;
      const scale = Math.min(scaleW, scaleH);
      const fontSize = Math.max(Math.min(Math.floor(testSize * scale), 62), 26);

      offscreenContext.font = `800 ${fontSize}px ${fontStack}`;
      const l1Width = offscreenContext.measureText(line1).width;
      const l2Width = offscreenContext.measureText(line2).width;

      const isCentered = window.innerWidth <= 968;
      const startX1 = isCentered ? Math.max(Math.round((width - l1Width) / 2), 2) : 2;
      const startX2 = isCentered ? Math.max(Math.round((width - l2Width) / 2), 2) : 2;

      const y1 = Math.round(height * 0.28);
      const y2 = Math.round(height * 0.74);

      // Line 1: Md Inzamamul (clean bright white)
      offscreenContext.fillStyle = '#FFFFFF';
      offscreenContext.fillText(line1, startX1, y1);

      // Line 2: Haque (signature cyan-to-purple gradient)
      const grad = offscreenContext.createLinearGradient(startX2, y2, startX2 + l2Width, y2);
      grad.addColorStop(0, '#06B6D4'); // cyan
      grad.addColorStop(0.5, '#38BDF8'); // sky blue
      grad.addColorStop(1, '#8B5CF6'); // purple
      offscreenContext.fillStyle = grad;
      offscreenContext.fillText(line2, startX2, y2);

      // Sample pixels
      const imageData = offscreenContext.getImageData(0, 0, width, height).data;
      const particles = [];

      const step = fontSize < 40 ? 1.7 : 2.1;
      const baseRadius = fontSize < 40 ? 1.4 : Math.max(1.5, fontSize * 0.032);
      const accentRadius = baseRadius * 1.3;

      for (let y = 0; y < height; y += step) {
        const py = Math.floor(y);
        for (let x = 0; x < width; x += step) {
          const px = Math.floor(x);
          const index = (py * width + px) * 4;
          const alpha = imageData[index + 3];
          if (alpha < 24) continue;

          const red = imageData[index];
          const green = imageData[index + 1];
          const blue = imageData[index + 2];

          const isAccent = (px + py) % 7 === 0 || (px + py) % 11 === 0;
          const particleColor = `rgba(${red}, ${green}, ${blue}, 1)`;

          particles.push({
            x: px + (Math.random() - 0.5) * 0.3,
            y: py + (Math.random() - 0.5) * 0.3,
            baseX: px,
            baseY: py,
            vx: 0,
            vy: 0,
            radius: isAccent ? accentRadius : baseRadius,
            seed: Math.random() * Math.PI * 2,
            color: particleColor,
          });
        }
      }

      particlesRef.current = particles;
    };

    const draw = (timestamp) => {
      const rect = wrapper.getBoundingClientRect();
      const width = Math.floor(rect.width) || 480;
      const height = Math.floor(rect.height) || 150;

      context.clearRect(0, 0, width, height);

      // Pointer glow effect
      if (pointerState.active) {
        const glowRadius = Math.max(50, Math.min(width * 0.25, 95));
        const glow = context.createRadialGradient(
          pointerState.x,
          pointerState.y,
          0,
          pointerState.x,
          pointerState.y,
          glowRadius
        );
        glow.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
        glow.addColorStop(0.4, 'rgba(139, 92, 246, 0.15)');
        glow.addColorStop(1, 'rgba(6, 182, 212, 0)');

        context.fillStyle = glow;
        context.beginPath();
        context.arc(pointerState.x, pointerState.y, glowRadius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = 'rgba(6, 182, 212, 0.85)';
        context.beginPath();
        context.arc(pointerState.x, pointerState.y, 2.5, 0, Math.PI * 2);
        context.fill();
      }

      const particles = particlesRef.current;
      const interactDist = Math.max(55, Math.min(width * 0.24, 95));

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Pointer repulsion (mouse or touch)
        if (pointerState.active) {
          const dx = pointerState.x - particle.x;
          const dy = pointerState.y - particle.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < interactDist) {
            const force = (1 - distance / interactDist) * 2.0;
            particle.vx -= (dx / distance) * force * 2.0;
            particle.vy -= (dy / distance) * force * 2.0;
          }
        }

        // Subtle ambient organic drift
        const driftX = Math.sin(timestamp * 0.0013 + particle.seed) * 0.5;
        const driftY = Math.cos(timestamp * 0.0011 + particle.seed) * 0.4;
        particle.vx += (particle.baseX + driftX - particle.x) * 0.02;
        particle.vy += (particle.baseY + driftY - particle.y) * 0.02;

        // Snap back spring force
        particle.vx += (particle.baseX - particle.x) * 0.08;
        particle.vy += (particle.baseY - particle.y) * 0.08;

        // Physics integration
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.73;
        particle.vy *= 0.73;

        // Draw particle dot
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      animationRef.current = window.requestAnimationFrame(draw);
    };

    const updatePointer = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      pointerState.x = clientX - rect.left;
      pointerState.y = clientY - rect.top;
      pointerState.active = true;
    };

    const handlePointerMove = (e) => updatePointer(e.clientX, e.clientY);
    const handlePointerDown = (e) => updatePointer(e.clientX, e.clientY);
    const handlePointerUp = () => {
      pointerState.active = false;
    };
    const handlePointerLeave = () => {
      pointerState.active = false;
    };

    rebuildParticles();
    animationRef.current = window.requestAnimationFrame(draw);

    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => rebuildParticles())
        .catch(() => {});
    }

    let lastW = 0;
    let lastH = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        const h = Math.floor(entry.contentRect.height);
        if (w > 0 && h > 0 && (w !== lastW || h !== lastH)) {
          lastW = w;
          lastH = h;
          rebuildParticles();
        }
      }
    });
    resizeObserver.observe(wrapper);

    wrapper.addEventListener('pointermove', handlePointerMove, { passive: true });
    wrapper.addEventListener('pointerdown', handlePointerDown, { passive: true });
    wrapper.addEventListener('pointerup', handlePointerUp, { passive: true });
    wrapper.addEventListener('pointercancel', handlePointerUp, { passive: true });
    wrapper.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
      wrapper.removeEventListener('pointermove', handlePointerMove);
      wrapper.removeEventListener('pointerdown', handlePointerDown);
      wrapper.removeEventListener('pointerup', handlePointerUp);
      wrapper.removeEventListener('pointercancel', handlePointerUp);
      wrapper.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [line1, line2]);

  return (
    <div
      ref={wrapperRef}
      className={`relative block select-none touch-pan-y ${className}`}
      aria-label={`${line1} ${line2}`}
      style={{ touchAction: 'pan-y' }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-hidden="true"
      />
      <h1 className="sr-only">{line1} {line2}</h1>
    </div>
  );
}
