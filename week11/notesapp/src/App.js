import React, { useState, useEffect } from "react";
import CreateNote from "./components/AddNote";
import NotesList from "./components/notesList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState("light"); // Theme state

  // Set theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Add note
  const addNote = (newNote) => {
    setNotes([...notes, { ...newNote, id: Date.now() }]); // Spread operator
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id)); // Filter out note with id
  };

  // Update note
  const updateNote = (id, updatedNote) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)) // Spread operator
    );
  };

  return (
    <div className={`app ${theme}`}>
      {" "}
      <h2>Notes App</h2>
      <div className="theme-selector">
        <label htmlFor="theme">Choose a theme:</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
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
