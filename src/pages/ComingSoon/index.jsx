import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ComingSoon.module.css';
import { message } from 'antd';

const index = () => {
    const navigate = useNavigate();

    const goto = () => {
        navigate('/');
    }

    const notify = () => {
        message.info("Feature is under development");
    }

    return (
        <div className={styles["comingsoon-container"]}>
            <div className={styles["card-container"]}>
                <h1 className={styles["comingsoon"]}>Coming Soon</h1>
                <p className={styles["message"]}>We are working hard to bring you something amazing. Stay tuned!</p>
                <div className={styles["buttons-container"]}>
                    <button
                        className={styles["goto"]}
                        onClick={goto}
                    >
                        Back to Home
                    </button>
                    <button
                        className={styles["notify"]}
                        onClick={notify}
                    >
                        Notify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default index;