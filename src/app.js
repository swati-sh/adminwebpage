import React from 'react';
import './style.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Components/login/index';
import HireList from './Components/HireList/hireList';



const App = () =>{
    
    return(
        <Router>
             <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/hirelist" exact component={HireList} />
            </Switch>
        </Router>
    )
}

export default App;