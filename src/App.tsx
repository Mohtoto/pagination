import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import axios from "axios";



const App = () => {
  const [jobs, setJobs] = useState([]);
  const [modal, setModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(6);


  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get("https://jsonfakery.com/jobs/paginated");
      setJobs(data.data);
    };
    fetchJobs();
  }, []);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentJobs = jobs.slice(firstPostIndex, lastPostIndex);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-900'>
      <h1 className="text-3xl font-bold text-white mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {currentJobs.map((job) => <JobCard job={job} modal={modal} setModal={setModal} />)}
      </div>
    </div>
  );
};

export default App;
