import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const index = () => {
    const navigate = useNavigate();

    return (
        <header className={styles["header-container"]}>
            <div className={styles["logo-container"]}>
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWMjR7gx6W5-B-hglc98RYENcZeIrSg0t6aA&s" 
                    alt="CareerHive Logo" 
                    className={styles["logo"]}
                />
            </div>

            <div className={styles["search-container"]}>
                <input 
                    type="text" 
                    placeholder="Search jobs, people, companies..."
                    className={styles["searchbar"]}
                />
            </div>

            <div className={styles["nav-container"]}>
                <p onClick={() => navigate('/')} className={styles["nav-item"]}>Home</p>
                <p onClick={() => navigate('/')} className={styles["nav-item"]}>Jobs</p>
                <p onClick={() => navigate('/')} className={styles["nav-item"]}>Messages</p>
                <p onClick={() => navigate('/')} className={styles["nav-item"]}>Notifications</p>
                <p onClick={() => navigate('/')} className={styles["nav-item"]}>My Network</p>
            </div>

            <div className="flex items-center space-x-4 pl-2">
                <FaBell className="text-xl hover:text-gray-200 cursor-pointer" />
                <FaUserCircle className="text-3xl hover:text-gray-200 cursor-pointer" />
            </div>
        </header>
    );
};

export default index;