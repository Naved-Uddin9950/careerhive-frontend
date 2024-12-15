import React, { useEffect, useState } from "react";
import { Layout, Button, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import DashboardSidebar from "./DashboardSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./RecruiterDashboard.module.css";
import { useAuth } from "../../contexts/AuthContext";

const { Content } = Layout;

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "logout") {
      logout();
    }
  }, [activeTab]);

  if(user?.role !== 'recruiter') {
    message.info("Access denied. You are not a recruiter.");
    navigate(-1);
  }

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
        className={`${isSidebarVisible ? "block" : "hidden"
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
