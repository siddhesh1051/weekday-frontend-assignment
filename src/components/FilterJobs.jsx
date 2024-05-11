import React, { useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { COMPANY_NAMES, LOCATIONS, ROLES, TECH_STACK } from "../constants/page";

export default function FilterJobs() {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [minExpFilter, setMinExpFilter] = useState(null);
  const [minBasePayFilter, setMinBasePayFilter] = useState(null);

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

  const handleMinExpChange = (e) => {
    setMinExpFilter(parseInt(e.target.value));
  };

  const handleMinBasePayChange = (e) => {
    setMinBasePayFilter(parseInt(e.target.value));
  };

  return (
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
                  sx={{
                    borderRadius: "5px",
                  }}
                />
              ))}
            </Box>
          )}
        >
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
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    borderRadius: "5px",
                  }}
                />
              ))}
            </Box>
          )}
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
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    borderRadius: "5px",
                  }}
                />
              ))}
            </Box>
          )}
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
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    borderRadius: "5px",
                  }}
                />
              ))}
            </Box>
          )}
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
  );
}
