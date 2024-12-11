import React from "react";
import { ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";
import AuthInnerPage from "../../components/AuthInnerPage";
import styles from "../Login/Login.module.css";
import { postAPI } from "../../services/ApiSerices";
import { toast } from "react-toastify";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      name: Yup.string()
        .required("Name is required")
        .max(50, "Name must be 50 characters or less")
        .matches(
          /^[a-zA-Z\s-]+$/,
          "Name can only contain letters, spaces, and hyphens"
        )
        .trim("Name cannot have leading or trailing spaces")
        .strict(true),

      role: Yup.string()
        .required("Role is required")
        .oneOf(["Recruiter", "Job Seeker"], "Invalid role selected"),
    }),
    onSubmit: (values, { setSubmitting,resetForm }) => {
      registerHandler(values, setSubmitting,resetForm);
    },
  });

  const registerHandler = async (values, setSubmitting,resetForm) => {
    const body = {
      fullname: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    try {
      const res = await postAPI("/api/users/register", body,toast);
      console.log({ res });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };


  
  return (
    <AuthInnerPage image="https://purisconsulting.com/wp-content/uploads/2019/01/Company-Branding_team-work.png">
      <form onSubmit={formik.handleSubmit} className={styles["form-container"]}>
        <h1 className={styles["heading"]}>Register Page</h1>

        <div className={styles["fields-container"]}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder=""
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`peer w-full p-3 border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg focus:outline-none  transition-all duration-300`}
          />
          <label
            htmlFor="email"
            className={`absolute left-3 top-0 text-gray-500 transform transition-all duration-300 ${
              formik.values.email || formik.touched.email
                ? "-translate-y-6 scale-75 text-blue-500"
                : "translate-y-3 scale-100 text-gray-400"
            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:-translate-y-6 peer-focus:scale-75 z-[1]`}
          >
            Email
          </label>
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>
        <div className={styles["fields-container"]}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder=""
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`peer w-full p-3 border ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg focus:outline-none  transition-all duration-300`}
          />
          <label
            htmlFor="name"
            className={`absolute left-3 top-0 text-gray-500 transform transition-all duration-300 ${
              formik.values.name || formik.touched.name
                ? "-translate-y-6 scale-75 text-blue-500"
                : "translate-y-3 scale-100 text-gray-400"
            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:-translate-y-6 peer-focus:scale-75 z-[1]`}
          >
            Name
          </label>
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-red-500 text-sm">{formik.errors.name}</p>
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
            className={`peer w-full p-3 border ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg focus:outline-none  transition-all duration-300`}
          />
          <label
            htmlFor="password"
            className={`absolute left-3 top-0 text-gray-500 transform transition-all duration-300 ${
              formik.values.password || formik.touched.password
                ? "-translate-y-6 scale-75 text-blue-500"
                : "translate-y-3 scale-100 text-gray-400"
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
        <div className={styles["fields-container"]}>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder=" "
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`peer w-full p-3 border ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg focus:outline-none  transition-all duration-300`}
          />
          <label
            htmlFor="confirmPassword"
            className={`absolute left-3 top-0 text-gray-500 transform transition-all duration-300 ${
              formik.values.confirmPassword || formik.touched.confirmPassword
                ? "-translate-y-6 scale-75 text-blue-500"
                : "translate-y-3 scale-100 text-gray-400"
            } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:-translate-y-6 peer-focus:scale-75`}
          >
            Confirm password
          </label>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="mt-1 text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>
        <div className={styles["fields-container"]}>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="  p-3
            bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose Role</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Job Seeker">Job Seeker</option>
          </select>
        </div>

        <button
          disabled={formik.isSubmitting}
          type="submit"
          className={styles["submit"]}
        >
          Register
        </button>
      </form>
    </AuthInnerPage>
  );
};

export default Register;
