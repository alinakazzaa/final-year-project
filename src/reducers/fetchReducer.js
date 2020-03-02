import {
    GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_USER_ERROR,
    GET_USER_SUCCESS, MEDIA_FETCH, IN_PROGRESS, COMPLETED, GET_USER_PENDING, USER_FETCH, COMPLETED_GET_ALL_USERS, FAIL_CRITERIA
} from '../constants';

import { criteria } from '../constants/Criteria'
import { updateFetchJob, updateStateFetchJob } from '../actions/fetchJob';

const initialState = {
    pending: null,
    response: null,
    influencers: {
        success: [],
        fail: []
    },
    details: {},
    progress: { total: 0, done: 0 },
    stage: null
};

const fetchReducer = (state = initialState, action) => {
    let running = { ...state }

    switch (action.type) {

        // get hashtag media
        case GET_MEDIA_BY_HASHTAG_PENDING:

            running = {
                response: null,
                details: { ...action.fetch_job.details, status: IN_PROGRESS },
                pending: true,
                stage: MEDIA_FETCH,
                influencers: {
                    success: [],
                    fail: []
                },
                progress: { total: 0, done: 0 },
            }

            return {
                ...running
            }



        case GET_MEDIA_BY_HASHTAG_SUCCESS:
            running = {
                ...state,
                response: { type: action.type, message: action.message },
                progress: { ...state.progress, total: action.media_ids.length },
                influencers: {
                    ...state.influencers,
                    success: [...action.media_ids]
                }
            }

            return {
                ...running
            }

        case GET_MEDIA_BY_HASHTAG_ERROR:
            running = {
                ...state,
                response: { type: action.type, message: action.message },
                pending: false,
                details: { ...state.details, status: COMPLETED }
            }

            return {
                ...running
            }

        case GET_USER_PENDING:

            running = {
                ...state,
                stage: USER_FETCH,
            }

            return {
                ...running
            }

        case GET_USER_SUCCESS:

            running = {
                ...state,
                progress: {
                    ...state.progress,
                    done: state.progress.done + 1
                },
                response: { type: action.type, message: action.message },
            }

            if (running.progress.total == running.progress.done) {
                running = {
                    ...running,
                    details: { ...state.details, status: COMPLETED },
                    pending: false,
                    response: {
                        type: COMPLETED_GET_ALL_USERS,
                        message: 'finished getting influencers'
                    }
                }
            }

            return {
                ...running
            }

        case GET_USER_ERROR || FAIL_CRITERIA:

            running = {
                ...state,
                progress: {
                    ...state.progress,
                    done: state.progress.done + 1
                },
                response: { type: action.type, message: action.message },
                influencers: {
                    ...state.influencers,
                    success: [...state.influencers.success.filter(id => id != action.id)],
                    fail: [...state.influencers.fail, action.id]
                },
                stage: COMPLETED
            }


            if (running.progress.total == running.progress.done) {
                running = {
                    ...running,
                    details: { ...state.details, status: COMPLETED },
                    pending: false,
                    response: {
                        type: COMPLETED_GET_ALL_USERS,
                        message: 'finished getting influencers'
                    },
                    stage: COMPLETED
                }
            }

            return {
                ...running
            }

        default:
            return state;
    }
}

export default fetchReducer;