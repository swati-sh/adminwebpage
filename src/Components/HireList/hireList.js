import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./hireList.css";
import LeftDisplay from "../LeftDisplay/leftDisplay";
import plusSvg from "../../assets/plus.svg";
import AddHire from "../AddHire/addHire";
import success from "../../assets/noun_success_2019805.svg";
import loader from "../../assets/Spinner-1s-200px.gif";
import infoIcon from "../../assets/info.svg";

const HireList = props => {
  const { getHiresList, allHiresList, clearHiresList } = props;

  const [noHireData, setNoHireData] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [editHire, setEditHire] = useState(false);
  const [editField, setEditField] = useState("");
  const [formToEnter, setFormToEnter] = useState(false);
  const [backToList, setBackToList] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [loaderShow, setLoaderShow] = useState(false);

  useEffect(() => {
    clearHiresList();
    return () => {
      clearHiresList();
    };
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      props.history.push("/hireList");
    } else {
      props.history.push("/");
    }
    setLoaderShow(true);
    getHiresList();
  }, []);

  useEffect(() => {
    if (allHiresList) {
      const newData = [];
      let joinee = allHiresList.joinee;
      if (joinee) {
        allHiresList.data.map(item => {
          newData.push(item);
        });
        setDataList(newData.reverse());
        setNoHireData(false);
      } else {
        setNoHireData(true);
      }
      setLoaderShow(false);
    }
  }, [allHiresList]);

  const onFormEntryCancelClick = val => {
    getHiresList();
    setFormToEnter(false);
    if (dataList.length > 0) {
      setNoHireData(false);
    } else {
      setNoHireData(true);
    }
  };

  const onEditCancelClick = val => {
    setEditHire(false);
    getHiresList();
  };

  const onSubmitClicked = val => {
    setSubmitClicked(true);
  };

  const onOutClick = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const onDoneClick = () => {
    setNoHireData(false);
    setDataList([]);
    setEditHire(false);
    setEditField("");
    setFormToEnter(false);
    setBackToList(true);
    setSubmitClicked(false);
    getHiresList();
  };

  const onAddAnotherClick = () => {
    setFormToEnter(true);
    setSubmitClicked(false);
  };

  const onEmptyListAddClick = () => {
    setNoHireData(false);
    setFormToEnter(true);
  };

  const onAddHireClick = () => {
    setFormToEnter(true);
  };

  const onEditClick = item => {
    if (item.tShirtSize) {
      props.history.push("/email", {
        item: item.personalEmail
      });
    } else {
      setEditHire(true);
      setEditField(item);
    }
  };

  const showHireList = () => {
    return (
      <div className="padding">
        <div className="list-heading">List of new joinee</div>
        <article className="listContent">
          {dataList.map((item, key) => {
            return (
              <div className="list" key={key} onClick={() => onEditClick(item)}>
                <div className="list__content">
                  <div className="list__content--name">
                    {item.firstName} {item.lastName}
                  </div>
                  {item.tShirtSize && (
                    <div className="tooltip-list">
                      <img src={infoIcon} />
                      <span class="tooltiptext-list">Pending for Approval</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </article>
      </div>
    );
  };

  const successResponse = () => {
    return (
      <div className="success__content">
        <div className="success__content--img">
          <img src={success} className="success-img" alt="success" />
        </div>
        <div className="success__content--desc">
          <div className="desc-first">SENT SUCCESSFULLY!</div>
          <div className="desc-second">
            THE OFFER LETTER HAS BEEN SENT SUCCESSFULLY
          </div>
        </div>
        <div className="success__content--btn">
          <button
            className="another-offer-btn  success-btn"
            onClick={() => onAddAnotherClick()}
          >
            Send another offer{" "}
          </button>
          <button
            className="done-btn success-btn"
            onClick={() => onDoneClick()}
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
            {(editHire || formToEnter) && (
              <div className="logout">
                <button className="logout__btn" onClick={() => onOutClick()}>
                  logOut
                </button>
              </div>
            )}
            <div className="content__right--block">
              {noHireData === false &&
                editHire === false &&
                formToEnter === false &&
                submitClicked === false &&
                loaderShow === false && (
                  <div className="addHire-logOut">
                    <div>
                      <div className="noHire addHire-text">
                        <div className="noHire--text">CREATE OFFER PACKET</div>
                        <img
                          className="imageWrapper"
                          alt="imageWrapper"
                          src={plusSvg}
                          onClick={() => onAddHireClick()}
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        className="logout__btn"
                        onClick={() => onOutClick()}
                      >
                        logOut
                      </button>
                    </div>
                  </div>
                )}
              {loaderShow ? (
                <div className="loaderParent main-loader">
                  <div className="loading-row">
                    <img src={loader} alt="loader" className="loader-img" />
                  </div>
                </div>
              ) : (
                <div className="right-sec__container">
                  {noHireData && submitClicked === false ? (
                    <div className="noHire empty-list">
                      <div className="noHire--text">No New Hires</div>
                      <img
                        className="imageWrapper"
                        alt="plusSvg"
                        src={plusSvg}
                        onClick={() => onEmptyListAddClick()}
                      />
                    </div>
                  ) : (
                    <div>
                      {editHire === false &&
                      formToEnter === false &&
                      submitClicked === false
                        ? showHireList()
                        : ""}
                    </div>
                  )}
                  {editHire && submitClicked === false ? (
                    <AddHire
                      {...props}
                      editField={editField}
                      editHire={editHire}
                      onChildClick={() => onEditCancelClick(backToList)}
                      onSubmitForm={() => onSubmitClicked(submitClicked)}
                    />
                  ) : (
                    ""
                  )}
                  {formToEnter && submitClicked === false ? (
                    <AddHire
                      {...props}
                      onChildClick={() => onFormEntryCancelClick(backToList)}
                      onSubmitForm={() => onSubmitClicked(submitClicked)}
                    />
                  ) : (
                    ""
                  )}
                  {submitClicked ? (
                    <div className="success__container">
                      {successResponse()}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(HireList);
