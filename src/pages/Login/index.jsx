import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthInnerPage from '../../components/AuthInnerPage';
import Input from '../../components/Input';
import styles from './Login.module.css';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../../utils/apiService';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

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
        onSubmit: (values, { setSubmitting, resetForm }) => {
            loginHandler(values, setSubmitting, resetForm);
        },
    });

    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const loginHandler = async (values, setSubmitting, resetForm) => {
        const body = {
            email: values.email,
            password: values.password,
        };
        try {
            setLoading(true);
            const res = await postAPI("/api/users/login", body, toast);
            login(res.data);
            navigate("/recruiter");
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

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
                    {loading ? <Spin /> : 'Login'}
                </button>
            </form>
        </AuthInnerPage>
    );
};

export default Login;