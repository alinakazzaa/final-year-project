import { db } from '../config/db';
import { DB_USER_REF } from '../../constants/index'

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
    db.ref(`/Users/${user_id}/Projects`).child(key).update({
        id: key
    })
}

export const updateProject = (user_id, project_id, project) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}`).update({
        title: project.title,
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