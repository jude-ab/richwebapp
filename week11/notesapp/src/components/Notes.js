import React, { useState } from "react";

function Notes({ note, updateNote, deleteNote }) {
  const [isEdit, setIsEdit] = useState(false);
  const [eText, setEText] = useState(note.text);
  const [eColor, setEColor] = useState(note.color);

  const handleEdit = () => setIsEdit(true);

  const handleSave = () => {
    updateNote(note.id, { text: eText, color: eColor });
    setIsEdit(false);
  };

  return (
    <div
      className={`note ${isEdit ? "editing" : ""}`}
      style={{ backgroundColor: note.color }}
    >
      {isEdit ? (
        <div className="actions">
          <textarea
            className="note-textarea"
            value={eText}
            onChange={(e) => setEText(e.target.value)}
          />
          <select
            className="note-color-select"
            value={eColor}
            onChange={(e) => setEColor(e.target.value)}
          >
            <option value="#ffffff">White</option>
            <option value="#fff4e3">Orange</option>
            <option value="#d8ffd6">Green</option>
            <option value="#ebd6ff">Purple</option>
            <option value="#ffcccb">Pink</option>
          </select>
          <button className="note-save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        <>
          <p className="note-text" style={{ color: "black" }}>
            {note.text}
          </p>

          <div className="actions">
            <button
              className="note-delete-btn"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
            <button className="note-edit-btn" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Notes;
