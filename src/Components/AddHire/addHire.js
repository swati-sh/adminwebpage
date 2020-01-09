import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './addHire.css'
import cancelIcon from '../../assets/cancel.svg';
import arrow from '../../assets/noun_Arrow_2094739.svg';
import dropDownArrow from '../../assets/noun_Arrow_2284415.svg';
import attach from '../../assets/noun_attached document_615523.svg';
import dateIcon from '../../assets/noun_Calendar_821509.svg';
import DatePicker from "react-datepicker";
import loader from '../../assets/Spinner-1s-200px.gif';
import "react-datepicker/dist/react-datepicker.css";

const monthCalender = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

const managerArray = {
    manager: ["Vidhi Maheshwari", "Ankit Shekhawat"],
    location: ["Bangalore", "Seatle"]
}
        

const AddHire = (props) => {

    const { editField, onChildClick, onSubmitForm } = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phNum, setPhNum] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [location, setLocation] = useState('');
    const [manager, setManager] = useState('');
    const [fileName, setFileName] = useState('');
    const [base64, setBase64] = useState('');
    const [fileTypePdf, setFileTypePdf] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [attachfileName, setattachfileName] = useState('');
    const [dateValue, setDate] = useState(new Date());
    const [showLocation, setShowLocation] = useState(false);
    const [loaderShow, setLoader] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const [officialEmail, setOfficialEmail] = useState('');
    const [officialPassword, setOfficialPassword] = useState('');
    const [disabledVerify, setDisabledVerify] = useState(true);
    const [arryList, setArrayList] = useState([])


    const onCancelClick = () => {
        setFirstName('');
        setLastName('');
        setRole('');
        setPhNum('');
        setSalary('');
        setDate(new Date());
        setEmail('');
        setManager('');
        setLocation('');
        setFileName('');
        onChildClick(true); 
        setErrorMessage('');
    }

    const removeAttachedFile = () => {
        setFileName('');
    }

    const handleChange = (date) => {
        setDate(date)
    }

    const setOption = (value) => {
        setLocation(value);
        setArrayList([])
        setShowLocation(false)
    }

    const setManagerOption = (value) => {
        setManager(value)
        setShowManager(false)
        setArrayList([])
    }


    useEffect(
        () => {
            if (fileName !== '') {
                let file = fileName.split("\\")
                setattachfileName(file[2]);
            } else {
                setattachfileName('')
            }
            let valid = validateEmail(email)
            if (firstName === '' || lastName === '' || email === '' ||
                salary === '' || role === '' || phNum === '' || location === '' ||
                manager === '' || dateValue === '' || fileTypePdf === false || valid === false) {
                setDisabledSubmit(true);
            } else {
                setDisabledSubmit(false);
            }
        }, [firstName, lastName, role, email, phNum, location, manager, salary, fileName, fileTypePdf]
    )

    useEffect(
        () => {
            let value = validateEmail(officialEmail)
            if (officialEmail === '' || officialPassword === '' || value === false) {
                setDisabledVerify(true);
            } else {
                setDisabledVerify(false);
            }

        }, [officialEmail, officialPassword]
    )

    useEffect(
        () => {
            if (attachfileName) {
                let value = attachfileName.split(".");
                if (value[value.length - 1] !== "pdf") {
                    setFileTypePdf(false);
                    setErrorMessage("Only PDF file allowed!")
                } else {
                    setFileTypePdf(true)
                    setErrorMessage('');
                }
            } else {
                setErrorMessage('');
                setFileTypePdf(false);
            }
        }, [attachfileName]
    )

    const validateEmail = (email) => {
        if (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }

    const filterArray = (e,item) => {
        let newData = []
        let value = e.toLowerCase();
        managerArray[item].filter(
            item => {
                if (item.toLowerCase().startsWith(value)) {
                    newData.push(item)
                }
            }
        )
        setArrayList(newData)
    }

    const lookUp = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        if(name === "location") {
            if(value !== '') {
                filterArray(value,name);
                setShowLocation(true)
                setLocation(value)
            } else {
                setLocation('');
                setShowLocation(false)
            }
        } else if(name === "manager") {
            if(value !== '') {
                filterArray(value,name);
                setShowManager(true)
                setManager(value)
            } else {
                setManager('');
                setShowManager(false)
            }

        }
    }

    useEffect(
        () => {
            if (editField) {
                setFirstName(editField.firstName)
                setLastName(editField.lastName)
                setPhNum(editField.phoneNumber)
                setEmail(editField.personalEmail)
                setRole(editField.designation)
                setManager(editField.reportingManager)
                setLocation(editField.location)
                setSalary(editField.annualSalary)
                if (editField.passCode) {
                    setDisabledSubmit(true);
                }
            }
        }, [editField]
    )

    const handleFile = (event) => {
        setFileName(event.target.value)
        if (event.target.value !== '') {
            let selectedFile = event.target.files;
            let file = null;
            let fileToLoad = selectedFile[0];
            let fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                file = fileLoadedEvent.target.result;
                setBase64(file);
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    const onVerifyClick = () => {
        console.log("verify")
    }
    const onSubmitClick = () => {
        let dateData = dateValue.toISOString()
        dateData = dateData.split('T');
        dateData = dateData[0].split('-')
        dateData = dateData[2] + ' ' + monthCalender[dateData[1]] + ' ' + dateData[0]
        let body = {
            documents: [],
            personalEmail: email,
            firstName: firstName,
            lastName: lastName,
            designation: role,
            phoneNumber: phNum,
            location: location,
            joiningDate: dateData,
            reportingManager: manager,
            annualSalary: salary,
            officialEmail: "",
            photo: "",
            fileName: "",
            attachmentName: attachfileName,
            attachment: base64
        }
        if (disabledSubmit !== true) {
            setLoader(true)
            axios.post('https://piktordigitalid.herokuapp.com/api/onboarding/addNewJoinee', body)
                .then(res => {
                    onSubmitForm(true)
                    setLoader(false);
                    setDisabledSubmit(true);
                    onCancelClick()
                })
                .catch(err => {
                })
        }
    }
    const validate = (evt) => {
        let theEvent = evt || window.evt;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    const formList = () => {
        return <div className="padding">
            <div className="onboard-btn">
                <div>
                    <div className="onboard">ONBOARDING</div>
                    <div className="create-text">CREATE OFFER PACKET</div>
                </div>
                <div className="button-container" onClick={() => onCancelClick()}><button className="btn cancel-btn">Cancel</button></div>
            </div>
            <div className="form-container">
                <div>
                    <div className="all-inputField">
                        <div className="col">
                            <div className="input-field">
                                <input className="input-default form__input" placeholder="First Name" type="text" name="firstName" id="firstName" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} autoComplete="off" />
                                <label htmlFor="firstName" className="form__label">First Name</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="email" placeholder="Personal Email" type="email" name="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                                <label htmlFor="email" className="form__label">Personal Email</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="role" placeholder="Role" type="text" name="role" value={role}
                                    onChange={(e) => setRole(e.target.value)} autoComplete="off" />
                                <label htmlFor="role" className="form__label">Role</label>
                            </div>
                            <div className="input-field">
                                <div>
                                <input className="input-default form__input" id="location" placeholder="Location" type="text" name="location" value={location}
                                    onChange={(e) => lookUp(e)} autoComplete="off"/>
                                <label htmlFor="location" className="form__label">Location</label>
                                </div>
                                {(arryList.length>0 && showLocation)?
                                 <div className={`optionList ${showLocation?'showLocation':''}`}>
                                    {arryList.map(item=>{
                                        return <div className={`optionValue`} onClick={() => setOption(item)}>{item}</div>       
                                    })}
                                </div>:''}
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="salary" value={salary} placeholder="salary" type="number" name="salary" step="0.01"
                                    onChange={(e) => setSalary(e.target.value)} onKeyPress={(event) => validate(event)} autoComplete="off" />
                                <label htmlFor="Salary" className="form__label">Salary</label>
                            </div>
                            {
                                props.editHire ? <div className="input-field">
                                    <input className="input-default form__input" id="officialEmail" placeholder="Official Email" type="email" name="email" value={officialEmail}
                                        onChange={(e) => setOfficialEmail(e.target.value)} autoComplete="off" />
                                    <label htmlFor="officialEmail" className="form__label">Official Email</label>
                                </div> : ''
                            }
                        </div>
                        <div className="col">
                            <div className="input-field">
                                <input className="input-default form__input" id="lastName" placeholder="Last Name" type="text" name="lastName" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} autoComplete="off" />
                                <label htmlFor="lastName" className="form__label">Last Name</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input num_class" id="phNum" placeholder="Phone Number" type="number" step="0.01" name="phNum" value={phNum}
                                    onChange={(e) => setPhNum(e.target.value)} onKeyPress={(event) => validate(event)} autoComplete="off" />
                                <label htmlFor="phNum" className="form__label">Phone Number</label>
                            </div>
                            <div className="input-field">
                                <DatePicker
                                    selected={dateValue}
                                    onChange={handleChange}
                                    minDate={new Date()}
                                />
                                <label htmlFor="date" className="form__label">Date</label>
                                <div className="dateImgContainer">
                                    <img src={dateIcon} alt="date" className="date-img" />
                                </div>
                            </div>
                            <div className="input-field select-box">
                                <div>
                                <input className="input-default form__input" id="manager" placeholder="Reporting Manager" type="text" name="manager" value={manager}
                                    onChange={(e) => lookUp(e)} autoComplete="off"/>
                                <label htmlFor="manager" className="form__label">Reporting Manager</label>
                                </div>
                                {(arryList.length>0 && showManager)?
                                 <div className={`optionList ${showManager?'showLocation':''}`}>
                                    {arryList.map(item=>{
                                        return <div className={`optionValue`} onClick={() => setManagerOption(item)}>{item}</div>       
                                    })}
                                </div>:''}
                            </div>
                            {
                                props.editHire ? <div className="input-field">
                                    <input className="input-default form__input" id="officialPassword" placeholder="Password" type="password" name="officialPassword" value={officialPassword}
                                        onChange={(e) => setOfficialPassword(e.target.value)} autoComplete="off" />
                                    <label htmlFor="officialPassword" className="form__label">Password</label>
                                </div> : ''
                            }
                        </div>
                    </div>
                    {!fileTypePdf?<div className="form-error">{errorMessage}</div>:''}
                    <div className="offer-submit">
                        {!props.editHire ? <div className={fileName !== '' ? "large-button attach blueBorder" : "large-button attach"}>
                            <input type="file" className="upload_btn" id="fileInput" onChange={(e) => handleFile(e)} value={fileName} />
                            <div className="overlay-layer">
                                <img src={attach} alt="attach" className="attach-img" />
                                <div className={fileName !== '' ? "attach-text fullWidth" : "attach-text"}>{fileName !== '' ? <div className="fileUpload"><div>{attachfileName}</div>
                                <div><img src={cancelIcon} alt="" onClick={() => removeAttachedFile()} /></div></div> : "Attach offer (only pdf)"}</div></div>
                        </div> :''}
                        {loaderShow ?
                            <div className="loaderParent">
                                <div className="loaderContainer">
                                    <img src={loader} alt="loader" className="loader-img" />
                                </div>
                            </div> : <div>
                                {
                                    !props.editHire ? <div className={`large-button ${disabledSubmit ? "disableOffer" : "enableOffer"}`}
                                        onClick={() => onSubmitClick()}>
                                        <button className={`btn propBtn ${disabledSubmit ? 'disableBtn' : 'enableBtn'}`} disabled={disabledSubmit}>
                                            SEND OFFER PACKET
                                        </button>
                                        <div className="imgContainer">
                                            <img src={arrow} alt="arrow" className="arrow-img" />
                                        </div>
                                    </div> : <div className={`large-button ${disabledVerify ? "disableOffer" : "enableOffer"}`}
                                        onClick={() => onVerifyClick()}>
                                            <button className={`btn propBtn ${disabledVerify ? 'disableBtn' : 'enableBtn'}`} disabled={disabledVerify}>
                                                VERIFY
                                             </button>
                                            <div className="imgContainer">
                                                <img src={arrow} alt="arrow" className="arrow-img" />
                                            </div>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    }
    return (
        <React.Fragment>
            <div>
                {formList()}
            </div>
        </React.Fragment>
    )
}

export default AddHire;