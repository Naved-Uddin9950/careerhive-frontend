import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthInnerPage from '../../components/AuthInnerPage';
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
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`peer w-full p-3 border ${formik.touched.email && formik.errors.email
                                ? 'border-red-500'
                                : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute left-3 top-0 text-gray-500 transform transition-all duration-300 ${formik.values.email || formik.touched.email
                                ? '-translate-y-6 scale-75 text-blue-500'
                                : 'translate-y-3 scale-100 text-gray-400'
                            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:-translate-y-6 peer-focus:scale-75 z-[1]`}
                    >
                        Email
                    </label>
                    {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-red-500 text-sm">
                            {formik.errors.email}
                        </p>
                    )}
                </div>

                <div className={styles["fields-container"]}>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder=" "
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`peer w-full p-3 border ${formik.touched.password && formik.errors.password
                                ? 'border-red-500'
                                : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-3 top-0 text-gray-500 transform transition-all duration-300 ${formik.values.password || formik.touched.password
                                ? '-translate-y-6 scale-75 text-blue-500'
                                : 'translate-y-3 scale-100 text-gray-400'
                            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:-translate-y-6 peer-focus:scale-75`}
                    >
                        Password
                    </label>
                    {formik.touched.password && formik.errors.password && (
                        <p className="mt-1 text-red-500 text-sm">
                            {formik.errors.password}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
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