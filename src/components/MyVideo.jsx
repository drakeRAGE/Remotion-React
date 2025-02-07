import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { motion } from 'framer-motion';

const GradientBackground = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, #1a365d 0%, #3b82f6 50%, #7c3aed 100%)',
      opacity: 0.8,
    }}
  />
);

const FloatingShapes = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {[...Array(10)].map((_, i) => {
        const progress = (frame / 120) * Math.PI * 2;
        const x = Math.sin(progress + i) * 100;
        const y = Math.cos(progress + i) * 100;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              left: `${ i * 10}%`,
              top: `${ i * 10}%`,
              transform: `translate(${x}px, ${y}px) rotate(${frame * 2}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export const MyVideo = () => {
  const frame = useCurrentFrame();

  // Welcome text animation (0-30 frames)
  const welcomeOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const welcomeY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // Remotion text animation (30-60 frames)
  const remotionOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const remotionScale = interpolate(frame, [30, 60], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Description text animation (60-90 frames)
  const descriptionOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descriptionY = interpolate(frame, [60, 90], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <GradientBackground />
      <FloatingShapes />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        {/* Welcome Text */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            opacity: welcomeOpacity,
            transform: `translateY(${welcomeY}px)`,
          }}
        >
          Welcome to
        </div>

        {/* Remotion Text */}
        <div
          style={{
            fontSize: '120px',
            fontWeight: '800',
            background: 'linear-gradient(to right, #60a5fa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '30px',
            textShadow: '0 0 30px rgba(255,255,255,0.2)',
            opacity: remotionOpacity,
            transform: `scale(${remotionScale})`,
          }}
        >
          Remotion
        </div>

        {/* Description Text */}
        <div
          style={{
            fontSize: '32px',
            color: '#e2e8f0',
            textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
            opacity: descriptionOpacity,
            transform: `translateY(${descriptionY}px)`,
          }}
        >
          Create amazing videos with React
        </div>
      </div>
    </div>
  );
};
