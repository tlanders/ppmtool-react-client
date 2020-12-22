import React, {Component} from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";

class UpdateProject extends Component {
    render() {
        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Update Project</h5>
                                <hr/>
                                <form>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               placeholder="Project Name"
                                               name="projectName"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               placeholder="Project Identifier"
                                               name="projectIdentifier"
                                               disabled />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg"
                                               placeholder="Project Description"
                                               name="description"/>
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input type={"date"}
                                               className="form-control form-control-lg"
                                               name="start_date"/>
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input type={"date"}
                                               className="form-control form-control-lg"
                                               name="end_date"/>
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

export default UpdateProject