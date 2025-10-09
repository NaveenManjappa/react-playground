import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    setLoading(true);
    const newChatMessages = [
      ...chatMessages,
      { message: inputText, sender: "user", id: crypto.randomUUID() },
    ];
    setChatMessages(newChatMessages);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      { message: response, sender: "robot", id: crypto.randomUUID() },
    ]);
    setInputText("");
    setLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
        disabled={loading}
      />
      <button onClick={sendMessage} className="send-button" disabled={loading}>
        {loading ? <span className="spinner"></span> : "Send"}
      </button>
    </div>
  );
}

export default ChatInput