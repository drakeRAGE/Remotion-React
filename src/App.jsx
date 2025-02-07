import React from 'react';
import { Player } from '@remotion/player';
import { MyVideo } from './components/MyVideo';
import { motion } from 'framer-motion';

function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '1024px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Remotion Animation
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            aspectRatio: '16/9',
            backgroundColor: 'black',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Player
            component={MyVideo}
            durationInFrames={240}
            fps={60}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{ width: '100%', height: '100%' }}
            controls
            autoPlay
            loop
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
