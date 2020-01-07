import React from 'react';
import './style.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './Components/login/index'
import AddHire from './Components/AddHire/addHire'



const App = () =>{
    
    return(
        <Router>
             <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/addUser" exact component={AddHire} />
            </Switch>
        </Router>
    )
}

export default App;