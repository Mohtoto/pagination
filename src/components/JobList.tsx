import ApplicationsModal from "./ApplicationsModal";
import type { JobCardProps } from "../types/types";


const JobList = ({ job, modal, setModal, setJobDetails, setSelectedJobId }: JobCardProps) => {
    const appliedJobs: string[] = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    const isApplied = appliedJobs.includes(job.id);

    const handleApply = () => {
        const updated = [...appliedJobs, job.id];
        localStorage.setItem("appliedJobs", JSON.stringify(updated));
        setModal(true);
    };

    const handleClickDetails = () => {
        setSelectedJobId(job.id);
        setJobDetails(true);
    };

    const jobType = job.employment_type.charAt(0).toUpperCase() + job.employment_type.slice(1);
    const remote = job.is_remote_work ? "Remote" : "Onsite";
    const salary = job.salary_from && job.salary_to
        ? `$${job.salary_from.toLocaleString()} - $${job.salary_to.toLocaleString()}`
        : "Negotiable";

    return (
        <div className="relative bg-white rounded-xl border p-6 shadow-md w-full max-w-sm">
            <div className="mb-3 text-sm text-gray-500">{job.company}</div>
            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{jobType}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{remote}</span>
            </div>

            {/* Salary + Location */}
            <div className="text-sm font-medium text-gray-800 mb-2">{salary}</div>
            <div className="text-xs text-gray-500 mb-4">{job.location}</div>

            {/* Apply & Details */}
            <div className="flex items-center justify-between gap-2">
                <button
                    onClick={handleApply}
                    className={`text-sm px-4 py-2 rounded font-medium transition ${
                        isApplied ? "bg-green-100 text-green-700 cursor-default" : "bg-black text-white hover:bg-gray-800"
                    }`}
                    disabled={isApplied}
                >
                    {isApplied ? "Applied" : "Apply now"}
                </button>

                <button
                    onClick={handleClickDetails}
                    className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                    Details
                </button>
            </div>

            {modal && <ApplicationsModal setModal={setModal} id={job.id} />}
        </div>
    );
};

export default JobList;
