import React, { useState } from "react";
import axios from "axios";

function CreateNote({ addNote }) {
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("#ffffff");
  const [language, setLanguage] = useState("es"); // default target language is Spanish
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async (text) => {
    setIsTranslating(true);
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2`,
        {},
        {
          params: {
            q: text,
            target: language,
            key: process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
          },
        }
      );
      setIsTranslating(false);
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      setIsTranslating(false);
      console.error("Error translating text: ", error);
      alert("Translation failed");
      return ""; // Return empty string in case of error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteText) return;

    const translatedText = await translateText(noteText);
    addNote({ text: translatedText, color: noteColor });
    setNoteText(""); // Reset text area after submitting
  };

  return (
    <div className="form">
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write a note..."
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        {/* Add more options for languages */}
      </select>
      <select value={noteColor} onChange={(e) => setNoteColor(e.target.value)}>
        <option value="#ffffff">White</option>
        <option value="#fff4e3">Orange</option>
        <option value="#d8ffd6">Green</option>
        <option value="#ebd6ff">Purple</option>
        <option value="#ffcccb">Pink</option>
      </select>
      <button onClick={handleSubmit} disabled={isTranslating}>
        {isTranslating ? "Translating..." : "Add Note"}
      </button>
    </div>
  );
}

export default CreateNote;
