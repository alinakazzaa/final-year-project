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
        progress: {}
    },
    pending: null,
    error: null
};

const fetchJobReducer = (state = initialState, action) => {
    let running
    let job
    let index = 0
    let fetch_jobs

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

            return {
                ...state,
                running_fetch_job: { ...state.running_fetch_job, ...action.fetch_job }
            };

        case CLEAR_RUNNING_FETCH_JOB:

            return {
                ...state,
                running_fetch_job: { ...initialState.running_fetch_job }
            };

        // update fetch job status
        case UPDATE_FETCH_JOB_STATUS: {
            index = state.fetch_jobs.indexOf(f => f.id == action.fetch_job.id);
            fetch_jobs = [...state.fetch_jobs]
            fetch_jobs.splice(index, 1, action.fetch_job)

            return {
                ...state,
                fetch_jobs
            }
        }

        // get hashtag media
        case GET_MEDIA_BY_HASHTAG_PENDING:

            return {
                ...state,
                running_fetch_job: { ...state.running_fetch_job, pending: true }
            }

        case GET_MEDIA_BY_HASHTAG_SUCCESS:
            return {
                ...state,
                running_fetch_job: {
                    ...state.running_fetch_job,
                    response: action.response,
                    influencers: {
                        ...state.running_fetch_job.influencers,
                        success: action.ids
                    }
                }
            }


        case GET_MEDIA_BY_HASHTAG_ERROR:
            fetch_jobs = [...state.fetch_jobs]
            running = { ...state.running_fetch_job, response: action.error, status: 'completed', pending: false }
            index = state.fetch_jobs.indexOf(f => f.id == running.id);
            fetch_jobs.splice(index, 1, running)

            return {
                ...state,
                running_fetch_job: running,
                fetch_jobs
            }

        case GET_USER_BY_ID_ERROR:

            return {
                ...state,
                running_fetch_job: {
                    ...state.running_fetch_job,
                    influencers: {
                        ...state.running_fetch_job.influencers,
                        fail: [...state.running_fetch_job.influencers.fail, action.error]
                    }
                },
            }

        case GET_USER_BY_ID_SUCCESS:
            running = { ...state.running_fetch_job, response: action.response }
            index = state.fetch_jobs.indexOf(f => f.id == running.id);
            let success = [...state.running_fetch_job.influencers.success]
            success.splice(index, 1, { ...action.influencer })

            return {
                ...state,
                running_fetch_job: {
                    ...state.running_fetch_job,
                    influencers: {
                        ...state.running_fetch_job.influencers,
                        success
                    }
                },
            }


        case GET_USER_BY_ID_PENDING:

            return {
                ...state,
                running_fetch_job: { ...state.running_fetch_job, pending: true }
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
                ...state,
            }

        case GET_USER_BY_USERNAME_PENDING:
            state.pending = true

            return {
                ...state
            }

        case GET_USER_BY_USERNAME_ERROR:
            // updated_state.pending = false
            // updated_state.error = action.error
            // running = [...updated_state.fetch_jobs.running]
            // completed = [...updated_state.fetch_jobs.completed]
            // completed_fj = { ...running.find(job => job.hashtag == action.hashtag) };
            job = { ...state.fetch_jobs.find(job => job.hashtag == action.hashtag) }
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