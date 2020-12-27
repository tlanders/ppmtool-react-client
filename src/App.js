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

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header/>
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
