import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/securityActions";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            username: "",
            password: "",
            confirmPassword: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log('on submit clicked');

        const {
            fullName,
            username,
            password,
            confirmPassword
        } = this.state;

        this.props.registerUser({
                fullName,
                username,
                password,
                confirmPassword
            }, this.props.history);
    }

    render() {
        const {errors} = this.props;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                           placeholder="Name"
                                           name="fullName"
                                           value={this.state.fullName}
                                           onChange={this.onChange}
                                           className={classnames("form-control form-control-lg",{"is-invalid":errors.fullName})}
                                           required/>
                                    {errors.fullName && (
                                        <div className={"invalid-feedback"}>{errors.fullName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                           value={this.state.username}
                                           onChange={this.onChange}
                                           className={classnames("form-control form-control-lg",{"is-invalid":errors.username})}
                                           placeholder="Email Address" name="username"/>
                                    {errors.username && (
                                        <div className={"invalid-feedback"}>{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           value={this.state.password}
                                           onChange={this.onChange}
                                           className={classnames("form-control form-control-lg",{"is-invalid":errors.password})}
                                           placeholder="Password" name="password"/>
                                    {errors.password && (
                                        <div className={"invalid-feedback"}>{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           placeholder="Confirm Password"
                                           value={this.state.confirmPassword}
                                           onChange={this.onChange}
                                           className={classnames("form-control form-control-lg",{"is-invalid":errors.confirmPassword})}
                                           name="confirmPassword"/>
                                    {errors.confirmPassword && (
                                        <div className={"invalid-feedback"}>{errors.confirmPassword}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(Register);