import React from 'react';

const Explore: React.FC = () => {

  const bots = [
    {
      id: 1,
      name: 'Assistant',
      description: 'General-purpose assistant bot with strengths in programming-related tasks and non-English languages.'
    },
    {
      id: 2,
      name: 'Web-Search',
      description: 'General-purpose assistant bot capable of conducting web search as necessary to inform its responses.'
    },
    {
      id: 3,
      name: 'GPT-4o',
      description: 'OpenAI\'s most powerful model. Stronger than GPT-3.5 in quantitative questions (math and physics), creative writing, and many other challenging tasks.'
    },
  ]

  return (
    <div className='container mx-auto p-4'>
      <header className='py-4 text-center text-xl text-white'>
        Explore Bots
      </header>
      <div className="bg-[#181818] shadow-md rounded-lg p-4">
        {
          bots.map(bot => (
            <div key={bot.id} className='flex justify-between items-center px-2 py-2 bg-[#202020] mt-2 rounded hover:bg-[#2a2a2a] cursor-pointer'>
              <div>
                <h3 className="text-lg font-bold text-white">
                  { bot.name }
                </h3>
                <p className="text-sm text-white">
                  { bot.description }
                </p>
              </div>
              <button className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded'>
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