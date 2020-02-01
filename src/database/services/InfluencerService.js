import { db } from '../config/db';

export const addInfluencerId = id => {
    db.ref(`/Influencers/${id}`).push({
        id: id,
    });
}

export const addInfluData = data => {
    db.ref(`/Influencers/Raw/`).push({
        data: data
    });
}

// export const updateProject = (user_id, project_id, project) => {
//     db.ref(`/Users/${user_id}/Projects/${project_id}`).update({
//         title: project.title,
//         description: project.description,
//         active: project.active
//     });
// }

// export const removeProject = (user_id, project_id) => {
//     db.ref(`/Users/${user_id}/Projects`).child(project_id).remove()
// }