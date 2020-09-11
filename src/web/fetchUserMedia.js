import { INSTAGRAM_GET_USER_MEDIA } from "../constants/insta_endpoints"
import { GET_USER_MEDIA_ERROR, GET_USER_MEDIA_SUCCESS } from "../constants/response/types"
import { setCollabsPending } from "../actions/collab"
import { fetchResponse } from "../actions/fetch"

export const fetchUserMedia = user_id => {
    return dispatch => {
        dispatch(setCollabsPending())

        let response

        fetch(INSTAGRAM_GET_USER_MEDIA(user_id))
            .then(result => {
                result.json().then(res => {
                    if (res.status = 'ok') {
                        const edge_owner_to_timeline_media = { ...res.data.user.edge_owner_to_timeline_media }

                        response = {
                            type: GET_USER_MEDIA_SUCCESS,
                            media: edge_owner_to_timeline_media.edges,
                            message: 'success: user media',
                        }

                        dispatch(fetchResponse(response))

                    } else if (res.status = 'fail') {
                        response = { type: GET_USER_MEDIA_ERROR, message: res.message }
                        dispatch(fetchResponse(response))
                    }
                    else {
                        response = { type: GET_USER_MEDIA_ERROR, message: 'error: user media' }
                        dispatch(fetchResponse(response))
                    }
                })
            }).catch(error => {
                response = { type: GET_USER_MEDIA_ERROR, message: String(error) }
                dispatch(fetchResponse(response))
            })
    }
}


export const extractMedia = (edges, hashtags) => {
    const media = []
    let media_item

    if (edges.length > 0) {
        edges.forEach(edge => {
            hashtags.forEach(tag => {
                if (edge.node.edge_media_to_caption.edges[0].node.text.toLowerCase().includes(tag.name.toLowerCase())) {
                    media_item = {
                        hashtag: tag,
                        comments: edge.node.edge_media_to_comment.count,
                        thumbnail: edge.node.thumbnail_src,
                        likes: edge.node.edge_media_preview_like.count,
                        shortcode: edge.node.shortcode,
                        comment: edge.node.edge_media_to_caption.edges[0].node.text
                    }
                    if (!media.find(item => item.shortcode == media_item.shortcode))
                        media.push(media_item)
                }
            })
        })
    }

    return media
}