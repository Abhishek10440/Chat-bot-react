import { useState } from 'react';
import { GoPlusCircle } from "react-icons/go";
import { TbMessageSearch, TbLibrary } from "react-icons/tb";
import { MdApps, MdMenu, MdClose } from "react-icons/md";
import './Sidebar.css';

const Sidebar = ({ chats, currentChatId, onSelectChat, onNewChat }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNewChat = () => {
    onNewChat();
  };

  const handleSelectChat = (chatId) => {
    onSelectChat(chatId);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="mobile-toggle" onClick={toggleSidebar}>
        {isOpen ? <MdClose /> : <MdMenu />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Logo/Title */}
        <div className="sidebar-top">
          <button className="new-chat-btn" onClick={handleNewChat}>
            <GoPlusCircle /> New chat
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-item">
            <TbMessageSearch /> Explore
          </div>
          <div className="nav-item">
            <TbLibrary /> Library
          </div>
          <div className="nav-item">
            <MdApps /> Apps
          </div>
        </nav>

        {/* Recent Chats */}
        <div className="recent-section">
          <div className="recent-header">Recent</div>
          <div className="recent-list">
            {chats && chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`recent-item ${currentChatId === chat.id ? 'active' : ''}`}
                  onClick={() => handleSelectChat(chat.id)}
                  title={chat.title}
                >
                  <TbMessageSearch className="chat-icon" />
                  <span className="chat-title">{chat.title}</span>
                </div>
              ))
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="footer-item">Upgrade</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;