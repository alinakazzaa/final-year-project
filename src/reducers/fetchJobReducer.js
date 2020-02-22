import {
    SET_CURRENT_FETCH_JOB,
    GET_MEDIA_BY_HASHTAG_PENDING,
    GET_MEDIA_BY_HASHTAG_ERROR,
    SET_FETCH_JOBS_SUCCESS,
    SET_FETCH_JOBS_PENDING,
    SET_FETCH_JOBS_ERROR,
    CLEAR_CURRENT_FETCH_JOB,
    ADD_FETCH_JOB,
    REMOVE_FETCH_JOB,
    GET_MEDIA_BY_HASHTAG_SUCCESS,
    GET_USER_BY_USERNAME_ERROR,
    GET_USER_BY_USERNAME_SUCCESS,
    GET_USER_BY_USERNAME_PENDING,
    GET_USER_BY_ID_ERROR,
    GET_USER_BY_ID_PENDING,
    SET_RUNNING_FETCH_JOB,
    CLEAR_RUNNING_FETCH_JOB,
    UPDATE_FETCH_JOB_STATUS,
    GET_USER_BY_ID_SUCCESS
} from '../constants';
import { updateFetchJob } from '../actions/fetchJob';

const initialState = {
    fetch_jobs: [],
    current_fetch_job: {},
    running_fetch_job: {
        pending: null,
        response: null,
        influencers: {
            success: [],
            fail: []
        },
        progress: { total: 0, done: 0 },
        stage: 'media_fetch'
    },
    pending: null,
    error: null
};

const fetchJobReducer = (state = initialState, action) => {
    let running
    let job
    let index = 0
    let fetch_jobs
    let success
    let fail

    switch (action.type) {

        // update FJ list on add & remove
        case ADD_FETCH_JOB:
            fetch_jobs = [...state.fetch_jobs]
            fetch_jobs.splice(state.fetch_jobs.length, 1, action.fetch_job)

            return {
                ...state,
                fetch_jobs: fetch_jobs
            }


        case REMOVE_FETCH_JOB:

            return {
                ...state,
                fetch_jobs: [...state.fetch_jobs.filter(fj => fj.id !== action.payload.id)]
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
                current_fetch_job: { ...action.payload }
            };

        // set running fetch job
        case SET_RUNNING_FETCH_JOB:
            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);
            running = { ...state.running_fetch_job, ...action.fetch_job, status: 'in progress' }
            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running
            };

        case CLEAR_RUNNING_FETCH_JOB:

            return {
                ...state,
                running_fetch_job: { ...initialState.running_fetch_job }
            };

        // get hashtag media
        case GET_MEDIA_BY_HASHTAG_PENDING:
            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);
            running = { ...state.running_fetch_job, pending: true }
            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs
            }

        case GET_MEDIA_BY_HASHTAG_SUCCESS:
            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);
            running = {
                ...state.running_fetch_job,
                response: action.response,
                influencers: {
                    ...state.running_fetch_job.influencers,
                    success: action.ids
                }
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs
            }


        case GET_MEDIA_BY_HASHTAG_ERROR:

            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);
            running = { ...state.running_fetch_job, response: action.error, status: 'completed', pending: false }
            fetch_jobs.splice(index, 1, running)

            updateFetchJob(action.user_id, action.project_id, running)

            return {
                ...state,
                running_fetch_job: { ...initialState.running_fetch_job },
                fetch_jobs: fetch_jobs
            }

        case GET_USER_BY_ID_PENDING:

            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);
            running = {
                ...state.running_fetch_job,
                pending: true, stage: 'user_by_id_fetch',
                response: { ...initialState.running_fetch_job.response },
                progress: { ...state.running_fetch_job.progress, total: action.total }
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs
            }

        case GET_USER_BY_ID_SUCCESS:
            fetch_jobs = [...state.fetch_jobs]
            success = [...state.running_fetch_job.influencers.success]
            index = success.map(i => { return i }).indexOf(action.influencer.id);
            success.splice(index, 1, { ...action.influencer })

            running = {
                ...state.running_fetch_job,
                influencers: {
                    ...state.running_fetch_job.influencers,
                    success: success
                },
                response: action.response,
                progress: {
                    ...state.running_fetch_job.progress,
                    done: state.running_fetch_job.progress.done + 1
                }
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs
            }

        case GET_USER_BY_ID_ERROR:
            // add to fail
            fetch_jobs = [...state.fetch_jobs]
            fail = [...state.running_fetch_job.influencers.fail]
            fail.splice(fail.length, 1, action.id)

            running = {
                ...state.running_fetch_job,
                response: action.error,
                influencers: {
                    // remove from success
                    success: [...state.running_fetch_job.influencers.success.filter(id => id != action.id)],
                    fail: fail
                },
                progress: {
                    ...state.running_fetch_job.progress,
                    done: state.running_fetch_job.progress.done + 1
                },
                status: 'completed'
            }

            if (running.progress.total == running.progress.done && running.influencers.success.length == 0) {
                index = fetch_jobs.map(i => { return i }).indexOf(action.fetch_job.id);
                fetch_jobs.splice(index, 1, running)
                updateFetchJob(action.user_id, action.project_id, running)
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: { ...initialState.running_fetch_job },
                fetch_jobs: fetch_jobs
            }

        // case GET_USER_BY_USERNAME_SUCCESS:
        //     // updated_state.pending = false
        //     // running = [...updated_state.fetch_jobs.running]
        //     // completed = [...updated_state.fetch_jobs.completed]
        //     // completed_fj = { ...running.find(job => job.hashtag == action.payload) };
        //     // completed.splice(running.length, 1, completed_fj)

        //     // updated_state.fetch_jobs.completed = completed
        //     // updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== completed_fj.id)]

        //     return {
        //         ...state,
        //     }

        // case GET_USER_BY_USERNAME_PENDING:
        //     state.pending = true

        //     return {
        //         ...state
        //     }

        // case GET_USER_BY_USERNAME_ERROR:
        //     // updated_state.pending = false
        //     // updated_state.error = action.error
        //     // running = [...updated_state.fetch_jobs.running]
        //     // completed = [...updated_state.fetch_jobs.completed]
        //     // completed_fj = { ...running.find(job => job.hashtag == action.hashtag) };
        //     job = { ...state.fetch_jobs.find(job => job.hashtag == action.hashtag) }
        //     fj.status = 'completed'

        //     // updated_state.fetch_jobs.completed = completed
        //     // updated_state.fetch_jobs.running = [...running.filter(fj => fj.id !== completed_fj.id)]
        //     return {
        //         ...updated_state
        //     }

        // case CLEAR_CURRENT_FETCH_JOB:
        //     updated_state.current_fetch_job = {}

        //     return {
        //         ...updated_state
        //     };

        default:
            return state;
    }
}

export const getPending = state => state.fetch_job.pending;
export const getError = state => state.fetch_job.error;
export const getRunningFetchJob = state => state.running_fetch_job

export default fetchJobReducer;