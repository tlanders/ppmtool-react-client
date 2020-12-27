import React, {Component} from 'react';
import {Link} from "react-router-dom";
import classnames from "classnames";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProjectTask, updateProjectTask} from "../../../../actions/backlogActions";

class UpdateProjectTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            acceptanceCriteria: '',
            dueDate: '',
            priority: 0,
            status: '',
            projectIdentifier: this.props.match.params.identifier,
            projectSequence: this.props.match.params.sequence,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {
            identifier,
            sequence
        } = this.props.match.params;

        console.log('mounting - id: ' + identifier + ", seq: " + sequence);
        this.props.getProjectTask(identifier, sequence, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        console.log('got props');
        const {
            summary,
            acceptanceCriteria,
            dueDate,
            priority,
            status,
            projectIdentifier,
            projectSequence,
        } = nextProps.projectTask;

        this.setState({
            summary,
            acceptanceCriteria,
            dueDate,
            priority,
            status,
            projectIdentifier,
            projectSequence,
        });
    }

    onChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('submit clicked');

        const {
            summary,
            acceptanceCriteria,
            dueDate,
            priority,
            status,
            projectIdentifier,
            projectSequence,
        } = this.state;

        this.props.updateProjectTask(
            projectIdentifier,
            {
                summary,
                acceptanceCriteria,
                dueDate,
                priority,
                status,
                projectIdentifier,
                projectSequence,
            },
            this.props.history);
    }

    render() {
        const {identifier} = this.props.match.params;
        const {sequence} = this.props.match.params;
        const {errors} = this.props;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${identifier}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">View / Update Project Task</h4>
                            <p className="lead text-center">Project: {identifier}<br/>
                                Task: {sequence}
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           className={classnames("form-control form-control-lg", {"is-invalid": errors.summary})}
                                           onChange={this.onChange}
                                           name="summary"
                                           value={this.state.summary}
                                           placeholder="Project Task summary"/>
                                    {errors.summary && (
                                        <div className={"invalid-feedback"}>{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="Acceptance Criteria"
                                              className={classnames("form-control form-control-lg", {"is-invalid": errors.acceptanceCriteria})}
                                              onChange={this.onChange}
                                              name="acceptanceCriteria"
                                              value={this.state.acceptanceCriteria}></textarea>
                                    {errors.acceptanceCriteria && (
                                        <div className={"invalid-feedback"}>{errors.acceptanceCriteria}</div>
                                    )}
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date"
                                           className="form-control form-control-lg"
                                           onChange={this.onChange}
                                           name="dueDate"
                                           value={this.state.dueDate}/>
                                    {errors.dueDate && (
                                        <div className={"invalid-feedback"}>{errors.dueDate}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <select
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.priority})}
                                        onChange={this.onChange}
                                        name="priority"
                                        value={this.state.priority}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                    {errors.priority && (
                                        <div className={"invalid-feedback"}>{errors.priority}</div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <select
                                        className={classnames("form-control form-control-lg", {"is-invalid": errors.status})}
                                        onChange={this.onChange}
                                        name="status"
                                        value={this.state.status}>
                                        <option value="">Select Status</option>
                                        <option value="TODO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                    {errors.status && (
                                        <div className={"invalid-feedback"}>{errors.status}</div>
                                    )}
                                </div>

                                <div className={'container'}>
                                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
                                    <button onClick={() => {
                                        this.props.history.go(-1)
                                    }} className="btn btn-secondary btn-block mt-4">Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProjectTask.propTypes = {
    projectTask: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    projectTask: state.backlog.projectTask,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectTask, updateProjectTask})(UpdateProjectTask);