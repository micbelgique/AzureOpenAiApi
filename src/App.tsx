import { useState } from "react";
import "./App.css";
import axios from "axios";
import TextField from "@mui/material/TextField";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [completedText, setCompletedText] = useState<string>("");
  const namemodel = "testing";

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleCompletion = async () => {
    const endpoint = `${
      import.meta.env.VITE_AZURE_OPENAI_URL_BASE as string
    }${namemodel}/completions?api-version=2023-05-15`;

    try {
      const response = await axios.post(
        endpoint,
        {
          prompt: inputText,
          temperature: 0.7,
          max_tokens: 64,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: ["\n"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": import.meta.env.VITE_AZURE_OPENAI_KEY as string,
          },
        }
      );

      setCompletedText(response.data.choices[0].text);
    } catch (error) {
      console.error("Error completing text:", error);
    }
  };

  return (
    <div className="content">
    <div className="Home">
      
      <h1>OpenAI Azure API</h1>
      <TextField
        fullWidth
        label="Prompt"
        multiline
        placeholder="Enter your text here..."
        value={inputText}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleCompletion}>Submit</button>
      <p>{completedText}</p>
    </div>
    </div>
  );
}

export default App;
