import { useState } from 'react';
import { useNavigate } from 'reach-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    family_name: '',
    role: '',
    style_preference: '',
    clothing_size: '',
    favorite_color: '',
  });
}

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
    setSuccessMessage('Signup sucessful!');
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
        <input name="username" placeholder="Username"  value="{formData.username}" onChange={handleChange} sylte={styles.input} />
        <input name="email" placeholder="" type="" value="" onChange={} sylte={styles.input} />
        <input name="password" placeholder="" type="" value="" onChange={} sylte={styles.input} />
        <input name="family_name" placeholder="" type="" value="" onChange={} sylte={styles.input} />        
        <input name="" placeholder="" type="" value="" onChange={} sylte={styles.input} />      
        <input name="" placeholder="" type="" value="" onChange={} sylte={styles.input} />
        <input name="" placeholder="" type="" value="" onChange={} sylte={styles.input} />        
        <input name="" placeholder="" type="" value="" onChange={} sylte={styles.input} />   
      </form>
    </div>
  </div>
)
