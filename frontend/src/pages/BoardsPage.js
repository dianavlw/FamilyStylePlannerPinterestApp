function BoardsPage() {
  return (
    <div className="page">
      <h1>Family Boards</h1>
      <p>
        Create boards for outfits, events, shopping ideas, and style
        inspiration.
      </p>

      <a className="button" href="/boards/new">
        Create New Board
      </a>

      <div className="card-grid">
        <a className="card" href="/boards/1">
          <h2>Spring Outfits</h2>
          <p>Ideas for family photos and weekend outfits.</p>
        </a>

        <a className="card" href="/boards/2">
          <h2>Birthday Party Looks</h2>
          <p>Style inspiration for an upcoming celebration.</p>
        </a>
      </div>
    </div>
  );
}

export default BoardsPage;
