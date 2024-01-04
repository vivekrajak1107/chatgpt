import React, { useState } from 'react';
import './App.css';



function App() {
  const [textValue, setTextArea] = useState("");
  const [prompt, setPrompt] = useState([{
    role: "system",
    content: "you are a cricket analyst and only replies to question related to cricket and should strictly not reply to any topics other than cricket"
  }]);


  const handleSubmit = async (data: any) => {
    try {
      const apiKey = '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';
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": data
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          }
        }
      );
      const finalResponse = await response.json();
      const newPrompt = [...data, finalResponse.choices[0].message]
       setPrompt(newPrompt);

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };
  const textHandler = async () => {
    const newPrompt = [...prompt.slice(0), {     
      role: "user",
     content: textValue}];
     setPrompt(newPrompt);
     handleSubmit(newPrompt);
     setTextArea("");
  }
  return (
    <div className="App">
      <h1>CHATGPT</h1>
      <header className="App-header">
        <textarea placeholder="Enter your question here" style={{ width: "500px", height: "100px", marginBlock: "16px"}} onChange={(e) => setTextArea(e.target.value)} value={textValue}/>
        <br />
        <button style={{ marginBottom: "16px"}} onClick={textHandler}>Submit</button>
      </header>
      {prompt.map((val, index) => {
        const hidePrompt = index === 0 ? "none" : "block";
        return (
          <div key={index} style={{ display: hidePrompt, width: "900px", margin: "0 auto"}}>
            {
              val.role === "user" ? (
                <div style={{ textAlign: "left", marginBottom: "16px"}}>
                  <span style={{ textTransform: "capitalize", fontWeight: "bold", marginRight: "12px"}}>{val.role}: </span>{' '}
                  <span style={{ paddingInline: "30px", paddingBlock: "3px", backgroundColor: "#3BFFE5", borderRadius: "15px"}}>{val.content}</span>
                </div>
              ) : (
                <div style={{ padding: "8px", marginBottom: "16px"}}>
                  <span style={{ paddingInline: "30px", paddingBlock: "3px", backgroundColor: "#3BFFE5", borderRadius: "15px", marginRight: "12px"}}>{val.content}</span>
                  <span style={{ textAlign: "end", textTransform: "capitalize", fontWeight: "bold"}}>:{val.role} </span>
                </div>
              )
            }

          </div>
        )
      })}
    </div>
  );
}

export default App;
