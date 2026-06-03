import { useEffect, useRef } from 'react';
import Darkmode from '../darkmode/Darkmode';
import './Chat.css';

const Chat = ({ messages }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-top-bar">
        <h1 className="chat-title">Gemini Chat</h1>
        <Darkmode />
      </div>
      <div className="message-list" ref={messageListRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.role}`}>
            <div className={`message ${message.role}`}>
              <div className="message-text">{message.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
