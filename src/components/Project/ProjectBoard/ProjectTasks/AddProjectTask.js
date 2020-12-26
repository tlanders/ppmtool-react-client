import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import classnames from 'classnames';
import {addProjectTask} from "../../../../actions/backlogActions";
import PropTypes from 'prop-types';

class AddProjectTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            acceptanceCriteria: '',
            dueDate: "",
            priority: 0,
            status: '',
            projectIdentifier: this.props.match.params.id,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const newTask = {
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            dueDate: this.state.dueDate,
            priority: this.state.priority,
            status: this.state.status
        };

        console.log(newTask);

        this.props.addProjectTask(this.state.projectIdentifier, newTask, this.props.history);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const identifier = this.props.match.params.id;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${identifier}`} className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Add Project Task</h4>
                            <p className="lead text-center">Project Name - {identifier}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control form-control-lg"
                                           onChange={this.onChange}
                                           name="summary"
                                           value={this.state.summary}
                                           placeholder="Project Task summary"/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg"
                                              placeholder="Acceptance Criteria"
                                              onChange={this.onChange}
                                              name="acceptanceCriteria"
                                              value={this.state.acceptanceCriteria}></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date"
                                           className="form-control form-control-lg"
                                           onChange={this.onChange}
                                           name="dueDate"
                                           value={this.state.dueDate}/>
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg"
                                            onChange={this.onChange}
                                            name="priority"
                                            value={this.state.priority}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className="form-control form-control-lg"
                                            onChange={this.onChange}
                                            name="status"
                                            value={this.state.status}>
                                        <option value="">Select Status</option>
                                        <option value="TODO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {addProjectTask})(AddProjectTask);