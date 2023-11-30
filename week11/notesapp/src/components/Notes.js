import React, { useState } from "react";

function Notes({ note, deleteNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const [editedColor, setEditedColor] = useState(note.color);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(note.text);
    setEditedColor(note.color);
  };

  const handleSave = () => {
    updateNote(note.id, { text: editedText, color: editedColor });
    setIsEditing(false);
  };

  return (
    <div
      className={`note ${isEditing ? "editing" : ""}`}
      style={{ backgroundColor: note.color }}
    >
      {isEditing ? (
        <div className="actions">
          <textarea
            className="note-textarea"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <select
            className="note-color-select"
            value={editedColor}
            onChange={(e) => setEditedColor(e.target.value)}
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
          <button className="note-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p className="note-text">{note.text}</p>
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
