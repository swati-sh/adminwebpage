import React, { Component, useState, useEffect } from "react";
import "./modal.css";

const Modal = props => {
  const [message, setMessage] = useState("");
  const [disableRejectBtn, setDisableRejectBtn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleClick = e => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (message !== "") {
      setDisableRejectBtn(false);
    } else {
      setDisableRejectBtn(true);
    }
  }, [message]);

  const onTextAreaChange = evt => {
    setMessage(evt.target.value);
    setErrorMsg("");
  };

  const onTextareaBlur = () => {
    if (message !== "") {
      setErrorMsg("");
    } else {
      setErrorMsg("Please provide the reason");
    }
  };

  const onClick = () => {
    props.onRejectClicked(message);
  };
  return (
    <div className="modal-container">
      <div className="modal" onClick={e => handleClick(e)}>
        <div className="modal-element">
          <div className="headings">Reject Reason</div>
          <div>
            <textarea
              className="textarea-content"
              placeholder="Reason for rejecting"
              onChange={e => onTextAreaChange(e)}
              onBlur={() => onTextareaBlur()}
            ></textarea>
          </div>
          {errorMsg ? (
            <div className="invalid-msg textarea-error">{errorMsg}</div>
          ) : (
            ""
          )}
          <div className="cancel-rej-container">
            <div onClick={props.onHide} className="cancel-btn">
              Cancel
            </div>
            <div
              className={`modal-reject-btn ${
                disableRejectBtn ? "disableRej-btn" : ""
              }`}
              onClick={() => onClick()}
            >
              REJECT Request
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
