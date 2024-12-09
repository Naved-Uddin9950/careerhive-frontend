import React from 'react';
import styles from './AuthInnerPage.module.css';

const index = ({
    image = "https://placehold.co/800?text=Image",
    children
}) => {

    return (
        <div className={styles["page-container"]}>
            <img src={image} alt="" className={styles["image"]} />
            {children}
        </div>
    )
}

export default index;