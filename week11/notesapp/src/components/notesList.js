import React, { useState } from "react";
import Notes from "./Notes";

function NotesList({ notes, deleteNote, updateNote }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-container">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
