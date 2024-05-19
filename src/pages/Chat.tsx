import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
interface IMessage {
  author: 'user' | 'bot';
  text: string;
  timestamp: string;  // Adding timestamp for each message
}

interface IChatHistory {
  [key: string]: IMessage[];
}

const chatHistories: IChatHistory = {
  '1': [
    { author: 'bot', text: 'Hello there! How can I assist you today?', timestamp: '10:00 AM' },
    { author: 'user', text: 'Hi, I need help with my project.', timestamp: '10:02 AM' },
  ],
  '2': [
    { author: 'bot', text: 'Nice to meet you! I am here to assist you.', timestamp: '11:00 AM' },
    { author: 'user', text: 'Nice to meet you too!', timestamp: '11:05 AM' },
  ],
  '3': [
    { author: 'bot', text: 'How can I help you today?', timestamp: '12:00 PM' },
    { author: 'user', text: 'I need support with my account.', timestamp: '12:03 PM' },
  ],
};
const Chat: React.FC = () => {
  const { chat_id } = useParams<{chat_id: string}>();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if(chat_id && chatHistories[chat_id]) {
      setMessages(chatHistories[chat_id]);
    }
  }, [chat_id]);

  const handleSendPrompt = () => {
    const currentTime = new Date().toLocaleTimeString();

    const userMessage: IMessage = {
      author: 'user',
      text: prompt,
      timestamp: currentTime,
    };

    setMessages(messages => [...messages, userMessage]);

    // Simulating a response from the bot
    const botResponse: IMessage = {
      author: 'bot',
      text: `Chatgpt: ${prompt}`,
      timestamp: currentTime,
    };

    setTimeout(() => {
      setMessages(messages => [...messages, botResponse]);
    }, 1000); // simulate a slight delay for bot response

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
