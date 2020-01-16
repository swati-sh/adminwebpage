import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { appState, appDispatch } from "./AppHelper";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./Components/login/index";
import HireList from "./Components/HireList/hireList";
import ApprovalRequest from "./Components/ApprovalRequest/approvalRequest";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.variable = "swati@piktorlabs.com";
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route
            path="/hirelist"
            exact
            render={() => <HireList {...this.props} />}
          />
          <Route
            path="/email"
            exact
            render={() => <ApprovalRequest {...this.props} />}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => appState(state);

const mapDispatchToProps = dispatch => appDispatch(dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
