const jobSkills = [
  { id: 1, skill: "Node.js", value: "node" },
  { id: 2, skill: "React", value: "react" },
  { id: 3, skill: "HTML", value: "html" },
  { id: 4, skill: "CSS", value: "css" },
  { id: 5, skill: "JavaScript", value: "javascript" },
  { id: 6, skill: "TypeScript", value: "typescript" },
  { id: 7, skill: "Python", value: "python" },
  { id: 8, skill: "Django", value: "django" },
  { id: 9, skill: "Flask", value: "flask" },
  { id: 10, skill: "Angular", value: "angular" },
  { id: 11, skill: "Vue.js", value: "vue" },
  { id: 12, skill: "Bootstrap", value: "bootstrap" },
  { id: 13, skill: "jQuery", value: "jquery" },
  { id: 14, skill: "PHP", value: "php" },
  { id: 15, skill: "Laravel", value: "laravel" },
  { id: 16, skill: "Ruby on Rails", value: "ruby-on-rails" },
  { id: 17, skill: "MySQL", value: "mysql" },
  { id: 18, skill: "PostgreSQL", value: "postgresql" },
  { id: 19, skill: "MongoDB", value: "mongodb" },
  { id: 20, skill: "GraphQL", value: "graphql" },
  { id: 21, skill: "REST APIs", value: "rest-apis" },
  { id: 22, skill: "Git", value: "git" },
  { id: 23, skill: "Docker", value: "docker" },
  { id: 24, skill: "Kubernetes", value: "kubernetes" },
  { id: 25, skill: "AWS", value: "aws" },
  { id: 26, skill: "Azure", value: "azure" },
  { id: 27, skill: "Google Cloud", value: "google-cloud" },
  { id: 28, skill: "Firebase", value: "firebase" },
  { id: 29, skill: "Webpack", value: "webpack" },
  { id: 30, skill: "Babel", value: "babel" },
];

import React from "react";
import {
  Input,
  Button,
  Space,
  Typography,
  InputNumber,
  message,
  Select,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AddPost.module.css";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter the job title"),
  description: Yup.string().required("Please enter the job description"),
  type: Yup.string().required("Please select the job type"),
  salaryMin: Yup.number()
    .typeError("Please enter a valid number")
    .min(0, "Minimum salary cannot be negative")
    .required("Please enter the minimum salary"),
  salaryMax: Yup.number()
    .typeError("Please enter a valid number")
    .min(
      Yup.ref("salaryMin"),
      "Maximum salary must be greater than or equal to minimum salary"
    )
    .required("Please enter the maximum salary"),
  location: Yup.string()
    .required("Location is required")
    .typeError("Location must be a string"),
  skills: Yup.array()
    .of(Yup.string().typeError("Each skill must be a string"))
    .required("Skills are required")
    .min(1, "At least one skill is required"),
});

const index = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Job posting data:", values);
    message.success("Job posting created successfully!");
    resetForm();
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        Create New Job Posting
      </Title>
      <Formik
        initialValues={{
          title: "",
          description: "",
          type: "full-time",
          salaryMin: "",
          salaryMax: "",
          location: "",
          skills: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, resetForm }) => {
            console.log({values})
          return (
            <Form layout="vertical" className="space-y-4 w-full">
              <div className={styles["input-container"]}>
                <div className={styles["form-item"]}>
                  <label htmlFor="title">Job Title</label>
                  <Field
                    name="title"
                    as={Input}
                    placeholder="Enter job title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    style={{ color: "red", marginTop: 4 }}
                  />
                </div>
                <div className={styles["form-item"]}>
                  <label htmlFor="type">Type of Job</label>
                  <Select
                    placeholder="Select job type"
                    value={values.type}
                    onChange={(value) => setFieldValue("type", value)}
                    style={{ width: "100%" }}
                  >
                    <Option value="internship">Internship</Option>
                    <Option value="training">Training</Option>
                    <Option value="part-time">Part-time</Option>
                    <Option value="full-time">Full-time</Option>
                    <Option value="freelance">Freelance</Option>
                  </Select>
                  <ErrorMessage
                    name="type"
                    component="div"
                    style={{ color: "red", marginTop: 4 }}
                  />
                </div>
              </div>

              <div className={styles["form-item"]}>
                <label htmlFor="description">Job Description</label>
                <Field
                  name="description"
                  as={TextArea}
                  placeholder="Enter job description"
                  rows={4}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  style={{ color: "red", marginTop: 4 }}
                />
              </div>

              <div className={styles["input-container"]}>
                <div className={styles["form-item"]}>
                  <label htmlFor="salaryMin">Salary Range (Minimum)</label>
                  <InputNumber
                    name="salaryMin"
                    placeholder="Minimum salary"
                    style={{ width: "100%" }}
                    value={values.salaryMin}
                    min={0}
                    onChange={(value) => setFieldValue("salaryMin", value)}
                  />
                  <ErrorMessage
                    name="salaryMin"
                    component="div"
                    style={{ color: "red", marginTop: 4 }}
                  />
                </div>

                <div className={styles["form-item"]}>
                  <label htmlFor="salaryMax">Salary Range (Maximum)</label>
                  <InputNumber
                    name="salaryMax"
                    placeholder="Maximum salary"
                    style={{ width: "100%" }}
                    value={values.salaryMax}
                    min={values.salaryMin || 0}
                    onChange={(value) => setFieldValue("salaryMax", value)}
                  />
                  <ErrorMessage
                    name="salaryMax"
                    component="div"
                    style={{ color: "red", marginTop: 4 }}
                  />
                </div>
              </div>

              <div className={styles["input-container"]}>
                <div className={styles["form-item"]}>
                  <label htmlFor="location">Location</label>
                  <Field
                    name="location"
                    as={Input}

                    placeholder="Enter job location"
                  />

                  <ErrorMessage
                    name="location"
                    component="div"
                    style={{ color: "red", marginTop: 4 }}
                  />
                </div>
                <div className={styles["form-item"]}>
                  <label htmlFor="skills">Skills</label>
                  <Select
                    onChange={(value) => setFieldValue("skills", value)}
                    name="skills"
                    mode="multiple"
                    showSearch
                    placeholder="Select Skills"
                    filterOption={true}
                    allowClear
                    style={{ width: "100%" }}
                  >
                    {jobSkills.map((item) => {
                      return (
                        <Option key={item.id} value={item.skill}>
                          {item.skill}
                        </Option>
                      );
                    })}
                  </Select>
                  <ErrorMessage
                    name="skills"
                    component="div"
                    style={{ color: "red", marginTop: 4 }}
                  />
                </div>
              </div>

              <Space
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 24,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Create Job Posting
                </Button>
                <Button htmlType="button" onClick={resetForm}>
                  Reset
                </Button>
              </Space>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default index;
