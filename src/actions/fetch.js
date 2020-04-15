import { GET_USER_MEDIA_PENDING } from "../constants/response/types"
import { SET_RUNNING_FETCH, CLEAR_RUNNING_FETCH } from "../constants"

export const fetchPending = (action_type, fetch_job) => {

    if (action_type == GET_USER_MEDIA_PENDING) {
        return {
            type: action_type
        }
    } else {
        return {
            type: action_type,
            fetch_job
        }
    }
}

export const fetchResponse = response => {
    return response
}

export const setRunningFetchJob = fetch_job => {

    return {
        type: SET_RUNNING_FETCH,
        fetch_job
    }
}

export const clearRunningFetchJob = fetch_job => {
    return {
        type: CLEAR_RUNNING_FETCH,
        fetch_job
    }
}