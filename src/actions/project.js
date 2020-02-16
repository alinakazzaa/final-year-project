import { db } from '../database/config/db';
import { DB_USER_PROJECTS_REF, SET_PROJECTS, SET_CURRENT_PROJECT, UPDATE_STATE_PROJECTS } from '../constants';

export const setUserProjects = user_id => {
    const active = []
    const archived = []

    DB_USER_PROJECTS_REF(user_id).on('value', proj_snapshot => {
        proj_snapshot.forEach(proj_snap => {
            const proj = {
                title: proj_snap.val().title,
                active: proj_snap.val().active,
                date_created: proj_snap.val().date_created,
                description: proj_snap.val().dercription
            }
            if (proj_snap.val().active == true) {
                active.push(proj)
            } else {
                archived.push(proj)
            }

        })
    })

    return {
        type: SET_PROJECTS,
        active: active,
        archived: archived
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
        active: project.active || false
    })

    const key = project_add.key
    db.ref(`/Users/${user_id}/Projects/${key}`).update({
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

