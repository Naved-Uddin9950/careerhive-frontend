import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthInnerPage from '../../components/AuthInnerPage';
import Input from '../../components/Input';
import styles from './Login.module.css';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });

    return (
        <AuthInnerPage image="https://purisconsulting.com/wp-content/uploads/2019/01/Company-Branding_team-work.png">
            <form
                onSubmit={formik.handleSubmit}
                className={styles["form-container"]}
            >
                <h1 className={styles["heading"]}>Login Page</h1>

                <div className={styles["fields-container"]}>
                    <Input
                        placeholder="email"
                        id="email"
                        register="email"
                        formik={formik}
                    />
                </div>

                <div className={styles["fields-container"]}>
                    <Input
                        placeholder="password"
                        id="password"
                        register="password"
                        formik={formik}
                    />
                </div>

                <button
                    type="submit"
                    className={styles["submit"]}
                >
                    Login
                </button>
            </form>
        </AuthInnerPage>
    );
};

export default Login;