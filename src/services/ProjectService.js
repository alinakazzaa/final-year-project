import { db } from '../config/db';

export const addProject = (project, user_id) => {
    db.ref(`/Users/${user_id}/Projects`).push({
        title: project.title,
        description: project.description,
        date_created: project.date_created,
        active: project.active
    });
}

//