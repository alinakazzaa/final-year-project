import { GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR } from "../constants"
import { addInfluencer } from "../actions/influencer"




export const getUserByUsernamePending = () => {
    return {
        type: GET_USER_BY_USERNAME_PENDING
    }
}

export const getUserByUsernameSuccess = (result, running_fetch_job) => {
    const influ = { ...result.graphql.user }
    let influ_obj = {
        biography: influ.biography,
        followers: influ.edge_followed_by.count,
        following: influ.edge_follow.count,
        full_name: influ.full_name,
        id: influ.id,
        is_business_account: influ.is_business_account,
        is_private: influ.is_private,
        profile_pic_url: influ.profile_pic_url,
        username: influ.username,
        media_count: influ.edge_owner_to_timeline_media.count
    }

    addInfluencer(influ_obj, running_fetch_job.hashtag) // add hashtag here!!!

    return {
        type: GET_USER_BY_USERNAME_SUCCESS,
        influencer: influ
    }
}

export const getUserByUsernameError = error => {
    return {
        type: GET_USER_BY_USERNAME_ERROR,
        error: error,
    }
}