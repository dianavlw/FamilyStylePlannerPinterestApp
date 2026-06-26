import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "friend";

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  }

  return (
    <div className="home-page">
      <nav className="top-nav">
        <h2>Family Style Planner</h2>

        <div>
          <Link to="/home">Home</Link>
          <Link to="/boards">Boards</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <section className="home-hero">
        <p className="eyebrow">Family Styling App</p>
        <h1>Welcome, {username}</h1>
        <p>
          Save outfit ideas, family event inspiration, home styling boards, and
          creative plans all in one place.
        </p>

        <div className="home-actions">
          <Link to="/boards">View Boards</Link>
          <Link to="/boards/new">Create Board</Link>
          <Link to="/pins/new">Create Pin</Link>
        </div>
      </section>

      <section className="pin-grid">
        <div className="pin tall">Family photo outfits</div>
        <div className="pin">Birthday party ideas</div>
        <div className="pin large">Spring color palette</div>
        <div className="pin">Kids weekend looks</div>
        <div className="pin tall">Holiday inspiration</div>
        <div className="pin">Home decor moodboard</div>
      </section>
    </div>
  );
}

export default HomePage;
