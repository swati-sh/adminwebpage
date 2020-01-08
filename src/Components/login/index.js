import React, {useState, useEffect} from 'react'
import piktorLogo from '../../assets/Page-1_1_.svg';
import './login.css'

const Login = (props) => {
    const [userName,setEmail]= useState("");
    const [password,setPassword] = useState("");
    
    useEffect(
        () => {
            let item = localStorage.getItem('token')
            if(item){
                props.history.push('/hireList')
            }
        },[]
    )

    const validation = () =>{
        if(userName === 'admin' && password === 'admin') {
            localStorage.setItem('token', userName+password);
            setPassword("")
            props.history.push('/hireList')
        }
    }

    return(
        <article className="loginParent">
            <div className="loginWrapper">
                <div className="piktor-gotab">
                    <div className="content__left--logo"><img src={piktorLogo} alt="" className="piktor-logo" /></div>
                    <div className="content__left--gotab">Gotab</div>
                </div>
                <div className="input-field">
                    <input className="input-default form__input loginPage" placeholder="User Name" type="text" name="userName" id="userName" value={userName} onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
                    <label htmlFor="firstName" className="form__label">User Name</label>
                </div>
                <div className="input-field">
                    <input className="input-default form__input loginPage" id="Password" placeholder="Password" type="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" onKeyDown={(event) => validation(event)}/>
                    <label htmlFor="password" className="form__label">Password</label>
                </div>
                <div className="btnContainer">
                    <div className="loginButn" onClick={validation}>SUBMIT</div>
                </div>
            </div>
        </article>
    )
}

export default Login