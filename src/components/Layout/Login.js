import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {loginUser} from "../../actions/securityActions";
import classnames from 'classnames';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {}
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
            username,
            password
        } = this.state;

        this.props.loginUser({username, password}, this.props.history);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="email"
                                           className={classnames("form-control form-control-lg", {"is-invalid": errors.username})}
                                           value={this.state.username}
                                           onChange={this.onChange}
                                           placeholder="Email Address" name="username"/>
                                    {errors.username && (
                                        <div className={"invalid-feedback"}>{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                           className={classnames("form-control form-control-lg", {"is-invalid": errors.password})}
                                           value={this.state.password}
                                           onChange={this.onChange}
                                           placeholder="Password" name="password"/>
                                    {errors.password && (
                                        <div className={"invalid-feedback"}>{errors.password}</div>
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

Login.propTypes = {
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);