import {
    SET_CURRENT_FETCH_JOB, ADD_FETCH_JOB, REMOVE_FETCH_JOB, UPDATE_FETCH_JOB, CLEAR_CURRENT_FETCH_JOB, CLEAR_FETCH_JOB_STATE, PENDING, COMPLETED, IN_PROGRESS
} from '../constants'
import { SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_ERROR, REMOVE_INFLUENCER_FROM_FETCH_JOB } from '../constants/response/types'

const initialState = {
    all_fetch_jobs: [],
    current_fetch_job: {},
    pending: null,
    error: null
}

const fetchJobReducer = (state = initialState, action) => {
    const fetch_jobs = [...state.all_fetch_jobs]

    switch (action.type) {
        case ADD_FETCH_JOB:
            fetch_jobs.splice(fetch_jobs.length, 0, action.fetch_job)

            return {
                ...state,
                all_fetch_jobs: fetch_jobs
            }


        case REMOVE_FETCH_JOB:
            return {
                ...state,
                all_fetch_jobs: [...fetch_jobs.filter(fj => fj.details.id !== action.fetch_job.details.id)]
            }

        case SET_FETCH_JOBS_PENDING:

            return {
                ...state,
                pending: true,
                error: null,
                response: null
            }

        case SET_FETCH_JOBS_SUCCESS:

            return {
                ...state,
                all_fetch_jobs: [...action.fetch_jobs],
                pending: false
            }

        case SET_FETCH_JOBS_ERROR:

            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }

        case SET_CURRENT_FETCH_JOB:
            return {
                ...state,
                current_fetch_job: { ...action.fetch_job }
            }

        case UPDATE_FETCH_JOB:

            fetch_jobs.splice(getIndex(fetch_jobs, action.fetch_job), 1, action.fetch_job)

            return {
                ...state,
                all_fetch_jobs: fetch_jobs
            }

        case CLEAR_CURRENT_FETCH_JOB:

            return {
                ...state,
                current_fetch_job: {}
            }
        case CLEAR_FETCH_JOB_STATE:

            return {
                ...initialState
            }

        default:
            return state
    }
}

export const getIndex = (fetchJobs, job) => fetchJobs.map(j => { return j.details.id }).indexOf(job.details.id)

export default fetchJobReducer