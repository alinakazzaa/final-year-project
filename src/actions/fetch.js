import { GET_USER_ERROR, GET_USER_SUCCESS, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_BY_HASHTAG_ERROR, SET_RUNNING_FETCH, CLEAR_RUNNING_FETCH, COMPLETED, FAIL_CRITERIA } from "../constants"

export const fetchPending = (action_type, fetch_job) => {
    return {
        type: action_type,
        fetch_job: fetch_job
    }
}

export const fetchSuccess = response => {

    if (response.type == GET_MEDIA_BY_HASHTAG_SUCCESS) {

        return {
            type: response.type,
            message: response.message,
            media_ids: response.media_ids
        }
    }
    else if (response.type == GET_USER_SUCCESS) {

        return {
            type: response.type,
            message: response.message
        }
    }

    return {
        type: response.type,
        message: response.message,
    }
}

export const fetchError = response => {

    if (response.type == GET_USER_ERROR || response.type == FAIL_CRITERIA) {

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

export const getNextPagePending = fetch_job => {

    return {
        type: GET_MEDIA_BY_HASHTAG_PENDING,
        fetch_job: fetch_job
    }
}

export const getNextPageSuccess = (response, ids, fetch_job) => {

    return {
        type: GET_MEDIA_BY_HASHTAG_SUCCESS,
        response: response,
        ids: ids,
        fetch_job: fetch_job,
        total: ids.length,
    }
}

export const getNextPageError = (error, user_id, project_id, fetch_job) => {

    return {
        type: GET_MEDIA_BY_HASHTAG_ERROR,
        error: error,
        fetch_job: fetch_job,
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