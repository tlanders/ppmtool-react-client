import axios from "axios";
import {DELETE_PROJECT_TASK, GET_BACKLOG, GET_ERRORS} from "./types";

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

export const updateProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try {
        await axios.put(`/api/backlog/${backlogId}/${projectTask.projectSequence}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch(err) {
        dispatch({
            type : GET_ERRORS,
            payload : err.response.data
        });
    }
}

export const deleteProjectTask = (backlogId, projectTaskSequence) => async dispatch => {
    if(window.confirm("Are you sure you want to delete the project task?")) {
        await axios.delete(`/api/backlog/${backlogId}/${projectTaskSequence}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: projectTaskSequence
        });
    }
}