import React from 'react';
import styles from './Input.module.css';

const index = ({
    type = "text",
    id,
    placeholder,
    formik,
    register
}) => {
    return (
        <div class={styles["input-container"]}>
            <input
                type={type}
                id={id}
                class={`${styles["input"]} peer`}
                placeholder={placeholder}
                value={formik.values[register]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ borderColor: formik.touched[register] && formik.errors[register] ? 'red' : '' }}
            />
            <label for={id} class={styles["label"]}>{placeholder}</label>
            {formik.touched[register] && formik.errors[register] && (
                <p className={styles["error"]}>
                    {formik.errors[register]}
                </p>
            )}
        </div>
    )
}

export default index;