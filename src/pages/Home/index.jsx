import React, { useEffect, useState } from 'react';
import { getApi } from '../../utils/apiService';

const JobListing = ({ job }) => {
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg w-full md:w-80">
            <h3 className="font-semibold text-gray-800 text-xl">{job.title}</h3>
            <p className="mt-2 text-gray-600"><strong>Location:</strong> {job.location || 'Not specified'}</p>
            <p className="mt-1 text-gray-600"><strong>Salary:</strong> ₹{job.salaryMin || 0} - ₹{job.salaryMax || 0}</p>
            <p className="mt-1 text-gray-600"><strong>Type:</strong> {job.type || 'Not specified'}</p>
            <p className="mt-1 text-gray-600"><strong>Skills:</strong> {job.skills.length ? job.skills.join(', ') : 'Not listed'}</p>
            <p className="mt-1 text-gray-600"><strong>Applications:</strong> {job.applications}</p>
            <button className="bg-primary hover:bg-secondary mt-4 py-2 rounded-md w-full text-white transition">
                Apply Now
            </button>
        </div>
    );
};

const JobFilters = ({ jobTypes, locations, filters, onFilterChange }) => {
    return (
        <div className="flex gap-6 mb-6">
            <select
                onChange={(e) => onFilterChange('type', e.target.value)}
                className="p-2 border rounded"
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
                className="p-2 border rounded"
                defaultValue=""
            >
                <option value="">All Locations</option>
                {locations.map((location) => (
                    <option key={location} value={location}>
                        {location || 'Not specified'}
                    </option>
                ))}
            </select>
            <div className="w-full max-w-sm">
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                    Salary Range (₹{filters.salary})
                </label>
                <input
                    type="range"
                    min="0"
                    max="20000"
                    step="1000"
                    value={filters.salary}
                    onChange={(e) => onFilterChange('salary', parseInt(e.target.value, 10))}
                    className="w-full"
                />
                <div className="flex justify-between text-gray-600 text-sm">
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
        <div className="bg-gray-100 min-h-screen">
            <section className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 py-16 text-center text-white">
                <h1 className="font-bold text-4xl">Find Your Dream Job</h1>
                <p className="mt-4 text-lg">Browse through the latest job opportunities tailored for you.</p>
            </section>

            <section className="mx-auto px-4 py-8 container">
                <JobFilters
                    jobTypes={jobTypes}
                    locations={locations}
                    onFilterChange={handleFilterChange}
                    filters={filters}
                />
                <h2 className="mb-6 font-semibold text-2xl text-gray-800">Available Jobs</h2>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <p className="text-gray-600">Loading jobs...</p>
                    ) : filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => <JobListing key={job._id} job={job} />)
                    ) : (
                        <p className="text-gray-600">No jobs found.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default JobListingPage;