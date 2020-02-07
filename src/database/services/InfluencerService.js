import { db } from '../config/db';

export const addInfluencerByIdHashtagAll = (id, hashtag) => {
    db.ref(`/Influencers/allposts/hashtags/${hashtag}`).child(id).set({
        username: '',
        profileURL: '',
        followers: 0,
        media_count: 0
    })
}

export const addInfluencerByIdHashtagTop = (id, hashtag) => {
    db.ref(`/Influencers/topposts/hashtags/${hashtag}`).child(id).set({
        username: '',
        profileURL: '',
        followers: 0,
        media_count: 0
    })
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