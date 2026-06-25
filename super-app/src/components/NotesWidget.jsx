function NotesWidget({ notes, onChange }) {
  return (
    <article className="notes-widget">
      <h2>All notes</h2>
      <textarea value={notes} onChange={(event) => onChange(event.target.value)} aria-label="All notes" />
    </article>
  );
}

export default NotesWidget;
