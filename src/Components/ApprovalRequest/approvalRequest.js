import React, { useState, useEffect } from "react";
import Modal from "../Modal/modal";
import { withRouter } from "react-router";
import LeftDisplay from "../LeftDisplay/leftDisplay";
import educationIcon from "../../assets/icon_education.svg";
import attachIcon from "../../assets/attach.svg";
import cancelIcon from "../../assets/cancel.svg";
import workIcon from "../../assets/icon_work_exp.svg";
import infoIcon from "../../assets/info.svg";
import cancel from "../../assets/icon_close.svg";
import loaderIcon from "../../assets/Spinner-1s-200px.gif";
import success from "../../assets/noun_success_2019805.svg";
import rejectIcon from "../../assets/rejectedIcon.svg";
import achivementsIcon from "../../assets/achivements.svg";
import defaultIcon from "../../assets/defaultIcon.png";
import "./approvalRequest.css";

const ApprovalRequest = props => {
  const {
    getApprovalJoinee,
    approvalJoinee,
    approvedRequest,
    approvedData,
    rejectedRequest,
    rejectedData,
    clearApprovalJoinee,
    clearRejectedData,
    clearApprovedData
  } = props;

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
  const [rejectClicked, setRejectClicked] = useState(false);
  const [photo, setPhoto] = useState("");
  const [modal, setModal] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);

  useEffect(() => {
    clearRejectedData();
    clearApprovedData();
    clearApprovalJoinee();
    // clear all data when component unmounts
    return () => {
      clearRejectedData();
      clearApprovedData();
      clearApprovalJoinee();
    };
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) {
      localStorage.setItem("key", props.location.search.split("="));
      props.history.push("/");
    }
  }, []);

  useEffect(() => {
    setLoader(true);
    let token = localStorage.getItem("key");
    if (props.location.state !== undefined) {
      getApprovalJoinee(props.location.state.item);
    } else {
      if (props.location.search) {
        let search = props.location.search.split("=");
        getApprovalJoinee(search[1]);
      } else if (token) {
        let search = token.split("=");
        getApprovalJoinee(search[1]);
      }
    }
    if (
      props.location.state === undefined &&
      props.location.search === "" &&
      !token
    ) {
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

  useEffect(() => {
    if (approvedData) {
      if (approvedData.results.status === 200) {
        setActionLoader(false);
      }
    }
  }, [approvedData]);

  const onOutClick = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const onRejectClicked = value => {
    if (value !== "") {
      let body = {
        firstName: firstName,
        rejectReason: value,
        personalEmail: email
      };
      rejectedRequest(body);
      setActionLoader(true);
      setModal(false);
    }
  };

  useEffect(() => {
    if (rejectedData && rejectedData.results.status === 200) {
      setActionLoader(false);
      setRejectClicked(true);
    }
  }, [rejectedData]);

  const onCancelClick = () => {
    props.history.push("/hirelist");
    setApprovedClick(false);
    setRejectClicked(false);
  };

  const onApproveBtnClicked = () => {
    setApprovedClick(true);
    setActionLoader(true);
    let body = {
      firstName,
      personalEmail: email
    };
    approvedRequest(body);
  };

  const openModalHandler = () => {
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const capitalizeFirstLettter = str => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  const onApprovedRequest = () => {
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

  const onRejectRequest = () => {
    return (
      <div className="success__content">
        <div className="success__content--img">
          <img src={rejectIcon} className="success-img" alt="success" />
        </div>
        <div className="success__content--desc">
          <div className="desc-first rejected-text">Approval Rejected</div>
          <div className="desc-second">Request has been rejected</div>
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
                  <img alt="loader" src={loaderIcon} className="loader-img" />
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
                {!approvedClicked && !rejectClicked && (
                  <div className="details-section">
                    <div className="row first__row">
                      <div className="margin">
                        {photo !== "" ? (
                          <img
                            alt="emp-pic"
                            className="rounded-icon"
                            src={photo}
                          />
                        ) : (
                          <img
                            alt="emp-pic"
                            className="rounded-icon"
                            src={defaultIcon}
                          />
                        )}
                      </div>
                      <div className="margin bold__text">
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
                        <div className="bold__text details">
                          Personal Details
                        </div>
                        <div className="second__row--content">
                          <div className="second__row-label">First Name</div>
                          <div className="bold__text">{firstName}</div>
                        </div>
                        <div className="second__row--content">
                          <div className="second__row-label">Last Name</div>
                          <div className="desc-tooltip">
                            <div className="bold__text">{lastName} </div>{" "}
                            <div className="tooltip">
                              <img
                                src={infoIcon}
                                alt="information"
                                className="info-icon"
                              />
                              <span className="tooltiptext">
                                Pending for Approval
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="second__row--content">
                          <div className="second__row-label">
                            Personal Email
                          </div>
                          <div className="desc-tooltip">
                            <div className="bold__text">{email}</div>{" "}
                            <div className="tooltip">
                              <img
                                src={infoIcon}
                                alt="information"
                                className="info-icon"
                              />
                              <span className="tooltiptext">
                                Pending for Approval
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="second__row--content">
                          <div className="second__row-label">Phone</div>
                          <div className="bold__text">{phoneNum}</div>
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
                          <div className="desc-tooltip">
                            <div className="bold__text">{tshirtSize}</div>{" "}
                            <div className="tooltip">
                              <img
                                src={infoIcon}
                                alt="information"
                                className="info-icon"
                              />
                              <span className="tooltiptext">
                                Pending for Approval
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="flex-row">
                          <div className="bold__text">Education</div>
                          <div className="tooltip">
                            <img
                              src={infoIcon}
                              alt="information"
                              className="info-icon"
                            />
                            <span className="tooltiptext">
                              Pending for Approval
                            </span>
                          </div>
                        </div>
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
                                      <div className="bold__text-lowerCase">
                                        {capitalizeFirstLettter(item.name)}
                                      </div>
                                      <div className="proffesion-desc">
                                        {capitalizeFirstLettter(item.branch)}
                                      </div>
                                      <div className="proffesion-desc">
                                        {item.startYear}-{item.endYear}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-row">
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
                        <div className="flex-row">
                          <div className="bold__text">Work Experience</div>
                          <div className="tooltip">
                            <img
                              src={infoIcon}
                              alt="information"
                              className="info-icon"
                            />
                            <span className="tooltiptext">
                              Pending for Approval
                            </span>
                          </div>
                        </div>
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
                                      <img src={workIcon} alt="work" />
                                    </div>
                                    <div>
                                      <div className="bold__text-lowerCase">
                                        {capitalizeFirstLettter(
                                          item.designation
                                        )}
                                      </div>
                                      <div className="proffesion-desc">
                                        {capitalizeFirstLettter(item.company)}
                                      </div>
                                      <div className="proffesion-desc">
                                        {item.startYear} - {item.endYear}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex-row">
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
                        <div className="flex-row">
                          <div className="bold__text">Skills</div>
                          <div className="tooltip">
                            <img
                              src={infoIcon}
                              alt="information"
                              className="info-icon"
                            />
                            <span className="tooltiptext">
                              Pending for Approval
                            </span>
                          </div>
                        </div>
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
                        <div className="flex-row">
                          <div className="bold__text">Achievements</div>
                          <div className="tooltip">
                            <img
                              src={infoIcon}
                              alt="information"
                              className="info-icon"
                            />
                            <span className="tooltiptext">
                              Pending for Approval
                            </span>
                          </div>
                        </div>
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
                                      <div className="bold__text-lowerCase">
                                        {item.title}
                                      </div>
                                      <div className="proffesion-desc">
                                        {item.issueData}|{item.issuer}
                                      </div>
                                      <div className="proffesion-desc">
                                        {item.desc}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
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
                              );
                            })}
                          </div>
                        ) : (
                          <div className="list-container flex-row">
                            <div className="no-data">No details submitted</div>
                          </div>
                        )}
                      </div>
                      {!actionLoader ? (
                        <div className="row last__row">
                          <div
                            className="last__row--rejectBtn approval-btn"
                            onClick={() => openModalHandler()}
                          >
                            Reject
                          </div>
                          <div
                            className="last__row--approveBtn approval-btn"
                            onClick={() => onApproveBtnClicked()}
                          >
                            Approve
                          </div>
                        </div>
                      ) : (
                        <div className="loaderParent">
                          <div className="loaderContainer">
                            <img
                              src={loaderIcon}
                              alt="loader"
                              className="loader-img"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {approvedClicked && onApprovedRequest()}
                {rejectClicked && onRejectRequest()}
                {modal && (
                  <div onClick={() => closeModalHandler()}>
                    <Modal
                      className="modal"
                      show={modal}
                      onHide={() => closeModalHandler()}
                      onRejectClicked={val => onRejectClicked(val)}
                    ></Modal>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default withRouter(ApprovalRequest);
