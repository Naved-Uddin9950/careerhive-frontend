import React, { useEffect, useState } from "react";
import { Table, Button, Space, Select, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { getApiAuth } from "../../../utils/apiService";
const JobPostings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [jobList, setJobList] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const getJobPosting = async () => {
    try {
      const res = await getApiAuth("/recruiter/post-listings", token);
      if (res?.data?.success) {
        const data = res?.data?.data?.map((item) => {
          const date = new Date(item.updatedAt);

          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            day: "numeric",
            month: "numeric",
          });

          return {
            key: item._id,
            title: item.title,
            date: formattedDate,
            applications: item.applications,
          };
        });
        setJobList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getJobPosting();
    }
  }, [token]);
  console.log({ jobList });

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date Posted",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Applications",
      dataIndex: "applications",
      key: "applications",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button>Edit</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];



  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
            Job Postings
          </h2>
        </Col>
        <div className="flex items-center gap-2">
          <Col>
            <Button type="primary" onClick={() => navigate("create-post")}>
              Add Post
            </Button>
          </Col>
          <Col>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              style={{ width: 120 }}
              options={[
                { value: 5, label: "5 / page" },
                { value: 10, label: "10 / page" },
                { value: 20, label: "20 / page" },
              ]}
            />
          </Col>
        </div>
      </Row>
      <Table
        columns={columns}
        dataSource={jobList}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: jobList.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default JobPostings;
