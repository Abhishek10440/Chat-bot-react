import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/sidebar/chat section/Chat';
import './index.css';
import ai from './gemini';

function App() {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'Welcome Chat',
      messages: [
        {
          id: 1,
          role: 'assistant',
          text: 'Hello! Ask me anything and Gemini will respond.',
        },
      ],
      createdAt: new Date(),
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const sendMessage = async (event) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: prompt,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );
    setInput('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const assistantText = response.text || "No response received.";

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now() + 1,
                    role: 'assistant',
                    text: assistantText,
                  },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      console.error(error);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now() + 1,
                    role: 'assistant',
                    text: 'Unable to connect to Gemini. Check your API key and network connection.',
                  },
                ],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    const newChatId = Date.now();
    const newChatObj = {
      id: newChatId,
      title: `Chat ${chats.length + 1}`,
      messages: [
        {
          id: 1,
          role: 'assistant',
          text: 'Hello! Ask me anything.',
        },
      ],
      createdAt: new Date(),
    };
    setChats((prev) => [newChatObj, ...prev]);
    setCurrentChatId(newChatId);
  };

  return (
    <div className="app-container">
      <Sidebar chats={chats} currentChatId={currentChatId} onSelectChat={setCurrentChatId} onNewChat={newChat} />
      <div className="main-content">
        <div className="chat-panel">
          <Chat messages={messages} />
          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
