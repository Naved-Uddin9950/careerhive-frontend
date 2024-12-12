import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import styles from './Input.module.css';

const index = ({
    type = "text",
    id,
    placeholder,
    formik,
    register
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles["input-container"]}>
            <div className={styles["input-wrapper"]}>
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    id={id}
                    className={`${styles["input"]} peer`}
                    value={formik.values[register]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ borderColor: formik.touched[register] && formik.errors[register] ? 'red' : '' }}
                />
                <label htmlFor={id} className={styles["label"]}>
                    {placeholder}
                </label>
                {type === "password" && (
                    <span
                        className={styles["suffix"]}
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </span>
                )}
            </div>
            {formik.touched[register] && formik.errors[register] && (
                <p className={styles["error"]}>
                    {formik.errors[register]}
                </p>
            )}
        </div>
    );
};

export default index;