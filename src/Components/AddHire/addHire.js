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
import "react-datepicker/dist/react-datepicker.css"

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

const AddHire = (props) => {

    const {editField,onChildClick,onSubmitForm} = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phNum, setPhNum] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [location, setLocation] = useState('');
    const [manager, setManager] = useState('');
    const [packages, setPackages] = useState('');
    const [fileName, setFileName] = useState('');
    const [base64,setBase64] = useState('');
    const [fileTypePdf, setFileTypePdf] = useState(false);
    const [attachfileName, setattachfileName] = useState('');
    const [dateValue, setDate] = useState(new Date());
    const [showLocation, setShowLocation] = useState(false);
    const [loaderShow, setLoader] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const [showPackage, setShowPackage] = useState('');
    

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
        setPackages('');
        setFileName('');
        onChildClick(true); //
    }
    
    const removeAttachedFile = () => {
        setFileName('')
    }

    const handleChange = (date) => {
        setDate(date)
    }

    const handleLocation = () => {
        setShowLocation(!showLocation)
    }

    const setOption = (value) => {
        setLocation(value);
        setShowLocation(!showLocation)
    }

    const handleManager = () => {
        setShowManager(!showManager)
    }

    const setManagerOption = (value) => {
        setManager(value)
        setShowManager(!showManager)
    }

    const handlePackages = () => {
        setShowPackage(!showPackage)
    }

    const setPackageOption = (value) => {
        setPackages(value)
        setShowPackage(!showPackage)
    }

   
    useEffect(
        () => {
            if (fileName !== '') {
                let file = fileName.split("\\")
                setattachfileName(file[2]);
            } else {
                setattachfileName('')
            }
            if (firstName === '' || lastName === '' || email === '' || salary === '' || role === '' || phNum === '' || location === '' || packages === '' || manager === '' || dateValue ===''|| fileTypePdf === false) {  
                setDisabledSubmit(true);
            } else {
                setDisabledSubmit(false);
            }
        }, [firstName, lastName, role, email, phNum, location, manager, salary, packages, fileName, fileTypePdf]
    )

    useEffect (
        () => {
            if(attachfileName){
                let value = attachfileName.split(".");
                if(value[value.length-1] !== "pdf"){
                    setFileTypePdf(false);
                } else {
                    setFileTypePdf(true)
                }
            }
        },[attachfileName]
    )

    useEffect (
        () => {
            if(editField){
                setFirstName(editField.firstName)
                setLastName(editField.lastName)
                setPhNum(editField.phoneNumber)
                setEmail(editField.personalEmail)
                setRole(editField.designation)
                setManager(editField.reportingManager)
                setPackages(editField.benefitPackage)
                setLocation(editField.location)
                setSalary(editField.annualSalary)
                if(editField.passCode){
                    setDisabledSubmit(true);
                }
            }
        },[editField]
    )

    const handleFile = (event) => {
        setFileName(event.target.value)
        if(event.target.value !== ''){
            let selectedFile = event.target.files;
            let file = null;
            let fileToLoad = selectedFile[0];
            let fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                file = fileLoadedEvent.target.result;
                setBase64(file);
            }
            fileReader.readAsDataURL(fileToLoad);
        }
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
            benefitPackage: packages,
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
        if(disabledSubmit !== true) {
            setLoader(true)
            axios.post('https://piktordigitalid.herokuapp.com/api/onboarding/addNewJoinee',body)
            .then(res => {
                onSubmitForm(true)
                setLoader(false);
                setDisabledSubmit(true);
                onCancelClick()
            })
            .catch(err =>{
            })
        }
    }
    const  validate = (evt) => {
        let theEvent = evt || window.evt;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    const formList = () => {
        return <div className="padding">
            <div className="onboard-btn">
                <div className="onboard">ONBOARDING</div>
                <div className="button-container" onClick={() => onCancelClick()}><button className="btn cancel-btn">Cancel</button><img className="cancel" alt="" src={cancelIcon} /></div>
            </div>
            <div className="create-text">CREATE OFFER PACKET</div>
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
                                onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
                                <label htmlFor="email" className="form__label">Personal Email</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="role" placeholder="Role" type="text" name="role" value={role} 
                                onChange={(e) => setRole(e.target.value)} autoComplete="off"/>
                                <label htmlFor="role" className="form__label">Role</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="location" placeholder="Location" type="text" name="location" value={location} 
                                onChange={(e) => setLocation(e.target.value)} autoComplete="off"/>
                                <label htmlFor="location" className="form__label">Location</label>
                                <div className="arrowContainer" onClick={() => handleLocation()}>
                                    <img src={dropDownArrow} alt="" className="arrowDrop-img" />
                                </div>
                                <div className={showLocation ? 'optionList showLocation' : 'optionList'}>
                                    <div className={`optionValue ${location === "Bangalore"?'select__option':''}`} onClick={()=> setOption('Bangalore')}>Bangalore</div>
                                    <div className={`optionValue ${location === "Seattle"?'select__option':''}`} onClick={()=> setOption('Seattle')}>Seattle</div>
                                </div>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="salary" value={salary} placeholder="salary" type="number" name="salary" step="0.01" 
                                onChange={(e) => setSalary(e.target.value)} onKeyPress={(event) => validate(event)} autoComplete="off"/>
                                <label htmlFor="Salary" className="form__label">Salary</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-field">
                                <input className="input-default form__input" id="lastName" placeholder="Last Name" type="text" name="lastName" value={lastName} 
                                onChange={(e) => setLastName(e.target.value)} autoComplete="off"/>
                                <label htmlFor="lastName" className="form__label">Last Name</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input num_class" id="phNum" placeholder="Contact Person" type="number" step="0.01" name="phNum" value={phNum} 
                                onChange={(e) =>  setPhNum(e.target.value)} onKeyPress={(event) => validate(event)} autoComplete="off"/>
                                <label htmlFor="phNum" className="form__label">Contact Phone</label>
                                </div>
                            <div className="input-field">
                                <DatePicker
                                    selected={dateValue}
                                    onChange={handleChange}
                                />
                                <label htmlFor="date" className="form__label">Date</label>
                                <div className="dateImgContainer">
                                    <img src={dateIcon} alt="" className="date-img" />
                                </div>
                            </div>
                            <div className="input-field select-box">
                            <input className="input-default form__input" id="manager" placeholder="Reporting Manager" type="text" name="manager" value={manager} 
                            onChange={(e) => setManager(e.target.value)} autoComplete="off"/>
                                <label htmlFor="manager" className="form__label">Reporting Manager</label>
                                <div className="arrowContainer" onClick={() => handleManager()}>
                                    <img src={dropDownArrow} alt="" className="arrowDrop-img" />
                                </div>
                                <div className={showManager ? 'optionList showLocation' : 'optionList'}>
                                    <div className={`optionValue ${manager === "Vidhi"?'select__option':''}`} onClick={()=> setManagerOption('Vidhi')}>Vidhi</div>
                                    <div className={`optionValue ${manager === "Ankit"?'select__option':''}`} onClick={()=> setManagerOption('Ankit')}>Ankit</div>
                                </div>
                            </div>
                            <div className="input-field select-box">
                                <input className="input-default form__input" id="package" placeholder="Benefit Package" type="text" name="package" value={packages} 
                                onChange={(e) => setPackages(e.target.value)} autoComplete="off"/>
                                <label htmlFor="package" className="form__label">Benefit Package</label>
                                <div className="arrowContainer" onClick={() => handlePackages()}>
                                    <img src={dropDownArrow} alt="" className="arrowDrop-img" />
                                </div>
                                <div className={showPackage ? 'optionList showLocation' : 'optionList'}>
                                    <div className={`optionValue ${packages === "Star-Sliver"?'select__option':''}`} onClick={()=> setPackageOption('Star-Sliver')}>Star-Sliver</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offer-submit">
                       {!props.editHire ? <div className={fileName !== '' ? "large-button attach blueBorder" : "large-button attach"}>
                            <input type="file" className="upload_btn" id="fileInput" onChange={(e)=>handleFile(e)} value={fileName}/>
                            <div className="overlay-layer">
                                <img src={attach} alt="" className="attach-img" />
                                <div className={fileName !== '' ? "attach-text fullWidth" : "attach-text"}>{fileName !== ''?<div className="fileUpload"><div>{attachfileName}</div><div><img src={cancelIcon} alt="" onClick={() => removeAttachedFile()} /></div></div>:"Attach offer"}</div></div>
                        </div>:<div className="already-offer">Offer already sent!</div>}
                        { loaderShow ? 
                            <div className="loaderParent">
                                <div className="loaderContainer">
                                    <img src={loader} alt="" className="loader-img" />
                                </div>
                            </div> : 
                            <div className={disabledSubmit?"large-button disableOffer":"large-button enableOffer"} 
                            onClick={() => onSubmitClick()}>
                                <button className={disabledSubmit ? 'btn disableBtn propBtn' : 'btn enableBtn propBtn'} disabled={disabledSubmit}>
                                    SEND OFFER PACKET
                                </button>
                                <div className="imgContainer">
                                    <img src={arrow} alt="" className="arrow-img" />
                                </div>
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