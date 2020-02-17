import { SET_CURRENT_FETCH_JOB, SET_RUNNING_FETCH_JOB, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_ERROR, CLEAR_CURRENT_FETCH_JOB } from '../constants';

const initialState = {
    fetch_jobs: {
        completed: [],
        running: [],
        pending: []
    },
    current_fetch_job: {},
    running_fetch_job: {

    },
    pending: null,
    error: null
};

const fetchJobReducer = (state = initialState, action) => {
    const updated_state = { ...state }
    switch (action.type) {
        case SET_FETCH_JOBS_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            };
        case SET_FETCH_JOBS_SUCCESS:
            updated_state.fetch_jobs.completed = action.completed
            updated_state.fetch_jobs.running = action.running
            updated_state.fetch_jobs.pending = action.pending
            updated_state.pending = false
            return {
                ...updated_state
            };
        case SET_FETCH_JOBS_ERROR:
            updated_state.pending = false
            updated_state.error = action.error
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
        case CLEAR_CURRENT_FETCH_JOB:
            updated_state.current_fetch_job = {}
            return {
                ...updated_state
            };
        default:
            return state;
    }
}

export const getPending = state => state.fetch_job.running_fetch_job.pending;
export const getError = state => state.fetch_job.running_fetch_job.error;
export const getRunningFetchJob = state => state.fetch_job.running_fetch_job

export default fetchJobReducer;