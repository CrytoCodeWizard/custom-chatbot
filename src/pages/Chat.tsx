import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../AppContext';

interface IMessage {
  author: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const { chat_id } = useParams<{ chat_id: string }>();
  const { chatHistories, addMessageToChat } = useContext(AppContext);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (chat_id && chatHistories[chat_id]) {
      setMessages(chatHistories[chat_id]);
    }
  }, [chat_id, chatHistories]);

  const handleSendPrompt = () => {
    const currentTime = new Date().toLocaleTimeString();

    const userMessage: IMessage = {
      author: 'user',
      text: prompt,
      timestamp: currentTime,
    };

    const botResponse: IMessage = {
      author: 'bot',
      text: `Chatgpt: ${prompt}`,
      timestamp: currentTime,
    };

    addMessageToChat(chat_id || 'default', userMessage);

    setTimeout(() => {
      addMessageToChat(chat_id || 'default', botResponse);
    }, 1000);

    setPrompt('');
  };

  return (
    <div className="max-w-screen-2xl mx-auto my-4 p-4 bg-[#181818] rounded shadow-lg">
      <div className="messages overflow-auto h-[80vh] bg-[#2a2a2a] rounded-md p-3 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.author === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md ${message.author === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-lg p-2`}>
              <p>{message.text}</p>
              <p className="text-xs text-gray-300 text-right">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          className="form-input mt-1 block flex-1 rounded-md bg-[#181818] shadow-sm px-4 border text-white"
          placeholder="Type your message here..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
        />
        <button
          onClick={handleSendPrompt}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
