import { db } from '../config/db';

export const addProject = (user_id, project) => {
    db.ref(`/Users/${user_id}/Projects`).push({
        title: project.title,
        description: project.description,
        client: project.client,
        date_created: project.date_created,
        active: project.active
    });
}

export const updateProject = (user_id, project_id, project) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}`).update({
        title: project.title,
        client: project.client,
        date_created: project.date_created,
        description: project.description,
        active: project.active
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