import { Zap } from "lucide-react";
import AboutCompany from "./AboutCompany";
import AvatarGirl from "../assets/avatar_girl.svg";
import AvatarBoy from "../assets/avatar_boy.svg";

export default function JobCard({
  jobData,
  handleOpenModal,
  generateRandomNumber,
}) {
  const capatalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="jobcard">
      <div>
        <div className="jobcard__timestamp">
          <span>⏳ Posted {generateRandomNumber()} days ago</span>
        </div>
        <div className="jobcard__company">
          <div className="jobcard__company__logo">
            <img height={50} width={50} src={jobData?.logoUrl} alt="" />
          </div>
          <div className="jobcard__company__details">
            <h3 className="jobcard__company__name">{jobData?.companyName}</h3>
            <h2 className="jobcard__job__role">
              {capatalizeFirstLetter(jobData?.jobRole)}
            </h2>
            <p className="jobcard__job__location">
              {capatalizeFirstLetter(jobData?.location)}
            </p>
          </div>
        </div>
        <p className="jobcard__salary">
          Estimated Salary: ₹
          {jobData?.minJdSalary === null ? "N/A" : jobData?.minJdSalary} -{" "}
          {jobData?.maxJdSalary} LPA ✅
        </p>
        <div className="jobcard__about">
          <AboutCompany jobData={jobData} />
          <div className="view__job">
            <button
              className="view__job__button"
              onClick={() => handleOpenModal(jobData)}
            >
              View Job
            </button>
          </div>
        </div>
        {jobData?.minExp ? (
          <div className="jobcard__exp">
            <h5 className="jobcard__exp__title">Minimum Experience</h5>
            <h2 className="jobcard__exp__duration">{jobData?.minExp} Years </h2>
          </div>
        ) : (
          <div className="jobcard__exp">
            <h5 className="jobcard__exp__title">Minimum Experience</h5>
            <h2 className="jobcard__exp__duration">Not Disclosed</h2>
          </div>
        )}
        {jobData?.maxExp ? (
          <div className="jobcard__exp">
            <h5 className="jobcard__exp__title">Maximum Experience</h5>
            <h2 className="jobcard__exp__duration">{jobData?.maxExp} Years</h2>
          </div>
        ) : (
          <div className="jobcard__exp">
            <h5 className="jobcard__exp__title">Maximum Experience</h5>
            <h2 className="jobcard__exp__duration">Not Disclosed</h2>
          </div>
        )}
      </div>
      <div className="jobcard__cta">
        <a
          className="btn jobcard__easy__apply"
          target="_blank"
          href={jobData?.jdLink}
          rel="noreferrer noopener"
        >
          <Zap color="orange" fill="yellow" />
          <span className="link-underline">Easy Apply</span>
        </a>
        <a className="btn jobcard__unlock__referral" href="/">
          <div className="avatar__box">
            <img
              src={AvatarGirl}
              alt="avatar"
              className="avatar"
              width="35"
              height="35"
            />
            <img
              src={AvatarBoy}
              alt="avatar"
              className="avatar"
              width="35"
              height="35"
            />
          </div>
          <p>Unlock referral asks</p>
        </a>
      </div>
    </div>
  );
}
