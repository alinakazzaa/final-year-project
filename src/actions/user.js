import { USER_LOGIN, USER_LOGOUT, SET_USER_PROJECTS } from '../constants';

export const setLoggedInUser = user => {
    return {
        type: USER_LOGIN,
        payload: { ...user }
    }
}

export const logOutUser = () => {
    return {
        type: USER_LOGOUT,
    }
}



export const setUserProjects = projects => {
    return {
        type: SET_USER_PROJECTS,
        payload: projects
    }
}