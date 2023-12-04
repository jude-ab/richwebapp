import React, { useState, useEffect } from "react";

function EditNote({ noteEdit, NoteUpdate }) {
  const [nText, setNText] = useState(""); //
  const [noteColor, setNoteColor] = useState("#ffffff");

  // Set note text and color to edit
  useEffect(() => {
    if (noteEdit) {
      setNText(noteEdit.text);
      setNoteColor(noteEdit.color);
    }
  }, [noteEdit]);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    NoteUpdate(noteEdit.id, { text: nText, color: noteColor });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="note-input"
        value={nText}
        onChange={(e) => setNText(e.target.value)}
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
