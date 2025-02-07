import React from 'react';
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

const FloatingShapes = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          x: [Math.random() * 100, Math.random() * -100],
          y: [Math.random() * 100, Math.random() * -100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          delay: i * 0.5,
        }}
        style={{
          position: 'absolute',
          width: '100px',
          height: '100px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          left: `${Math.random() * 80}%`,
          top: `${Math.random() * 80}%`,
        }}
      />
    ))}
  </div>
);

const AnimatedText = ({ text, delay = 0, style = {} }) => {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + (i * 0.05),
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <motion.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...style,
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            display: 'inline-block',
            whiteSpace: 'pre',
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const GradientText = ({ text, delay = 0 }) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: '120px',
        fontWeight: '800',
        background: 'linear-gradient(to right, #60a5fa, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '30px',
        textShadow: '0 0 30px rgba(255,255,255,0.2)',
      }}
    >
      <AnimatedText text={text} delay={delay} />
    </motion.div>
  );
};

export const MyVideo = () => {
  return (
    <div style={{
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <GradientBackground />
      <FloatingShapes />
      
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        <AnimatedText 
          text="Welcome to"
          delay={0.2}
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
          }}
        />

        <GradientText text="Remotion" delay={1} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              delay: 2,
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
            }
          }}
        >
          <AnimatedText 
            text="Create amazing videos with React"
            delay={2.2}
            style={{
              fontSize: '32px',
              color: '#e2e8f0',
              textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};