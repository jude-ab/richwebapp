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
      setIsTranslate(false); // Set