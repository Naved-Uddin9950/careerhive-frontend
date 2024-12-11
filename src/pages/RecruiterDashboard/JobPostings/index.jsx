import React from 'react';
import { Table, Button, Space } from 'antd';

const JobPostings = () => {
    const columns = [
        {
            title: 'Job Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Date Posted',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Applications',
            dataIndex: 'applications',
            key: 'applications',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button>Edit</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            title: 'Frontend Developer',
            date: '2024-12-01',
            applications: 23,
        },
        {
            key: '2',
            title: 'Backend Developer',
            date: '2024-11-15',
            applications: 10,
        },
    ];

    return <Table columns={columns} dataSource={data} />;
};

export default JobPostings;