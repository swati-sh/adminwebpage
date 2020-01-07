import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import './addHire.css'
import formField from '../formFields'
import validator from 'validator';
import plusSvg from './Images/plus.svg'
import piktorLogo from '../../assets/Page-1_1_.svg';
import cancelIcon from '../../assets/cancel.svg';
import arrow from '../../assets/noun_Arrow_2094739.svg';
import dropDownArrow from '../../assets/noun_Arrow_2284415.svg';
import attach from '../../assets/noun_attached document_615523.svg';
import dateIcon from '../../assets/noun_Calendar_821509.svg';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css"
import { tsMappedType } from '@babel/types';

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

    const [noHireData, setNoHireData] = useState(true);
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
    const [attachfileName, setattachfileName] = useState('')
    const [dateValue, setDate] = useState(new Date())
    const [showLocation, setShowLocation] = useState(false)
    

    const onAddClick = () => {
        setNoHireData(false)
    }

    const onCancelClick = () => {
        setFirstName('');
        setLastName('');
        setRole('');
        setPhNum('');
        setSalary('');
        setDate('');
        setEmail('');
        setManager('');
        setLocation('');
        setPackages('');
        setFileName('');
    }
    

    const removeAttachedFile = () => {
        setFileName('')
    }

    const handleChange = (date) => {
        setDate(date)
    }

    const handleLocation = () => {
        console.log('bvksfb')
        setShowLocation(!showLocation)
    }

    const setOption = (value) => [
        
    ]
   
    useEffect(
        () => {
            if(fileName !== '') {
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
        }, [firstName, lastName, role, email, phNum, location, manager, salary, packages,fileName,fileTypePdf]
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

    useEffect(
        () => {
         axios.get("https://piktordigitalid.herokuapp.com/api/onboarding/getAllJoinee")
         .then(res => {
             let joinee = res.data.joinee
             if(joinee){
                console.log(res)
             } else {
                setNoHireData(true)
             }   
         })
         .catch(err => {
             console.log(err)
         })
        },[]
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
        axios.post('http://piktordigitalid.herokuapp.com/api/onboarding/addNewJoinee',body)
        .then(res => {
            console.log("post",res)
        })
        .catch(err =>{
            console.log('err', err)
        })
    }

    const formList = () => {
        return <div className="padding">
            <div className="onboard-btn">
                <div className="onboard">ONBOARDING</div>
                <div className="button-container" onClick={() => onCancelClick()}><button className="btn btn-cancel">Cancel</button><img className="cancel" src={cancelIcon} /></div>
            </div>
            <div className="create-text">CREATE OFFER PACKET</div>
            <div className="form-container">
                <div>
                    <div className="all-inputField">
                        <div className="col">
                            <div className="input-field">
                                <input className="input-default form__input" placeholder="First Name" type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="off"/>
                                <label htmlFor="firstName" className="form__label">First Name</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="email" placeholder="Personal Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
                                <label htmlFor="email" className="form__label">Personal Email</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="role" placeholder="Role" type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} autoComplete="off"/>
                                <label htmlFor="role" className="form__label">Role</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="location" placeholder="Location" type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} autoComplete="off"/>
                                <label htmlFor="location" className="form__label">Location</label>
                                <div className="arrowContainer" onClick={() => handleLocation()}>
                                    <img src={dropDownArrow} className="arrowDrop-img" />
                                </div>
                                <div className={showLocation ? 'optionList showLocation' : 'optionList'}>
                                    <div className="optionValue" onClick={()=> setOption('Bangalore')}>Bangalore</div>
                                    <div className="optionValue" onClick={()=> setOption('Seattle')}>Seattle</div>
                                </div>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="salary" value={salary} placeholder="salary" type="text" name="salary" onChange={(e) => setSalary(e.target.value)} autoComplete="off"/>
                                <label htmlFor="Salary" className="form__label">Salary</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-field">
                                <input className="input-default form__input" id="lastName" placeholder="Last Name" type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="off"/>
                                <label htmlFor="lastName" className="form__label">Last Name</label>
                            </div>

                            <div className="input-field">
                                <input className="input-default form__input" id="phNum" placeholder="Contact Person" type="text" name="phNum" value={phNum} onChange={(e) => setPhNum(e.target.value)} autoComplete="off"/>
                                <label htmlFor="phNum" className="form__label">Contact Phone</label>
                                </div>
                            <div className="input-field">
                                <DatePicker
                                    selected={dateValue}
                                    onChange={handleChange}
                                />
                                <label htmlFor="date" className="form__label">Date</label>
                                <div className="dateImgContainer">
                                    <img src={dateIcon} className="date-img" />
                                </div>
                            </div>
                            <div className="input-field select-box">
                                <select className="input-default select-data  form__input" onChange={(e) => setManager(e.target.value)} value={manager} name="manager">
                                    <option value="" selected disabled>Reporting Manager</option>
                                    <option value="Bangalore">Vidhi</option>
                                    <option value="Seatle">Ankit</option>
                                </select>
                            </div>
                            <div className="input-field select-box">
                                <select className="input-default select-data" onChange={(e) => setPackages(e.target.value)} value={packages} name="packages">
                                    <option value="" selected disabled>Benefit Package</option>
                                    <option value="Bangalore">Star-Sliver</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="offer-submit">
                        <div className="large-button attach">
                            <input type="file" className="upload_btn" id="fileInput" onChange={(e)=>handleFile(e)} value={fileName}/>
                            <div className="overlay-layer">
                                <img src={attach} className="attach-img" />
                                <div className="attach-text">{fileName !== ''?<div><div>{attachfileName}</div><div><img src={cancelIcon} onClick={() => removeAttachedFile()} /></div></div>:"Attach offer"}</div></div></div>
                        <div className={disabledSubmit?"large-button disableOffer":"large-button enableOffer"} onClick={() => onSubmitClick()}><button className={disabledSubmit ? 'btn disableBtn propBtn' : 'btn enableBtn propBtn'} disabled={disabledSubmit}>SEND OFFER PACKET</button>
                        <div className="imgContainer">
                            <img src={arrow} className="arrow-img" /></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }
    return (
        <React.Fragment>
            <div className="container">
                <div className="content">
                    <div className="content__left">
                        <div className="main-content">
                            <div className="piktor-gotab">
                                <div className="content__left--logo"><img src={piktorLogo} className="piktor-logo" /></div>
                                <div className="content__left--gotab">Gotab</div>
                            </div>
                            <div className="content__left--desc">
                                <div className="content__left--desc-text">
                                    <div className="text">Unified </div>
                                    <div className="text">Employee</div>
                                    <div className="text">Management</div>
                                    <div className="text">Platform</div>
                                </div></div>
                        </div>
                    </div>
                    <div className="content__right">
                        <div className="content__right--block">
                            {
                                noHireData ?
                                    <div className="noHire">
                                        <div className="noHire--text">
                                            No New Hires
                                 </div><img className="imageWrapper" src={plusSvg} onClick={() => onAddClick()} />
                                    </div> :
                                    formList()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default AddHire;