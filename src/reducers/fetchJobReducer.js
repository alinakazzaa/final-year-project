import {
    SET_CURRENT_FETCH_JOB, ADD_FETCH_JOB, REMOVE_FETCH_JOB, UPDATE_FETCH_JOB
} from '../constants';
import { SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_ERROR } from '../constants/response/types';

const initialState = {
    fetch_jobs: [],
    current_fetch_job: {},
    pending: null,
    error: null
};

const fetchJobReducer = (state = initialState, action) => {
    let job
    let fetch_jobs = [...state.fetch_jobs]

    switch (action.type) {
        // update FJ list on add & remove
        case ADD_FETCH_JOB:

            fetch_jobs.splice(state.fetch_jobs.length, 1, action.fetch_job)

            return {
                ...state,
                fetch_jobs: fetch_jobs
            }


        case REMOVE_FETCH_JOB:

            return {
                ...state,
                fetch_jobs: [...state.fetch_jobs.filter(fj => fj.details.id !== action.fetch_job.details.id)]
            };


        // get fetch jobs for current project
        case SET_FETCH_JOBS_PENDING:

            return {
                ...state,
                pending: true
            };

        case SET_FETCH_JOBS_SUCCESS:

            return {
                ...state,
                fetch_jobs: [...action.fetch_jobs],
                pending: false
            };

        case SET_FETCH_JOBS_ERROR:

            return {
                ...state,
                pending: false,
                error: action.error
            };

        // set current fetch job
        case SET_CURRENT_FETCH_JOB:
            return {
                ...state,
                current_fetch_job: action.fetch_job
            };

        case UPDATE_FETCH_JOB:
            fetch_jobs.splice(getIndex(fetch_jobs, action.fetch_job), 1, action.fetch_job)

            return {
                ...state,
                fetch_jobs: fetch_jobs
            };



        default:
            return state;
    }
}

export const getPending = state => state.fetch_job.pending;
export const getError = state => state.fetch_job.error;
export const getFetchJobs = state => state.fetch_job.fetch_jobs;
export const getCurrentFetchJob = state => state.fetch_job.current_fetch_job;
export const getIndex = (fetch_jobs, job) => fetch_jobs.map(fj => { return fj }).indexOf(job.details.id);

export default fetchJobReducer;