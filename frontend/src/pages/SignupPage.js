import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    family_name: '',
    role: '',
    style_preferences: '',
    clothing_size: '',
    favorite_color: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(JSON.stringify(data));
        return;
      }

      setSuccessMessage('Signup successful!');
      setTimeout(() => navigate('/home'), 1000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>Family Style Planner</h1>
        <p>Create your family account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name='email'
            placeholder='Email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name='password'
            placeholder='Password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name='family_name'
            placeholder='Family Name'
            value={formData.family_name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name='role'
            placeholder='Role (Mom, Dad, Child)'
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name='style_preferences'
            placeholder='Style Preferences'
            value={formData.style_preferences}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name='clothing_size'
            placeholder='Clothing Size'
            value={formData.clothing_size}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name='favorite_color'
            placeholder='Favorite Color'
            value={formData.favorite_color}
            onChange={handleChange}
            style={styles.input}
          />

          <button type='submit' style={styles.button}>
            Sign Up
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#faf7f5',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    background: '#fff',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  form: {
    display: 'grid',
    gap: '12px',
    marginTop: '20px',
  },
  input: {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  button: {
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#111',
    color: '#fff',
    fontSize: '15px',
    cursor: 'pointer',
  },
  error: {
    color: 'crimson',
    marginTop: '14px',
  },
  success: {
    color: 'green',
    marginTop: '14px',
  },
};

export default SignupPage;
