import { SET_USER_PROJECTS, SET_CURRENT_PROJECT } from '../constants';

export const setUserProjects = projects => {
    return {
        type: SET_USER_PROJECTS,
        payload: projects
    }
}

export const setCurrentProject = project => {
    return {
        type: SET_CURRENT_PROJECT,
        payload: project
    }
}

