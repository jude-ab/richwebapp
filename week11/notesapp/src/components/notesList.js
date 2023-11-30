import React from "react";
import Notes from "./Notes";

function NotesList({ notes, deleteNote, updateNote }) {
  return (
    <div className="notes-container">
      {notes.map((note) => (
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
