import React from "react";

export default function AboutCompany({ jobData }) {
  return (
    <div className="about__company">
      <h5 className="heading">About Company</h5>
      <p className="company__details">{jobData?.jobDetailsFromCompany}</p>
    </div>
  );
}
