function CreatePinPage() {
  return (
    <div className="page">
      <h1>Create Pin</h1>

      <form className="form">
        <input placeholder="Pin title" />
        <input placeholder="Image URL" />
        <textarea placeholder="Description"></textarea>
        <button type="submit">Save Pin</button>
      </form>
    </div>
  );
}

export default CreatePinPage;
