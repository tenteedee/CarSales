import React, { useState } from 'react';
import axios from './../../axios';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');

      try {
        const response = await axios.post(
          '/chat',
          { message: input },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const botMessage = response.data.message;
        setMessages([
          ...newMessages,
          { text: botMessage, sender: 'bot', isHtml: true },
        ]);
      } catch (error) {
        console.error('Error in fetching response:', error);
        setMessages([
          ...newMessages,
          { text: 'Error in fetching response.', sender: 'bot' },
        ]);
      }
    }
  };

  const parseBotMessage = (message) => {
    // Replace **text** with <strong>text</strong> for bold
    message = message.replace(/\*\*(.*?)\*\*/g, '$1');

    // Replace * text with <li>text</li> for bullet points
    message = message.replace(/\* (.*?)\n/g, '$1');

    // Wrap bullet points in <ul> tags if there are any <li> elements
    if (message.includes('<li>')) {
      message = message.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    }

    return message;
  };

  return (
    <div>
      <button onClick={toggleChatbot} className="chatbot-button">
        Ask AI
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="message-display">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === 'user' ? 'message-user' : 'message-bot'
                }`}
              >
                <span
                  className={
                    msg.sender === 'user'
                      ? 'message-content-user'
                      : 'message-content-bot'
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="chatbot-input"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
