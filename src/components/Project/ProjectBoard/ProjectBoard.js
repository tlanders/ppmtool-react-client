import React from 'react';
import {getBacklog} from "../../../actions/projectActions";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import ProjectTask from "./ProjectTasks/ProjectTask";

class ProjectBoard extends React.Component {
    componentDidMount() {
        this.props.getBacklog(this.props.match.params.id);
    }

    render() {
        const {projectTasks} = this.props.backlog;
        return (
            <div className="container">
                <Link to={`/addProjectTask/${this.props.match.params.id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>
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
            </div>
        )
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    backlog: state.backlog
});

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);