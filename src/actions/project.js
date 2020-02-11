import { db } from '../database/config/db';
import { DB_USER_REF, SET_PROJECTS, SET_CURRENT_PROJECT } from '../constants';

export const setUserProjects = projects => {
    return {
        type: SET_PROJECTS,
        payload: projects
    }
}

export const setCurrentProject = project => {
    return {
        type: SET_CURRENT_PROJECT,
        payload: project
    }
}

export const addProject = (user_id, project) => {
    const project_add = db.ref(`/Users/${user_id}/Projects`).push({
        details: {
            id: '',
            title: project.title,
            description: project.description || '',
            date_created: project.date_created,
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
        details: project.details
    });


}

export const removeProject = (user_id, project) => {
    db.ref(`/Users/${user_id}/Projects`).on('value', snapshot => {
        snapshot.forEach(projectSnapshot => {
            let proj = projectSnapshot.val();
            if (proj.title == project.title) {
                db.ref(`/Users/${user_id}/Projects`).child(projectSnapshot.key).remove()
            }
        }
        )
    })
}

