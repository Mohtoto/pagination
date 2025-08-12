export type Job = {
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

export type JobCardProps = {
    job: Job;
    modal: boolean;
    setModal: any;
    jobDetails: boolean;
    setJobDetails: (val: boolean) => void;
    setSelectedJobId: (id: string) => void;
    setThankModal: (val: boolean) => void;
};

