import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import DashboardSidebar from './DashboardSidebar';
import JobPostings from './JobPostings';

const { Content } = Layout;

const RecruiterDashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'stats':
                return <JobPostings />;
            case 'jobPostings':
                return <JobPostings />;
            case 'applications':
                return <JobPostings />;
            default:
                return <JobPostings />;
        }
    };

    return (
        <Layout className="flex lg:flex-row flex-col h-screen">
            <Button
                className="lg:hidden m-4"
                icon={<MenuOutlined />}
                onClick={() => setSidebarVisible(!isSidebarVisible)}
            >
                Menu
            </Button>

            <div
                className={`${isSidebarVisible ? 'block' : 'hidden'
                    } lg:block bg-white shadow-lg fixed lg:relative w-64 h-screen z-50`}
            >
                <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <Layout className="flex-1">
                <Content className="bg-gray-100 p-4">{renderContent()}</Content>
            </Layout>
        </Layout>
    );
};

export default RecruiterDashboard;