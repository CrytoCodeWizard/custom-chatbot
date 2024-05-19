import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';

const Sidebar: React.FC = () => {
  const { chatHistories, isSidebarOpen } = useContext(AppContext);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div className={`fixed top-0 bottom-0 left-0 ${isSidebarOpen ? 'w-64' : 'w-12'} bg-[#181818] text-white flex flex-col transition-width duration-200`}>
      <div className={`p-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className='text-2xl font-bold'>
          TopDown AI
        </Link>
      </div>
      <nav className={`mt-2 ${isSidebarOpen ? 'flex' : 'hidden'} flex-row justify-center items-center`}>
        <Link to="/explore" className="block py-2.5 px-4 mx-2 rounded transition duration-200 bg-[#242424] hover:bg-[#353535]">
          Explore
        </Link>
        <Link to='/create-bot' className='block py-2.5 mx-2 px-4 rounded transition duration-200 bg-[#242424] hover:bg-[#353535]'>
          Create Bot
        </Link>
      </nav>
      <div className={`mt-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {Object.keys(chatHistories).map(chatId => (
          <div key={chatId} className="flex">
            <Link
              to={`/chat/${chatId}`}
              className={`block w-full px-4 py-6 text-left ${activeChat === chatId ? 'bg-blue-800' : 'bg-[#2c2c2c] hover:bg-[#353535]'} transition duration-200 border-b`}
              onClick={() => setActiveChat(chatId)}
            >
              {chatHistories[chatId][chatHistories[chatId].length - 1]?.text.slice(0, 50) + " ..."}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
