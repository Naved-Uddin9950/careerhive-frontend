import React, { useEffect, useState } from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";
import AuthInnerPage from "../../components/AuthInnerPage";
import Input from "../../components/Input";
import styles from "./Register.module.css";
import { postAPI } from "../../utils/apiService";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const index = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const storedUser = Cookies.get("user");

  useEffect(() => {
    if (!storedUser) {
      return;
    }
    const userData = JSON.parse(storedUser);
    if ((pathname === "/login" || pathname === "/register") && userData) {
      navigate("/recruiter");
    }
  }, []);
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
        .oneOf(["recruiter", "jobseeker"], "Invalid role selected"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      registerHandler(values, setSubmitting, resetForm);
    },
  });

  const [loading, setLoading] = useState(false);

  const registerHandler = async (values, setSubmitting, resetForm) => {
    const body = {
      fullname: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    try {
      setLoading(true);
      const res = await postAPI("/users/register", body, toast);
      console.log({ res });
      // navigate("/login")
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <AuthInnerPage image="https://purisconsulting.com/wp-content/uploads/2019/01/Company-Branding_team-work.png">
      <form onSubmit={formik.handleSubmit} className={styles["form-container"]}>
        <h1 className={styles["heading"]}> New Register</h1>

        <div className={styles["fields-container"]}>
          <Input
            placeholder="Email"
            id="email"
            register="email"
            formik={formik}
          />
        </div>
        <div className={styles["fields-container"]}>
          <Input placeholder="Name" id="name" register="name" formik={formik} />
        </div>

        <div className={styles["fields-container"]}>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            register="password"
            formik={formik}
          />
        </div>
        <div className={styles["fields-container"]}>
          <Input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            register="confirmPassword"
            formik={formik}
          />
        </div>
        <div className={styles["fields-container"]}>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="block border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 border dark:focus:border-blue-500 rounded-lg dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:text-white dark:placeholder-gray-400"
          >
            <option selected>Choose Role</option>
            <option value="recruiter">Recruiter</option>
            <option value="jobseeker">Job Seeker</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-500 text-sm">{formik.errors.role}</p>
          )}
        </div>

        <button
          disabled={formik.isSubmitting}
          type="submit"
          className={styles["submit"]}
        >
          {loading ? <Spin /> : "Register"}
        </button>
        <span className="mb-3 text-gray-500 dark:text-gray-400">
          Alredy Register?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary cursor-pointer"
          >
            Login Here
          </span>{" "}
        </span>
      </form>
    </AuthInnerPage>
  );
};

export default index;
