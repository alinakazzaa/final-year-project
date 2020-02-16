import { SET_CURRENT_FETCH_JOB, SET_FETCH_JOBS, SET_RUNNING_FETCH_JOB, SET_CURRENT_PAGE_MEDIA_IDS, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_BY_HASHTAG_ERROR } from '../constants';

const initialState = {
    fetch_jobs: {
        completed: [],
        running: [],
        pending: []
    },
    current_fetch_job: {},
    running_fetch_job: {

    },
    pending: true,
    error: null
};

const fetchJobReducer = (state = initialState, action) => {
    const updated_state = { ...state }
    switch (action.type) {
        case SET_FETCH_JOBS:
            updated_state.fetch_jobs.completed = action.completed
            updated_state.fetch_jobs.running = action.running
            updated_state.fetch_jobs.pending = action.pending
            return {
                ...updated_state
            };
        case SET_CURRENT_FETCH_JOB:
            updated_state.current_fetch_job = { ...action.payload }
            return {
                ...updated_state
            };
        case SET_RUNNING_FETCH_JOB:
            updated_state.running_fetch_job = { ...updated_state.running_fetch_job, ...action.payload }
            return {
                ...updated_state
            };
        case GET_MEDIA_BY_HASHTAG_PENDING:
            updated_state.running_fetch_job.pending = true
            return {
                ...updated_state
            }
        case GET_MEDIA_BY_HASHTAG_ERROR:
            updated_state.running_fetch_job.pending = false
            return {
                ...updated_state,
                error: action.error
            }
        default:
            return state;
    }
}

export const getPending = state => state.fetch_job.running_fetch_job.pending;
export const getError = state => state.fetch_job.running_fetch_job.error;
export const getRunningFetchJob = state => state.fetch_job.running_fetch_job

export default fetchJobReducer;