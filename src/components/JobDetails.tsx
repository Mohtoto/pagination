import axios from "axios";
import { useEffect, useState } from "react";
import type { Job } from "../types/types";


type JobDetailsProps = {
    id: string;
    jobDetails: boolean;
    setJobDetails: (val: boolean) => void;
};

const JobDetails = ({ setJobDetails, id }: JobDetailsProps) => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get("https://jsonfakery.com/jobs");
                setJobs(data);
            } catch (err) {
                console.error("Failed to fetch job details:", err);
            }
        };
        fetchJobs();
    }, []);

    const matchedJob = jobs.find((item) => item.id === id);

    // Safely parse qualifications
    let qualifications: string[] = [];
    try {
        if (matchedJob?.qualifications) {
            qualifications = Array.isArray(matchedJob.qualifications)
                ? matchedJob.qualifications
                : JSON.parse(matchedJob.qualifications);
        }
    } catch (e) {
        qualifications = [];
    }

    if (!matchedJob) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
                {/* Close Button */}
                <button
                    onClick={() => setJobDetails(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
                    aria-label="Close details modal"
                >
                    &times;
                </button>

                {/* Title & Company */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">{matchedJob.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{matchedJob.company}</p>

                {/* Job Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
                    <p><span className="font-medium">Location:</span> {matchedJob.location}</p>
                    <p><span className="font-medium">Salary:</span> ${matchedJob.salary_from.toLocaleString()} – ${matchedJob.salary_to.toLocaleString()}</p>
                    <p><span className="font-medium">Employment:</span> {matchedJob.employment_type}</p>
                    <p><span className="font-medium">Remote:</span> {matchedJob.is_remote_work ? "Yes" : "No"}</p>
                    <p><span className="font-medium">Deadline:</span> {matchedJob.application_deadline}</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">Job Description</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{matchedJob.description}</p>
                </div>

                {/* Qualifications */}
                {qualifications.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Qualifications</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                            {qualifications.map((qualification, i) => (
                                <li key={i}>{qualification}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDetails;
