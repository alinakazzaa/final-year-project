import { INSTAGRAM_GET_NEXT_PAGE_MEDIA } from "../constants/insta_endpoints"
import { extractIds } from './fetchMedia'
import { GET_MEDIA_PENDING, GET_MEDIA_ERROR, GET_MEDIA_SUCCESS, COMPLETED_FETCH, COMPLETED_GET_USERS } from "../constants/response/types"
import { MSG_HASHTAG_MEDIA_ERROR } from "../constants/response/messages"

export const fetchNextPage = (fetch_job, pending, fetchResponse) => {

    pending(GET_MEDIA_PENDING, fetch_job)
    let parsed_end_cursor = fetch_job.end_cursor.replace('==', '%3D%3D')
    let response
    fetch(INSTAGRAM_GET_NEXT_PAGE_MEDIA(fetch_job.details.hashtag, parsed_end_cursor))
        .then(result => {
            if (!result.ok || result.ok == null) {
                response = {
                    type: GET_MEDIA_ERROR,
                    message: 'error: no hashtag media'
                }
                fetchResponse(response)
            } else {
                result.json().then(res => {
                    if (res.status = 'ok') {
                        const edge_hashtag_to_media = { ...res.data.hashtag.edge_hashtag_to_media }

                        if (edge_hashtag_to_media.count == 0) {
                            response = {
                                type: GET_MEDIA_ERROR,
                                message: MSG_HASHTAG_MEDIA_ERROR
                            }
                        } else {

                            const ids = [...extractIds(edge_hashtag_to_media.edges, fetch_job.details.criteria)]

                            response = {
                                has_next_page: edge_hashtag_to_media.page_info.has_next_page,
                                end_cursor: edge_hashtag_to_media.page_info.end_cursor,
                                type: GET_MEDIA_SUCCESS,
                                media_ids: ids
                            }

                            if (ids.length == 0) {
                                response = { ...response, type: COMPLETED_GET_USERS }
                            }

                            if (!response.has_next_page) {
                                response = { ...response, type: COMPLETED_FETCH }
                            }
                        }

                        fetchResponse(response)

                    } else {
                        response = { type: GET_MEDIA_ERROR, message: res.message }
                        fetchResponse(response)
                    }

                })
            }
        }).catch(error => {
            response = { type: GET_MEDIA_ERROR, message: error }
            fetchResponse(response)
        })
}