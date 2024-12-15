import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillAlt, FaBriefcase, FaCode, FaUsers } from "react-icons/fa";
import { getApi } from '../../utils/apiService';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { message } from 'antd';

const JobListing = ({ job }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const apply = () => {
        if (!isAuthenticated) {
            return message.warning("Login to apply for the job");
        }
        navigate(`/jobseeker/job?id=${job._id}`);
    }

    return (
        <div className={styles["joblisting-container"]}>
            <h3 className={styles["job-title"]}>{job.title}</h3>
            <div className={styles["job-details"]}>
                <FaMapMarkerAlt className={styles["icon"]} />
                <span><strong>Location:</strong> {job.location || "Not specified"}</span>
            </div>
            <div className={styles["job-details"]}>
                <FaMoneyBillAlt className={styles["icon"]} />
                <span><strong>Salary:</strong> ₹{job.salaryMin || 0} - ₹{job.salaryMax || 0}</span>
            </div>
            <div className={styles["job-details"]}>
                <FaBriefcase className={styles["icon"]} />
                <span><strong>Type:</strong> {job.type || "Not specified"}</span>
            </div>
            <div className={styles["job-details"]}>
                <FaCode className={styles["icon"]} />
                <span><strong>Skills:</strong> {job.skills.length ? job.skills.join(", ") : "Not listed"}</span>
            </div>
            <div className={styles["job-details"]}>
                <FaUsers className={styles["icon"]} />
                <span><strong>Applications:</strong> {job.applications}</span>
            </div>
            <button className={styles["apply-button"]} onClick={apply}>
                Apply Now
            </button>
        </div>
    );
};

const JobFilters = ({ jobTypes, locations, filters, onFilterChange }) => {
    return (
        <div className={styles["jobfilters-container"]}>
            <select
                onChange={(e) => onFilterChange('type', e.target.value)}
                className={styles["select-box"]}
                defaultValue=""
            >
                <option value="">All Job Types</option>
                {jobTypes.map((type) => (
                    <option key={type} value={type}>
                        {type || 'Not specified'}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => onFilterChange('location', e.target.value)}
                className={styles["select-box"]}
                defaultValue=""
            >
                <option value="">All Locations</option>
                {locations.map((location) => (
                    <option key={location} value={location}>
                        {location || 'Not specified'}
                    </option>
                ))}
            </select>
            <div className={styles["salaryrange-container"]}>
                <label className={styles["salaryrange-label"]}>
                    Salary Range (₹{filters.salary})
                </label>
                <input
                    type="range"
                    min="0"
                    max="20000"
                    step="1000"
                    value={filters.salary}
                    onChange={(e) => onFilterChange('salary', parseInt(e.target.value, 10))}
                    className={styles["salaryrange-input"]}
                />
                <div className={styles["salaryrange"]}>
                    <span>₹0</span>
                    <span>₹20000</span>
                </div>
            </div>
        </div>
    );
};

const JobListingPage = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        type: '',
        location: '',
        salary: 0
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await getApi("/jobseeker/home");
                setJobs(response.data.data);
                setFilteredJobs(response.data.data);
            } catch (error) {
                console.log("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [filterType]: value };
            applyFilters(updatedFilters);
            return updatedFilters;
        });
    };

    const applyFilters = (filters) => {
        let filtered = [...jobs];

        if (filters.type) {
            filtered = filtered.filter((job) => job.type && job.type.toLowerCase() === filters.type.toLowerCase());
        }

        if (filters.location) {
            filtered = filtered.filter((job) => job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()));
        }

        if (filters.salary > 0) {
            filtered = filtered.filter((job) => job.salaryMin >= filters.salary);
        }

        setFilteredJobs(filtered);
    };

    const jobTypes = Array.from(new Set(jobs.map((job) => job.type)));
    const locations = Array.from(new Set(jobs.map((job) => job.location)));

    return (
        <div className={styles["home-container"]}>
            <section className={styles["hero-section"]}>
                <h1 className={styles["hero-title"]}>Find Your Dream Job</h1>
                <p className={styles["hero-paragraph"]}>Browse through the latest job opportunities tailored for you.</p>
            </section>

            <section className={styles["joblistings-section"]}>
                <JobFilters
                    jobTypes={jobTypes}
                    locations={locations}
                    onFilterChange={handleFilterChange}
                    filters={filters}
                />
                <h2 className={styles["title"]}>Available Jobs</h2>
                <div className={styles["loading-container"]}>
                    {loading ? (
                        <p className={styles["loading"]}>Loading jobs...</p>
                    ) : filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => <JobListing key={job._id} job={job} />)
                    ) : (
                        <p className={styles["loading"]}>No jobs found.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default JobListingPage;