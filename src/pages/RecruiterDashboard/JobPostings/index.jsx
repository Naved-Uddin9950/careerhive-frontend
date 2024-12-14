import React, { useState } from 'react';
import { Table, Button, Space, Select, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const JobPostings = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

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
        { key: '1', title: 'Frontend Developer', date: '2024-12-01', applications: 23 },
        { key: '2', title: 'Backend Developer', date: '2024-11-15', applications: 10 },
        { key: '3', title: 'UI/UX Designer', date: '2024-10-01', applications: 15 },
        { key: '4', title: 'Full Stack Developer', date: '2024-09-20', applications: 8 },
        { key: '5', title: 'Data Analyst', date: '2024-08-18', applications: 18 },
        { key: '6', title: 'DevOps Engineer', date: '2024-07-15', applications: 12 },
        { key: '7', title: 'Project Manager', date: '2024-06-10', applications: 20 },
    ];

    const handlePageSizeChange = (value) => {
        setPageSize(value);
        setCurrentPage(1);
    };

    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <h2 className="font-bold text-lg sm:text-xl md:text-2xl">Job Postings</h2>
                </Col>
                <div className="flex items-center gap-2">
                    <Col>
                        <Button type="primary" onClick={() => navigate("create-post")}>Add Post</Button>
                    </Col>
                    <Col>
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            style={{ width: 120 }}
                            options={[
                                { value: 5, label: '5 / page' },
                                { value: 10, label: '10 / page' },
                                { value: 20, label: '20 / page' },
                            ]}
                        />
                    </Col>
                </div>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: data.length,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
        </div>
    );
};

export default JobPostings;