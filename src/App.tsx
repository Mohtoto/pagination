import { useEffect, useState } from "react";
import JobList from "./components/JobList";
import axios from "axios";



const App = () => {
  const [jobs, setJobs] = useState([]);
 const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get("https://jsonfakery.com/jobs/paginated");
      setJobs(data.data);
    };
    fetchJobs();
  }, []);

  console.log(jobs);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-900'>
      <h1 className="text-3xl font-bold text-white mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => <JobList job={job} setModal={setModal} modal={modal} />)}
      </div>
    </div>
  );
};

export default App;
