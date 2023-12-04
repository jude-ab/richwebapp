import React, { useState } from "react";
import axios from "axios";

function AddNote({ addNote }) {
  const [nText, setNText] = useState("");
  const [nColor, setNColor] = useState("#ffffff");
  const [language, setLanguage] = useState("en"); // default language is English
  const [isTranslate, setIsTranslate] = useState(false);

  // Translate text using Google Translate API
  const transText = async (text) => {
    setIsTranslate(true);
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
      setIsTranslate(false); // Set isTranslate to false after getting response
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      setIsTranslate(false);
      console.error("Error translate text: ", error);
      alert("Translation failed");
      return ""; // Return empty string in case of error
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nText) return;

    const translatedText = await transText(nText);
    addNote({ text: translatedText, color: nColor });
    setNText(""); // Reset text area after submitting
  };

  return (
    <div className="form">
      <div className="note-input-container">
        <textarea
          value={nText}
          onChange={(e) => setNText(e.target.value)}
          placeholder="Write a note..."
        />
      </div>
      <div className="note-options-container">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="en">English</option>
        </select>
        <select value={nColor} onChange={(e) => setNColor(e.target.value)}>
          <option value="#ffffff">White</option>
          <option value="#fff4e3">Orange</option>
          <option value="#d8ffd6">Green</option>
          <option value="#ebd6ff">Purple</option>
          <option value="#ffcccb">Pink</option>
        </select>
        <button onClick={handleSubmit} disabled={isTranslate}>
          {isTranslate ? "Translating..." : "Add Note"}
        </button>
      </div>
    </div>
  );
}

export default AddNote;
