import { INSTAGRAM_GET_MEDIA_BY_HASHTAG, INSTAGRAM_GET_NEXT_PAGE_MEDIA } from "../constants/endpoints"
import { GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_BY_HASHTAG_ERROR, GET_MEDIA_NEXT_PAGE_PENDING, GET_MEDIA_NEXT_PAGE_SUCCESS, GET_MEDIA_NEXT_PAGE_ERROR, GET_USER_PENDING } from "../constants"
import { fetchInfluencer } from "./fetchInfluencer"

export const fetchMedia = (fetch_job, fetchPending, fetchSuccess, fetchError) => {
    let response
    let i = 0
    let media_ids = []
    fetchPending(GET_MEDIA_BY_HASHTAG_PENDING, fetch_job)

    fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(fetch_job.details.hashtag))
        .then(result => {

            if (!result.ok || result.ok === null) {
                response = {
                    type: GET_MEDIA_BY_HASHTAG_ERROR,
                    message: 'no media with this hashtag'
                }
                fetchError(response)
            }
            else {
                result.json().then(res => {

                    let edge_hashtag_to_media = res.graphql.hashtag.edge_hashtag_to_media
                    // let edge_hashtag_to_top_posts = res.graphql.hashtag.edge_hashtag_to_top_posts

                    if (edge_hashtag_to_media.edges.length > 0) {
                        edge_hashtag_to_media.edges.forEach(edge => {
                            media_ids.push(edge.node.owner.id)
                        })
                    }

                    // if (edge_hashtag_to_top_posts.edges.length > 0) {
                    //     edge_hashtag_to_top_posts.edges.forEach(edge => {
                    //         media_ids.push(edge.node.owner.id)
                    //     })
                    // }

                    response = {
                        type: GET_MEDIA_BY_HASHTAG_SUCCESS,
                        // media_ids: media_ids,
                        media_ids: [media_ids[0], media_ids[1], media_ids[2], media_ids[3], media_ids[4]],
                        message: 'success getting media by hashtag',
                    }
                    fetchPending(GET_USER_PENDING)
                    getInfluencers(response.media_ids, fetch_job, fetchSuccess, fetchError)
                    fetchSuccess(response)
                })
            }
        }).catch(error => {
            response = {
                type: GET_MEDIA_BY_HASHTAG_ERROR,
                message: String(error)
            }
            return fetchError(response)
        })
}

export const getInfluencers = (ids, fetch_job, fetchSuccess, fetchError) => {
    let i = 0

    let ref = setInterval(() => {
        fetchInfluencer(ids[i], fetch_job, fetchSuccess, fetchError);
        ++i
        if (i == ids.length) clearInterval(ref);
    }, 6000);

}