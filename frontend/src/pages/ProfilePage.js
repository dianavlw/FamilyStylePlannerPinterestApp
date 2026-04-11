import { useEffect, useState } from 'react';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{profile.user.username}'s Profile</h1>

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
            }}
          >
            No Image
          </div>
        )}
      </div>

      <p>
        <strong>Email:</strong> {profile.user.email}
      </p>
      <p>
        <strong>About Me:</strong> {profile.about_me || 'No bio yet.'}
      </p>

      <h2>Social Links</h2>
      <ul>
        <li>
          Instagram:{' '}
          {profile.instagram_url ? (
            <a href={profile.instagram_url} target='_blank' rel='noreferrer'>
              {profile.instagram_url}
            </a>
          ) : (
            'Not added'
          )}
        </li>
        <li>
          Pinterest:{' '}
          {profile.pinterest_url ? (
            <a href={profile.pinterest_url} target='_blank' rel='noreferrer'>
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

      <h2>My Boards</h2>
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
