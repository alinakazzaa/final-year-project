import { db } from '../database/config/db';
import { SET_CURRENT_FETCH_JOB, ADD_FETCH_JOB, REMOVE_FETCH_JOB, PENDING, UPDATE_FETCH_JOB, CLEAR_CURRENT_FETCH_JOB, CLEAR_FETCH_JOB_STATE } from '../constants';
import { SET_FETCH_JOBS_ERROR, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING } from '../constants/response/types';
import { DB_PROJECT_FETCH_JOBS_REF } from '../constants/database';
import { MSG_NO_FETCH_JOBS } from '../constants/response/messages';


export const getProjectFetchJobs = (user_id, project_id) => {
    const fetch_jobs = []

    DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).on('value', fj_snapshot => {

        fj_snapshot.forEach(fj_snap => {
            const fj = {
                ...fj_snap.val()
            }
            fetch_jobs.push(fj)
        })

    })

    if (fetch_jobs.length == 0) {

        return {
            type: SET_FETCH_JOBS_ERROR,
            message: MSG_NO_FETCH_JOBS
        }
    } else {
        return {
            type: SET_FETCH_JOBS_SUCCESS,
            fetch_jobs: fetch_jobs
        }
    }
}

export const setProjectFetchJobsPending = () => {

    return {
        type: SET_FETCH_JOBS_PENDING,
    }
}

export const setCurrentFetchJob = fetch_job => {
    return {
        type: SET_CURRENT_FETCH_JOB,
        fetch_job: fetch_job
    }
}

export const clearCurrentFetchJob = () => {
    return {
        type: CLEAR_CURRENT_FETCH_JOB,
    }
}

export const clearFetchJobState = () => {
    return {
        type: CLEAR_FETCH_JOB_STATE,
    }
}

//DB
export const addFetchJob = (user_id, project_id, fetch_job) => {
    let fj_obj = {
        details: {
            ...fetch_job,
            status: PENDING,
            user_id: user_id,
            project_id: project_id,
            id: ''
        }
    }

    const fj_add = db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        ...fj_obj
    });


    const key = fj_add.key
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${key}/details`).update({
        id: key
    })


    let updated = { ...fj_obj, id: key }

    return {
        type: ADD_FETCH_JOB,
        fetch_job: updated
    }
}

export const updateStateFetchJob = fetch_job => {

    return {
        type: UPDATE_FETCH_JOB,
        fetch_job: fetch_job
    }
}

export const updateFetchJob = fetch_job => {
    db.ref(`/Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/FetchJobs/${fetch_job.details.id}`).update({
        ...fetch_job
    });
}

export const removeFetchJob = fetch_job => {
    db.ref(`/Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/FetchJobs`).child(fetch_job.details.id).remove()

    return {
        type: REMOVE_FETCH_JOB,
        fetch_job: fetch_job
    }
}

export const filterFetchJobs = (fetch_jobs, status) => {
    return [...fetch_jobs.filter(fj => fj.details.status == status)]
}