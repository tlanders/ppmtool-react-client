import axios from "axios";
import {GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT, GET_BACKLOG} from "./types";

export const createProject = (project, history) => async dispatch => {
    try {
        await axios.post(
            '/api/project',
            project
        );

        history.push("/dashboard"); // render project again

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

export const getProjects = () => async dispatch => {
    const res = await axios.get('/api/project')
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
};

export const getProject = (identifier, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${identifier}`)
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    } catch(error) {
        history.push("/dashboard");
    }
};

export const deleteProject = (identifier, history) => async dispatch => {
    if(window.confirm("Are you sure you want to delete the project?")) {
        await axios.delete(`/api/project/${identifier}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: identifier
        });
    }
}

export const getBacklog = (identifier) => async dispatch => {
    const res = await axios.get(`/api/backlog/${identifier}`);
    dispatch({
        type: GET_BACKLOG,
        payload: res.data
    });
}