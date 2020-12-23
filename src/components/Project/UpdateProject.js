import React, {Component} from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";
import {connect} from 'react-redux';
import {getProject, createProject} from "../../actions/projectActions";

class UpdateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        console.log('UpdateProject - get project id=' + id);
        this.props.getProject(id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            projectName,
            projectIdentifier,
            description,
            startDate,
            endDate
        } = nextProps.project;

        this.setState({
            id,
            projectName,
            projectIdentifier,
            description,
            startDate,
            endDate
        });
    }

    onChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const updateProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };

        this.props.createProject(updateProject, this.props.history);
    }

    render() {
        // const {project} = this.props;

        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Update Project</h5>
                                <hr/>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               placeholder="Project Name"
                                               name="projectName"
                                               value={this.state.projectName}
                                               onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               placeholder="Project Identifier"
                                               name="projectIdentifier"
                                               value={this.state.projectIdentifier}
                                               disabled />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg"
                                               placeholder="Project Description"
                                               value={this.state.description}
                                               onChange={this.onChange}
                                               name="description"/>
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type={"date"}
                                               className="form-control form-control-lg"
                                               value={this.state.startDate}
                                               onChange={this.onChange}
                                               name="startDate"/>
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type={"date"}
                                               className="form-control form-control-lg"
                                               value={this.state.endDate}
                                               onChange={this.onChange}
                                               name="endDate"/>
                                    </div>

                                    <input type={"submit"}
                                           className={"btn btn-primary btn-block mt-4"}
                                           />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
});

export default connect(mapStateToProps, {getProject, createProject})(UpdateProject);