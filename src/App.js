import { useEffect, useState } from "react";
import "./App.css";
import { useGetSampleJdMutation } from "./redux/api/jobsApi";

function App() {
  const [getJobsData, getJobsDataResult] = useGetSampleJdMutation();
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    getJobsData({ limit: 10, offset: 0 });
  }, [getJobsData]);

  useEffect(() => {
    if (getJobsDataResult.isSuccess) {
      setJobsData(getJobsDataResult.data.jdList);
    } else {
      console.log(getJobsDataResult.error);
    }
  }, [getJobsDataResult]);

  return (
    <div className="App">
      <h1>Jobs</h1>
      <ul>
        {jobsData.map((job) => (
          <li key={job.jdUid}>{job.companyName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
