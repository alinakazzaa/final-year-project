import { INSTAGRAM_GET_MEDIA_BY_HASHTAG } from "../constants/endpoints"
import { updateFetchJob } from "../actions/fetchJob"
import { GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_BY_HASHTAG_ERROR } from "../constants"

export const fetchMedia = (running_fetch_job, user_id, project_id, getMediaByHashtagPending, getMediaByHashtagSuccess, getMediaByHashtagError) => {
    getMediaByHashtagPending()
    let response = { type: 'success', message: 'extracted influencer IDs' }
    let error = { type: 'error', message: 'no destination' }

    fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(running_fetch_job.hashtag))
        .then(result => {
            if (!result.ok || result.ok === null) {
                running_fetch_job = { ...running_fetch_job, result: error }
                updateFetchJob(user_id, project_id, running_fetch_job)
                return getMediaByHashtagError(error)
            } else {
                result.json().then(res => {
                    return getMediaByHashtagSuccess(response, [...extractInfluencerIDs(res)])
                })
            }
        }).catch(error => {
            error = { type: 'error', message: error }
            running_fetch_job = { ...running_fetch_job, result: error }
            updateFetchJob(user_id, project_id, running_fetch_job)
            return getMediaByHashtagError(error)
        })
}

// fetch actions
export const getMediaByHashtagPending = () => {
    return {
        type: GET_MEDIA_BY_HASHTAG_PENDING,
    }
}

export const getMediaByHashtagSuccess = (response, ids) => {
    return {
        type: GET_MEDIA_BY_HASHTAG_SUCCESS,
        response,
        ids
    }
}

export const getMediaByHashtagError = error => {
    return {
        type: GET_MEDIA_BY_HASHTAG_ERROR,
        error
    }
}

export const extractInfluencerIDs = (result, running_fetch_job) => {
    let edges = []
    let has_next_page = false
    let end_cursor
    const media_ids = []

    if (result.graphql) {
        edges = [...result.graphql.hashtag.edge_hashtag_to_media.edges]
        has_next_page = result.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page
        if (has_next_page)
            end_cursor = result.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor
    }
    else if (result.data) {
        edges = [...result.data.hashtag.edge_hashtag_to_media]
        has_next_page = result.data.hashtag.edge_hashtag_to_media.page_info.has_next_page
        if (has_next_page)
            end_cursor = result.data.hashtag.edge_hashtag_to_media.page_info.end_cursor
    }

    if (edges.length > 0) {
        edges.forEach(edge => {
            media_ids.push(edge.node.owner.id)
        })
    }

    // getInfluencersById(media_ids, running_fetch_job)
    // if (has_next_page) {
    //     // get next page
    // }

    return media_ids
}