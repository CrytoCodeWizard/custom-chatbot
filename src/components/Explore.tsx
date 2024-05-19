import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

const Explore: React.FC = () => {
  const { serverAIs, createNewChat } = useContext(AppContext);
  const navigate = useNavigate();

  const handleStartChat = (botId: string) => {
    const newChatId = createNewChat(botId);
    navigate(`/chat/${newChatId}`);
  };

  return (
    <div className='container mx-auto p-4'>
      <header className='py-4 text-center text-xl text-white'>
        Explore Bots
      </header>
      <div className="bg-[#181818] shadow-md rounded-lg p-4">
        {
          serverAIs.map(bot => (
            <div key={bot.id} className='flex justify-between items-center px-2 py-2 bg-[#202020] mt-2 rounded hover:bg-[#2a2a2a] cursor-pointer'>
              <div>
                <h3 className="text-lg font-bold text-white">
                  { bot.name }
                </h3>
                <p className="text-sm text-white">
                  { bot.comments }
                </p>
              </div>
              <button
                onClick={() => handleStartChat(bot.id)}
                className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded'>
                Start Chat
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Explore;
