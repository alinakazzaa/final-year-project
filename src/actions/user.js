import { USER_LOGIN, USER_LOGOUT } from '../constants';

export const setLoggedInUser = user => {
    return {
        type: USER_LOGIN,
        payload: { ...user }
    }
}

export const logOutUser = () => {
    return {
        type: USER_LOGOUT,
        payload: {}
    }
}