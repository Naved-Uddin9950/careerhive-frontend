import React from 'react';
import { Form, Input, DatePicker, Button, Space, Typography, message } from 'antd';

const { Title } = Typography;

const index = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Job posting data:', values);
        message.success('Job posting created successfully!');
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
        message.error('Please complete all required fields.');
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8 }}>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                Create New Job Posting
            </Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ applications: 0 }}
            >
                <Form.Item
                    label="Job Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the job title' }]}
                >
                    <Input placeholder="Enter job title" />
                </Form.Item>

                <Form.Item
                    label="Date Posted"
                    name="date"
                    rules={[{ required: true, message: 'Please select the date' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Applications (Optional)"
                    name="applications"
                    rules={[
                        { type: 'number', min: 0, message: 'Applications cannot be negative' },
                    ]}
                >
                    <Input type="number" placeholder="Enter number of applications" />
                </Form.Item>

                <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            Create Job Posting
                        </Button>
                        <Button htmlType="button" onClick={() => form.resetFields()}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default index;