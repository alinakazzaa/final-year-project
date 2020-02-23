import { GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR } from "../constants"
import { addInfluencer } from "../actions/influencer"
import { INSTAGRAM_GET_USER_BY_USERNAME } from "../constants/endpoints"
import { updateFetchJob } from "../actions/fetchJob"


export const getUserByUsername = (username, user_id, project_id, running_fetch_job, getUserByUsernameSuccess, getUserByUsernameError) => {
    let response

    fetch(INSTAGRAM_GET_USER_BY_USERNAME(username))
        .then(result => result.json())
        .then(res => {
            if (res.graphql.user !== null) {
                response = { message: 'got user by username' }
                const user = { ...res.graphql.user }
                return getUserByUsernameSuccess(user, response, user_id, project_id, running_fetch_job)

            } else {
                response = { message: 'no user by username' }
                return getUserByUsernameError(response, user_id, project_id, running_fetch_job, username)
            }
        })
        .catch(error => {
            response = { message: error }
            updateFetchJob(user_id, project_id, running_fetch_job)
            return getUserByUsernameError(response, user_id, project_id, running_fetch_job, username)
        })
}

export const getUserByUsernamePending = fetch_job => {
    return {
        type: GET_USER_BY_USERNAME_PENDING,
        fetch_job: fetch_job
    }
}

export const getUserByUsernameSuccess = (user, response, user_id, project_id, fetch_job) => {

    let influ_obj = {
        biography: user.biography,
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        full_name: user.full_name,
        id: user.id,
        is_business_account: user.is_business_account,
        is_private: user.is_private,
        profile_pic_url: user.profile_pic_url,
        username: user.username,
        media_count: user.edge_owner_to_timeline_media.count
    }

    addInfluencer(influ_obj)

    return {
        type: GET_USER_BY_USERNAME_SUCCESS,
        fetch_job: fetch_job,
        response: response,
        user_id: user_id,
        project_id: project_id
    }
}

export const getUserByUsernameError = (error, response, user_id, project_id, fetch_job, username) => {
    return {
        type: GET_USER_BY_USERNAME_ERROR,
        error: error,
        fetch_job: fetch_job,
        username: username,
        user_id: user_id,
        project_id: project_id,
        response: response
    }
}
