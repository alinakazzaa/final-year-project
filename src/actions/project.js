import { db } from '../database/config/db';
import { DB_USER_PROJECTS_REF, SET_PROJECTS, SET_CURRENT_PROJECT } from '../constants';

export const getUserProjects = user_id => {
    let projects = []
    DB_USER_PROJECTS_REF(user_id).on('value', proj_snapshot => {
        proj_snapshot.forEach(proj_snap => {
            proj_snap.forEach(proj => {
                projects.push(proj.val())
            })
        })
    })
    return projects
}

export const setUserProjects = projects => {
    return {
        type: SET_PROJECTS,
        payload: [...projects]
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
        details: {
            ...project,
            description: project.description || '',
            active: project.active || false
        },
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

