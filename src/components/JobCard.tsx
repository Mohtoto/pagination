type Job = {
    application_deadline: string;
    company: string;
    contact: string;
    created_at: string;
    description: string;
    employment_type: string;
    id: string;
    is_remote_work: number;
    job_category: string;
    location: string;
    number_of_opening: number;
    qualifications: string;
    salary_from: number;
    salary_to: number;
    title: string;
    updated_at: string;
};

type JobCardProps = {
    job: Job;
};
const JobCard = ({ job }: JobCardProps) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-4">Company: {job.company}</p>
            <p className="text-gray-600 mb-4">Location: {job.location}</p>
            <p className="text-gray-600 mb-4">Salary: ${job.salary_from} - ${job.salary_to}</p>
            <p className="text-gray-600 mb-4">Posted on: {job.created_at}</p>
            <p className="text-gray-600 mb-4">
               {job.description}
            </p>
            <div className="flex justify-between items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Apply Now
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">
                    Save Job
                </button>
            </div>
        </div>
    )
}

export default JobCard