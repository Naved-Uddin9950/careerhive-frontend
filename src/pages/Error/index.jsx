import React from 'react';
import styles from './Error.module.css';
import { useNavigate, useRouteError } from 'react-router-dom';

const index = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Error</h1>
            {error && (
                <p className="mt-2 text-gray-500 text-sm">
                    <i>{error.statusText || error.message}</i>
                </p>
            )}
            <button
                className="inline-block mt-6 text-blue-500 underline"
                onClick={() => navigate('/')}
            >
                Go back to Home
            </button>
            {/* <p className={styles.message}>Something went wrong. Please try again later.</p> */}
        </div>
    )
}

export default index;