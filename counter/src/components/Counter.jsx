import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Current Count: {count}</h2>
      <div>
        <button onClick={increment} style={{ marginRight: '10px' }}>
          Add
        </button>
        <button onClick={decrement}>
          Subtract
        </button>
      </div>
    </div>
  );
};

export default Counter;
