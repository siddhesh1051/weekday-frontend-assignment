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
  OutlinedInput,
  FormControl,
} from "@mui/material";
import AboutCompany from "./components/AboutCompany";

function App() {
  const [getJobsData, getJobsDataResult] = useGetSampleJdMutation();
  const [jobsData, setJobsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalJobData, setModalJobData] = useState({});
  const [offset, setOffset] = useState(0);
  const [minExpFilter, setMinExpFilter] = useState(null);
  const [minBasePayFilter, setMinBasePayFilter] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);

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

  const handleRoleChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompanies(event.target.value);
  };

  const handleTechStackChange = (event) => {
    setSelectedTechStack(event.target.value);
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
            {[
              { label: "Frontend", val: "frontend" },
              { label: "iOS", val: "ios" },
              { label: "Android", val: "android" },
              { label: "Tech Lead", val: "tech lead" },
              { label: "Backend", val: "backend" },
            ].map((option) => (
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
            {[
              {
                label: "Dropbox",
                val: "Dropbox",
              },
              {
                label: "LG",
                val: "LG",
              },
              {
                label: "Sony",
                val: "Sony",
              },
              {
                label: "Adobe Systems",
                val: "Adobe Systems",
              },
              {
                label: "HP",
                val: "HP",
              },
              {
                label: "eBay",
                val: "eBay",
              },
              {
                label: "Tencent",
                val: "Tencent",
              },
              {
                label: "Apple",
                val: "Apple",
              },
              {
                label: "Asus",
                val: "Asus",
              },
              {
                label: "Intel Corporation",
                val: "Intel Corporation",
              },
              {
                label: "Rakuten",
                val: "Rakuten",
              },
              {
                label: "Samsung",
                val: "Samsung",
              },
              {
                label: "Dell Technologies",
                val: "Dell Technologies",
              },
              {
                label: "Cisco",
                val: "Cisco",
              },
              {
                label: "Oracle",
                val: "Oracle",
              },
              {
                label: "Baidu",
                val: "Baidu",
              },
              {
                label: "Amazon",
                val: "Amazon",
              },
              {
                label: "Olympus",
                val: "Olympus",
              },
              {
                label: "Alibaba",
                val: "Alibaba",
              },
              {
                label: "GoPro",
                val: "GoPro",
              },
              {
                label: "Twitter",
                val: "Twitter",
              },
              {
                label: "ZTE",
                val: "ZTE",
              },
              {
                label: "Netflix",
                val: "Netflix",
              },
              {
                label: "MasterCard",
                val: "MasterCard",
              },
              {
                label: "Facebook",
                val: "Facebook",
              },
              {
                label: "IBM",
                val: "IBM",
              },
              {
                label: "Intel",
                val: "Intel",
              },
              {
                label: "Google",
                val: "Google",
              },
              {
                label: "Huawei",
                val: "Huawei",
              },
              {
                label: "Adobe",
                val: "Adobe",
              },
              {
                label: "Pandora",
                val: "Pandora",
              },
              {
                label: "Nikon",
                val: "Nikon",
              },
              {
                label: "Lyft",
                val: "Lyft",
              },
              {
                label: "Spotify",
                val: "Spotify",
              },
              {
                label: "PayPal",
                val: "PayPal",
              },
              {
                label: "Visa",
                val: "Visa",
              },
              {
                label: "Adobe Inc.",
                val: "Adobe Inc.",
              },
              {
                label: "Sharp",
                val: "Sharp",
              },
              {
                label: "Qualcomm",
                val: "Qualcomm",
              },
              {
                label: "Yahoo",
                val: "Yahoo",
              },
              {
                label: "Panasonic",
                val: "Panasonic",
              },
              {
                label: "Xiaomi",
                val: "Xiaomi",
              },
              {
                label: "Microsoft",
                val: "Microsoft",
              },
              {
                label: "Tesla",
                val: "Tesla",
              },
              {
                label: "Epson",
                val: "Epson",
              },
              {
                label: "Airbnb",
                val: "Airbnb",
              },
              {
                label: "Canon",
                val: "Canon",
              },
              {
                label: "Vimeo",
                val: "Vimeo",
              },
              {
                label: "Uber",
                val: "Uber",
              },
              {
                label: "LinkedIn",
                val: "LinkedIn",
              },
            ].map((option) => (
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
            {[
              { label: "React", option: "react" },
              { label: "Javascript", option: "javascript" },
              { label: "Java", option: "java" },
            ].map((option) => (
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
          {(minExpFilter === 0 &&
          minBasePayFilter === 0 &&
          selectedLocations.length === 0 &&
          selectedRoles.length === 0 &&
          selectedCompanies.length === 0 &&
          selectedTechStack.length === 0
            ? jobsData
            : jobsData.filter(
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
