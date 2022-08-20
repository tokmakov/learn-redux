import { FETCH_USERS_STARTED, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './types.js';

const fetchUsersStarted = () => {
    return {
        type: FETCH_USERS_STARTED,
    };
};

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users,
    };
};

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error,
    };
};

export const fetchUsersProcess = () => {
    return (dispatch, getState) => {
        dispatch(fetchUsersStarted());
        // setTimeout только для наглядности, чтобы увеличить задержку
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(jsonData => {
                    const users = jsonData.map(user => {
                        return { id: user.id, name: user.name, email: user.email };
                    });
                    dispatch(fetchUsersSuccess(users));
                })
                .catch(error => {
                    dispatch(fetchUsersFailure(error.message));
                });
        }, 1000);
    };
};
