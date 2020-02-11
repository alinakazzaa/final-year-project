import { addInfluencer } from '../actions/influencer'
import { criteria } from '../constants/Criteria'
import {
    INSTAGRAM_GET_MEDIA_BY_HASHTAG, INSTAGRAM_GET_USER_BY_ID,
    INSTAGRAM_GET_USER_BY_USERNAME
} from '../constants/endpoints'


export const getInitialCursor = async (hashtag, number, active_criteria) => {
    await fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(hashtag), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json().then(result =>
        getCurrentPage(
            result.graphql.hashtag.edge_hashtag_to_media, hashtag, number, active_criteria)))
        .catch((error) => {
            console.error("Cannot fetch" + error);
        });


}

export const getCurrentPage = async (result, hashtag, number, active_criteria) => {
    let has_next_page
    let end_cursor
    let data
    if (result.edges) {
        console.log("in result edges")
        has_next_page = result.page_info.has_next_page
        if (has_next_page) {
            end_cursor =
                result.page_info.end_cursor.replace("==", "%3D%3D")
            data = result.edges
            console.log('GRAPHQL: ' + end_cursor)
            await getNextPage(hashtag, number, end_cursor, active_criteria)
        }
        else if (result.data) {
            console.log("in result data")
            has_next_page = result.data.hashtag.edge_hashtag_to_media.page_info.has_next_page
            end_cursor =
                result.data.hashtag.edge_hashtag_to_media.page_info.end_cursor.replace("==", "%3D%3D")
            // data = result.data.hashtag.edge_hashtag_to_media.edges
            console.log('DATA: ' + end_cursor)
            await getNextPage(hashtag, number, end_cursor, active_criteria)
        }
        else {
            console.log(result)
        }

        // setInterval()
        // await result.data.hashtag.edge_hashtag_to_media.edges.forEach(edge => {
        // setTimeout(getUserByID(edge.node.owner.id, hashtag), 60000)
        // })

        console.log(data.length)

    } else if (result.status == 'fail') {
        console.log('Fetch failed')
    }
}

export const getNextPage = async (hashtag, number, end_cursor, active_criteria) => {
    console.log("getting next page")
    await fetch(`https://www.instagram.com/graphql/query/?query_hash=bd33792e9f52a56ae8fa0985521d141d&variables=%7B%22tag_name%22%3A%22${hashtag}%22%2C%22first%22%3A${number}%2C%22after%22%3A%22${end_cursor}%22%7D`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json().then(result =>
        getCurrentPage(result, hashtag, number, active_criteria)))
        .catch((error) => {
            console.error("Cannot fetch" + error);
        });
    console.log("finished next page")
}

export const getUserByID = async (id, hashtag, active_criteria) => {
    await fetch(`https://www.instagram.com/graphql/query/?query_hash=e74d51c10ecc0fe6250a295b9bb9db74&variables=%7B%22user_id%22:%22${id}%22,%22include_chaining%22:false,%22include_reel%22:true,%22include_suggested_users%22:false,%22include_logged_out_extras%22:false,%22include_highlight_reels%22:false,%22include_related_profiles%22:false%7D`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // }).then((response) => response.json().then(result => createUser(result.data.user.reel.user, hashtag)))
        //     .catch((error) => {
        //         console.error("Cannot fetch" + error);
        //     });
    }).then((response) => response.json().then(result =>
        // createUser(result.data.user.reel, hashtag)
        console.log(result)
    ))
        .catch((error) => {
            console.error("Cannot fetch" + error);
        });
}

export const getUserByUsername = async (username, hashtag, active_criteria) => {
    await fetch(INSTAGRAM_GET_USER_BY_USERNAME(username), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((resp) => resp.text().then(res => console.log(res)))
        .catch((error) => {
            console.error("Cannot fetch" + error);
        });
}

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

export const createUser = async (reel, hashtag, active_criteria) => {

    let user_obj = {
        username: reel.user.username,
        id: reel.user.id,
        profile_pic_url: reel.user.profile_pic_url,
        profile_url: `https://www.instagram.com/${reel.user.username}/?__a=1`
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

