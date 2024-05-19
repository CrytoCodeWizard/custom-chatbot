import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import Chat from './pages/Chat';
import Explore from './components/Explore';
import NotFound from './pages/NotFound'; // A simple component to handle 404 Not Found
import './styles/globals.css';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <Router>
      <div className='flex'>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}/>
        <div className={`flex-1 bg-[#1e1e1e] ${isSidebarOpen? 'ml-64' : 'ml-12'} ml-64 min-h-screen`}>
          <Navbar/>
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
  );
};

export default App;
