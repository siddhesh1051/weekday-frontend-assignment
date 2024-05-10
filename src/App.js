import React, { useEffect, useState } from "react";
import "./App.css";
import { useGetSampleJdMutation } from "./redux/api/jobsApi";
import JobCard from "./components/JobCard";
import {
  Box,
  Container,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  Chip,
} from "@mui/material";
import AboutCompany from "./components/AboutCompany";

function App() {
  const [getJobsData, getJobsDataResult] = useGetSampleJdMutation();
  const [jobsData, setJobsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalJobData, setModalJobData] = useState({});
  const [offset, setOffset] = useState(0);
  const [minExpFilter, setMinExpFilter] = useState(0);
  const [minBasePayFilter, setMinBasePayFilter] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleOpenModal = (job) => {
    setIsModalOpen(true);
    setModalJobData(job);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalJobData({});
  };

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

  const handleScroll = () => {
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
  }, []);

  const handleMinExpChange = (e) => {
    setMinExpFilter(parseInt(e.target.value));
  };

  const handleMinBasePayChange = (e) => {
    setMinBasePayFilter(parseInt(e.target.value));
  };

  const handleLocationChange = (event) => {
    setSelectedLocations(event.target.value);
  };

  return (
    <>
      <h1>Jobs</h1>
      <div className="filter__container">
        <InputLabel id="select-location">Select Location(s)</InputLabel>
        <Select
          multiple
          labelId="select-location"
          value={selectedLocations}
          onChange={handleLocationChange}
          inputProps={{ "aria-label": "Select Locations" }}
          // label="Select Location(s)"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => {
                    setSelectedLocations(
                      selectedLocations.filter((location) => location !== value)
                    );
                  }}
                />
              ))}
            </Box>
          )}
        >
          {/* <MenuItem value="Select Location(s)">Select Location(s)</MenuItem> */}
          {[
            { label: "Delhi NCR", val: "delhi ncr" },
            { label: "Mumbai", val: "mumbai" },
            { label: "Remote", val: "remote" },
            { label: "Chennai", val: "chennai" },
            { label: "Bangalore", val: "bangalore" },
          ].map((option) => (
            <MenuItem key={option.val} value={option.val}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={minExpFilter}
          onChange={handleMinExpChange}
          displayEmpty
          inputProps={{ "aria-label": "Select Minimum Experience" }}
        >
          <MenuItem value={0}>Select Minimum Experience</MenuItem>
          {[...Array(10).keys()].map((i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={minBasePayFilter}
          onChange={handleMinBasePayChange}
          displayEmpty
          inputProps={{ "aria-label": "Select Minimum Base Pay" }}
        >
          <MenuItem value={0}>Select Minimum Base Pay</MenuItem>
          {[...Array(21).keys()].map((i) => (
            <MenuItem key={i} value={i * 10}>
              {`${i * 10}L`}
            </MenuItem>
          ))}
        </Select>
      </div>

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
                    job.minJdSalary >= minBasePayFilter) &&
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
