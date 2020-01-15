import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addHire.css";
import cancelIcon from "../../assets/cancel.svg";
import arrow from "../../assets/noun_Arrow_2094739.svg";
import attach from "../../assets/noun_attached document_615523.svg";
import dateIcon from "../../assets/noun_Calendar_821509.svg";
import DatePicker from "react-datepicker";
import loader from "../../assets/Spinner-1s-200px.gif";
import "react-datepicker/dist/react-datepicker.css";
import { employeeList } from "../../employeeList";

const monthCalender = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};

const AddHire = props => {
  const { editField, onChildClick, onSubmitForm,addNewHire,addHire } = props;
  console.log(props)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phNum, setPhNum] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [location, setLocation] = useState("");
  const [manager, setManager] = useState("");
  const [fileName, setFileName] = useState("");
  const [base64, setBase64] = useState("");
  const [fileTypePdf, setFileTypePdf] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attachfileName, setattachfileName] = useState("");
  const [dateValue, setDate] = useState(new Date());
  const [showLocation, setShowLocation] = useState(false);
  const [loaderShow, setLoader] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [arryList, setArrayList] = useState([]);
  const [invalidSalary, setInvalidSalary] = useState(false);
  const [invalidPhNum, setInvalidPhNum] = useState(false);
  const [wrongPhNum, setWrongPhNum] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidRole, setInvalidRole] = useState(false);
  const [invalidLocation, setInvalidLocation] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidManager, setInvalidManager] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [requiredMsg, setRequiredMsg] = useState("This field is required!");

  const onCancelClick = () => {
    setFirstName("");
    setLastName("");
    setRole("");
    setPhNum("");
    setSalary("");
    setDate(new Date());
    setEmail("");
    setManager("");
    setLocation("");
    setFileName("");
    onChildClick(true);
    setErrorMessage("");
  };

  const removeAttachedFile = () => {
    setFileName("");
  };

  const handleChange = date => {
    setDate(date);
  };

  const setOption = value => {
    setLocation(value);
    setArrayList([]);
    setShowLocation(false);
  };

  const setManagerOption = value => {
    setManager(value);
    setShowManager(false);
    setArrayList([]);
  };

  useEffect(() => {
    if (fileName !== "") {
      let file = fileName.split("\\");
      setattachfileName(file[2]);
    } else {
      setattachfileName("");
    }
    let valid = validateEmail(email);
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      salary === "" ||
      role === "" ||
      phNum === "" ||
      location === "" ||
      manager === "" ||
      dateValue === "" ||
      fileTypePdf === false ||
      valid === false ||
      wrongPhNum === true
    ) {
      setDisabledSubmit(true);
    } else {
      setDisabledSubmit(false);
    }
  }, [
    firstName,
    lastName,
    role,
    email,
    phNum,
    location,
    manager,
    salary,
    fileName,
    fileTypePdf
  ]);

  useEffect(() => {
    if (attachfileName) {
      let value = attachfileName.split(".");
      if (value[value.length - 1] !== "pdf") {
        setFileTypePdf(false);
        setErrorMessage("Only PDF file allowed!");
      } else {
        setFileTypePdf(true);
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
      setFileTypePdf(false);
    }
  }, [attachfileName]);

  const validateEmail = email => {
    if (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  };

  const onBlurEmail = () => {
    let val = validateEmail(email);
    if (val) {
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  };

  const filterArray = (e, item) => {
    let newData = [];
    let value = e.toLowerCase();
    employeeList[item].filter(item => {
      if (item.toLowerCase().indexOf(value) > -1) {
        newData.push(item);
      }
    });
    setArrayList(newData);
  };

  

  const setLookUp = e => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "location") {
      if (value !== "") {
        filterArray(value, name);
        setShowLocation(true);
        setLocation(value);
      } else {
        setLocation("");
        setShowLocation(false);
      }
      setShowManager(false)
    } else if (name === "manager") {
      if (value !== "") {
        filterArray(value, name);
        setShowManager(true);
        setManager(value);
      } else {
        setManager("");
        setShowManager(false);
      }
      setShowLocation(false)
    }
  };

  useEffect(() => {
    if (editField) {
      setFirstName(editField.firstName);
      setLastName(editField.lastName);
      setPhNum(editField.phoneNumber);
      setEmail(editField.personalEmail);
      setRole(editField.designation);
      setManager(editField.reportingManager);
      setLocation(editField.location);
      setSalary(editField.annualSalary);
      if (editField.passCode) {
        setDisabledSubmit(true);
      }
    }
  }, [editField]);

  const handleFile = event => {
    setFileName(event.target.value);
    if (event.target.value !== "") {
      let selectedFile = event.target.files;
      let file = null;
      let fileToLoad = selectedFile[0];
      let fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        file = fileLoadedEvent.target.result;
        setBase64(file);
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  const capitalizeFirstLettter = str => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  const onSubmitClick = () => {
    let dateData = dateValue.toISOString();
    dateData = dateData.split("T");
    dateData = dateData[0].split("-");
    dateData =
      dateData[2] + " " + monthCalender[dateData[1]] + " " + dateData[0];
    let body = {
      documents: [],
      personalEmail: email.toLowerCase(),
      firstName: `${capitalizeFirstLettter(firstName)}`,
      lastName: `${capitalizeFirstLettter(lastName)}`,
      designation: `${capitalizeFirstLettter(role)}`,
      phoneNumber: phNum,
      location: location,
      joiningDate: dateData,
      dateOfBirth: '01-Jan-90',
      reportingManager: `${capitalizeFirstLettter(manager)}`,
      annualSalary: salary,
      officialEmail: "",
      photo: "",
      fileName: "",
      attachmentName: attachfileName,
      attachment: base64
    };
    if (disabledSubmit !== true) {
      setLoader(true);
      addNewHire(body)
    }
  };

  useEffect(
    () => {
      if(addHire && addHire.results.data.success === true) {
        onSubmitForm(true);
          setLoader(false);
          setDisabledSubmit(true);
          onCancelClick();
      }
    },[addHire]
  )
  
  const validate = evt => {
    let theEvent = evt || window.evt;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
      if (evt.target.name === "phNum") {
        setInvalidPhNum(true);
      } else if (evt.target.name === "salary") {
        setInvalidSalary(true);
      }
    } else {
      if (evt.target.name === "phNum") {
        setInvalidPhNum(false);
      } else if (evt.target.name === "salary") {
        setInvalidSalary(false);
      }
    }
  };

  const onDateBlur = () =>{
     if(dateValue === null){
         setInvalidDate(true)
     } else {
        setInvalidDate(false)
     }
  }

  const validatePhoneNumber = () => {
    var pattern = /^[0-9]{10,12}$/;
    if (pattern.test(phNum)) {
      setWrongPhNum(false);
    } else {
      setWrongPhNum(true);
    }
  };

  const onBlurField = e => {
    let name = e.target.name;
    if (name === "firstName") {
      if (firstName === "") {
        setInvalidFirstName(true);
      } else {
        setInvalidFirstName(false);
      }
    } else if (name === "lastName") {
      if (lastName === "") {
        setInvalidLastName(true);
      } else {
        setInvalidLastName(false);
      }
    } else if (name === "role") {
      if (role === "") {
        setInvalidRole(true);
      } else {
        setInvalidRole(false);
      }
    } else if (name === "location") {
      if (location === "") {
        setInvalidLocation(true);
      } else {
        setInvalidLocation(false);
      }
    } else if (name === "manager") {
      if (manager === "") {
        setInvalidManager(true);
      } else {
        setInvalidManager(false);
      }
    } else if (name === "salary") {
        if (salary === "") {
            setInvalidSalary(true)
        } else {
            setInvalidSalary(false);
        }
    }
  };

  const onChangeValue = e => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "email") {
      setInvalidEmail(false);
      setEmail(value);
    } else if (name === "salary") {
      setSalary(value);
      setInvalidSalary(false);
    } else if (name === "phNum") {
      setPhNum(value);
      setInvalidPhNum(false);
      setWrongPhNum(false);
    } else if (name === "location") {
      setLocation(value);
      setInvalidLocation(false);
    } else if (name === "manager") {
      setManager(value);
      setInvalidManager(false);
    } else if (name === "date") {
      setDate(value);
      setInvalidDate(false);
    } else if (name === "firstName") {
      setFirstName(value);
      setInvalidFirstName(false);
    } else if (name === "lastName") {
      setLastName(value);
      setInvalidLastName(false);
    } else if (name === "role") {
      setRole(value);
      setInvalidRole(false);
    }
  };

  const formList = () => {
    return (
      <div className="padding">
        <div className="onboard-btn">
          <div>
            <div className="onboard">ONBOARDING</div>
            <div className="create-text">CREATE OFFER PACKET</div>
          </div>
          <div className="button-container" onClick={() => onCancelClick()}>
           <img src={cancelIcon} />
          </div>
        </div>
        <div className="form-container">
          <div>
            <div className="all-inputField">
                <div className="inputContainer">
                  <div className="input-field">
                    <input
                      className="input-default form__input"
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      onChange={e => onChangeValue(e)}
                      onBlur={e => onBlurField(e)}
                      autoComplete="off"
                    />
                    <label htmlFor="firstName" className="form__label">
                      <div>
                        First Name <span className="required-dot"></span>
                      </div>
                    </label>
                    {invalidFirstName ? (
                      <div className="invalid-msg">{requiredMsg}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="input-field">
                    <input
                      className="input-default form__input"
                      id="lastName"
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={e => onChangeValue(e)}
                      autoComplete="off"
                      onBlur={e => onBlurField(e)}
                    />
                    <label htmlFor="lastName" className="form__label">
                      <div>
                        Last Name<span className="required-dot"></span>
                      </div>
                    </label>
                    {invalidLastName ? (
                      <div className="invalid-msg">{requiredMsg}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="inputContainer">
                  <div className="input-field">
                      <input
                        className="input-default form__input"
                        id="email"
                        placeholder="Personal Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => onChangeValue(e)}
                        onBlur={() => onBlurEmail()}
                        autoComplete="off"
                      />
                      <label htmlFor="email" className="form__label">
                        <div>
                          Personal Email <span className="required-dot"></span>
                        </div>
                      </label>
                      {invalidEmail ? (
                        <div className="invalid-msg">
                          This field is required or enter valid email!
                        </div>
                      ) : (
                        ""
                      )}
                  </div>
                  <div className="input-field">
                    <input
                      className="input-default form__input num_class"
                      id="phNum"
                      placeholder="Phone Number"
                      type="number"
                      step="0.01"
                      name="phNum"
                      value={phNum}
                      onChange={e => onChangeValue(e)}
                      onKeyPress={event => validate(event)}
                      onBlur={() => validatePhoneNumber()}
                      autoComplete="off"
                    />
                    <label htmlFor="phNum" className="form__label">
                      <div>
                        Phone Number<span className="required-dot"></span>
                      </div>
                    </label>
                    {invalidPhNum || wrongPhNum ? (
                      <div className="invalid-msg">
                        Phone Number should be 10-12 digits or field is required!
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="inputContainer">
                  <div className="input-field">
                      <input
                        className="input-default form__input"
                        id="role"
                        placeholder="Role"
                        type="text"
                        name="role"
                        value={role}
                        onChange={e => onChangeValue(e)}
                        onBlur={e => onBlurField(e)}
                        autoComplete="off"
                      />
                      <label htmlFor="role" className="form__label">
                        <div>
                          Role<span className="required-dot"></span>
                        </div>
                      </label>
                      {invalidRole ? (
                        <div className="invalid-msg">{requiredMsg}</div>
                      ) : (
                        ""
                      )}
                    </div>
                  <div className="input-field">
                    <DatePicker
                      selected={dateValue}
                      onChange={handleChange}
                      minDate={new Date()}
                      onBlur={onDateBlur}
                    />
                    <label htmlFor="date" className="form__label">
                      <div>
                        Joining Date<span className="required-dot"></span>
                      </div>
                    </label>
                    <div className="dateImgContainer">
                      <img src={dateIcon} alt="date" className="date-img" />
                    </div>
                    {invalidDate ? (
                      <div className="invalid-msg">{requiredMsg}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="inputContainer">
                  <div className="input-field">
                      <div>
                        <input
                          className="input-default form__input"
                          id="location"
                          placeholder="Location"
                          type="text"
                          name="location"
                          value={location}
                          onChange={e => setLookUp(e)}
                          autoComplete="off"
                          onBlur={e => onBlurField(e)}
                        />
                        <label htmlFor="location" className="form__label">
                          <div>
                            Location<span className="required-dot"></span>
                          </div>
                        </label>
                        {invalidLocation ? (
                          <div className="invalid-msg">{requiredMsg}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      {arryList.length > 0 && showLocation ? (
                        <div className={`optionList ${showLocation ? "showLocation style-1" : "" }`} style-1>
                          {arryList.map(item => {
                            return (
                              <div
                                className={`optionValue`}
                                onClick={() => setOption(item)}
                              >
                                {item}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                  </div>
                  <div className="input-field select-box">
                    <div>
                      <input
                        className="input-default form__input"
                        id="manager"
                        placeholder="Reporting Manager"
                        type="text"
                        name="manager"
                        value={manager}
                        onChange={e => setLookUp(e)}
                        onBlur={e => onBlurField(e)}
                        autoComplete="off"
                      />
                      <label htmlFor="manager" className="form__label">
                        <div>
                          Reporting Manager<span className="required-dot"></span>
                        </div>
                      </label>
                      {invalidManager ? (
                        <div className="invalid-msg">{requiredMsg}</div>
                      ) : (
                        ""
                      )}
                  </div>
                    {arryList.length > 0 && showManager ? (
                      <div className={`optionList ${ showManager ? "showLocation" : "" }`}>
                        {arryList.map(item => {
                          return (
                            <div
                              className={`optionValue`}
                              onClick={() => setManagerOption(item)}
                            >
                              {item}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="inputContainer">
                  <div className="input-field">
                      <input
                        className="input-default form__input"
                        id="salary"
                        value={salary}
                        placeholder="Annual Salary"
                        type="number"
                        name="salary"
                        step="0.01"
                        onChange={e => onChangeValue(e)}
                        onBlur={e => onBlurField(e)}
                        onKeyPress={event => validate(event)}
                        autoComplete="off"
                      />
                      <label htmlFor="Salary" className="form__label">
                        <div>
                          Salary<span className="required-dot"></span>
                        </div>
                      </label>
                      {invalidSalary ? (
                        <div className="invalid-msg">
                          This field is required or salary should be in number!
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                </div>
            </div>
            {!fileTypePdf ? (
              <div className="form-error">{errorMessage}</div>
            ) : (
              ""
            )}
            <div className="offer-submit">
              {!props.editHire ? (
                <div
                  className={
                    fileName !== ""
                      ? "large-button attach blueBorder"
                      : "large-button attach"
                  }
                >
                  <input
                    type="file"
                    className="upload_btn"
                    id="fileInput"
                    onChange={e => handleFile(e)}
                    value={fileName}
                  />
                  <div className="overlay-layer">
                    <img src={attach} alt="attach" className="attach-img" />
                    <div
                      className={
                        fileName !== ""
                          ? "attach-text fullWidth"
                          : "attach-text"
                      }
                    >
                      {fileName !== "" ? (
                        <div className="fileUpload">
                          <div>{attachfileName}</div>
                          <div>
                            <img
                              src={cancelIcon}
                              alt=""
                              onClick={() => removeAttachedFile()}
                            />
                          </div>
                        </div>
                      ) : (
                        "Attach offer (only pdf)"
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {loaderShow ? (
                <div className="loaderParent">
                  <div className="loaderContainer">
                    <img src={loader} alt="loader" className="loader-img" />
                  </div>
                </div>
              ) : (
                <div>
                  {!props.editHire ? (
                    <div
                      className={`large-button ${
                        disabledSubmit ? "disableOffer" : "enableOffer"
                      }`}
                      onClick={() => onSubmitClick()}
                    >
                      <button
                        className={`btn propBtn ${
                          disabledSubmit ? "disableBtn" : "enableBtn"
                        }`}
                        disabled={disabledSubmit}
                      >
                        SEND OFFER PACKET
                      </button>
                      <div className="imgContainer">
                        <img src={arrow} alt="arrow" className="arrow-img" />
                      </div>
                    </div>
                  ) :''}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <div>{formList()}</div>
    </React.Fragment>
  );
};

export default AddHire;
