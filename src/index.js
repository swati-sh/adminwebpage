import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './Components/login/index'
import AddHire from './Components/AddHire/addHire'



ReactDOM.render(
    <Router><App/></Router>,
    document.querySelector('#root')
)