import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [englishText, setEnglishText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    try {
      const response = await axios.post("/api/translate", {
        text: englishText,
      });
      setTranslatedText(response.data.translation);
      setError("");
    } catch (error) {
      setError("Error translating text. Please try again.");
      console.error("Error translating text:", error);
    }
  };

  return (
    <div className="container">
      <textarea
        className="textarea"
        value={englishText}
        onChange={(e) => setEnglishText(e.target.value)}
        placeholder="Enter English text to translate"
      />
      <button className="button" onClick={handleTranslate}>
        Translate
      </button>
      {translatedText && (
        <div className="translated-text">
          <h2>Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
