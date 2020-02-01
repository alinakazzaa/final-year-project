import { db } from '../config/db';

export const addProject = (user_id, project) => {
    db.ref(`/Users/${user_id}/Projects`).push({
        title: project.title,
        description: project.description,
        date_created: project.date_created,
        active: project.active
    });
}

export const updateProject = (user_id, project_id, project) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}`).update({
        title: project.title,
        description: project.description,
        active: project.active
    });
}

export const removeProject = (user_id, project_id) => {
    db.ref(`/Users/${user_id}/Projects`).child(project_id).remove()
}