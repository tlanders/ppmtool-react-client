import axios from "axios";
import {SET_CURRENT_USER_TASK, GET_ERRORS} from "./types";
import setJwtToken from "../utils/setJwtToken";
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", user);
        history.push("/login");

        dispatch({
            type : GET_ERRORS,
            payload : {}
        });
    } catch(err) {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        });
    }
}

export const loginUser = (loginRequest, history) => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", loginRequest);

        const {token} = res.data;
        console.log('loginUser success - token=', token);

        localStorage.setItem("jwtToken", token);
        setJwtToken(token);

        const decodedToken = jwt_decode(token);
        console.log('loginUser decoded token=', decodedToken);

        dispatch({
            type : SET_CURRENT_USER_TASK,
            payload : decodedToken
        });

        history.push("/dashboard");

        dispatch({
            type : GET_ERRORS,
            payload : {}
        });
    } catch(err) {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        });
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJwtToken(false);
    dispatch({
        type : SET_CURRENT_USER_TASK,
        payload : {}
    });
}
