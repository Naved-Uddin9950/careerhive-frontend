import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from 'antd';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import Search from 'antd/es/input/Search';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className='relative'>
            <header className={styles["header-container"]}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className={styles["logo-container"]}>
                            <h2 className={styles["logo"]}>CareerHive</h2>
                        </div>

                        <div className={styles["search-container"]}>
                            <Search
                                placeholder='Search jobs, people, companies...'
                                className="w-full sm:max-w-xs lg:max-w-md"
                            />
                        </div>
                    </div>

                    {/* Navbar and User Section */}
                    <div className="flex items-center space-x-4 sm:hidden">
                        {/* Mobile Menu Toggle */}
                        <HiMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
                    </div>

                    {/* Navigation Items for larger screens */}
                    <div className={`hidden sm:flex items-center gap-4 ${isMenuOpen ? 'flex-col sm:flex-row' : 'sm:flex-row'}`}>
                        <div className={styles["nav-container"]}>
                            <p onClick={() => navigate('/')} className={styles["nav-item"]}>Home</p>
                            <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>Jobs</p>
                            <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>Messages</p>
                            <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>My Network</p>
                        </div>

                        {/* User Profile and Auth Buttons */}
                        <div className="flex items-center space-x-4 pl-2">
                            <FaBell className="text-xl hover:text-gray-200 cursor-pointer" />
                            <FaUserCircle className="text-2xl hover:text-gray-200 cursor-pointer" />
                            {isAuthenticated ?
                                <BiLogOut className={styles["auth-button"]} onClick={logout} /> :
                                <BiLogIn className={styles["auth-button"]} onClick={() => navigate('/login')} />
                            }
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (on small screens) */}

            </header>
            {isMenuOpen && (
                <div className="flex flex-col gap-4 sm:hidden bg-tertiary shadow-md px-4">
                    <p onClick={() => navigate('/')} className={styles["nav-item"]}>Home</p>
                    <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>Jobs</p>
                    <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>Messages</p>
                    <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>My Network</p>
                    <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>Notifications</p>
                    <p onClick={() => navigate('/coming-soon')} className={styles["nav-item"]}>Profile</p>
                    {isAuthenticated ?
                        <p onClick={logout} className={styles["nav-item"]}>Logout</p> :
                        <p onClick={() => navigate('/login')} className={styles["nav-item"]}>Login</p>

                    }
                </div>
            )
            }
        </div >
    );
};

export default Header;