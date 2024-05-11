import React from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { COMPANY_NAMES, LOCATIONS, ROLES, TECH_STACK } from "../constants/page";

export default function FilterJobs({
  selectedLocations,
  handleLocationChange,
  selectedRoles,
  handleRoleChange,
  selectedCompanies,
  handleCompanyChange,
  selectedTechStack,
  handleTechStackChange,
  minExpFilter,
  handleMinExpChange,
  minBasePayFilter,
  handleMinBasePayChange,
}) {
  return (
    <div className="filter__container">
      {/* location filter */}
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
                <Chip key={value} label={value} />
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
      {/* role filter */}
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
                <Chip key={value} label={value} />
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

      {/* company filter */}
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
                <Chip key={value} label={value} />
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

      {/* tech stack filter */}
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
                <Chip key={value} label={value} />
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

      {/* Exp filter */}
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

      {/* Base Pay filter */}
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
