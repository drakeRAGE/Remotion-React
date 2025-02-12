import { useEffect, useState } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import axios from 'axios';
import { CONFIG } from '../config';

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
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompleted, setFilterCompleted] = useState(null);
  const frame = useCurrentFrame();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(CONFIG.API_ENDPOINT);
        setTodos(response.data.slice(0, 10)); // Limit to 10 items
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    let result = todos;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply completed filter
    if (filterCompleted !== null) {
      result = result.filter(todo => todo.completed === filterCompleted);
    }

    setFilteredTodos(result);
  }, [todos, searchTerm, filterCompleted]);

  const dataToRender = filteredTodos.length > 0 ? filteredTodos : todos;

  return (
    <div style={{
      width: '100%', 
      height: '100%', 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <GradientBackground />
      <FloatingShapes />

      <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            marginTop: '70px',
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            opacity: 1,
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
            marginBottom: '0px',
            textShadow: '0 0 30px rgba(255,255,255,0.2)',
            opacity: 1,
          }}
        >
          Remotion
        </div>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        backgroundColor: 'rgba(0,0,0,0.3)'
      }}>
        <input 
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            width: '200px'
          }}
        />
        <select 
          value={filterCompleted ?? 'all'}
          onChange={(e) => {
            const value = e.target.value;
            setFilterCompleted(
              value === 'all' ? null : 
              value === 'completed' ? true : false
            );
          }}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none'
          }}
        >
          <option value="all">All Todos</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '60px'
      }}>
        {dataToRender.map((item, index) => (
          <DataItem 
            key={item.id} 
            item={item} 
            index={index} 
            frame={frame} 
          />
        ))}
      </div>
    </div>
  );
};
