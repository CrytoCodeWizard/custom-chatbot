import { createContext, useState, ReactNode, FC } from 'react';

interface IMessage {
  author: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface IChatHistory {
  [key: string]: IMessage[];
}

interface ServerAIModel {
  id: string;
  name: string;
  prompt: string;
  knowledge: string;
  comments: string;
}

interface AppContextType {
  chatHistories: IChatHistory;
  serverAIs: ServerAIModel[];
  addServerAI: (newAI: ServerAIModel) => void;
  deleteServerAI: (id: string) => void;
  addMessageToChat: (chatId: string, message: IMessage) => void;
  createNewChat: (botId: string) => string;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const initialChatHistories: IChatHistory = {
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

const initialServerAIs: ServerAIModel[] = [
  {
    id: '1',
    name: 'Assistant',
    prompt: 'this is test prompt 1',
    knowledge: 'Base Knowledge',
    comments: 'General-purpose assistant bot with strengths in programming-related tasks and non-English languages.',
  },
  {
    id: '2',
    name: 'Web-Search',
    prompt: 'this is test prompt 2',
    knowledge: 'Extended Knowledge',
    comments: 'General-purpose assistant bot capable of conducting web search as necessary to inform its responses.',
  },
  {
    id: '3',
    name: 'GPT-4o',
    prompt: 'this is test prompt 3',
    knowledge: 'Extended Knowledge',
    comments: "OpenAI's most powerful model. Stronger than GPT-3.5 in quantitative questions (math and physics), creative writing, and many other challenging tasks.",
  },
];

export const AppContext = createContext<AppContextType>({
  chatHistories: initialChatHistories,
  serverAIs: initialServerAIs,
  addServerAI: () => {},
  deleteServerAI: () => {},
  addMessageToChat: () => {},
  createNewChat: () => '',
  toggleSidebar: () => {},
  isSidebarOpen: true,
});

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [serverAIs, setServerAIs] = useState<ServerAIModel[]>(initialServerAIs);
  const [chatHistories, setChatHistories] = useState<IChatHistory>(initialChatHistories);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addServerAI = (newAI: ServerAIModel) => {
    setServerAIs((prev) => [...prev, newAI]);
  };

  const deleteServerAI = (id: string) => {
    setServerAIs((prev) => prev.filter((ai) => ai.id !== id));
  };

  const addMessageToChat = (chatId: string, message: IMessage) => {
    setChatHistories((prev) => ({
      ...prev,
      [chatId]: prev[chatId] ? [...prev[chatId], message] : [message],
    }));
  };

  const createNewChat = (botId: string) => {
    const newChatId = Date.now().toString();
    const bot = serverAIs.find(ai => ai.id === botId);
    const initialMessage: IMessage = {
      author: 'bot',
      text: `You are now chatting with ${bot?.name || 'the bot'}. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatHistories((prev) => ({
      ...prev,
      [newChatId]: [initialMessage],
    }));
    return newChatId;
  };

  return (
    <AppContext.Provider
      value={{
        chatHistories,
        serverAIs,
        addServerAI,
        deleteServerAI,
        addMessageToChat,
        createNewChat,
        toggleSidebar,
        isSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
