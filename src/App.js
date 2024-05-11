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
  FormControl,
} from "@mui/material";
import AboutCompany from "./components/AboutCompany";
import { COMPANY_NAMES, LOCATIONS, ROLES, TECH_STACK } from "./constants/page";

function App() {
  const [getJobsData, getJobsDataResult] = useGetSampleJdMutation();
  const [getAllJobsData, getAllJobsDataResult] = useGetSampleJdMutation();
  const [jobsData, setJobsData] = useState([]);
  const [allJobsData, setAllJobsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalJobData, setModalJobData] = useState({});
  const [offset, setOffset] = useState(0);
  const [minExpFilter, setMinExpFilter] = useState(null);
  const [minBasePayFilter, setMinBasePayFilter] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);

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
    getAllJobsData({ limit: 1000 });
  }, [getAllJobsData]);

  useEffect(() => {
    if (getJobsDataResult.isSuccess) {
      setJobsData((prev) => [...prev, ...getJobsDataResult.data.jdList]);
    } else {
      console.log(getJobsDataResult.error);
    }
  }, [getJobsDataResult]);

  useEffect(() => {
    if (getAllJobsDataResult.isSuccess) {
      setAllJobsData((prev) => [...prev, ...getAllJobsDataResult.data.jdList]);
    } else {
      console.log(getAllJobsDataResult.error);
    }
  }, [getAllJobsDataResult]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 2 &&
      !getJobsDataResult.isLoading &&
      !areFiltersApplied
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
    setAreFiltersApplied(true);
  };

  const handleMinBasePayChange = (e) => {
    setMinBasePayFilter(parseInt(e.target.value));
    setAreFiltersApplied(true);
  };

  const handleLocationChange = (event) => {
    setSelectedLocations(event.target.value);
    setAreFiltersApplied(true);
  };

  const handleRoleChange = (event) => {
    setSelectedRoles(event.target.value);
    setAreFiltersApplied(true);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompanies(event.target.value);
    setAreFiltersApplied(true);
  };

  const handleTechStackChange = (event) => {
    setSelectedTechStack(event.target.value);
    setAreFiltersApplied(true);
  };

  return (
    <div className="parent__container">
      <div className="filter__container">
        <FormControl className="form__control">
          <InputLabel id="select-location">Select Location(s)</InputLabel>
          <Select
            multiple
            labelId="select-location"
            value={selectedLocations}
            onChange={handleLocationChange}
            inputProps={{ "aria-label": "Select Locations" }}
            label="Select Location(s)"
            renderValue={(selected) => (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => {
                      setSelectedLocations(
                        selectedLocations.filter(
                          (location) => location !== value
                        )
                      );
                    }}
                  />
                ))}
              </Box>
            )}
          >
            {/* <MenuItem value="Select Location(s)">Select Location(s)</MenuItem> */}
            {LOCATIONS.map((option) => (
              <MenuItem key={option.val} value={option.val}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form__control">
          <InputLabel id="select-role">Select Role(s)</InputLabel>
          <Select
            multiple
            labelId="select-role"
            value={selectedRoles}
            onChange={handleRoleChange}
            label="Select Role(s)"
            inputProps={{ "aria-label": "Select Roles" }}
          >
            {ROLES.map((option) => (
              <MenuItem key={option.val} value={option.val}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="form__control">
          <InputLabel id="select-company">Select Company(s)</InputLabel>
          <Select
            multiple
            labelId="select-company"
            value={selectedCompanies}
            onChange={handleCompanyChange}
            label="Select Companies"
            inputProps={{ "aria-label": "Select Companies" }}
          >
            {COMPANY_NAMES.map((option) => (
              <MenuItem key={option.val} value={option.val}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="form__control">
          <InputLabel id="select-tech-stack">Select Tech Stack(s)</InputLabel>
          <Select
            multiple
            labelId="select-tech-stack"
            value={selectedTechStack}
            onChange={handleTechStackChange}
            label="Select Tech Stacks"
            inputProps={{ "aria-label": "Select Tech Stacks" }}
          >
            {TECH_STACK.map((option) => (
              <MenuItem key={option.option} value={option.option}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="form__control">
          <InputLabel id="select-min-exp">Select Min Exp</InputLabel>

          <Select
            labelId="select-min-exp"
            value={minExpFilter}
            onChange={handleMinExpChange}
            label="Select Minimum Experience"
            inputProps={{ "aria-label": "Select Minimum Experience" }}
          >
            {[...Array(10).keys()].map((i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="form__control">
          <InputLabel id="select-base-pay">Select Minimum Base Pay</InputLabel>

          <Select
            labelId="select-base-pay"
            value={minBasePayFilter}
            onChange={handleMinBasePayChange}
            label="Select Min Base Pay"
            inputProps={{ "aria-label": "Select Minimum Base Pay" }}
          >
            {[...Array(12).keys()].map((i) => (
              <MenuItem key={i} value={i * 10}>
                {`${i * 10}L`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Container
        sx={{
          display: "flex",
        }}
        className="wrapper__container"
      >
        <div className="home">
          {(minExpFilter === null &&
          minBasePayFilter === null &&
          selectedLocations.length === 0 &&
          selectedRoles.length === 0 &&
          selectedCompanies.length === 0 &&
          selectedTechStack.length === 0
            ? jobsData
            : allJobsData.filter(
                (job) =>
                  (minExpFilter === 0 || job.minExp >= minExpFilter) &&
                  (minBasePayFilter === 0 ||
                    job.minJdSalary >= minBasePayFilter) &&
                  (selectedLocations.length === 0 ||
                    selectedLocations.includes(job.location)) &&
                  (selectedRoles.length === 0 ||
                    selectedRoles.includes(job.jobRole)) &&
                  (selectedCompanies.length === 0 ||
                    selectedCompanies.includes(job.companyName))
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
    </div>
  );
}

export default App;
