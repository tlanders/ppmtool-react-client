import React, {Component} from 'react';
import ProjectTask from "./ProjectTasks/ProjectTask";
import PropTypes from 'prop-types';

const STATUS_TODO = 'TODO';
const STATUS_IN_PROGRESS = 'IN_PROGRESS';
const STATUS_DONE = 'DONE';

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
                        {projectTasks.filter(task => task.status === STATUS_TODO).map(task => (
                            <ProjectTask projectTask={task} key={task.id}/>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {projectTasks.filter(task => task.status === STATUS_IN_PROGRESS).map(task => (
                            <ProjectTask projectTask={task} key={task.id}/>
                        ))}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {projectTasks.filter(task => task.status === STATUS_DONE).map(task => (
                            <ProjectTask projectTask={task} key={task.id}/>
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