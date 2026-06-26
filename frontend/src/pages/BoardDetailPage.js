function BoardDetailPage() {
  return (
    <div className="page">
      <h1>Spring Outfits</h1>
      <p>Saved outfit ideas for the family.</p>

      <a className="button" href="/pins/new">
        Create Pin
      </a>

      <div className="card-grid">
        <div className="pin-card">Casual green outfit</div>
        <div className="pin-card">Neutral family photo look</div>
        <div className="pin-card">Kids weekend style</div>
      </div>
    </div>
  );
}

export default BoardDetailPage;
