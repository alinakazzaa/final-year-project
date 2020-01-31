import { db } from '../config/db';

export const addFetchJob = (user_id, project_id, fetchJob) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        title: fetchJob.title,
        date_created: fetchJob.date_created,
        hashtag: fetchJob.hashtag,
        location: fetchJob.location,
        criteria: String(fetchJob.criteria)
    });
}

export const removeFetchJob = (user_id, project_id, fetchJob_id) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).child(fetchJob_id).remove()
}