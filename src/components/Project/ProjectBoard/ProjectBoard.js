import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {getBacklog} from "../../../actions/backlogActions";
import Backlog from "./Backlog";

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
                <Backlog projectTasks={projectTasks}/>
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