import { db } from '../database/config/db';
import { DB_USER_PROJECTS_REF, SET_PROJECTS_PENDING, SET_CURRENT_PROJECT, UPDATE_STATE_PROJECTS, SET_PROJECTS_SUCCESS, SET_PROJECTS_ERROR } from '../constants';
import { DATE_TODAY } from '../constants/TodayDate'

export const getUserProjects = user_id => {
    const active = []
    const archived = []

    DB_USER_PROJECTS_REF(user_id).on('value', proj_snapshot => {
        proj_snapshot.forEach(proj_snap => {
            const proj = {
                title: proj_snap.val().title,
                active: proj_snap.val().active,
                date_created: proj_snap.val().date_created,
                description: proj_snap.val().description,
                id: proj_snap.val().id
            }
            if (proj_snap.val().active == true) {
                active.push(proj)
            } else {
                archived.push(proj)
            }
        })
    })

    if (active.length == 0 && archived.length == 0) {
        let error = { type: 'no projects' }
        return {
            type: SET_PROJECTS_ERROR,
            error: error
        }
    } else {
        return {
            type: SET_PROJECTS_SUCCESS,
            active: active,
            archived: archived
        }
    }
}


export const setUserProjectsSuccess = user_id => {
    const active = []
    const archived = []

    DB_USER_PROJECTS_REF(user_id).on('value', proj_snapshot => {
        proj_snapshot.forEach(proj_snap => {
            const proj = {
                title: proj_snap.val().title,
                active: proj_snap.val().active,
                date_created: proj_snap.val().date_created,
                description: proj_snap.val().description,
                id: proj_snap.val().id
            }
            if (proj_snap.val().active == true) {
                active.push(proj)
            } else {
                archived.push(proj)
            }

        })
    })

    return {
        type: SET_PROJECTS_SUCCESS,
        active: active,
        archived: archived,
    }
}

export const setUserProjectsPending = () => {

    return {
        type: SET_PROJECTS_PENDING,
    }
}

export const setUserProjectsError = error => {

    return {
        type: SET_PROJECTS_ERROR,
        error: error
    }
}

export const setCurrentProject = project => {
    return {
        type: SET_CURRENT_PROJECT,
        payload: project
    }
}

export const addProject = (user_id, project) => {
    const project_add = db.ref(`/Users/${user_id}/Projects/`).push({
        ...project,
        description: project.description || '',
        active: project.active || false,
        date_created: DATE_TODAY
    })

    const key = project_add.key
    db.ref(`/Users/${user_id}/Projects/${key}/details`).update({
        id: key
    })
}

export const updateProject = (user_id, project_id, project) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}`).update({
        details: { ...project }
    });


}

export const removeProject = (user_id, project) => {
    db.ref(`/Users/${user_id}/Projects`).child(project.id).remove()
}

