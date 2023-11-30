import React, { useState } from "react";
import axios from "axios";

const Translate = ({ onTranslationDone }) => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es"); // default target language is Spanish
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async () => {
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
      onTranslationDone(response.data.data.translations[0].translatedText);
    } catch (error) {
      setIsTranslating(false);
      console.error("Error translating text: ", error);
      alert("Translation failed");
    }
  };

  return (
    <div>
      <textarea
        placeholder="Type here to translate"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        {/* Add more options for languages */}
      </select>
      <button onClick={translateText} disabled={isTranslating}>
        {isTranslating ? "Translating..." : "Translate"}
      </button>
    </div>
  );
};

export default Translate;
