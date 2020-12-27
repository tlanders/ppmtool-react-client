import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {getBacklog} from "../../../actions/backlogActions";
import Backlog from "./Backlog";

class ProjectBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        this.props.getBacklog(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {projectTasks} = this.props.backlog;
        const {errors} = this.state;

        let message = '';
        if(projectTasks.length <= 0) {
            if(errors.projectNotFound) {
                message = (
                    <div className="col-md-12">
                        <div className="alert alert-danger text-center" role={'alert'}>
                            <p>{this.state.errors.projectNotFound}</p>
                        </div>
                    </div>
                );
            } else {
                message = (
                    <div className="col-md-12">
                        <div className="alert alert-danger text-center" role={'alert'}>
                            <p>This project has no tasks</p>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="container">
                <Link to={`/addProjectTask/${this.props.match.params.id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br/>
                <hr/>
                {message}
                <Backlog projectTasks={projectTasks}/>
            </div>
        )
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);