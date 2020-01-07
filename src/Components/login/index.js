import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import './login.css'

const Login = (props) => {
console.log(props)
const [email,setEmail]= useState("");
const [password,setPassword] = useState("");

const validation = () =>{
    console.log(email,password)
    if(email === 'admin' && password === 'admin') {
        setPassword("")
        props.history.push('/addUser')
    }
}

    return(
        <div className="loginWrapper">
            <h2>Login</h2>
            <p className="emailWrapper">Email ID</p>
            <input type = "email" placeholder="example@piktorlabs.com" onChange={e=>{setEmail(e.target.value)}} />
            <p className="emailWrapper">Password</p>
            <input type = "password" onChange={e=>{setPassword(e.target.value)}}  />
            <div className="loginButn" onClick={validation}>Submit</div>
        </div>
    )
}

export default Login