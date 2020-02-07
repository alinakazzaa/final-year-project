import { USER_LOGIN, USER_LOGOUT } from '../constants';

export function setLoggedInUser(user) {
    console.log(user)
    return {
        type: USER_LOGIN,
        payload: user
    }
}

export function logOutUser() {
    return {
        type: USER_LOGOUT,
        payload: {}
    }
}