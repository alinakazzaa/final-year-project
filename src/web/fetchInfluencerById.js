import { GET_USER_BY_ID_PENDING, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_ERROR } from "../constants"
import { INSTAGRAM_GET_USER_BY_ID, INSTAGRAM_GET_USER_BY_USERNAME } from "../constants/endpoints"
import { addInfluencer } from "../actions/influencer"
import { updateFetchJob } from "../actions/fetchJob"

export const getUserByID = (id, user_id, project_id, running_fetch_job, getUserByIDSuccess, getUserByIDError) => {
    let response = { type: 'success', message: 'got influencer by ID' }

    // fetch(INSTAGRAM_GET_USER_BY_ID(id))
    fetch(INSTAGRAM_GET_USER_BY_ID('342425hjh352fddd'))
        .then(result => result.json())
        .then(res => {
            if (res.data.user !== null) {
                response = { type: 'success', message: 'got influencer by ID' }
                return getUserByIDSuccess({ ...res.data.user.reel.user }, user_id, project_id, response, running_fetch_job)
            } else {
                response = { type: 'error', message: 'no user' }
                return getUserByIDError(response, user_id, project_id, running_fetch_job, id)
            }
        })
        .catch(error => {
            response = { type: 'error', message: error }
            // updateFetchJob(user_id, project_id, fj)
            return getUserByIDError(response, user_id, project_id, running_fetch_job, id)
        })
}


export const getUserByIDPending = (total, running_fetch_job) => {
    return {
        type: GET_USER_BY_ID_PENDING,
        // total: total
        total: 5,
        fetch_job: running_fetch_job
    }
}

export const getUserByIDSuccess = (influencer, user_id, project_id, response, running_fetch_job) => {
    let resp = { type: 'success', message: 'got influencer by ID' }
    console.log(influencer)
    // fetch(INSTAGRAM_GET_USER_BY_USERNAME(influencer.username))
    //     .then(result => result.json())
    //     .then(res => {
    //         if (res.graphql.user !== null) {
    //             return getUserByUsernameSuccess({ ...res.graphql.user }, influencer.id, running_fetch_job)

    //         } else {
    //             resp = { type: 'error', message: 'no user' }
    //             return getUserByUsernameError(resp, influencer.id)
    //         }
    //     })
    //     .catch(error => {
    //         resp = { type: 'error', message: error }
    //         updateFetchJob(user_id, project_id, running_fetch_job)
    //         return getUserByUsernameError(resp, influencer.id)
    //     })

    return {
        type: GET_USER_BY_ID_SUCCESS,
        response: response,
        fetch_job: running_fetch_job
    }
}

export const getUserByIDError = (error, user_id, project_id, running_fetch_job, id) => {
    // console.log(error)
    return {
        type: GET_USER_BY_ID_ERROR,
        error,
        id,
        fetch_job: running_fetch_job,
        user_id,
        project_id
    }
}

export const getUserByUsernameSuccess = (user, influencer_id, running_fetch_job) => {
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

    addInfluencer(influ_obj, running_fetch_job.hashtag) // add hashtag here!!!

    // return {
    //     type: GET_USER_BY_USERNAME_SUCCESS,
    //     influencer: influ
    // }
}

export const getUserByUsernameError = (error, id) => {
    return {
        type: GET_USER_BY_USERNAME_ERROR,
        error: error,
    }
}