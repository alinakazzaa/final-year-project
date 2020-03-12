import {
    GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_USER_ERROR,
    GET_USER_SUCCESS, MEDIA_FETCH, IN_PROGRESS, COMPLETED, GET_USER_PENDING, USER_FETCH, COMPLETED_GET_ALL_USERS, GET_MEDIA_NEXT_PAGE_SUCCESS, GET_MEDIA_NEXT_PAGE_PENDING, GET_MEDIA_NEXT_PAGE_ERROR, MEDIA_NEXT_PAGE, GET_MEDIA_NEXT_PAGE_COMPLETED
} from '../constants';

import { criteria } from '../constants/Criteria'
import { updateFetchJob, updateStateFetchJob } from '../actions/fetchJob';

const initialState = {
    pending: null,
    response: null,
    influencers: {
        success: [],
        fail: [],
        pending: []
    },
    details: {},
    progress: { total: 0, done: 0 },
    stage: null,
    has_next_page: null,
    end_cursor: null,
    related_tags: []
};

const fetchReducer = (state = initialState, action) => {
    let running = { ...state }

    switch (action.type) {

        // get hashtag media
        case GET_MEDIA_BY_HASHTAG_PENDING:

            running = {
                ...state,
                response: null,
                details: { ...action.fetch_job.details, status: IN_PROGRESS },
                pending: true,
                stage: MEDIA_FETCH,
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
                    pending: [...state.influencers.pending, ...action.media_ids]
                },
                has_next_page: action.has_next_page,
                related_tags: action.related_tags,
                end_cursor: action.end_cursor
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

        case GET_MEDIA_NEXT_PAGE_PENDING:

            running = {
                ...state,
                response: null,
                stage: MEDIA_NEXT_PAGE,
            }

            return {
                ...running
            }

        case GET_MEDIA_NEXT_PAGE_SUCCESS:

            running = {
                ...state,
                response: { type: action.type, message: action.message },
                progress: { ...state.progress, total: state.progress.total + action.media_ids.length },
                influencers: {
                    ...state.influencers,
                    pending: [...state.influencers.pending, ...action.media_ids]
                },
                has_next_page: action.has_next_page,
                end_cursor: action.end_cursor
            }


            return {
                ...running
            }

        case GET_MEDIA_NEXT_PAGE_ERROR:
            running = {
                ...state,
                response: { type: action.type, message: action.message },
            }

            return {
                ...running
            }

        case GET_MEDIA_NEXT_PAGE_COMPLETED:
            running = {
                ...state,
                response: { type: action.type, message: action.message },
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
                influencers: {
                    ...state.influencers,
                    pending: [...state.influencers.success.filter(id => id != action.id)],
                    success: [...state.influencers.success, action.id]
                }
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

        case GET_USER_ERROR:

            running = {
                ...state,
                progress: {
                    ...state.progress,
                    done: state.progress.done + 1
                },
                response: { type: action.type, message: action.message },
                influencers: {
                    ...state.influencers,
                    pending: [...state.influencers.success.filter(id => id != action.id)],
                    fail: [...state.influencers.fail, action.id]
                }
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