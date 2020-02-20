import {
    SET_CURRENT_FETCH_JOB,
    GET_MEDIA_BY_HASHTAG_PENDING,
    GET_MEDIA_BY_HASHTAG_ERROR,
    SET_FETCH_JOBS_SUCCESS,
    SET_FETCH_JOBS_PENDING,
    SET_FETCH_JOBS_ERROR,
    CLEAR_CURRENT_FETCH_JOB,
    ADD_FETCH_JOB,
    UPDATE_FETCH_JOB_STATUS,
    REMOVE_FETCH_JOB,
    GET_MEDIA_BY_HASHTAG_SUCCESS,
    GET_USER_BY_USERNAME_ERROR,
    GET_USER_BY_USERNAME_SUCCESS,
    GET_USER_BY_USERNAME_PENDING,
    GET_USER_BY_ID_ERROR,
    GET_USER_BY_ID_PENDING,
    SET_RUNNING_FETCH_JOB,
    CLEAR_RUNNING_FETCH_JOB
} from '../constants';

const initialState = {
    fetch_jobs: [],
    current_fetch_job: {},
    running_fetch_job: {},
    pending: null,
    error: null
};

const fetchJobReducer = (state = initialState, action) => {
    let updated_state = { ...state }
    let fj
    let index = 0
    let fjs = []

    switch (action.type) {

        // update FJ list on add & remove
        case ADD_FETCH_JOB:
            fjs = [...updated_state.fetch_jobs]
            fj = { ...action.fetch_job.details, status: action.fetch_job.status }
            fjs.splice(fjs.length, 1, fj)
            updated_state.fetch_jobs = fjs

            return {
                ...updated_state
            }


        case REMOVE_FETCH_JOB:

            return {
                ...updated_state,
                fetch_jobs: [...updated_state.fetch_jobs.filter(fj => fj.id !== action.payload.id)]
            };


        // get fetch jobs for current project
        case SET_FETCH_JOBS_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            };

        case SET_FETCH_JOBS_SUCCESS:
            updated_state.fetch_jobs = [...action.fetch_jobs]
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

        // set current fetch job
        case SET_CURRENT_FETCH_JOB:
            updated_state.current_fetch_job = { ...action.payload }

            return {
                ...updated_state
            };

        // set running fetch job
        case SET_RUNNING_FETCH_JOB:
            fjs = [...updated_state.fetch_jobs]
            fj = { ...action.fetch_job, status: 'in progress' }
            index = fjs.indexOf(f => f.id == fj.id);
            fjs.splice(index, 1, fj)
            return {
                ...updated_state,
                running_fetch_job: fj,
                fetch_jobs: [...fjs]
            };

        case CLEAR_RUNNING_FETCH_JOB:
            updated_state.running_fetch_job = {}

            return {
                ...updated_state
            };


        // get hashtag media
        case GET_MEDIA_BY_HASHTAG_PENDING:
            updated_state.pending = true

            return {
                ...updated_state
            }

        case GET_MEDIA_BY_HASHTAG_SUCCESS:
            updated_state.pending = false
            console.log(action.payload)
            // console.log(action.payload)
            // fj = updated_state.fetch_jobs.find(f => f.id == action.fetch_job.id);
            // fj.status = 'completed'
            // index = updated_state.fetch_jobs.indexOf(f => f.id == action.fetch_job.id);
            // updated_state.fetch_jobs.splice(index, 1, fj)
            return {
                ...updated_state,
            }


        case GET_MEDIA_BY_HASHTAG_ERROR:
            updated_state.pending = false
            updated_state.error = action.error

            //update fetch job status
            // fj = getRunningFetchJob(state)
            // fj.status = 'completed'
            // index = updated_state.fetch_jobs.indexOf(f => f.id == fj.id);
            // updated_state.fetch_jobs.splice(index, 1, fj)
            // clear running fetch job state
            updated_state.running_fetch_job = {}

            return {
                ...updated_state
            }

        // case GET_USER_BY_ID_SUCCESS:
        //     updated_state.pending = false
        //     return {
        //         ...updated_state,
        //     } <- fetch not finished at this point, so leave it pending
        case GET_USER_BY_ID_ERROR:
            // updated_state.pending = false
            // updated_state.error = action.error
            // running = [...updated_state.fetch_jobs.running]
            // completed = [...updated_state.fetch_jobs.completed]
            // completed_fj = { ...running.find(job => job.hashtag == action.hashtag) };
            // completed.splice(running.length, 1, completed_fj)

            return {
                ...updated_state
            }

        case GET_USER_BY_ID_PENDING:
            updated_state.pending = true

            return {
                ...updated_state
            }

        case GET_USER_BY_USERNAME_SUCCESS:
            // updated_state.pending = false
            // running = [...updated_state.fetch_jobs.running]
            // completed = [...updated_state.fetch_jobs.completed]
            // completed_fj = { ...running.find(job => job.hashtag == action.payload) };
            // completed.splice(running.length, 1, completed_fj)

            // updated_state.fetch_jobs.completed = completed
            // updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== completed_fj.id)]

            return {
                ...updated_state,
            }

        case GET_USER_BY_USERNAME_PENDING:
            updated_state.pending = true

            return {
                ...updated_state
            }

        case GET_USER_BY_USERNAME_ERROR:
            // updated_state.pending = false
            // updated_state.error = action.error
            // running = [...updated_state.fetch_jobs.running]
            // completed = [...updated_state.fetch_jobs.completed]
            // completed_fj = { ...running.find(job => job.hashtag == action.hashtag) };
            fj = { ...updated_state.fetch_jobs.find(job => job.hashtag == action.hashtag) }
            fj.status = 'completed'

            // updated_state.fetch_jobs.completed = completed
            // updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== completed_fj.id)]
            return {
                ...updated_state
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

export const getPending = state => state.fetch_job.pending;
export const getError = state => state.fetch_job.error;
export const getRunningFetchJob = state => state.running_fetch_job

export default fetchJobReducer;