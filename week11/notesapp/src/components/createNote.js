import React, { useState } from "react";

function CreateNote({ addNote }) {
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText) return;
    addNote({ text: noteText, color: noteColor });
    setNoteText("");
  };

  return (
    <div className="form">
      <input
        type="text"
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a note..."
      />

      <select value={noteColor} onChange={(e) => setNoteColor(e.target.value)}>
        <option value="#ffffff">White</option>
        <option value="#fff4e3">Orange</option>
        <option value="#d8ffd6">Green</option>
        <option value="#ebd6ff">Purple</option>
        <option value="#ffcccb">Pink</option>
      </select>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default CreateNote;
