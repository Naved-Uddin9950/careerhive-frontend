import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const index = () => {
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center bg-tertiary shadow-md p-4 font-semibold text-white">
            <div className="flex items-center space-x-4">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWMjR7gx6W5-B-hglc98RYENcZeIrSg0t6aA&s" 
                    alt="LinkedIn Logo" 
                    className="w-auto h-8"
                />
            </div>

            <div className="flex-1 mx-4">
                <input 
                    type="text" 
                    placeholder="Search jobs, people, companies..."
                    className="border-2 border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-black focus:outline-none"
                />
            </div>

            <div className="flex items-center space-x-6">
                <p onClick={() => navigate('/')} className="hover:text-complementary cursor-pointer">Home</p>
                <p onClick={() => navigate('/')} className="hover:text-complementary">Jobs</p>
                <p onClick={() => navigate('/')} className="hover:text-complementary">Messages</p>
                <p onClick={() => navigate('/')} className="hover:text-complementary">Notifications</p>
                <p onClick={() => navigate('/')} className="hover:text-complementary">My Network</p>
            </div>

            <div className="flex items-center space-x-4 pl-2">
                <FaBell className="text-xl hover:text-gray-200 cursor-pointer" />
                <FaUserCircle className="text-3xl hover:text-gray-200 cursor-pointer" />
            </div>
        </header>
    );
};

export default index;