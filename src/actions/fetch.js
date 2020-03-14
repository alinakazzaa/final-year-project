import { GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_NEXT_PAGE_SUCCESS, GET_USER_SUCCESS, GET_USER_ERROR } from "../constants/response/types"
import { SET_RUNNING_FETCH, CLEAR_RUNNING_FETCH } from "../constants"

export const fetchPending = (action_type, fetch_job) => {
    return {
        type: action_type,
        fetch_job: fetch_job
    }
}

export const fetchSuccess = response => {

    let running = {
        type: response.type,
        message: response.message
    }

    if (response.type == GET_MEDIA_BY_HASHTAG_SUCCESS) {

        return {
            ...running,
            media_ids: response.media_ids,
            has_next_page: response.has_next_page,
            end_cursor: response.end_cursor,
            related_tags: response.related_tags,
        }

    } else if (response.type == GET_MEDIA_NEXT_PAGE_SUCCESS) {

        return {
            ...running,
            media_ids: response.media_ids,
            end_cursor: response.end_cursor,
            has_next_page: response.has_next_page,
        }
    }
    else if (response.type == GET_USER_SUCCESS) {

        return {
            ...running,
            id: response.id
        }
    }

    return running
}

export const fetchError = response => {
    if (response.type == GET_USER_ERROR) {

        return {
            type: response.type,
            message: response.message,
            id: response.id
        }
    }

    return {
        type: response.type,
        message: response.message
    }

}

export const setRunningFetchJob = fetch_job => {

    return {
        type: SET_RUNNING_FETCH,
        fetch_job: fetch_job
    }
}

export const clearRunningFetchJob = fetch_job => {
    return {
        type: CLEAR_RUNNING_FETCH,
        payload: fetch_job
    }
}