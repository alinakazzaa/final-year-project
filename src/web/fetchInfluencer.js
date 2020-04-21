import { INSTAGRAM_GET_USER_BY_ID, INSTAGRAM_GET_USER_FOLLOWED_BY, INSTAGRAM_GET_USER_MEDIA_COUNT } from "../constants/insta_endpoints"
import { addInfluencer } from "../actions/influencer"
import { GET_USER_SUCCESS, GET_USER_ERROR, GET_USER_PENDING } from "../constants/response/types"

export const fetchInfluencer = (id, fetch_job, pending, fetchResponse) => {
    let influ_obj
    let response

    pending(GET_USER_PENDING)

    fetch(INSTAGRAM_GET_USER_BY_ID(id))
        .then(result => result.json())
        .then(resp => {
            if (resp.data.user !== null) {
                influ_obj = { ...resp.data.user.reel.user, followers: 0, media_count: 0 }

                fetch(INSTAGRAM_GET_USER_FOLLOWED_BY(id))
                    .then(result => result.json())
                    .then(resp => {
                        if (resp.status == 'ok') {
                            influ_obj.followers = resp.data.user.edge_followed_by.count

                            fetch(INSTAGRAM_GET_USER_MEDIA_COUNT(id))
                                .then(result => result.json())
                                .then(resp => {
                                    if (resp.status == 'ok') {
                                        influ_obj.media_count = resp.data.user.edge_owner_to_timeline_media.count

                                        if (checkCriteria(fetch_job.details.criteria, influ_obj.followers)) {
                                            response = { type: GET_USER_SUCCESS, message: 'success: user within range', id: id }
                                            addInfluencer(influ_obj)
                                            fetchResponse(response)

                                        } else {
                                            response = { type: GET_USER_ERROR, message: 'fail: user not within range', id: id }
                                            fetchResponse(response)
                                        }
                                    }
                                })
                        }
                    })
                    .catch(err => {
                        response = { type: GET_USER_ERROR, message: String(err), id: id }
                        fetchResponse(response)
                    })
            } else {
                response = { type: GET_USER_ERROR, message: 'fail: user by ID', id: id }
                fetchResponse(response)
            }
        })
}

export const getFollowedBy = id => {
    fetch(INSTAGRAM_GET_USER_FOLLOWED_BY(id))
        .then(result => result.json())
        .then(resp => {
            if (resp.status == 'ok') {
                const followers = { ...resp.data.user.edge_followed_by }
                return followers
            } else {
                return 0
            }

        })
}

export const getMediaCount = id => {
    fetch(INSTAGRAM_GET_USER_MEDIA_COUNT(id))
        .then(result => result.json())
        .then(resp => {
            if (resp.status == 'ok') {
                const media = { ...resp.data.user.edge_owner_to_timeline_media }
                return media
            } else {
                return 0
            }
        })
}






export const checkCriteria = (criteria, followers) => {
    let isValid = false

    if (followers >= criteria.followerMin && followers <= criteria.followerMax)
        isValid = true

    return isValid
}