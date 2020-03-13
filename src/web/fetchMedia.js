import { INSTAGRAM_GET_MEDIA_BY_HASHTAG, INSTAGRAM_GET_NEXT_PAGE_MEDIA } from "../constants/endpoints"
import { GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_BY_HASHTAG_ERROR, GET_MEDIA_NEXT_PAGE_PENDING, GET_MEDIA_NEXT_PAGE_SUCCESS, GET_MEDIA_NEXT_PAGE_ERROR, GET_USER_PENDING } from "../constants"
import { fetchInfluencer } from "./fetchInfluencer"
import { fetchNextPage } from "./fetchNextPage"
import { criteria } from "../constants/Criteria"

export const fetchMedia = (fetch_job, pending, success, error) => {
    let response

    pending(GET_MEDIA_BY_HASHTAG_PENDING, fetch_job)

    fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(fetch_job.details.hashtag))
        .then(result => {

            if (!result.ok || result.ok == null) {
                response = {
                    type: GET_MEDIA_BY_HASHTAG_ERROR,
                    message: 'error: no hashtag media'
                }
                error(response)
            }
            else {
                result.json().then(res => {
                    let edge_hashtag_to_media = { ...res.graphql.hashtag.edge_hashtag_to_media }
                    let related_tags = { ...res.graphql.hashtag.edge_hashtag_to_related_tags }

                    response = {
                        type: GET_MEDIA_BY_HASHTAG_SUCCESS,
                        media_ids: extractIds(edge_hashtag_to_media.edges, fetch_job.details.criteria),
                        // media_ids: [media_ids[0], media_ids[1], media_ids[2], media_ids[3], media_ids[4]],
                        message: 'success: hashtag media',
                        has_next_page: edge_hashtag_to_media.page_info.has_next_page,
                        related_tags: extractTags(related_tags.edges),
                        end_cursor: edge_hashtag_to_media.page_info.end_cursor
                    }

                    success(response)

                })
            }

        }).catch(error => {
            response = {
                type: GET_MEDIA_BY_HASHTAG_ERROR,
                message: String(error)
            }
            error(response)
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

export const extractIds = (edges, criteria) => {
    let media_ids = []

    if (edges.length > 0) {
        edges.forEach(edge => {
            if (edge.node.edge_liked_by.count > likesMin(criteria)) {
                if (media_ids.find(id => id == edge.node.owner.id) == null)
                    media_ids.push(edge.node.owner.id)
            }
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

    let likes_min = (criteria.find(crit => crit.key == active.split(',')[0]).value.min * .2)

    return likes_min
}