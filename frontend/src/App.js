import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test/')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Family Style Planner</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
