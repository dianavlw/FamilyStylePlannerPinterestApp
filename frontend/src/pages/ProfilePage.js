import { useEffect, useState } from 'react';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [formData, setFormData] = useState({
    about_me: '',
    instagram_url: '',
    pinterest_url: '',
    tiktok_url: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/');

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log('PROFILE DATA:', data);
        setProfile(data);
        setFormData({
          about_me: data.about_me || '',
          instagram_url: data.instagram_url || '',
          pinterest_url: data.pinterest_url || '',
          tiktok_url: data.tiktok_url || '',
        });
      } catch (err) {
        console.error('Fetch profile error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveMessage('');
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save profile: ${response.status}`);
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      setSaveMessage('Profile updated successfully.');
    } catch (err) {
      console.error('Save profile error:', err);
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h1>{profile.user?.username || 'User'}'s Profile</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        {profile.profile_picture ? (
          <img
            src={profile.profile_picture}
            alt='Profile'
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
            }}
          >
            No Image
          </div>
        )}
      </div>

      <p>
        <strong>Email:</strong> {profile.user?.email || 'No email available'}
      </p>

      {saveMessage && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{saveMessage}</p>
      )}

      {!isEditing ? (
        <>
          <p>
            <strong>About Me:</strong> {profile.about_me || 'No bio yet.'}
          </p>

          <h2>Social Links</h2>
          <ul>
            <li>
              Instagram:{' '}
              {profile.instagram_url ? (
                <a
                  href={profile.instagram_url}
                  target='_blank'
                  rel='noreferrer'
                >
                  {profile.instagram_url}
                </a>
              ) : (
                'Not added'
              )}
            </li>
            <li>
              Pinterest:{' '}
              {profile.pinterest_url ? (
                <a
                  href={profile.pinterest_url}
                  target='_blank'
                  rel='noreferrer'
                >
                  {profile.pinterest_url}
                </a>
              ) : (
                'Not added'
              )}
            </li>
            <li>
              TikTok:{' '}
              {profile.tiktok_url ? (
                <a href={profile.tiktok_url} target='_blank' rel='noreferrer'>
                  {profile.tiktok_url}
                </a>
              ) : (
                'Not added'
              )}
            </li>
          </ul>

          <button
            onClick={() => setIsEditing(true)}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.25rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSave} style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              <strong>About Me</strong>
            </label>
            <br />
            <textarea
              name='about_me'
              value={formData.about_me}
              onChange={handleChange}
              rows='4'
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              <strong>Instagram URL</strong>
            </label>
            <br />
            <input
              type='text'
              name='instagram_url'
              value={formData.instagram_url}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              <strong>Pinterest URL</strong>
            </label>
            <br />
            <input
              type='text'
              name='pinterest_url'
              value={formData.pinterest_url}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              <strong>TikTok URL</strong>
            </label>
            <br />
            <input
              type='text'
              name='tiktok_url'
              value={formData.tiktok_url}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>

          <button
            type='submit'
            style={{
              marginRight: '1rem',
              padding: '0.75rem 1.25rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>

          <button
            type='button'
            onClick={() => setIsEditing(false)}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <h2 style={{ marginTop: '2rem' }}>My Boards</h2>
      {profile.boards && profile.boards.length > 0 ? (
        <div>
          {profile.boards.map((board) => (
            <div
              key={board.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
              }}
            >
              <h3>{board.title}</h3>
              <p>{board.description || 'No description'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No boards yet.</p>
      )}
    </div>
  );
}

export default ProfilePage;
