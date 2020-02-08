import { db } from '../config/db';

export const addFetchJob = (user_id, project_id, fetch_job) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        title: fetch_job.value.title,
        date_created: fetch_job.value.date_created,
        hashtag: fetch_job.value.hashtag || '',
        location: fetch_job.value.location || '',
        criteria: String(fetch_job.criteria),
        status: 'pending'
    });
}

export const removeFetchJob = (user_id, project_id, fetchJob_id) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).child(fetchJob_id).remove()
}