import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {deleteProjectTask} from "../../../../actions/backlogActions";
import {connect} from 'react-redux';

class ProjectTask extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick(event) {
        const {projectTask} = this.props;
        console.log(projectTask);
        this.props.deleteProjectTask(projectTask.projectIdentifier, projectTask.projectSequence, this.props.history);
    }

    render() {
        const {projectTask} = this.props;
        let priorityString;
        let priorityClass;

        if(projectTask.priority === 1) {
            priorityClass = 'bg-danger text-light';
            priorityString = 'HIGH';
        } else if(projectTask.priority === 2) {
            priorityClass = 'bg-warning text-light';
            priorityString = 'MEDIUM';
        } if(projectTask.priority === 3) {
            priorityClass = 'bg-info text-light';
            priorityString = 'LOW';
        }

        return (
            <div className="card mb-1 bg-light">

                <div className={`card-header text-primary ${priorityClass}`}>
                    ID: {projectTask.projectSequence} -- Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.summary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <Link to={`/updateProjectTask/${projectTask.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button onClick={this.onDeleteClick} className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

ProjectTask.propTypes = {
    projectTask: PropTypes.object.isRequired,
    deleteProjectTask: PropTypes.func.isRequired
};

export default connect(null, {deleteProjectTask})(ProjectTask);