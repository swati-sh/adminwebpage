import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hireList.css';
import LeftDisplay from '../LeftDisplay/leftDisplay';
import plusSvg from '../../assets/plus.svg'
import AddHire from '../AddHire/addHire';
import success from '../../assets/noun_success_2019805.svg'

const HireList = (props) => {

    const [noHireData, setNoHireData] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [editHire, setEditHire] = useState(false)
    const [editField, setEditField] = useState('');
    const [formToEnter, setFormToEnter] = useState(false)
    const [backToList, setBackToList] = useState(true)
    const [submitClicked,setSubmitClicked] = useState(false)

    useEffect(
        () => {
           getAllJoinee()
        }, []
    )

    const getAllJoinee = async() => {
        const newData = [];
        let res = await axios.get("https://piktordigitalid.herokuapp.com/api/onboarding/getAllJoinee")
        let joinee = res.data.joinee
        if (joinee) {
            res.data.data.map((item) => {
                newData.push(item);
            })
            setDataList(newData)
            setNoHireData(false)
        } else {
            setNoHireData(true)
        }
    }

    const onDeleteJoinee = async(item) => {
        let res = await axios.delete('https://piktordigitalid.herokuapp.com/api/onboarding/deleteJoinee?email='+item.personalEmail)
        if(res.status === 200){
            getAllJoinee()
        }
    }

   
   const onFormEntryCancelClick = (val) => {
        setFormToEnter(false)
        if(dataList.length>0){
            setNoHireData(false)
        } else {
            setNoHireData(true)
        }
    }

    const onEditCancelClick = (val) => {
        setEditHire(false)
    }

    const onSubmitClicked = (val) => {
       setSubmitClicked(true);
    }

    const onOutClick = () => {
        localStorage.clear();
        props.history.push('/')
    }

    const onDoneClick = () => {
        setNoHireData(false)
        setDataList([])
        setEditHire(false)
        setEditField('')
        setFormToEnter(false)
        setBackToList(true)
        setSubmitClicked(false)
        getAllJoinee()
    }

    const onAddAnotherClick = () => {
        setFormToEnter(true);
        setSubmitClicked(false)
    }

    const onEmptyListAddClick = () => {
        setNoHireData(false)
        setFormToEnter(true)
    }

    const onAddHireClick = () =>{
        setFormToEnter(true)
    }

    const onEditClick = (item) => {
        setEditHire(true);
        setEditField(item);
    }

    const showHireList = () => {
        return (
            <div className="padding">
                {
                    dataList.map((item, key) => {
                        return (
                            <div className="list" key={key}>
                                <div className="list__content">
                                    <div className="list__content--name">{item.firstName} {item.lastName}</div>
                                    <div className="list__content--btn">
                                        <button className="btn cancel-btn" onClick={() => onEditClick(item)}>Edit</button>
                                        <button className="btn cancel-btn" onClick={() => onDeleteJoinee(item)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }</div>
        )
    }

    const successResponse = () => {
        return (
            <div className="success__content">
                <div className="success__content--img">
                    <img src={success} className="success-img"/>
                </div>
                <div className="success__content--desc">
                    <div className="desc-first">SENT SUCCESSFULLY!</div>
                    <div className="desc-second">THE OFFER LETTER HAS BEEN SENT SUCCESSFULLY</div>
                </div>
                <div className="success__content--btn">
                    <button className="another-offer-btn btn success-btn" onClick={() => onAddAnotherClick()}>Send another offer </button>
                    <button className="done-btn btn success-btn" onClick={()=>onDoneClick()}>Done</button>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="content">
                    <div className="content__left">
                        <LeftDisplay />
                    </div>
                    <div className="content__right">
                        <div className="content__right--block">
                            <div className="addHire-logOut">
                                <div>
                                 {(noHireData === false && editHire === false && formToEnter === false && submitClicked === false) && <div className="noHire"><div className="noHire--text">
                                    Add Hire</div><img className="imageWrapper" alt="" src={plusSvg} onClick={() => onAddHireClick()} /></div> }
                                </div>
                                <div>
                                    <button className="logout__btn" onClick={() => onOutClick()}>logOut</button>
                                </div>
                            </div>
                            {(noHireData && submitClicked === false) ? <div className="noHire"><div className="noHire--text">
                                       No New Hires</div><img className="imageWrapper" alt="" src={plusSvg} onClick={() => onEmptyListAddClick()} /></div> 
                                       :<div>{
                                    (editHire === false && formToEnter === false && submitClicked === false)?showHireList():''}</div>
                            }
                            {
                                (editHire && submitClicked === false) ? 
                                <AddHire editField={editField} editHire={editHire} onChildClick={() => onEditCancelClick(backToList)} onSubmitForm={() => onSubmitClicked(submitClicked)} /> : ''
                            }
                            {
                                (formToEnter && submitClicked === false)? <AddHire onChildClick={() => onFormEntryCancelClick(backToList) } onSubmitForm={() => onSubmitClicked(submitClicked)} /> : ''
                            }
                            {
                                submitClicked?<div className="success__container">{successResponse()}</div>:''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HireList;