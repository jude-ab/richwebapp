import React, { useState, useEffect } from "react";

function EditNote({ noteToEdit, updateNote }) {
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("#ffffff");

  useEffect(() => {
    if (noteToEdit) {
      setNoteText(noteToEdit.text);
      setNoteColor(noteToEdit.color);
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(noteToEdit.id, { text: noteText, color: noteColor });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="note-input"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <select
        className="note-select"
        value={noteColor}
        onChange={(e) => setNoteColor(e.target.value)}
      >
        <option value="#ffffff">White</option>
        <option value="#fff4e3">Orange</option>
        <option value="#d8ffd6">Green</option>
        <option value="#ebd6ff">Purple</option>
        <option value="#ffcccb">Pink</option>
      </select>
      <button className="note-save-btn" type="submit">
        Save
      </button>
    </form>
  );
}

export default EditNote;
