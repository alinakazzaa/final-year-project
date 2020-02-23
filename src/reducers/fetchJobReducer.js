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
    GET_USER_BY_ID_SUCCESS,
    MEDIA_FETCH,
    IN_PROGRESS,
    COMPLETED,
    USER_BY_ID_FETCH,
    USER_BY_USERNAME_FETCH,
    COMPLETED_GET_ALL_USERS_BY_ID_SUCCESS,
    COMPLETED_GET_ALL_USERS_BY_ID_ERROR,
    COMPLETED_GET_USERS_BY_USERNAME_SUCCESS,
    COMPLETED_GET_USERS_BY_USERNAME_ERROR
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
        stage: null
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
            running = { ...initialState.running_fetch_job, ...action.fetch_job, status: IN_PROGRESS }
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
            running = { ...state.running_fetch_job, pending: true, stage: MEDIA_FETCH }
            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs,
                response: { ...initialState.running_fetch_job.response }
            }

        case GET_MEDIA_BY_HASHTAG_SUCCESS:
            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);
            running = {
                ...state.running_fetch_job,
                response: { type: action.type, message: action.response },
                influencers: {
                    ...state.running_fetch_job.influencers,
                    success: action.ids
                },
                pending: false,
                progress: { ...state.running_fetch_job.progress, total: action.total }
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
            running = { ...state.running_fetch_job, response: { type: action.type, message: action.error }, status: COMPLETED, pending: false }
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
                pending: true,
                // TESTING 
                response: { ...initialState.running_fetch_job.response },
                stage: USER_BY_ID_FETCH,
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs
            }

        case GET_USER_BY_ID_SUCCESS:
            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);

            success = [...state.running_fetch_job.influencers.success]
            let index_inf = success.map(i => { return i }).indexOf(action.influencer.id);
            success.splice(index_inf, 1, action.influencer)

            running = {
                ...state.running_fetch_job,
                progress: {
                    ...state.running_fetch_job.progress,
                    done: state.running_fetch_job.progress.done + 0.5
                },
                influencers: {
                    ...state.running_fetch_job.influencers,
                    success: success
                },
                response: { type: action.type, message: action.response }
            }

            if (running.progress.total == running.progress.done && running.influencers.success.length > 0) {
                index = fetch_jobs.map(i => { return i }).indexOf(action.fetch_job.id);
                fetch_jobs.splice(index, 1, running)
                running = { ...running, pending: false, response: { type: COMPLETED_GET_ALL_USERS_BY_ID_SUCCESS, message: 'got influencers by ID' } }
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
            fail.splice(fail.length, 1, action.error)

            running = {
                ...state.running_fetch_job,
                influencers: {
                    // remove from success
                    success: [...state.running_fetch_job.influencers.success.filter(id => id != action.id)],
                    fail: fail
                },
                progress: {
                    ...state.running_fetch_job.progress,
                    done: state.running_fetch_job.progress.done + 0.5
                },
            }

            if (running.progress.total == running.progress.done && running.influencers.success.length == 0) {
                index = fetch_jobs.map(i => { return i }).indexOf(action.fetch_job.id);
                fetch_jobs.splice(index, 1, running)
                running = {
                    ...running,
                    status: COMPLETED,
                    pending: false,
                    response: { type: COMPLETED_GET_ALL_USERS_BY_ID_ERROR, message: action.error }
                }
                updateFetchJob(action.user_id, action.project_id, running)
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                fetch_jobs: fetch_jobs,
                running_fetch_job: running
            }


        case GET_USER_BY_USERNAME_PENDING:
            fetch_jobs = [...state.fetch_jobs]
            index = fetch_jobs.map(fj => { return fj.id }).indexOf(action.fetch_job.id);
            running = {
                ...state.running_fetch_job,
                pending: true,
                stage: USER_BY_USERNAME_FETCH,
                response: { ...initialState.running_fetch_job.response }
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs
            }

        case GET_USER_BY_USERNAME_SUCCESS:
            fetch_jobs = [...state.fetch_jobs]

            running = {
                ...state.running_fetch_job,
                response: { type: action.type, message: action.response },
                progress: {
                    ...state.running_fetch_job.progress,
                    done: state.running_fetch_job.progress.done + 0.5
                }
            }

            if (running.progress.total == running.progress.done && running.influencers.success.length > 0) {
                index = fetch_jobs.map(i => { return i }).indexOf(action.fetch_job.id);
                running = {
                    ...running,
                    status: COMPLETED,
                    pending: false,
                    response: {
                        type: COMPLETED_GET_USERS_BY_USERNAME_SUCCESS,
                        message: 'success getting influencers by username'
                    }
                }
                updateFetchJob(action.user_id, action.project_id, running)
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs: fetch_jobs
            }

        case GET_USER_BY_USERNAME_ERROR:
            fetch_jobs = [...state.fetch_jobs]
            fail = [...state.running_fetch_job.influencers.fail]
            fail.splice(fail.length, 1, action.username)

            running = {
                ...state.running_fetch_job,
                response: { type: action.type, message: action.error },
                influencers: {
                    // remove from success
                    success: [...state.running_fetch_job.influencers.success.filter(influ => influ.username != action.username)],
                    fail: fail
                },
                progress: {
                    ...state.running_fetch_job.progress,
                    done: state.running_fetch_job.progress.done + 0.5
                }
            }

            if (running.progress.total == running.progress.done && running.influencers.success.length == 0) {
                index = fetch_jobs.map(i => { return i }).indexOf(action.fetch_job.id);
                fetch_jobs.splice(index, 1, running)
                running = {
                    ...running,
                    status: COMPLETED,
                    pending: false,
                    response:
                    {
                        type: COMPLETED_GET_USERS_BY_USERNAME_ERROR,
                        message: 'failed to get all influencers by username'
                    }
                }
                updateFetchJob(action.user_id, action.project_id, running)
            }

            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                fetch_jobs: fetch_jobs,
                running_fetch_job: running
            }

        default:
            return state;
    }
}

export const getPending = state => state.fetch_job.pending;
export const getError = state => state.fetch_job.error;
export const getRunningFetchJob = state => state.running_fetch_job

export default fetchJobReducer;