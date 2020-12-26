import axios from "axios";
import {GET_BACKLOG, GET_ERRORS} from "./types";

export const getBacklog = (identifier) => async dispatch => {
    const res = await axios.get(`/api/backlog/${identifier}`);
    dispatch({
        type: GET_BACKLOG,
        payload: res.data
    });
}

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
    } catch(err) {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        });
    }
}