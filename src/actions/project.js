import { db } from '../database/config/db';
import { DB_USER_PROJECTS_REF, SET_CURRENT_PROJECT, CLEAR_CURRENT_PROJECT, ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT } from '../constants';
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_PROJECTS_ERROR, SET_PROJECTS_SUCCESS, SET_PROJECTS_PENDING } from '../constants/response/types';
import { NO_PROJECTS } from '../constants/response/messages';

export const getUserProjects = user_id => {
    const projects = []

    DB_USER_PROJECTS_REF(user_id).on('value', proj_snapshot => {
        proj_snapshot.forEach(proj_snap => {
            const proj = {
                title: proj_snap.val().details.title,
                active: proj_snap.val().details.active,
                date_created: proj_snap.val().details.date_created,
                description: proj_snap.val().details.description,
                id: proj_snap.val().details.id,
                user_id: user_id
            }

            projects.push(proj)
        })
    })

    if (projects.length == 0) {
        return {
            type: SET_PROJECTS_ERROR,
            message: NO_PROJECTS
        }
    } else {
        return {
            type: SET_PROJECTS_SUCCESS,
            projects: projects
        }
    }
}

export const setUserProjectsPending = () => {

    return {
        type: SET_PROJECTS_PENDING,
    }
}

export const clearCurrentProject = () => {
    return {
        type: CLEAR_CURRENT_PROJECT,
    }
}

export const setCurrentProject = project => {
    return {
        type: SET_CURRENT_PROJECT,
        payload: project
    }
}

export const addProject = (user_id, project) => {
    let project_obj = {
        ...project,
        description: project.description || '',
        active: project.active || false,
        date_created: DATE_TODAY,
        id: ''
    }

    const project_add = db.ref(`/Users/${user_id}/Projects/`).push({
        details: { ...project_obj }
    })

    const key = project_add.key
    project_obj = { ...project_obj, id: key }
    db.ref(`/Users/${user_id}/Projects/${key}`).update({
        details: { ...project_obj }
    })

    return {
        type: ADD_PROJECT,
        project: project_obj
    }
}

export const updateProject = (user_id, project_id, project) => {

    db.ref(`/Users/${user_id}/Projects/${project_id}/details`).update({
        ...project
    });

    return {
        type: UPDATE_PROJECT,
        payload: project
    }


}

export const removeProject = (user_id, project) => {
    db.ref(`/Users/${user_id}/Projects`).child(project.id).remove()

    return {
        type: REMOVE_PROJECT,
        payload: project
    }
}

