import React, { useState, useEffect } from 'react';
import { useCurrentFrame } from 'remotion';

const PerformanceMonitor = ({ 
  showFPS = false, 
  showRenderTime = false 
}) => {
  const frame = useCurrentFrame();
  const [renderTimes, setRenderTimes] = useState([]);
  const [startTime, setStartTime] = useState(performance.now());

  useEffect(() => {
    const currentTime = performance.now();
    const renderTime = currentTime - startTime;
    
    setRenderTimes(prev => {
      const newTimes = [...prev, renderTime];
      // Keep only last 60 render times
      return newTimes.slice(-60);
    });
    
    setStartTime(currentTime);
  }, [frame]);

  const averageRenderTime = renderTimes.length > 0 
    ? renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length 
    : 0;

  if (!showFPS && !showRenderTime) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 1000,
      fontSize: '12px'
    }}>
      {showFPS && (
        <div>
          Current Frame: {frame}
          <br />
          Estimated FPS: {(1000 / averageRenderTime).toFixed(2)}
        </div>
      )}
      {showRenderTime && (
        <div>
          Avg Render Time: {averageRenderTime.toFixed(2)}ms
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
