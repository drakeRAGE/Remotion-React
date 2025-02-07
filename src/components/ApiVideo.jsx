import { useEffect, useState } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import axios from 'axios';

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
              left: `${i * 10}%`,
              top: `${i * 10}%`,
              transform: `translate(${x}px, ${y}px) rotate(${frame * 2}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

const DataItem = ({ item, index, frame }) => {
  const startFrame = 90 + index * 10; // Start after main text, stagger items
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const x = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [-50, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '10px 20px',
        borderRadius: '10px',
        marginBottom: '10px',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: item.completed ? '#4ade80' : '#f87171',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
      }}>
        {item.id}
      </div>
      <div style={{
        flex: 1,
        color: 'white',
        fontSize: '18px',
        textAlign: 'left',
      }}>
        {item.title}
      </div>
      <div style={{
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: item.completed ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
        color: item.completed ? '#4ade80' : '#f87171',
        fontSize: '14px',
      }}>
        {item.completed ? 'Completed' : 'Pending'}
      </div>
    </div>
  );
};

export const ApiVideo = () => {
  const [data, setData] = useState([]);
  const frame = useCurrentFrame();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mp7bb00bce388bc29577.free.beeceptor.com/data');
        console.log(response)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // dummy data response example :
  // [
  //   {
  //     "id": 1,
  //     "title": "Create an endpoint at Beeceptor.",
  //     "completed": true
  //   },
  //   {
  //     "id": 2,
  //     "title": "Send a request to your new Beeceptor endpoint.",
  //     "completed": true
  //   },
  //   {
  //     "id": 3,
  //     "title": "Create a mocking rule to send dummy data.",
  //     "completed": false
  //   },
  //   {
  //     "id": 4,
  //     "title": "Try out a failure response by sending 500 HTTP status code.",
  //     "completed": false
  //   },
  //   {
  //     "id": 5,
  //     "title": "Use the proxy feature to send a request to a real API. Intercept traffic using Beeceptor.",
  //     "completed": false
  //   }
  // ]

  // Main text animations
  const welcomeOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const welcomeY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: 'clamp',
  });

  const remotionOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const remotionScale = interpolate(frame, [30, 60], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const descriptionOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const descriptionY = interpolate(frame, [60, 90], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        width: '80%',
        maxWidth: '1200px',
      }}>
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

        <div
          style={{
            fontSize: '32px',
            color: '#e2e8f0',
            textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
            opacity: descriptionOpacity,
            transform: `translateY(${descriptionY}px)`,
            marginBottom: '40px',
          }}
        >
          Create amazing videos with React
        </div>

        <div style={{ marginTop: '20px' }}>
          {data.map((item, index) => (
            <DataItem 
              key={item.id} 
              item={item} 
              index={index}
              frame={frame}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
