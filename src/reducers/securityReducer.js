import {SET_CURRENT_USER_TASK} from "../actions/types";

const initialState = {
    user: {},
    validToken: false
};

export default function (state=initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER_TASK:
            return {
                ...state,
                user: action.payload,
                validToken: true
            };
        default:
            return state;
    }
}