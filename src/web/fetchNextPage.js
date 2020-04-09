import { INSTAGRAM_GET_NEXT_PAGE_MEDIA } from "../constants/insta_endpoints"
import { extractIds, getInfluencers } from './fetchMedia'
import { GET_MEDIA_NEXT_PAGE_PENDING, GET_MEDIA_NEXT_PAGE_SUCCESS, GET_MEDIA_NEXT_PAGE_ERROR, COMPLETED_GET_ALL_USERS } from "../constants/response/types"
import { GET_HASHTAG_MEDIA_SUCCESS, GET_HASHTAG_MEDIA_ERROR } from "../constants/response/messages"

export const fetchNextPage = (fetch_job, pending, success, error) => {
    pending(GET_MEDIA_NEXT_PAGE_PENDING)
    let parsed_end_cursor = fetch_job.end_cursor.replace('==', '%3D%3D')
    let response
    console.log(INSTAGRAM_GET_NEXT_PAGE_MEDIA(fetch_job.details.hashtag, parsed_end_cursor))
    fetch(INSTAGRAM_GET_NEXT_PAGE_MEDIA(fetch_job.details.hashtag, parsed_end_cursor))
        .then(result => {
            result.json().then(res => {

                if (res.status = 'ok') {
                    let edge_hashtag_to_media = { ...res.data.hashtag.edge_hashtag_to_media }
                    console.log(edge_hashtag_to_media)

                    response = {
                        type: GET_MEDIA_NEXT_PAGE_SUCCESS,
                        media_ids: extractIds(edge_hashtag_to_media.edges, fetch_job.details.criteria),
                        message: GET_HASHTAG_MEDIA_SUCCESS,
                        has_next_page: edge_hashtag_to_media.page_info.has_next_page,
                    }

                    if (response.media_ids.length > 0) {
                        getInfluencers(response.media_ids, fetch_job, pending, success, error)
                    } else {
                        response = {
                            type: COMPLETED_GET_ALL_USERS,
                            message: GET_HASHTAG_MEDIA_ERROR,
                            has_next_page: edge_hashtag_to_media.page_info.has_next_page,
                        }
                    }

                    if (response.has_next_page) {
                        response = {
                            ...response,
                            end_cursor: edge_hashtag_to_media.page_info.end_cursor
                        }
                    }

                    success(response)



                } else if (res.status = 'fail') {
                    response = { type: GET_MEDIA_NEXT_PAGE_ERROR, message: res.message }
                    error(response)
                }
                else {
                    response = { type: GET_MEDIA_NEXT_PAGE_ERROR, message: 'error: next page' }
                    error(response)
                }
            })
        }).catch(error => {
            response = { type: GET_MEDIA_NEXT_PAGE_ERROR, message: 'error: next page' }
            error(response)
        })
}