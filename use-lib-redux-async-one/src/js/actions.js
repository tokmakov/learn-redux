import { FETCH_USERS_STARTED, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './types.js';

export const fetchUsersStarted = () => {
    return {
        type: FETCH_USERS_STARTED,
    };
};

export const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
};

export const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    };
};
