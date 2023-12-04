import React, { useState } from "react";
import Notes from "./Notes";

function NotesList({ notes, updateNote, deleteNote }) {
  const [search, setSearch] = useState("");

  // Filter notes based on search text
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-container">
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredNotes.map((note) => (
        <Notes
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
}

export default NotesList;
