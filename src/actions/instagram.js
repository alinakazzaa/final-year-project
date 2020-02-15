import { addInfluencer } from '../actions/influencer'
import { criteria } from '../constants/Criteria'
import {
    INSTAGRAM_GET_USER_BY_ID,
    INSTAGRAM_GET_USER_BY_USERNAME
} from '../constants/endpoints'

import { GET_MEDIA_BY_HASHTAG_SUCCESS, GET_CURRENT_PAGE, GET_NEXT_PAGE, GET_USER_BY_ID, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, GET_NEXT_PAGE_SUCCESS, GET_NEXT_PAGE_PENDING, GET_NEXT_PAGE_ERROR, GET_MEDIA_IDS, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR, SET_CURRENT_PAGE_MEDIA_IDS } from '../constants/index'
import fetchInfluencer from '../web/fetchInfluencer'

export const getInitialCursorPending = () => {
    return {
        type: GET_MEDIA_BY_HASHTAG_PENDING
    }
}

export const getInitialCursorSuccess = result => {
    return dispatch => {
        dispatch(setCurrentPageInfo(result))
    }
}

export const getInitialCursorError = error => {
    return {
        type: GET_MEDIA_BY_HASHTAG_ERROR,
        error: error
    }
}


export const setCurrentPageInfo = result => {
    let edges = []
    let has_next_page = false
    let end_cursor
    const media_ids = []

    if (result.graphql) {
        console.log("in result graphql")
        edges = [...result.graphql.hashtag.edge_hashtag_to_media.edges]
        has_next_page = result.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page
        if (has_next_page)
            end_cursor = result.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor
    }
    else if (result.data) {
        console.log("in result data")
        edges = [...result.data.hashtag.edge_hashtag_to_media]
        has_next_page = result.data.hashtag.edge_hashtag_to_media.page_info.has_next_page
        if (has_next_page)
            end_cursor = result.data.hashtag.edge_hashtag_to_media.page_info.end_cursor
    }
    else if (result.status == 'fail') {
        console.log("Failed fetch: " + result.message)
    } else {
        console.log(result)
    }

    if (edges.length > 0) {
        edges.forEach(edge => {
            media_ids.push(edge.node.owner.id)
        })
    }

    return {
        type: SET_CURRENT_PAGE_MEDIA_IDS,
        payload: has_next_page, end_cursor, influ_ids: media_ids
    }
}

export const getNextPagePending = () => {
    return {
        type: GET_NEXT_PAGE_PENDING
    }
}

export const getNextPageSuccess = result => {
    return {
        type: GET_NEXT_PAGE_SUCCESS,
        payload: result
    }
}

export const getNextPageError = error => {
    return {
        type: GET_NEXT_PAGE_ERROR,
        error: error
    }
}

export const getUserByIDSuccess = (result, hashtag) => {
    return dispatch => {
        dispatch(addInfluencer({ ...result.data.user.reel.user }, hashtag))
    }
}

export const getUserByIDPending = () => {
    return {
        type: GET_USER_BY_ID_PENDING
    }
}

export const getUserByIDError = error => {
    return {
        type: GET_USER_BY_ID_ERROR,
        error: error
    }
}

export const getUserByUsernamePending = () => {
    return {
        type: GET_USER_BY_USERNAME_PENDING
    }
}

export const getUserByUsernameSuccess = result => {
    let user_obj = { ...result.graphql.user }
    return {
        type: GET_USER_BY_USERNAME_SUCCESS,
        payload: user_obj
    }
}

export const getUserByUsernameError = error => {
    return {
        type: GET_USER_BY_USERNAME_ERROR,
        error: error
    }
}

export const getUsersByID = edges => {
    fetchInfluencer(edges[8].node.owner.id)
    // if (ids !== null && ids.length > 0) {
    //     // ids.forEach(id => {
    //     //     setInterval(() => fetchInfluencer(id), 20000)
    //     // });
    // }
}




// export const getNextPage = async end_cursor => {
//     console.log("getting next page")
//     await fetch(`https://www.instagram.com/graphql/query/?query_hash=bd33792e9f52a56ae8fa0985521d141d&variables=%7B%22tag_name%22%3A%22${hashtag}%22%2C%22first%22%3A${number}%2C%22after%22%3A%22${end_cursor}%22%7D`, {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//     }).then((response) => response.json().then(result =>
//         getCurrentPage(result)))
//         .catch((error) => {
//             console.error("Cannot fetch" + error);
//         });
//     console.log("finished next page")
// }



// export const getUserByUsername = async username => {
//     await fetch(INSTAGRAM_GET_USER_BY_USERNAME(username), {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//     }).then((resp) => resp.text().then(res => console.log(res)))
//         .catch((error) => {
//             console.error("Cannot fetch" + error);
//         });
// }

