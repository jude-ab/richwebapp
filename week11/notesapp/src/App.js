import React, { useState } from "react";
import CreateNote from "./components/createNote";
import NotesList from "./components/notesList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes([...notes, { ...newNote, id: Date.now() }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id, updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
    );
  };

  return (
    <div className="container">
      <h2>Notes App</h2>
      <CreateNote addNote={addNote} />
      <NotesList
        notes={notes}
        deleteNote={deleteNote}
        updateNote={updateNote}
      />
    </div>
  );
}

export default App;
