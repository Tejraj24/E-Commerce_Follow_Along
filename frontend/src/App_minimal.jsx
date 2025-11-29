import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Fashion Store</h1>
      <p>Welcome to our fashion store!</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/men" style={{ marginRight: '20px' }}>Shop Men</a>
        <a href="/women">Shop Women</a>
      </div>
    </div>
  );
}

export default App;
