import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import LeftDisplay from "../LeftDisplay/leftDisplay";
import educationIcon from "../../assets/icon_education.svg";
import attachIcon from "../../assets/attach.svg";
import cancelIcon from "../../assets/cancel.svg";
import workIcon from "../../assets/icon_work_exp.svg";
import cancel from "../../assets/icon_close.svg";
import loaderIcon from "../../assets/Spinner-1s-200px.gif";
import success from "../../assets/noun_success_2019805.svg";
import achivementsIcon from "../../assets/achivements.svg";
import "./approvalRequest.css";

const ApprovalRequest = props => {
  const { getApprovalJoinee, approvalJoinee } = props;

  const [loader, setLoader] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [salary, setSalary] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [educationList, setEducationList] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [acheivements, setAchivements] = useState([]);
  const [approvedClicked, setApprovedClick] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setLoader(true);
    if (props.location.state !== undefined) {
      getApprovalJoinee(props.location.state.item);
    } else {
      if (props.location.search) {
        let search = props.location.search.split("=");
        getApprovalJoinee(search[1]);
      }
    }
    if (props.location.state === undefined && props.location.search === "") {
      props.history.push("/hirelist");
    }
  }, []);

  useEffect(() => {
    if (approvalJoinee && approvalJoinee.response) {
      setLoader(false);
      setFirstName(approvalJoinee.response.firstName);
      setLastName(approvalJoinee.response.lastName);
      setEmail(approvalJoinee.response.personalEmail);
      setRole(approvalJoinee.response.designation);
      setLocation(approvalJoinee.response.location);
      setManager(approvalJoinee.response.reportingManager);
      setSalary(approvalJoinee.response.annualSalary);
      setTshirtSize(approvalJoinee.response.tShirtSize);
      setPhoneNum(approvalJoinee.response.phoneNumber);
      setPhoto(approvalJoinee.response.photo);
      setEducationList(approvalJoinee.response.education);
      setAchivements(approvalJoinee.response.achievements);
      setWorkExperience(approvalJoinee.response.workExp);
      setSkills(approvalJoinee.response.skills);
    }
  }, [approvalJoinee]);

  const onOutClick = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const onCancelClick = () => {
    props.history.push("/hirelist");
  };

  const onApproveBtnClicked = () => {
    setApprovedClick(true);
  };

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
          <div className="desc-second">Request has been approved</div>
        </div>
        <div className="success__content--btn" onClick={() => onCancelClick()}>
          <button className="done-btn success-btn">Done</button>
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
                  <img
                    alt="loader"
                    src={loaderIcon}
                    alt="loader"
                    className="loader-img"
                  />
                </div>
              </div>
            ) : (
              <div className="content__right--block">
                <div className="heading__section">
                  <div className="heading__section--text">Approval Request</div>
                  <div
                    className="button-container"
                    onClick={() => onCancelClick()}
                  >
                    <img alt="cancel" src={cancelIcon} />
                  </div>
                </div>
                {!approvedClicked && (
                  <div className="details-section">
                    <div className="row first__row">
                      <div className="margin">
                        <img
                          alt="emp-pic"
                          className="rounded-icon"
                          src={photo}
                        />
                      </div>
                      <div className="fontFamily margin">
                        {capitalizeFirstLettter(firstName)}&nbsp;{lastName}
                      </div>
                      <div className="fontFamily margin">
                        {capitalizeFirstLettter(role)} | {location}
                      </div>
                      <div className="fontFamily margin">
                        Email:<span className="emailId"> {email}</span>
                      </div>
                      <div className="fontFamily margin">Phone: {phoneNum}</div>
                    </div>
                    <div className="personal-details">
                      <div className="row second__row">
                        <div className="bold-name details">
                          Personal Details
                        </div>
                        <div className="second__row--content">
                          <div className="second__row-label">First Name</div>
                          <div className="bold-name">{firstName}</div>
                        </div>
                        <div className="second__row--content">
                          <div className="second__row-label">Last Name</div>
                          <div className="bold-name">{lastName}</div>
                        </div>
                        <div className="second__row--content">
                          <div className="second__row-label">
                            Personal Email
                          </div>
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
                        {educationList && educationList.length > 0 ? (
                          <div>
                            {educationList.map((item, index) => {
                              return (
                                <div
                                  className="list-container flex-row"
                                  key={index}
                                >
                                  <div className="flex-row">
                                    <div className="details-icon">
                                      <img alt="edu" src={educationIcon} />
                                    </div>
                                    <div>
                                      <div className="proff-name">
                                        {item.institution}
                                      </div>
                                      <div className="proff-desc">
                                        {item.degree}
                                      </div>
                                      <div className="proff-desc">
                                        {item.startYear}-{item.endYear}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-row">
                                    <div className="margin-med">
                                      {item.document ? (
                                        <a
                                          href={item.document}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img alt="attach" src={attachIcon} />
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="list-container flex-row">
                            <div className="no-data">No details submitted</div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="bold-name">Work Experience</div>
                        {workExperience && workExperience.length > 0 ? (
                          <div>
                            {workExperience.map((item, index) => {
                              return (
                                <div
                                  className="list-container flex-row"
                                  key={index}
                                >
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
                                        {item.startYear} - {item.endYear}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-row">
                                    <div className="margin-med">
                                      {item.document ? (
                                        <a
                                          href={item.document}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img alt="attach" src={attachIcon} />
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="list-container flex-row">
                            <div className="no-data">No details submitted</div>
                          </div>
                        )}
                      </div>
                      <div className="row">
                        <div className="bold-name">Skills</div>
                        {skills && skills.length > 0 ? (
                          <div className="skills-container">
                            {skills.map((item, index) => {
                              return (
                                <div
                                  className="skills-content flex-row"
                                  key={index}
                                >
                                  {item}
                                  <img
                                    alt="cancel"
                                    className="close-icon"
                                    alt="cancel"
                                    src={cancel}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="list-container flex-row">
                            <div className="no-data">No details submitted</div>
                          </div>
                        )}
                      </div>
                      <div className="row third__row">
                        <div className="bold-name">Achievements</div>
                        {acheivements && acheivements.length > 0 ? (
                          <div>
                            {acheivements.map((item, index) => {
                              return (
                                <div
                                  className="list-container flex-row"
                                  key={index}
                                >
                                  <div className="flex-row">
                                    <div className="details-icon">
                                      <img
                                        alt="acheivements"
                                        src={achivementsIcon}
                                      />
                                    </div>
                                    <div>
                                      <div className="proff-name">
                                        {item.title}
                                      </div>
                                      <div className="proff-desc">
                                        {item.issueData}|{item.issuer}
                                      </div>
                                      <div className="proff-desc">
                                        {item.desc}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-row">
                                    <div className="margin-med">
                                      {item.document ? (
                                        <a
                                          href={item.document}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img alt="attach" src={attachIcon} />
                                        </a>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="list-container flex-row">
                            <div className="no-data">No details submitted</div>
                          </div>
                        )}
                      </div>
                      <div className="row last__row">
                        <div className="last__row--rejectBtn approval-btn">
                          Reject
                        </div>
                        <div
                          className="last__row--approveBtn approval-btn"
                          onClick={() => onApproveBtnClicked()}
                        >
                          Approve
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
