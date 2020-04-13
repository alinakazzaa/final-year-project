import { db } from '../database/config/db';
import { SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT, ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT } from '../constants';
import { SET_PROJECTS_ERROR, SET_PROJECTS_SUCCESS, SET_PROJECTS_PENDING } from '../constants/response/types';
import { MSG_NO_PROJECTS } from '../constants/response/messages';
import { DB_USER_PROJECTS_REF } from '../constants/database';

export const getUserProjects = user_id => {
    return dispatch => {
        dispatch(setUserProjectsPending())

        const projects = []

        DB_USER_PROJECTS_REF(user_id).once('value', projectSnapshot => {
            projectSnapshot.forEach(project => {
                const proj = {
                    ...project.val().details,
                    user_id: user_id
                }
                projects.push(proj)
            })

            if (projects.length == 0) {
                dispatch(setUserProjectsError())

            } else {
                dispatch(setUserProjectsSuccess(projects))
            }
        })
    }
}

export const setUserProjectsPending = () => {

    return {
        type: SET_PROJECTS_PENDING
    }
}

export const setUserProjectsSuccess = projects => {
    return {
        type: SET_PROJECTS_SUCCESS,
        projects: projects
    }
}

export const setUserProjectsError = () => {
    return {
        type: SET_PROJECTS_ERROR,
        message: MSG_NO_PROJECTS
    }
}

export const clearCurrentProject = () => {
    return {
        type: CLEAR_CURRENT_PROJECT
    }
}

export const setCurrentProject = project => {
    return {
        type: SET_CURRENT_PROJECT,
        project
    }
}

export const addProject = (user_id, project_val) => {

    let project = {
        ...project_val,
        user_id,
        description: project_val.description || '',
        active: project_val.active || false,
        id: ''
    }

    return dispatch => {
        db.ref(`/Users/${user_id}/Projects/`).push({
            details: { ...project }
        }).then(data => {
            project.id = data.key

            db.ref(`/Users/${user_id}/Projects/${data.key}/details`).update({
                id: data.key
            })

            dispatch({
                type: ADD_PROJECT,
                project
            })
        })
    }
}

export const updateProject = project => {

    return dispatch => {
        db.ref(`/Users/${project.user_id}/Projects/${project.id}/details`).update({
            ...project
        });

        dispatch({
            type: UPDATE_PROJECT,
            project
        })
    }
}

export const removeProject = project => {
    return dispatch => {
        db.ref(`/Users/${project.user_id}/Projects`).child(project.id).remove()

        dispatch({
            type: REMOVE_PROJECT,
            project
        })
    }
}

