import { GET_USER_BY_ID_PENDING, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_ERROR } from "../constants"
import { INSTAGRAM_GET_USER_BY_ID, INSTAGRAM_GET_USER_BY_USERNAME } from "../constants/endpoints"
import { addInfluencer } from "../actions/influencer"
import { updateFetchJob } from "../actions/fetchJob"
import { getUserByUsername } from "./fetchInfluencerByUsername"

export const getUserByID = (id, user_id, project_id, running_fetch_job, getUserByIDSuccess, getUserByIDError, getUserByUsernameSuccess, getUserByUsernameError) => {
    let response

    fetch(INSTAGRAM_GET_USER_BY_ID(id))
        .then(result => result.json())
        .then(res => {
            if (res.data.user !== null) {
                response = { message: 'got influencer by ID. getting by username' }
                return getUserByIDSuccess({ ...res.data.user.reel.user }, response, user_id, project_id, running_fetch_job, getUserByUsernameSuccess, getUserByUsernameError)
            } else {
                response = { message: 'no user by ID' }
                return getUserByIDError(response, user_id, project_id, running_fetch_job, id)
            }
        })
        .catch(error => {
            response = { message: error }
            // updateFetchJob(user_id, project_id, fj)
            return getUserByIDError(response, user_id, project_id, running_fetch_job, id)
        })
}


export const getUserByIDPending = running_fetch_job => {
    return {
        type: GET_USER_BY_ID_PENDING,
        fetch_job: running_fetch_job
    }
}

export const getUserByIDSuccess = (influencer, response, user_id, project_id, running_fetch_job, getUserByUsernameSuccess, getUserByUsernameError) => {
    getUserByUsername(influencer.username, user_id, project_id, running_fetch_job, getUserByUsernameSuccess, getUserByUsernameError)

    return {
        type: GET_USER_BY_ID_SUCCESS,
        fetch_job: running_fetch_job,
        influencer: influencer,
        response: response
    }
}

export const getUserByIDError = (response, user_id, project_id, running_fetch_job, id) => {
    return {
        type: GET_USER_BY_ID_ERROR,
        error: response,
        id: id,
        fetch_job: running_fetch_job,
        user_id: user_id,
        project_id: project_id,
        response: response
    }
}