import React, { useEffect, useState } from "react";
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
  const [minExpFilter, setMinExpFilter] = useState(0); // State for minimum experience filter
  const [minBasePayFilter, setMinBasePayFilter] = useState(0); // State for minimum base pay filter
  const [selectedLocations, setSelectedLocations] = useState([]); // State for selected locations

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

  // Function to handle change in minimum experience filter
  const handleMinExpChange = (e) => {
    setMinExpFilter(parseInt(e.target.value));
  };

  // Function to handle change in minimum base pay filter
  const handleMinBasePayChange = (e) => {
    setMinBasePayFilter(parseInt(e.target.value));
  };

  // Function to handle change in selected locations
  const handleLocationChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedLocations(selectedOptions);
  };

  return (
    <>
      <h1>Jobs</h1>
      {/* Select dropdown for minimum experience filter */}
      <select value={minExpFilter} onChange={handleMinExpChange}>
        <option value={0}>Select Minimum Experience</option>
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      {/* Select dropdown for minimum base pay filter */}
      <select value={minBasePayFilter} onChange={handleMinBasePayChange}>
        <option value={0}>Select Minimum Base Pay</option>
        {[...Array(21).keys()].map((i) => (
          <option key={i} value={i * 1000000}>
            {i * 10}L
          </option>
        ))}
      </select>

      {/* Multiple selector for locations */}
      <select
        multiple
        value={selectedLocations}
        onChange={handleLocationChange}
      >
        <option value="">Select Location(s)</option>
        {[
          { label: "delhi ncr", value: "delhi ncr" },
          { label: "mumbai", value: "mumbai" },
          { label: "remote", value: "remote" },
          { label: "chennai", value: "chennai" },
          { label: "bangalore", value: "bangalore" },
        ].map((option) => (
          <option key={option.val} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Container className="wrapper__container">
        <div className="home">
          {(minExpFilter === 0 &&
          minBasePayFilter === 0 &&
          selectedLocations.length === 0
            ? jobsData
            : jobsData.filter(
                (job) =>
                  (minExpFilter === 0 || job.minExp >= minExpFilter) &&
                  (minBasePayFilter === 0 ||
                    job.minBasePay >= minBasePayFilter) &&
                  (selectedLocations.length === 0 ||
                    selectedLocations.includes(job.location))
              )
          ).map((job, index) => (
            <JobCard
              key={index}
              jobData={job}
              handleOpenModal={handleOpenModal}
              generateRandomNumber={generateRandomNumber}
            />
          ))}
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
