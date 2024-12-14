import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import DashboardSidebar from './DashboardSidebar';
import { Outlet } from 'react-router-dom';
import styles from './RecruiterDashboard.module.css';

const { Content } = Layout;

const RecruiterDashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    return (
        <Layout className={styles["dashboard-container"]}>
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
                <Content className="bg-gray-100 p-4">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default RecruiterDashboard;