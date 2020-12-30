import axios from "axios";
import {SET_CURRENT_USER_TASK, GET_ERRORS} from "./types";

export const registerUser = (user, history) => async dispatch => {
    try {
        await axios.post(`/api/users/register`, user);
        history.push(`/login`);

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
