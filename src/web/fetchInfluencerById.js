import { GET_USER_BY_ID_PENDING, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_ERROR } from "../constants"
import { INSTAGRAM_GET_USER_BY_ID } from "../constants/endpoints"

export const getUserByID = (id, getUserByIDSuccess, getUserByIDError) => {
    let response = { type: 'success', message: 'got influencer by ID' }
    let fj

    fetch(INSTAGRAM_GET_USER_BY_ID(id))
        .then(result => result.json())
        .then(res => {
            if (res.data.user !== null) {
                response = { type: 'success', message: 'got influencer by ID' }
                return getUserByIDSuccess({ ...res.data.user.reel.user }, response)

            } else {
                response = { type: 'error', message: 'no user' }
                return getUserByIDError(response)
            }
        })
        .catch(error => {
            response = { type: 'error', message: error }
            // updateFetchJob(user_id, project_id, fj)
            return getUserByIDError(response)
        })

    return
}


export const getUserByIDPending = () => {
    return {
        type: GET_USER_BY_ID_PENDING
    }
}

export const getUserByIDSuccess = (influencer, response, running_fetch_job) => {
    return {
        type: GET_USER_BY_ID_SUCCESS,
        response: response,
        fetch_job: running_fetch_job,
        influencer: influencer
    }
}

export const getUserByIDError = (error, running_fetch_job) => {
    return {
        type: GET_USER_BY_ID_ERROR,
        error: error,
        fetch_job: running_fetch_job
    }
}