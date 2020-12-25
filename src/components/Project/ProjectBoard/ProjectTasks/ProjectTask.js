import React from 'react';
import PropTypes from 'prop-types';

class ProjectTask extends React.Component {
    render() {
        const {projectTask} = this.props;
        return (
            <div className="card mb-1 bg-light">

                <div className="card-header text-primary">
                    ID: {projectTask.projectSequence} -- Priority: {projectTask.priority}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{projectTask.summary}</h5>
                    <p className="card-text text-truncate ">
                        {projectTask.acceptanceCriteria}
                    </p>
                    <a href='' className="btn btn-primary">
                        View / Update
                    </a>

                    <button className="btn btn-danger ml-4">
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

ProjectTask.propTypes = {
    projectTask: PropTypes.object.isRequired
};

export default ProjectTask;