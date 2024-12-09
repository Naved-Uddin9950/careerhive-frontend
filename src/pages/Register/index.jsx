import React from 'react';
import AuthInnerPage from '../../components/AuthInnerPage';
import styles from './Register.module.css';

const index = () => {
    return (
        <AuthInnerPage>
            <div className={styles["page-container"]}>
                <h1>Register Page</h1>
                <input
                    type='text'
                    className='border border-black'
                />
            </div>
        </AuthInnerPage>
    )
}

export default index;