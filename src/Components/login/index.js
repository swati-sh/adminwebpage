import React, {useState, useEffect} from 'react'
import piktorLogo from '../../assets/Page-1_1_.svg';
import './login.css'

const Login = (props) => {
    const [userName,setEmail]= useState("");
    const [password,setPassword] = useState("");
    const [invalidLoginId, setInvalidLoginId] = useState(false);
    const [disableSubmit,setDisableSubmit] = useState(true)

    useEffect (
        () => {
            if(userName === '' || password === '') {
                setDisableSubmit(true);
            } else {
                setDisableSubmit(false);
            }
        },[userName,password]
    )

    useEffect(
        () => {
            var input = document.getElementById("Password");
            input.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    let val = document.getElementById("submit");
                    if(val){
                        val.click();
                    }
                }
            });
        },[password]
    )

    const validation = () =>{
        if(disableSubmit !== true) {
            if(userName === 'admin' && password === 'admin') {
                localStorage.setItem('token', userName+password);
                setPassword("");
                props.history.push('/hireList');
                setDisableSubmit(false);
            } else {
                setInvalidLoginId(true);
                setDisableSubmit(true);
            }
        }
    }

    const onInputFieldChange = (e) =>{
        if(e.target.name === "userName") {
            setEmail(e.target.value)
        } else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
        setInvalidLoginId(false);
    }

    return(
        <article className="loginParent">
            <div className="loginWrapper">
                <div className="piktor-gotab">
                    <div className="content__left--logo"><img src={piktorLogo} alt="piktorLogo" className="piktor-logo" /></div>
                    <div className="content__left--gotab">Gotab</div>
                </div>
                <div className="input-field">
                    <input className="input-default form__input loginPage" placeholder="User Name" type="text" name="userName" id="userName" value={userName} onChange={(e) => onInputFieldChange(e)} autoComplete="off"/>
                    <label htmlFor="firstName" className="form__label">User Name</label>
                </div>
                <div className="input-field">
                    <input className="input-default form__input loginPage" id="Password" placeholder="Password" type="Password" name="password" value={password} onChange={(e) => onInputFieldChange(e)} autoComplete="off"/>
                    <label htmlFor="password" className="form__label">Password</label>
                </div>
               {invalidLoginId?<div className="invalid-login">Incorrect username or password.</div>:''}
                <div className="btnContainer">
                    <div className={`loginButn ${disableSubmit?'btn-disable':'btn-enable'}`} id="submit" onClick={(e)=>validation(e)}>SUBMIT</div>
                </div>
            </div>
        </article>
    )
}

export default Login