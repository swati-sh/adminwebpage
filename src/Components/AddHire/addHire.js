import React, { Component, useState, useEffect } from 'react'
import axios from 'axios';
import './addHire.css'
import formField from '../formFields'
const axios = require('axios');
import validator from 'validator';
import plusSvg from './Images/plus.svg'
import piktorLogo from '../../assets/Page-1_1_.svg';
import cancelIcon from '../../assets/cancel.svg';
import arrow from '../../assets/noun_Arrow_2094739.svg';
import attach from '../../assets/noun_attached document_615523.svg';

const AddHire = (props) => {

    const [noHireData, setNoHireData] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phNum, setPhNum] = useState('');
    const [date, setdate] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [location, setLocation] = useState('');
    const [manager, setManager] = useState('');
    const [packages, setPackages] = useState('');
    const [fileName, setFileName] = useState('');
    const [attachfileName, setattachfileName] = useState('')
    
    useEffect(
        () => {
            let config = {
                headers:  {

                }
            }
         axios.get("https://piktordigitalid.herokuapp.com/api/onboarding/getAllJoinee")
         .then(res =>{
             console.log("res",res);
         })
        },[]
    )

    const onAddClick = () => {
        setNoHireData(false)
    }

    const onCancelClick = () => {
        setNoHireData(true);
        setFirstName('');
        setLastName('');
        setRole('');
        setPhNum('');
        setSalary('');
        setdate('');
        setEmail('');
        setManager('');
        setLocation('');
        setPackages('');
    }
    

    const removeAttachedFile = () => {
        setFileName('')
    }

   
    useEffect(
        () => {
            if(fileName !== '') {
                let file = fileName.split("\\")
                setattachfileName(file[2]);
            } else {
                setattachfileName('')
            }
            if (firstName === '' || lastName === '' || email === '' || salary === '' || role === '' || phNum === '' || location === '' || packages === '' || manager === '') {
                setDisabledSubmit(true);
            } else {
                setDisabledSubmit(false);
            }
        }, [firstName, lastName, role, email, phNum, location, manager, salary, packages,fileName]
    )

    useEffect(
        () => {
         axios.get("https://piktordigitalid.herokuapp.com/api/onboarding/getAllJoinee")
         .then(res =>{
             console.log("res",res);
         })
        },[]
    )

    

    const formList = () => {
        return <div className="padding">
            <div className="onboard-btn">
                <div className="onboard">ONBOARDING</div>
                <div className="button-container" onClick={() => onCancelClick()}><button className="btn btn-cancel">Cancel</button><img className="cancel" src={cancelIcon} /></div>
            </div>
            <div className="create-text">CREATE OFFER PACKET</div>
            <div className="form-container">
                <form>
                    <div className="all-inputField">
                        <div className="col">
                            <div className="input-field">
                                <input className="input-default form__input" placeholder="First Name" type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <label for="firstName" className="form__label">First Name</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="email" placeholder="Personal Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label for="email" className="form__label">Personal Email</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="role" placeholder="Role" type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
                                <label for="role" className="form__label">Role</label>
                            </div>
                            <div className="input-field select-box">
                                <select className="input-default select-data form__input" id="location" onChange={(e) => setLocation(e.target.value)} value={location} name="location">
                                    <option value="" selected disabled>Location</option>
                                    <option value="Bangalore">Bangalore</option>
                                    <option value="Seatle">Seatle</option>
                                </select>
                                <label for="location" className="form__label">Location</label>
                            </div>
                            <div className="input-field">
                                <input className="input-default form__input" id="salary" value={salary} placeholder="salary" type="text" name="salary" onChange={(e) => setSalary(e.target.value)} />
                                <label for="Salary" className="form__label">Salary</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-field">
                                <input className="input-default form__input" id="lastName" placeholder="Last Name" type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <label for="lastName" className="form__label">Last Name</label>
                            </div>

                            <div className="input-field">
                                <input className="input-default form__input" id="phNum" placeholder="Contact Person" type="text" name="phNum" value={phNum} onChange={(e) => setPhNum(e.target.value)} />
                                <label for="phNum" className="form__label">Contact Phone</label>
                                </div>
                            <div className="input-field">
                                <input className="input-default  form__input" id="date" placeholder="Joining Date" type="text" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
                                <label for="date" className="form__label">Date</label>
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
    <div className="large-button attach"><input type="file" className="upload_btn" id="fileInput" onChange={(e)=>setFileName(e.target.value)} value={fileName}/><div className="overlay-layer"><img src={attach} className="attach-img" /><div className="attach-text">{fileName !== ''?<div><div>{attachfileName}</div><div><img src={cancelIcon} onClick={() => removeAttachedFile()} /></div></div>:"Attach offer"}</div></div></div>
                        <div className={disabledSubmit?"large-button disableOffer":"large-button enableOffer"}><button className={disabledSubmit ? 'btn disableBtn propBtn' : 'btn enableBtn propBtn'} disabled={disabledSubmit}>SEND OFFER PACKET</button><img src={arrow} className="arrow-img" /></div>
                    </div>
                </form>
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