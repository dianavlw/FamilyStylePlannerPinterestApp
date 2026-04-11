import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/family-members/')
      .then((rest) => rest.json())
      .then((data) => setMembers(data))
      .catch(() => setError('Failed to load family members.'));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Family Home</h1>
        <p>Your real family members from the backend</p>

        <button onClick={() => navigate('/profile')}>Go to Profile</button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.grid}>
        {members.map((member) => (
          <div key={member.id} style={styles.card}>
            <div style={styles.avatar}>
              {member.username?.charAt(0).toUpperCase()}
            </div>
            <h3>{member.username}</h3>
            <p>
              <strong>Role:</strong>
              {member.role}
            </p>
            <p>
              <strong>Family:</strong>
              {member.family}
            </p>
            <p>
              <strong>Style:</strong>
              {member.style_preference}
            </p>
            <p>
              <strong>Size:</strong>
              {member.clothing_size}
            </p>
            <p>
              <strong>Favorite Color:</strong>
              {member.favorite_color}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#faf7f5',
    padding: '32px',
  },
  header: {
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '999px',
    background: '#ead5cb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '12px',
  },
  error: {
    color: 'crimson',
  },
};

export default HomePage;
