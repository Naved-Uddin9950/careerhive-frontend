import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getApi } from '../../utils/apiService';

const JobDetailsPage = () => {
    const [query] = useSearchParams();
    const id = query.get("id");
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await getApi(`/recruiter/post?id=${id}`);
                setJobDetails(response.data.data); // Adjust to use correct path
                console.log(response.data.data); // For debugging purposes
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
            <div className="mt-12 text-center">
                <span className="text-lg">Loading job details...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-12 text-center">
                <span className="text-lg text-red-600">{error}</span>
            </div>
        );
    }

    if (!jobDetails) {
        return (
            <div className="mt-12 text-center">
                <span className="text-lg">No job details found</span>
            </div>
        );
    }

    const { jobPost, applications } = jobDetails;

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 py-16 text-center text-white">
                <h1 className="font-bold text-4xl">{jobPost.title}</h1>
                <p className="mt-4 text-lg">{jobPost.location}</p>
            </section>

            <section className="mx-auto px-4 py-8 container">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800 text-xl">Job Description</h3>
                    <p className="mt-2 text-gray-600">{jobPost.description}</p>
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">Salary:</h4>
                        <p className="text-gray-600">₹{jobPost.salaryMin} - ₹{jobPost.salaryMax}</p>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">Job Type:</h4>
                        <p className="text-gray-600">{jobPost.type}</p>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">Required Skills:</h4>
                        <ul className="pl-6 text-gray-600 list-disc">
                            {jobPost.skills.length ? (
                                jobPost.skills.map((skill, index) => <li key={index}>{skill}</li>)
                            ) : (
                                <li>Not specified</li>
                            )}
                        </ul>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">Applications:</h4>
                        {applications.length ? (
                            <ul className="text-gray-600">
                                {applications.map((application) => (
                                    <li key={application._id} className="mt-4">
                                        <div>
                                            <strong>Email:</strong> {application.email}
                                        </div>
                                        <div>
                                            <strong>Status:</strong> {application.status}
                                        </div>
                                        <div>
                                            <strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}
                                        </div>
                                        <div>
                                            <strong>Resume:</strong> <a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No applications yet</p>
                        )}
                    </div>

                    <button className="bg-primary hover:bg-secondary mt-6 px-4 py-2 rounded-md w-full text-white transition">
                        Apply Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default JobDetailsPage;