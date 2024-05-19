import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    toggleSidebar
}) => {
    const [activeChat, setActiveChat] = useState<string | null>(null);


    const chatHistory = [
        {
            id: '1',
            title: "Greeting"
        },
        {
            id: '2',
            title: "Pleasant Introduction"
        },
        {
            id: '3',
            title: "Support Chat"
        }
    ]

    return (
        <div className={`fixed top-0 bottom-0 left-0 ${isOpen ? 'w-64' : 'w-12'} bg-[#181818] text-white flex flex-col transition-width duration-200`}>
            <button
                className='p-2 text-gray-400 hover:text-white focus:outline-none'
                onClick={toggleSidebar}>
                {isOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
            </button>
            <div className={`p-4 ${isOpen ? 'block': 'hidden'}`}>
                <Link to="/" className='text-2xl font-bold'>
                    TopDown AI
                </Link>
            </div>
            <nav className={`mt-2 ${isOpen ? 'flex': 'hidden'} flex-row justify-center items-center`}>
                <Link to="/explore" className="block py-2.5 px-4 mx-2 rounded transition duration-200 bg-[#242424] hover:bg-[#353535]">
                    Explore
                </Link>
                <Link to='/create-bot' className='block py-2.5 mx-2 px-4 rounded transition duration-200 bg-[#242424] hover:bg-[#353535]'>
                    Create Bot
                </Link>
            </nav>
            <div className={`mt-4 ${isOpen ? 'block': 'hidden'}`}>
                {
                    chatHistory.map(chat => (
                        <div key={chat.id} className="flex">
                            <Link
                                to={`/chat/${chat.id}`}
                                className={`block w-full px-4 py-6 text-left ${activeChat === chat.id? 'bg-blue-800' : 'bg-[#2c2c2c] hover:bg-[#353535]'}  transition duration-200 border-b`}
                                onClick={() => setActiveChat(chat.id)}>
                                { chat.title }
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar