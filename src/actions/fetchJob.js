import { db } from '../database/config/db';
import { SET_CURRENT_FETCH_JOB, ADD_FETCH_JOB, REMOVE_FETCH_JOB, PENDING, UPDATE_FETCH_JOB, CLEAR_CURRENT_FETCH_JOB, CLEAR_FETCH_JOB_STATE, COMPLETED } from '../constants';
import { SET_FETCH_JOBS_ERROR, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, COMPLETED_FETCH } from '../constants/response/types';
import { DB_PROJECT_FETCH_JOBS_REF } from '../constants/database';
import { MSG_NO_FETCH_JOBS } from '../constants/response/messages';
import { removeInfluencer } from './influencer';
import { clearRunningFetchJob } from './fetch';


export const getProjectFetchJobs = (user_id, project_id) => {
    const fetch_jobs = []

    return dispatch => {

        dispatch(setProjectFetchJobsPending())

        DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).once('value', fetchJobSnapshot => {

            fetchJobSnapshot.forEach(job => {
                fetch_jobs.push({ ...job.val() })
            })

            if (fetch_jobs.length == 0) {
                dispatch(setProjectFetchJobsError())
            } else {
                dispatch(setProjectFetchJobsSuccess(fetch_jobs))
            }
        })
    }
}

export const setProjectFetchJobsPending = () => {

    return {
        type: SET_FETCH_JOBS_PENDING
    }
}


export const setProjectFetchJobsSuccess = fetch_jobs => {

    return {
        type: SET_FETCH_JOBS_SUCCESS,
        fetch_jobs
    }
}


export const setProjectFetchJobsError = () => {
    return {
        type: SET_FETCH_JOBS_ERROR,
        message: MSG_NO_FETCH_JOBS
    }
}

export const setCurrentFetchJob = fetch_job => {
    return {
        type: SET_CURRENT_FETCH_JOB,
        fetch_job
    }
}

export const clearCurrentFetchJob = () => {
    return {
        type: CLEAR_CURRENT_FETCH_JOB
    }
}

export const clearFetchJobState = () => {
    return {
        type: CLEAR_FETCH_JOB_STATE
    }
}

//DB
export const addFetchJob = (user_id, project_id, fetchJobVal) => {
    let fetch_job = {
        details: {
            ...fetchJobVal,
            status: PENDING,
            user_id: user_id,
            project_id: project_id,
            id: ''
        }

    }

    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        ...fetch_job
    }).then(data => {
        fetch_job.details.id = data.key

        db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${data.key}/details`).update({
            id: data.key
        })
    })

    return {
        type: ADD_FETCH_JOB,
        fetch_job
    }
}

export const updateStateFetchJob = fetch_job => {
    return {
        type: UPDATE_FETCH_JOB,
        fetch_job
    }
}

export const updateFetchJob = fetch_job => {
    console.log(fetch_job)
    // return dispatch => {
    db.ref(`/Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/FetchJobs/${fetch_job.details.id}`).update({
        ...fetch_job,
        progress: null,
        stage: null,
        end_cursor: null,
        has_next_page: null,
        response: null,
        influencers: { success: fetch_job.influencers.success }
    }).then(() => {
        console.log('saved')
        if (fetch_job.response && fetch_job.response.type == COMPLETED_FETCH)
            console.log("should clear state")
        // dispatch(clearRunningFetchJob())
    })

    // }
}

export const removeFetchJob = fetch_job => {
    return dispatch => {
        db.ref(`/Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/FetchJobs`).child(fetch_job.details.id).remove()

        dispatch({
            type: REMOVE_FETCH_JOB,
            fetch_job
        })

        if (fetch_job.details.status == COMPLETED && fetch_job.influencers.success.length > 0) {
            fetch_job.influencers.success.forEach(id => {
                dispatch(removeInfluencer(id))
            })
        }


    }
}

export const filterFetchJobs = (fetch_jobs, status) => {
    return [...fetch_jobs.filter(fj => fj.details.status == status)]
}