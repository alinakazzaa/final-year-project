import { addInfluencer } from '../actions/influencer'
import { criteria } from '../constants/Criteria'
import {
    INSTAGRAM_GET_USER_BY_ID,
    INSTAGRAM_GET_USER_BY_USERNAME
} from '../constants/endpoints'

import { GET_MEDIA_BY_HASHTAG_SUCCESS, GET_CURRENT_PAGE, GET_NEXT_PAGE, GET_USER_BY_ID, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, GET_NEXT_PAGE_SUCCESS, GET_NEXT_PAGE_PENDING, GET_NEXT_PAGE_ERROR, GET_MEDIA_IDS, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR, GET_CURRENT_PAGE_MEDIA_IDS } from '../constants/index'

export const getInitialCursorPending = () => {
    return {
        type: GET_MEDIA_BY_HASHTAG_PENDING
    }
}

export const getInitialCursorSuccess = async result => {
    console.log(result)
    return await result
    // return {
    //     type: GET_MEDIA_BY_HASHTAG_SUCCESS,
    //     payload: result
    // }
}

export const getInitialCursorError = error => {
    return {
        type: GET_MEDIA_BY_HASHTAG_ERROR,
        error: error
    }
}


export const getCurrentPage = result => {
    let edge_hashtag_to_media
    let has_next_page
    let end_cursor = {}
    let got_data = false
    const media_ids = []

    if (result.graphql) {
        console.log("in result graphql")
        edge_hashtag_to_media = result.graphql.hashtag.edge_hashtag_to_media
        got_data = true
    }
    else if (result.data) {
        console.log("in result data")
        edge_hashtag_to_media = result.data.hashtag.edge_hashtag_to_media
        got_data = true
    }
    else if (result.status == 'fail') {
        console.log("Failed fetch: " + result.message)
    } else {
        console.log(result)
    }

    if (got_data) {
        has_next_page = edge_hashtag_to_media.page_info.has_next_page
    }

    if (has_next_page) {
        end_cursor = { ...edge_hashtag_to_media.page_info.end_cursor }
    }

    // return edge_hashtag_to_media

    if (edge_hashtag_to_media.edges !== null && edge_hashtag_to_media.length > 0) {
        edge_hashtag_to_media.edges.forEach(edge => {
            media_ids.push(edge.node.owner.id)
        })
    }

    return {
        type: GET_CURRENT_PAGE_MEDIA_IDS,
        payload: media_ids
    }
}

export const setMediaIDs = edges => {

    return {
        type: GET_MEDIA_IDS,
        payload: edges
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

export const getUserByIDPending = () => {
    return {
        type: GET_USER_BY_ID_PENDING
    }
}

export const getUserByIDSuccess = result => {
    return {
        type: GET_USER_BY_ID_SUCCESS,
        payload: result
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

// export const getUserByID = async id => {
//     await fetch(`https://www.instagram.com/graphql/query/?query_hash=e74d51c10ecc0fe6250a295b9bb9db74&variables=%7B%22user_id%22:%22${id}%22,%22include_chaining%22:false,%22include_reel%22:true,%22include_suggested_users%22:false,%22include_logged_out_extras%22:false,%22include_highlight_reels%22:false,%22include_related_profiles%22:false%7D`, {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         // }).then((response) => response.json().then(result => createUser(result.data.user.reel.user, hashtag)))
//         //     .catch((error) => {
//         //         console.error("Cannot fetch" + error);
//         //     });
//     }).then((response) => response.json().then(result =>
//         // createUser(result.data.user.reel, hashtag)
//         console.log(result)
//     ))
//         .catch((error) => {
//             console.error("Cannot fetch" + error);
//         });
// }






// export const getNextPage = () => {
//     return {
//         type: GET_NEXT_PAGE
//     }
// }

// export const getUserByID = () => {
//     return {
//         type: GET_USER_BY_ID
//     }
// }

// export const getInitialCursor = async hashtag => {

//     try {
//         await fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(hashtag), {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             // }).then((response) => response.json().then(result => media_list = result))
//             //     .catch((error) => {
//             //         console.error("Cannot fetch" + error);
//             //     });
//         }).then((response) => response.json().then(result =>
//             getCurrentPage(result)))
//             .catch((error) => {
//                 console.error("Cannot fetch" + error);
//             });
//     } catch (error) {
//         console.error("Cannot fetch" + error);
//     }
// }

// export const getCurrentPage = async result => {
//     let page_info
//     let has_next_page
//     let end_cursor
//     let data = []
//     let got_data = false

//     if (result.graphql) {
//         console.log("in result graphql")
//         page_info = { ...result.graphql.hashtag.edge_hashtag_to_media.page_info }
//         got_data = true
//     }
//     else if (result.data) {
//         console.log("in result data")
//         page_info = { ...result.data.hashtag.edge_hashtag_to_media.page_info }
//         got_data = true
//     }
//     else if (result.status == 'fail') {
//         console.log("Failed fetch: " + result.message)
//     } else {
//         console.log(result)
//     }

//     if (got_data) {
//         has_next_page = page_info.has_next_page
//     }

//     if (has_next_page) {
//         end_cursor = result.page_info.end_cursor.replace("==", "%3D%3D")
//         data = [...result.edges]
//         return data
//     }

//     return result
// }

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

// export const getUserFromShortcode = async (result, hashtag, active_criteria) => {

//     let username = ''

//     if (result.graphql) {
//         console.log("in getUserFromShortcode graphql")
//         username = result.graphql.shortcode_media.owner.username
//         getUserProfile(username)
//     } else if (result.data) {
//         console.log("in getUserFromShortcode data")
//         username = result.data.shortcode_media.owner.username
//         getUserProfile(username)
//     } else {
//         console.log("no endpoint found")
//     }


// }

export const createUser = (user, hashtag) => {

    let user_obj = {
        username: user.username,
        id: user.id,
        profile_pic_url: user.profile_pic_url,
        profile_url: `https://www.instagram.com/${user.username}/?__a=1`
    }

    addInfluencer(user_obj, hashtag)

    // await fetch(`https://www.instagram.com/${username}/?__a=1`, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    // }).then((response) => response.json().then(result => storeUser(result, hashtag, active_criteria)))
    //     .catch((error) => {
    //         console.error("Cannot fetch" + error);
    //     });
}

export const storeUser = async (result, hashtag, active_criteria) => {
    console.log(result.graphql.user)
    // let user = { ...result.graphql.user }
    // let user_obj = {
    //     username: user.username,
    //     bio: user.biography,
    //     followers: user.edge_followed_by.count,
    //     following: user.edge_follow.count,
    //     full_name: user.full_name,
    //     id: user.id,
    //     is_private: user.is_private,
    //     profile_pic_url: user.profile_pic_url,
    //     media: user.edge_owner_to_timeline_media.count,
    //     profile_url: `https://www.instagram.com/${user.username}/?__a=1`
    // }

    // console.log(user_obj.followers)



    // let ac = active_criteria.split(',');
    // let least = ac[0]
    // let most = ac[criteria.findIndex(x => x.key === 'fifty') + 1]
    // criteria.forEach(crit => {
    //     if (crit.key == least) {
    //         least = crit.value
    //     }
    //     if (crit.key == most) {
    //         most = criteria.indexOf(crit)
    //     }
    // })



    // if (user.followers <= most && user.followers >= least) {
    //     addInfluencer(user, hashtag)
    // }
}

