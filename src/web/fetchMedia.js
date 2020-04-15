import { INSTAGRAM_GET_MEDIA_BY_HASHTAG } from "../constants/insta_endpoints"
import { fetchInfluencer } from "./fetchInfluencer"
import { GET_MEDIA_PENDING, GET_MEDIA_ERROR, GET_MEDIA_SUCCESS, COMPLETED_FETCH } from "../constants/response/types"
import { MSG_HASHTAG_MEDIA_ERROR } from "../constants/response/messages"

export const fetchMedia = (fetch_job, pending, fetchResponse) => {
    let response

    pending(GET_MEDIA_PENDING, fetch_job)

    fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(fetch_job.details.hashtag))
        .then(result => {

            if (!result.ok || result.ok == null) {
                response = {
                    type: GET_MEDIA_ERROR,
                    message: 'error: no hashtag media'
                }
            }
            else {
                result.json().then(res => {
                    const edge_hashtag_to_media = { ...res.graphql.hashtag.edge_hashtag_to_media }

                    if (edge_hashtag_to_media.count == 0) {
                        response = {
                            type: GET_MEDIA_ERROR,
                            message: MSG_HASHTAG_MEDIA_ERROR
                        }
                    } else {
                        const related_tags = { ...res.graphql.hashtag.edge_hashtag_to_related_tags }
                        const ids = [...extractIds(edge_hashtag_to_media.edges, fetch_job.details.criteria)]

                        response = {
                            has_next_page: edge_hashtag_to_media.page_info.has_next_page,
                            end_cursor: edge_hashtag_to_media.page_info.end_cursor,
                            type: GET_MEDIA_SUCCESS,
                            media_ids: ids,
                            related_tags: extractTags(related_tags.edges),
                        }

                        if (ids.length > 0) {
                            getInfluencers(ids, fetch_job, pending, fetchResponse)
                        }

                        if (!response.has_next_page) {
                            response = { ...response, type: COMPLETED_FETCH }
                        }
                    }

                    fetchResponse(response)
                })
            }

        }).catch(error => {
            response = {
                type: GET_MEDIA_ERROR,
                message: String(error)
            }
            fetchResponse(response)
        })
}

export const getInfluencers = (ids, fetch_job, pending, fetchResponse) => {
    let i = 0

    let ref = setInterval(() => {
        fetchInfluencer(ids[i], fetch_job, pending, fetchResponse);
        ++i
        if (i == ids.length) clearInterval(ref);
    }, 6000);

}

export const extractIds = (edges, criteria) => {
    let media_ids = []

    if (edges.length > 0) {
        edges.forEach(edge => {
            if (media_ids.find(id => id == edge.node.owner.id) == null)
                if (edge.node.edge_liked_by.count >= likesMin(criteria))
                    media_ids.push(edge.node.owner.id)
        })
    }

    return media_ids
}

export const extractTags = edges => {

    let tags = []

    edges.forEach(node => {

        tags.push(node.node.name)
    })

    return tags
}

export const likesMin = active => {

    let likes_min = (Number(active.follower_min) * .02)

    return likes_min
}