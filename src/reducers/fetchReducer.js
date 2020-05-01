import { GET_MEDIA_PENDING, GET_MEDIA_SUCCESS, GET_MEDIA_ERROR, GET_USER_PENDING, GET_USER_SUCCESS, GET_USER_ERROR, COMPLETED_FETCH, COMPLETED_GET_USERS } from '../constants/response/types'
import { IN_PROGRESS, MEDIA_FETCH, COMPLETED, USER_FETCH, CLEAR_RUNNING_FETCH } from '../constants'

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
}

const fetchReducer = (state = initialState, action) => {
    let running = { ...state }
    let success
    let fail

    switch (action.type) {

        // get hashtag media
        case GET_MEDIA_PENDING:

            running = {
                ...state,
                response: null,
                details: { ...action.fetch_job.details, status: IN_PROGRESS },
                pending: true,
                stage: MEDIA_FETCH
            }

            return {
                ...running
            }

        case GET_MEDIA_SUCCESS:
            running = {
                ...state,
                response: { type: action.type },
                progress: { ...state.progress, total: action.media_ids.length + state.progress.total },
                influencers: {
                    ...state.influencers,
                    pending: [...state.influencers.pending, ...action.media_ids]
                },
                has_next_page: action.has_next_page,
                related_tags: action.related_tags ? action.related_tags : state.related_tags,
                end_cursor: action.end_cursor
            }
            return {
                ...running
            }

        case GET_MEDIA_ERROR:
            running = {
                ...state,
                response: { type: action.type, message: action.message },
                pending: false,
                details: { ...state.details, status: COMPLETED }
            }

            return {
                ...running
            }

        case COMPLETED_FETCH:

            return {
                ...initialState
            }

        case GET_USER_PENDING:

            return {
                ...state,
                response: null,
                stage: USER_FETCH
            }

        case GET_USER_SUCCESS:
            success = [...state.influencers.success]

            if (!success.find(id => id == action.id)) {
                success.splice(success.length, 0, action.id)
            }

            running = {
                ...state,
                progress: {
                    ...state.progress,
                    done: state.progress.done + 1
                },
                response: { type: action.type, message: action.message },
                influencers: {
                    ...state.influencers,
                    pending: [...state.influencers.pending.filter(id => id !== action.id)],
                    success: [...success]
                }
            }

            if (running.progress.total == running.progress.done) {
                running = {
                    ...running,
                    response: {
                        type: COMPLETED_GET_USERS
                    }
                }
            }

            return {
                ...running
            }

        case GET_USER_ERROR:
            fail = [...state.influencers.fail]
            fail.splice(fail.length, 0, action.id)

            running = {
                ...state,
                progress: {
                    ...state.progress,
                    done: state.progress.done + 1
                },
                response: { type: action.type, message: action.message },
                influencers: {
                    ...state.influencers,
                    pending: [...state.influencers.pending.filter(id => id !== action.id)],
                    fail: [...fail]
                }
            }

            if (running.progress.total == running.progress.done) {
                running = {
                    ...running,
                    response: {
                        type: COMPLETED_GET_USERS
                    }
                }
            }

            return {
                ...running
            }

        case COMPLETED_GET_USERS:

            return {
                ...state,
                response: { type: action.type },
                has_next_page: action.has_next_page,
                end_cursor: action.end_cursor
            }

        case CLEAR_RUNNING_FETCH:

            return {
                ...initialState
            }


        default:
            return state
    }
}

export const getIndex = (list, id) => list.map(item => { return item }).indexOf(id)

export default fetchReducer