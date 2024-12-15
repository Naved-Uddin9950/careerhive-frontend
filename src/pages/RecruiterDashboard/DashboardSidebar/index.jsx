import React from "react";
import { Menu } from "antd";
import {
  BarChartOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        onClick={(e) => setActiveTab(e.key)}
        className="h-full"
      >
        <Menu.Item key="home" icon={<BarChartOutlined />} onClick={() => navigate("/")}>
          Home
        </Menu.Item>
        <Menu.Item key="stats" icon={<BarChartOutlined />}>
          Dashboard Stats
        </Menu.Item>
        <Menu.Item
          key="jobPostings"
          icon={<FileTextOutlined />}
          onClick={() => navigate("/recruiter")}
        >
          Job Postings
        </Menu.Item>
        <Menu.Item key="applications" icon={<TeamOutlined />}>
          Applications
        </Menu.Item>
        <Menu.Item key="logout" icon={<TeamOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default DashboardSidebar;
