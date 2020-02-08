import { SET_FETCH_JOBS } from '../constants';

export const setFetchJobs = fetch_jobs => {
    return {
        type: SET_FETCH_JOBS,
        payload: fetch_jobs
    }
}


