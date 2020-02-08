import { SET_USER_PROJECTS } from '../constants';

export const setUserProjects = projects => {
    return {
        type: SET_USER_PROJECTS,
        payload: projects
    }
}