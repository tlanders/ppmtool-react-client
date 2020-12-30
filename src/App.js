import React, {Component} from 'react';

import './App.css';
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/Project/ProjectBoard/ProjectBoard";
import {Provider} from "react-redux";
import store from "./store";
import AddProjectTask from "./components/Project/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/Project/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Login from "./components/Layout/Login";
import Register from "./components/Layout/Register";
import jwt_decode from "jwt-decode";
import setJwtToken from "./utils/setJwtToken";
import {SET_CURRENT_USER_TASK} from "./actions/types";
import {logout} from "./actions/securityActions";

const jwtToken = localStorage.jwtToken;
if(jwtToken) {
    setJwtToken(jwtToken);
    const decodedToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER_TASK,
        payload: decodedToken
    });

    const currentTime = Date.now() / 1000;
    if(decodedToken.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header/>
                        {/*// public routes*/}
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>

                        {/*// private routes*/}
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/addProject" component={AddProject}/>
                        <Route path="/updateProject/:id" component={UpdateProject}/>
                        <Route path="/projectBoard/:id" component={ProjectBoard}/>
                        <Route path="/addProjectTask/:id" component={AddProjectTask}/>
                        <Route path="/updateProjectTask/:identifier/:sequence" component={UpdateProjectTask}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
