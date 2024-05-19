import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import Explore from './components/Explore';
import NotFound from './pages/NotFound';
import './styles/globals.css';

const App: React.FC = () => {

  return (
    <AppProvider>
      <Router>
        <div className='flex'>
          <Sidebar />
          <div className={`flex-1 bg-[#1e1e1e] ml-64 min-h-screen`}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-bot" element={<Settings />} />
              <Route path="/chat/:chat_id" element={<Chat />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
