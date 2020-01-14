import React, { useState, useEffect } from "react";
import {withRouter} from 'react-router'
import LeftDisplay from "../LeftDisplay/leftDisplay";
import linkedIn from "../../assets/icon_linkedin.svg";
import educationIcon from "../../assets/icon_education.svg";
import attachIcon from "../../assets/attach.svg";
import infoIcon from "../../assets/info.svg";
import workIcon from "../../assets/icon_work_exp.svg";
import cancel from "../../assets/icon_close.svg";
import loaderIcon from "../../assets/Spinner-1s-200px.gif";
import success from "../../assets/noun_success_2019805.svg";
import achivementsIcon from "../../assets/achivements.svg";
import "./approvalRequest.css";

const ApprovalRequest = props => {

  console.log("props",props)
  const { getHiresList, allHiresList } = props;
  const [loader, setLoader] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [location, setLocation] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [manager, setManager] = useState("");
  const [salary, setSalary] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [acheivements, setAchivements] = useState([]);
  const [approvedClicked, setApprovedClick] = useState(false)

  useEffect(() => {
    setLoader(true);
    getHiresList();
  }, []);

  useEffect(() => {
    let newData = [
      {
        college: "The Oxford College of Science",
        stream: "Computer Science & EngG",
        duration: "2013-2017"
      },
      {
        college: "The Oxford College of Science",
        stream: "PCM",
        duration: "2011-2013"
      },
      {
        college: "The Oxford College of Science"
      }
    ];
    setEducationList(newData);

    let value = [
      {
        designation: "Sr.Creative Director",
        company: "Google pvt",
        duration: "2014-2017"
      },
      {
        designation: "Manager",
        company: "Adobe",
        duration: "2010-2014"
      }
    ];
    setWorkExperience(value);
    let newSkills = [
      "Design Management",
      "Design",
      "Conceptual Design",
      "UX/UI",
      "Design Thinking"
    ];
    setSkills(newSkills);

    let data = [
      {
        acheivement: "Keynote Speaker: IXdA Conference",
        places: "Jan 2019 | Interaction Design Association",
        description:
          "Selected by the Jury to present ‘Beyond Frameworks: Designing  With Ethics’"
      }
    ];
    setAchivements(data);
  }, []);

  useEffect(() => {
    if (allHiresList) {
      allHiresList.data.map(item => {
        if (item.personalEmail === "swati@piktorlabs.com") {
          setFirstName(item.firstName);
          setLastName(item.lastName);
          setEmail(item.personalEmail);
          setRole(item.designation);
          setLocation(item.location);
          setManager(item.reportingManager);
          setSalary(item.annualSalary);
          setTshirtSize("medium");
          setPhoneNum(item.phoneNumber);
        }
      });
      setLoader(false);
    }
  }, [allHiresList]);

  const onOutClick = () => {
    console.log("**", educationList);
  };

  const onApproveBtnClicked = () => {
	  setApprovedClick(true)
  }

  const capitalizeFirstLettter = str => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  const approvedRequest = () => {
    return (
      <div className="success__content">
        <div className="success__content--img">
          <img src={success} className="success-img" alt="success" />
        </div>
        <div className="success__content--desc">
          <div className="desc-first">Approved Successfully</div>
          <div className="desc-second">
		  Request has been approved
          </div>
        </div>
        <div className="success__content--btn">
          <button
            className="done-btn success-btn"
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="content">
          <div className="content__left">
            <LeftDisplay />
          </div>
          <div className="content__right">
            <div className="logout">
              <button className="logout__btn" onClick={() => onOutClick()}>
                logOut
              </button>
            </div>
            {loader ? (
              <div className="loaderParent main-loader">
                <div className="loading-row">
                  <img src={loaderIcon} alt="loader" className="loader-img" />
                </div>
              </div>
            ) : (
              <div className="content__right--block">
                <div className="heading__section">
                  <div className="heading__section--text">Approval Request</div>
                  <div className="">
                    <button className="btn cancel-btn">Cancel</button>
                  </div>
                </div>
				{!approvedClicked &&
                <div className="details-section">
                  <div className="row first__row">
                    <div className="margin">
                      <img />
                    </div>
                    <div className="first__row--name margin">
                      {capitalizeFirstLettter(firstName)}&nbsp;{lastName}
                    </div>
                    <div className="first__row--role-location margin">
                      {capitalizeFirstLettter(role)} | {location}
                    </div>
                    <div className="first__row--email margin">
                      Email:<span className="emailId"> {email}</span>
                    </div>
                    <div className="first__row--phone margin">
                      Phone: {phoneNum}
                    </div>
                    <div className="margin">
                      <img src={linkedIn} />
                    </div>
                  </div>
                  <div className="personal-details">
                    <div className="row second__row">
                      <div className="bold-name details">Personal Details</div>
                      <div className="second__row--content">
                        <div className="second__row-label">First Name</div>
                        <div className="bold-name">{firstName}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">Last Name</div>
                        <div className="bold-name">{lastName}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">Personal Email</div>
                        <div className="bold-name">{email}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">Phone</div>
                        <div className="bold-name">{phoneNum}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">Role</div>
                        <div className="light-name">{role}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">Location</div>
                        <div className="light-name">{location}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">
                          Reporting Manager
                        </div>
                        <div className="light-name">{manager}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">Annual Salary</div>
                        <div className="light-name">{salary}</div>
                      </div>
                      <div className="second__row--content">
                        <div className="second__row-label">T-shirt Size</div>
                        <div className="bold-name">{tshirtSize}</div>
                      </div>
                    </div>
                    <div className="row third__row">
                      <div className="bold-name">Education</div>
                      {educationList.length > 0 ? (
                        <div>
                          {educationList.map(item => {
                            return (
                              <div className="list-container flex-row">
                                <div className="flex-row">
                                  <div className="details-icon">
                                    <img src={educationIcon} />
                                  </div>
                                  <div>
                                    <div className="proff-name">
                                      {item.college}
                                    </div>
                                    <div className="proff-desc">
                                      {item.stream}
                                    </div>
                                    <div className="proff-desc">
                                      {item.duration}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-row">
                                  <div className="margin-med">
                                    <img src={attachIcon} />
                                  </div>
                                  <div>
                                    <img src={infoIcon} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row">
                      <div className="bold-name">Work Experience</div>
                      {workExperience.length > 0 ? (
                        <div>
                          {workExperience.map(item => {
                            return (
                              <div className="list-container flex-row">
                                <div className="flex-row">
                                  <div className="details-icon">
                                    <img src={workIcon} />
                                  </div>
                                  <div>
                                    <div className="proff-name">
                                      {item.designation}
                                    </div>
                                    <div className="proff-desc">
                                      {item.company}
                                    </div>
                                    <div className="proff-desc">
                                      {item.duration}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-row">
                                  <div className="margin-med">
                                    <img src={attachIcon} />
                                  </div>
                                  <div>
                                    <img src={infoIcon} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row">
                      <div className="bold-name">Work Experience</div>
                      {skills.length > 0 ? (
                        <div className="skills-container">
                          {skills.map(item => {
                            return (
                              <div className="skills-content flex-row">
                                {item}
                                <img src={cancel} className="close-icon" />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row third__row">
                      <div className="bold-name">Achievements</div>
                      {acheivements.length > 0 ? (
                        <div>
                          {acheivements.map(item => {
                            return (
                              <div className="list-container flex-row">
                                <div className="flex-row">
                                  <div className="details-icon">
                                    <img src={achivementsIcon} />
                                  </div>
                                  <div>
                                    <div className="proff-name">
                                      {item.acheivement}
                                    </div>
                                    <div className="proff-desc">
                                      {item.places}
                                    </div>
                                    <div className="proff-desc">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-row">
                                  <div className="margin-med">
                                    <img src={attachIcon} />
                                  </div>
                                  <div>
                                    <img src={infoIcon} />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row last__row">
                      <div className="last__row--rejectBtn approval-btn">
                        Reject
                      </div>
                      <div className="last__row--approveBtn approval-btn" onClick={()=>onApproveBtnClicked()}>
                        Approve
                      </div>
                    </div>
                  </div>
                </div>}
				{approvedClicked && approvedRequest()}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withRouter(ApprovalRequest);
