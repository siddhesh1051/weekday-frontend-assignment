import { useEffect, useState } from "react";
import "./App.css";
import { useGetSampleJdMutation } from "./redux/api/jobsApi";
import JobCard from "./components/JobCard";
import { Box, Container, Modal } from "@mui/material";
import AboutCompany from "./components/AboutCompany";

function App() {
  const [getJobsData, getJobsDataResult] = useGetSampleJdMutation();
  const [jobsData, setJobsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalJobData, setModalJobData] = useState({});
  const [offset, setOffset] = useState(0);

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
    getJobsData({ limit: 10, offset: offset });
  }, [getJobsData, offset]);

  useEffect(() => {
    if (getJobsDataResult.isSuccess) {
      setJobsData((prev) => [...prev, ...getJobsDataResult.data.jdList]);
    } else {
      console.log(getJobsDataResult.error);
    }
  }, [getJobsDataResult]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 10 &&
      !getJobsDataResult.isLoading
    ) {
      setOffset((prev) => prev + 10);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <h1>Jobs</h1>
      <Container className="wrapper__container">
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
        <div className="loading">
          {getJobsDataResult.isLoading && (
            <div className="loading__container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <path
                  fill="#4943DA"
                  stroke="#4943DA"
                  stroke-width="13"
                  transform-origin="center"
                  d="m148 84.7 13.8-8-10-17.3-13.8 8a50 50 0 0 0-27.4-15.9v-16h-20v16A50 50 0 0 0 63 67.4l-13.8-8-10 17.3 13.8 8a50 50 0 0 0 0 31.7l-13.8 8 10 17.3 13.8-8a50 50 0 0 0 27.5 15.9v16h20v-16a50 50 0 0 0 27.4-15.9l13.8 8 10-17.3-13.8-8a50 50 0 0 0 0-31.7Zm-47.5 50.8a35 35 0 1 1 0-70 35 35 0 0 1 0 70Z"
                >
                  <animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="2.7"
                    values="0;120"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  ></animateTransform>
                </path>
              </svg>
            </div>
          )}
        </div>
      </Container>

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
