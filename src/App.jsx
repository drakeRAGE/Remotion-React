import { useRef, useCallback, useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { ApiVideo } from './components/ApiVideo';
import { motion } from 'framer-motion';

function App() {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isActuallyCapturing, setIsActuallyCapturing] = useState(false);
  
  const waitForContent = useCallback(() => {
    return new Promise((resolve) => {
      // First, check if content is already there
      const container = containerRef.current;
      if (container && container.querySelector('[data-remotion-canvas]')) {
        resolve();
        return;
      }

      // If not, observe for changes
      const observer = new MutationObserver((mutations, obs) => {
        const container = containerRef.current;
        if (container && container.querySelector('[data-remotion-canvas]')) {
          obs.disconnect();
          resolve();
        }
      });

      observer.observe(containerRef.current, {
        childList: true,
        subtree: true
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        observer.disconnect();
        resolve();
      }, 5000);
    });
  }, []);

  const captureFrame = useCallback(async () => {
    try {
      if (!containerRef.current) {
        console.error('Container not found');
        return;
      }

      setIsCapturing(true);

      // Wait for Remotion content to be ready
      await waitForContent();

      // Wait a bit more for animations
      await new Promise(resolve => setTimeout(resolve, 500));

      // Hide the capturing overlay before taking the screenshot
      setIsActuallyCapturing(true);
      
      // Wait for the state to update
      await new Promise(resolve => setTimeout(resolve, 0));

      // Get the container dimensions
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Save current scroll position
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      // Scroll the container into view
      container.scrollIntoView();

      // Create a canvas element
      const canvas = document.createElement('canvas');
      
      // Get the actual content dimensions
      const contentWidth = container.scrollWidth;
      const contentHeight = container.scrollHeight;

      // Use html2canvas with dynamic scaling
      const html2canvas = (await import('html2canvas')).default;
      const screenshot = await html2canvas(container, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: true,
        width: contentWidth,
        height: contentHeight,
        scale: 1,
        scrollX: -rect.left,
        scrollY: -rect.top,
        x: 0,
        y: 0,
        windowWidth: contentWidth,
        windowHeight: contentHeight,
        onclone: (clonedDoc) => {
          const clonedContainer = clonedDoc.querySelector('[data-remotion-canvas]');
          if (clonedContainer) {
            // Force full content dimensions on cloned element
            clonedContainer.style.width = `${contentWidth}px`;
            clonedContainer.style.height = `${contentHeight}px`;
            clonedContainer.style.transform = 'none';
            clonedContainer.style.position = 'relative';
            clonedContainer.style.left = '0';
            clonedContainer.style.top = '0';
            clonedContainer.style.overflow = 'visible';
          }
        }
      });

      // Restore scroll position
      window.scrollTo(scrollX, scrollY);

      // Show the capturing overlay again
      setIsActuallyCapturing(false);

      // Convert to blob and download
      screenshot.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `frame-${Date.now()}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsCapturing(false);
      }, 'image/png', 1.0);

    } catch (error) {
      console.error('Error capturing frame:', error);
      setIsCapturing(false);
      setIsActuallyCapturing(false);
    }
  }, [waitForContent]);

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
          Remotion Animation with API Data
        </motion.h1>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            aspectRatio: '16/9',
            backgroundColor: 'black',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            width: '100%',
            height: '100%'
          }}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Player
              ref={playerRef}
              component={ApiVideo}
              durationInFrames={240}
              fps={60}
              compositionWidth={1920}
              compositionHeight={1080}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                top: 0
              }}
              controls
              autoPlay
              loop
            />
          </div>
          {isCapturing && !isActuallyCapturing && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              Capturing frame...
            </div>
          )}
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={captureFrame}
          disabled={isCapturing}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: isCapturing ? '#94a3b8' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: isCapturing ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => !isCapturing && (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => !isCapturing && (e.target.style.backgroundColor = '#3b82f6')}
        >
          {isCapturing ? 'Capturing...' : 'Capture Frame'}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;
