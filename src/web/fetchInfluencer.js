import { INSTAGRAM_GET_USER_BY_ID, INSTAGRAM_GET_USER_BY_USERNAME } from "../constants/endpoints"
import { GET_USER_SUCCESS, GET_USER_ERROR } from "../constants"
import { addInfluencer } from "../actions/influencer"
import { criteria } from "../constants/Criteria"

export const fetchInfluencer = (id, fetch_job, fetchSuccess, fetchError) => {
    let influ_obj
    let response
    let active = fetch_job.details.criteria.split(',')
    let pass = false

    fetch(INSTAGRAM_GET_USER_BY_ID(id))
        .then(result => result.json())
        .then(resp => {
            if (resp.data.user !== null) {
                // fetch by username
                fetch(INSTAGRAM_GET_USER_BY_USERNAME(resp.data.user.reel.user.username))
                    .then(result => result.json())
                    .then(res => {
                        if (res.graphql.user !== null && res.graphql.user) {

                            let influ = { ...res.graphql.user }
                            influ_obj = {
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

                            pass = checkCriteria(active, influ_obj.followers)

                            if (pass) {
                                response = { type: GET_USER_SUCCESS, message: 'success: user within range', id: id }
                                fetchSuccess(response)
                                addInfluencer(influ_obj)
                                fetchSuccess(response)

                            } else {
                                response = { type: GET_USER_ERROR, message: 'fail: user not within range', id: id }
                                fetchError(response)
                            }
                        }
                        else {
                            response = { type: GET_USER_ERROR, message: 'fail:username', id: id }
                            fetchError(response)
                        }
                    })
                    .catch(error => {
                        response = { type: GET_USER_ERROR, message: String(error), id: id }
                        fetchError(response)
                    })
            }
        })
}


export const checkCriteria = (active, followers) => {
    let min = criteria.find(crit => crit.key == active[0])
    let max = criteria.find(crit => crit.key == active[active.length - 1])
    let isValid = false

    if (max.key == 'two_hundred') {
        if (min.key == max.key) {
            // only 500000+
            if (followers >= max.value.min) {
                isValid = true
            }
        } else {
            // not only 500000
            if (followers <= max.value.min && followers >= min.value.min) {
                isValid = true
            }
        }

    } else {
        if (followers <= max.value.max && followers >= min.value.min) {
            isValid = true
        }
    }

    return isValid
}