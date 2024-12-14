import React from 'react';
import { Input, DatePicker, Button, Space, Typography, InputNumber, message, Select } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddPost.module.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter the job title'),
    description: Yup.string().required('Please enter the job description'),
    type: Yup.string().required('Please select the job type'),
    salaryMin: Yup.number()
        .typeError('Please enter a valid number')
        .min(0, 'Minimum salary cannot be negative')
        .required('Please enter the minimum salary'),
    salaryMax: Yup.number()
        .typeError('Please enter a valid number')
        .min(Yup.ref('salaryMin'), 'Maximum salary must be greater than or equal to minimum salary')
        .required('Please enter the maximum salary'),
});

const index = () => {
    const handleSubmit = (values, { resetForm }) => {
        console.log('Job posting data:', values);
        message.success('Job posting created successfully!');
        resetForm();
    };

    return (
        <div style={{ margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8 }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Create New Job Posting
            </Title>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    type: '',
                    salaryMin: '',
                    salaryMax: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, resetForm }) => (
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
                                    style={{ color: 'red', marginTop: 4 }}
                                />
                            </div>
                            <div className={styles["form-item"]}>
                                <label htmlFor="type">Type of Job</label>
                                <Select
                                    placeholder="Select job type"
                                    value={values.type}
                                    onChange={(value) => setFieldValue('type', value)}
                                    style={{ width: '100%' }}
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
                                    style={{ color: 'red', marginTop: 4 }}
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
                                style={{ color: 'red', marginTop: 4 }}
                            />
                        </div>

                        <div className={styles["input-container"]}>
                            <div className={styles["form-item"]}>
                                <label htmlFor="salaryMin">Salary Range (Minimum)</label>
                                <Field
                                    name="salaryMin"
                                    as={InputNumber}
                                    placeholder="Minimum salary"
                                    style={{ width: '100%' }}
                                    min={0}
                                />
                                <ErrorMessage
                                    name="salaryMin"
                                    component="div"
                                    style={{ color: 'red', marginTop: 4 }}
                                />
                            </div>

                            <div className={styles["form-item"]}>
                                <label htmlFor="salaryMax">Salary Range (Maximum)</label>
                                <Field
                                    name="salaryMax"
                                    as={InputNumber}
                                    placeholder="Maximum salary"
                                    style={{ width: '100%' }}
                                    min={0}
                                />
                                <ErrorMessage
                                    name="salaryMax"
                                    component="div"
                                    style={{ color: 'red', marginTop: 4 }}
                                />
                            </div>
                        </div>

                        <Space style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
                            <Button type="primary" htmlType="submit">
                                Create Job Posting
                            </Button>
                            <Button htmlType="button" onClick={resetForm}>
                                Reset
                            </Button>
                        </Space>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default index;