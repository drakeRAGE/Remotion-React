import React from 'react';

export const MyVideo = () => {
  return (
    <div style={{
      flex: 1,
      backgroundColor: '#2563eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }}>
      <div style={{
        color: 'white',
        fontSize: '64px',
        fontWeight: 'bold'
      }}>
        Welcome to Remotion!
      </div>
    </div>
  );
};
