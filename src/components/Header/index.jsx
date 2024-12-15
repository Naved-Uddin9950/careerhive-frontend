import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from 'antd';
import { BiLogIn, BiLogOut } from 'react-icons/bi';

const index = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <header className={styles["header-container"]}>
            <div className={styles["logo-container"]}>
                <h2 className={styles["logo"]}>CareerHive</h2>
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
                <FaUserCircle className="text-2xl hover:text-gray-200 cursor-pointer" />
                {isAuthenticated ?
                    <BiLogOut className={styles["auth-button"]} onClick={logout} /> :
                    <BiLogIn className={styles["auth-button"]} onClick={() => navigate('/login')} />
                }
            </div>
        </header>
    );
};

export default index;