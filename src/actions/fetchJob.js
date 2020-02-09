import { SET_FETCH_JOBS, SET_CURRENT_FETCH_JOB } from '../constants';

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


