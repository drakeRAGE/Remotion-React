import React from 'react';
import { Player } from '@remotion/player';
import { MyVideo } from './components/MyVideo';

function App() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#1f2937',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          Remotion Animation
        </h1>
        <div style={{
          aspectRatio: '16/9',
          backgroundColor: 'black',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <Player
            component={MyVideo}
            durationInFrames={60}
            fps={30}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{
              width: '100%',
              height: '100%'
            }}
            controls
          />
        </div>
      </div>
    </div>
  );
}

export default App;