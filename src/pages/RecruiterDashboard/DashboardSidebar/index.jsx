import React from 'react';
import { Menu } from 'antd';
import { BarChartOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';

const DashboardSidebar = ({ activeTab, setActiveTab }) => (
    <div className="h-full">
        <Menu
            mode="inline"
            selectedKeys={[activeTab]}
            onClick={(e) => setActiveTab(e.key)}
            className="h-full"
        >
            <Menu.Item key="stats" icon={<BarChartOutlined />}>
                Dashboard Stats
            </Menu.Item>
            <Menu.Item key="jobPostings" icon={<FileTextOutlined />}>
                Job Postings
            </Menu.Item>
            <Menu.Item key="applications" icon={<TeamOutlined />}>
                Applications
            </Menu.Item>
        </Menu>
    </div>
);

export default DashboardSidebar;