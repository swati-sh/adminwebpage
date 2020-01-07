import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

ReactDOM.render(
    <Router><App/></Router>,
    document.querySelector('#root')
)