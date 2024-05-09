import { useEffect, useState } from "react";
import "./App.css";
import { useGetSampleJdMutation } from "./redux/api/jobsApi";
import JobCard from "./components/JobCard";
import { Box, Modal } from "@mui/material";
import AboutCompany from "./components/AboutCompany";

function App() {
  const [getJobsData, getJobsDataResult] = useGetSampleJdMutation();
  const [jobsData, setJobsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalJobData, setModalJobData] = useState({});

  const handleOpenModal = (job) => {
    setIsModalOpen(true);
    setModalJobData(job);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalJobData({});
  };

  // Function to generate random number between 1 to 10
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

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
    <>
      <h1>Jobs</h1>
      <div className="home">
        {jobsData.map((job, index) => (
          <JobCard
            key={index}
            jobData={job}
            handleOpenModal={handleOpenModal}
            generateRandomNumber={generateRandomNumber}
          />
        ))}
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 300,
            maxWidth: 600,
            bgcolor: "white",
            boxShadow: 24,
            overflowY: "auto",
            borderRadius: 4,
            p: 3,
          }}
        >
          {modalJobData !== undefined ? (
            <AboutCompany jobData={modalJobData} />
          ) : (
            <h1>No Data Available</h1>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default App;
