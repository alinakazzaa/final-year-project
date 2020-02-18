import { SET_CURRENT_FETCH_JOB, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_ERROR, CLEAR_CURRENT_FETCH_JOB, ADD_FETCH_JOB, UPDATE_FETCH_JOB_STATUS, REMOVE_FETCH_JOB, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_USER_BY_USERNAME_ERROR, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_PENDING, GET_USER_BY_ID_ERROR, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_SUCCESS } from '../constants';

const initialState = {
    fetch_jobs: {
        completed: [],
        running: [],
        pending: []
    },
    current_fetch_job: {},
    pending: null,
    error: null
};

const fetchJobReducer = (state = initialState, action) => {
    const updated_state = { ...state }
    let pending
    let completed
    let running
    let completed_fj

    switch (action.type) {
        case SET_FETCH_JOBS_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            };
        case SET_FETCH_JOBS_SUCCESS:
            pending = [...action.completed]
            completed = [...action.pending]
            running = [...action.running]
            updated_state.fetch_jobs = { pending, completed, running }
            updated_state.pending = false
            updated_state.error = null
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
        case GET_MEDIA_BY_HASHTAG_SUCCESS:
            updated_state.pending = false
            return {
                ...updated_state,
            }
        case GET_MEDIA_BY_HASHTAG_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            }
        case GET_MEDIA_BY_HASHTAG_ERROR:
            updated_state.pending = false
            updated_state.error = action.error
            return {
                ...updated_state
            }
        case GET_USER_BY_ID_SUCCESS:
            updated_state.pending = false
            return {
                ...updated_state,
            }
        case GET_USER_BY_ID_ERROR:
            updated_state.pending = false
            updated_state.error = action.error
            running = [...updated_state.fetch_jobs.running]
            completed = [...updated_state.fetch_jobs.completed]
            completed_fj = { ...running.find(job => job.hashtag == action.hashtag) };
            completed.splice(running.length, 1, completed_fj)
            return {
                ...updated_state
            }
        case GET_USER_BY_ID_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            }
        case GET_USER_BY_USERNAME_SUCCESS:
            updated_state.pending = false
            running = [...updated_state.fetch_jobs.running]
            completed = [...updated_state.fetch_jobs.completed]
            completed_fj = { ...running.find(job => job.hashtag == action.payload) };
            completed.splice(running.length, 1, completed_fj)

            updated_state.fetch_jobs.completed = completed
            updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== completed_fj.id)]
            return {
                ...updated_state,
            }
        case GET_USER_BY_USERNAME_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            }
        case GET_USER_BY_USERNAME_ERROR:
            updated_state.pending = false
            updated_state.error = action.error
            running = [...updated_state.fetch_jobs.running]
            completed = [...updated_state.fetch_jobs.completed]
            completed_fj = { ...running.find(job => job.hashtag == action.hashtag) };
            completed.splice(running.length, 1, completed_fj)

            updated_state.fetch_jobs.completed = completed
            updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== completed_fj.id)]
            return {
                ...updated_state
            }

        case ADD_FETCH_JOB:
            if (action.payload.status === 'pending') {
                pending = [...updated_state.fetch_jobs.pending]
                pending.splice(pending.length, 1, action.payload);
                updated_state.fetch_jobs = { ...updated_state.fetch_jobs, pending: pending }
            } else if (action.payload.status === 'completed') {
                completed = [...state.fetch_jobs.completed]
                completed.splice(completed.length, 1, action.payload);
                updated_state.fetch_jobs = { ...updated_state.fetch_jobs, completed: completed }
            } else {
                running = [...state.fetch_jobs.running]
                running.splice(running.length, 1, action.payload);
                updated_state.fetch_jobs = { ...updated_state.fetch_jobs, running: running }
            }
            return {
                ...updated_state
            };
        case UPDATE_FETCH_JOB_STATUS:
            pending = [...updated_state.fetch_jobs.pending]
            running = [...updated_state.fetch_jobs.running]
            completed = [...updated_state.fetch_jobs.completed]
            if (action.payload.status == 'running') {
                running.splice(running.length, 1, action.payload)
                updated_state.fetch_jobs.running = running
                updated_state.fetch_jobs.pending = [...pending.filter(fj => fj.id !== action.payload.id)]
            } else if (action.payload.status == 'completed') {
                completed.splice(completed.length, 1, action.payload);
                updated_state.fetch_jobs.completed = completed
                updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== action.payload.id)]
            }
            return {
                ...updated_state,

            };
        case REMOVE_FETCH_JOB:
            pending = [...updated_state.fetch_jobs.pending]
            running = [...updated_state.fetch_jobs.running]
            completed = [...updated_state.fetch_jobs.completed]
            if (action.payload.status == 'running') {
                running = [...updated_state.fetch_jobs.running]
                updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== action.payload.id)]
            } else if (action.payload.status == 'completed') {
                completed = [...updated_state.fetch_jobs.completed]
                updated_state.fetch_jobs.completed = [...completed.filter(fj => fj.id !== action.payload.id)]
            } else if (action.payload.status == 'pending') {
                pending = [...updated_state.fetch_jobs.pending]
                updated_state.fetch_jobs.pending = [...pending.filter(fj => fj.id !== action.payload.id)]
            }
            return {
                ...updated_state
            };

        case CLEAR_CURRENT_FETCH_JOB:
            updated_state.current_fetch_job = {}
            return {
                ...updated_state
            };

        default:
            return state;
    }
}

export const getPending = state => state.fetch_job.pending;
export const getError = state => state.fetch_job.error;
export const getRunningFetchJob = state => state.fetch_job.running_fetch_job

export default fetchJobReducer;