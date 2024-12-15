import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApi } from '../../utils/apiService';
import styles from './Job.module.css';
import { Spin } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const JobDetailsPage = () => {
    const [query] = useSearchParams();
    const id = query.get('id');
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await getApi(`/recruiter/post?id=${id}`);
                setJobDetails(response.data.data);
            } catch (err) {
                setError('Error fetching job details');
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (loading) {
        return (
            <div className={styles["loader-container"]}>
                <div className={styles["loader"]}>
                    <Spin />
                    <span className={styles["loader-text"]}>Loading job details...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["error-container"]}>
                <span className={styles["error"]}>{error}</span>
            </div>
        );
    }

    if (!jobDetails) {
        return (
            <div className={styles["nojob-container"]}>
                <span className={styles["nojob"]}>No job details found</span>
            </div>
        );
    }

    const { jobPost, applications } = jobDetails;

    const apply = async () => {
        console.log(applications);
    }

    return (
        <div className={styles["job-container"]}>
            <section className={styles["hero-section"]}>
                <h1 className={styles["hero-title"]}>{jobPost.title}</h1>
                <p className={styles["hero-papagraph"]}>{jobPost.location || 'Location not specified'}</p>
            </section>

            <section className={styles["details-section"]}>
                <div className={styles["details-container"]}>
                    <div className={styles["description-container"]}>
                        <h2 className={styles["description-label"]}>Job Description</h2>
                        <p className={styles["description"]}>{jobPost.description}</p>
                    </div>

                    <div className={styles["jobinfo-container"]}>
                        <div>
                            <h3 className={styles["jobinfo-labels"]}>Salary</h3>
                            <p className={styles["jobinfo"]}>₹{jobPost.salaryMin} - ₹{jobPost.salaryMax}</p>
                        </div>
                        <div>
                            <h3 className={styles["jobinfo-labels"]}>Job Type</h3>
                            <p className={styles["jobinfo"]}>{jobPost.type || 'Not specified'}</p>
                        </div>
                        <div className={styles["skills-section"]}>
                            <h3 className={styles["jobinfo-labels"]}>Required Skills</h3>
                            <div className={styles["skills-container"]}>
                                {jobPost.skills.length ? (
                                    jobPost.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className={styles["skills"]}
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className={styles["jobinfo"]}>Not specified</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles["applications-section"]}>
                        <h3 className={styles["application-title"]}>Applications</h3>
                        {applications.length ? (
                            <ul className={styles["applications-list"]}>
                                {applications.map((application) => (
                                    <li
                                        key={application._id}
                                        className={styles["application-item"]}
                                    >
                                        <div>
                                            <strong>Name:</strong> {application.fullname}
                                        </div>
                                        {user?.role === "recruiter" &&
                                            <div>
                                                <strong>Email:</strong> {application.email}
                                            </div>
                                        }
                                        <div>
                                            <strong>Status:</strong> {application.status}
                                        </div>
                                        <div>
                                            <strong>Applied At:</strong>{' '}
                                            {new Date(application.appliedAt).toLocaleString()}
                                        </div>
                                        {user?.role === "recruiter" &&
                                            <div>
                                                <strong>Resume:</strong>{' '}
                                                <a
                                                    href={application.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline"
                                                >
                                                    View Resume
                                                </a>
                                            </div>
                                        }
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles["no-application"]}>No applications yet</p>
                        )}
                    </div>

                    <button className={styles["apply-button"]} onClick={apply}>
                        Apply Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default JobDetailsPage;
