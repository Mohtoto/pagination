import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import axios from "axios";
import Pagination from "./components/Pagination";
import JobDetails from "./components/JobDetails";
import Search from "./components/Search";
import type { Job } from "./types/types";
import ThankyYouModal from "./components/ThankYouModal";

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const [thankModal, setThankModal] = useState(false);


  // Load jobs either from localStorage or API
  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      const fetchJobs = async () => {
        const { data } = await axios.get("https://jsonfakery.com/jobs");
        setJobs(data);
        localStorage.setItem("jobs", JSON.stringify(data));
      };
      fetchJobs();
    }
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const filteredJob = jobs.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()));


  const currentJobs = filteredJob.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 relative">
      <h1 className="text-7xl font-bold text-white mb-8 font-mono">Job Listings</h1>
      <Search setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {currentJobs.length === 0 ? <p className="text-red-500">No results..</p> :
          currentJobs.map((job) => (
            <JobList
              job={job}
              modal={modal}
              setModal={setModal}
              jobDetails={jobDetails}
              setJobDetails={setJobDetails}
              setSelectedJobId={setSelectedJobId}
              setThankModal={setThankModal}
            />
          ))}
      </div>

      <Pagination
        totalPosts={jobs.length}
        postsPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      {jobDetails && selectedJobId && (
        <JobDetails
          id={selectedJobId}
          jobDetails={jobDetails}
          setJobDetails={setJobDetails}
        />
      )}

      {thankModal && (
        <ThankyYouModal setThankModal={setThankModal} />
      )}
    </div>
  );
};

export default App;
