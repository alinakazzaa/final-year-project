import { db } from '../database/config/db';
import { GET_ALL_FETCH_JOBS, DB_PROJECT_FETCH_JOBS_REF, SET_FETCH_JOBS, SET_CURRENT_FETCH_JOB } from '../constants';

export const getAllFetchJobs = (user_id, project_id) => {

    let fetchJobs = []

    DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).on('value', fj_snapshot => {
        fj_snapshot.forEach(fj_snap => {
            fetchJobs.push(fj_snap.val())
        })
    })
    return fetchJobs
}

export const setFetchJobs = fetch_jobs => {
    return {
        type: SET_FETCH_JOBS,
        payload: fetch_jobs
    }
}

export const setCurrentFetchJob = fetch_job => {
    return {
        type: SET_CURRENT_FETCH_JOB,
        payload: fetch_job
    }
}

export const addFetchJob = (user_id, project_id, fetch_job) => {
    const fj_add = db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        title: fetch_job.value.title,
        date_created: fetch_job.value.date_created,
        hashtag: fetch_job.value.hashtag || '',
        location: fetch_job.value.location || '',
        criteria: String(fetch_job.criteria),
        status: 'pending'
    });

    const key = fj_add.key
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${key}`).update({
        id: key
    })
}

export const updateFetchJob = (user_id, project_id, fetch_job) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${fetch_job.id}`).update({
        status: fetch_job.status
    });
}

export const removeFetchJob = (user_id, project_id, fetchJob_id) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).child(fetchJob_id).remove()
}


