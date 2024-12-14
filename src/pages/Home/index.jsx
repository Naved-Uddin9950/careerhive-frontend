import React, { useState } from 'react';

const sampleJobs = [
    { id: 1, title: 'Frontend Developer Intern', company: 'Tech Corp', location: 'Remote', stipend: '₹10,000', skills: ['React', 'JavaScript'] },
    { id: 2, title: 'Graphic Design Intern', company: 'Creative Studios', location: 'Mumbai', stipend: '₹8,000', skills: ['Photoshop', 'Illustrator'] },
    { id: 3, title: 'Backend Developer Intern', company: 'Code Wizards', location: 'Bangalore', stipend: '₹12,000', skills: ['Node.js', 'MongoDB'] },
];

const JobListing = ({ job }) => {
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg w-full md:w-80">
            <h3 className="font-semibold text-gray-800 text-xl">{job.title}</h3>
            <p className="mt-2 text-gray-600"><strong>{job.company}</strong> - {job.location}</p>
            <p className="mt-1 text-gray-600"><strong>Stipend:</strong> {job.stipend}</p>
            <p className="mt-1 text-gray-600"><strong>Skills:</strong> {job.skills.join(', ')}</p>
            <button className="bg-primary hover:bg-secondary mt-4 py-2 rounded-md w-full text-white transition">
                Apply Now
            </button>
        </div>
    );
};

const index = () => {
    const [jobs, setJobs] = useState(sampleJobs);

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 py-16 text-center text-white">
                <h1 className="font-bold text-4xl">Find Your Dream Job</h1>
                <p className="mt-4 text-lg">Browse through the latest job opportunities tailored for you.</p>
            </section>

            <section className="mx-auto px-4 py-8 container">
                <h2 className="mb-6 font-semibold text-2xl text-gray-800">Trending</h2>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.length > 0 ? (
                        jobs.map((job) => <JobListing key={job.id} job={job} />)
                    ) : (
                        <p className="text-gray-600">No jobs found. Try a different search.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default index;