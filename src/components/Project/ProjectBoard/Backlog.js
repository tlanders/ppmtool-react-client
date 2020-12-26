import React, {Component} from 'react';
import ProjectTask from "./ProjectTasks/ProjectTask";
import PropTypes from 'prop-types';

class Backlog extends Component {
    render() {
        const {projectTasks} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {projectTasks.filter(task => task.status === 'TODO').map(task => (
                            <ProjectTask projectTask={task} key={task.projectSequence}/>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {projectTasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
                            <ProjectTask projectTask={task} key={task.projectSequence}/>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {projectTasks.filter(task => task.status === 'DONE').map(task => (
                            <ProjectTask projectTask={task} key={task.projectSequence}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

Backlog.propTypes = {
    projectTasks: PropTypes.array.isRequired
};

export default Backlog;