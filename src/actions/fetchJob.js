import { db } from '../database/config/db';
import { DB_PROJECT_FETCH_JOBS_REF, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_ERROR, SET_CURRENT_FETCH_JOB, SET_RUNNING_FETCH_JOB, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR, CLEAR_CURRENT_FETCH_JOB } from '../constants';
import { addInfluencer } from './influencer';
import { INSTAGRAM_GET_USER_BY_ID, INSTAGRAM_GET_USER_BY_USERNAME } from '../constants/endpoints';

export const getProjectFetchJobs = (user_id, project_id) => {

    const completed = []
    const running = []
    const pending = []

    DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).on('value', fj_snapshot => {
        fj_snapshot.forEach(fj_snap => {
            if (fj_snap.val().status == 'completed') {
                completed.push(fj_snap.val())
            } else if (fj_snap.val().status == 'in progress') {
                running.push(fj_snap.val())
            } else {
                pending.push(fj_snap.val())
            }

        })
    })

    if (completed.length == 0 && running.length == 0 && pending.length == 0) {
        const error = { type: 'no fetch jobs' }
        return {
            type: SET_FETCH_JOBS_ERROR,
            error: error
        }
    } else {
        return {
            type: SET_FETCH_JOBS_SUCCESS,
            completed: completed,
            running: running,
            pending: running
        }
    }
}

export const setProjectFetchJobsPending = () => {

    return {
        type: SET_FETCH_JOBS_PENDING,
    }
}

export const setCurrentFetchJob = fetch_job => {
    return {
        type: SET_CURRENT_FETCH_JOB,
        payload: fetch_job
    }
}

export const setRunningFetchJob = fetch_job => {
    return {
        type: SET_RUNNING_FETCH_JOB,
        payload: fetch_job
    }
}

export const clearCurrentFetchJob = () => {
    return {
        type: CLEAR_CURRENT_FETCH_JOB,
    }
}

// fetch actions
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
    let hashtag

    if (result.graphql) {
        edges = [...result.graphql.hashtag.edge_hashtag_to_media.edges]
        has_next_page = result.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page
        hashtag = result.graphql.hashtag.name
        if (has_next_page)
            end_cursor = result.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor
    }
    else if (result.data) {
        edges = [...result.data.hashtag.edge_hashtag_to_media]
        has_next_page = result.data.hashtag.edge_hashtag_to_media.page_info.has_next_page
        hashtag = result.data.hashtag.name
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

    getInfluencersByIDs(media_ids, hashtag)

    // if (has_next_page) {
    //     // get next page
    // }

    return media_ids
}

// export const getNextPagePending = () => {
//     return {
//         type: GET_NEXT_PAGE_PENDING
//     }
// }

// export const getNextPageSuccess = result => {
//     return {
//         type: GET_NEXT_PAGE_SUCCESS,
//         payload: result
//     }
// }

// export const getNextPageError = error => {
//     return {
//         type: GET_NEXT_PAGE_ERROR,
//         error: error
//     }
// }

export const getUserByIDPending = () => {
    return {
        type: GET_USER_BY_ID_PENDING
    }
}

export const getInfluencersByIDs = (media_ids, hashtag) => {
    getUserByIDPending()
    media_ids.forEach(id => {
        setInterval(() => fetch(INSTAGRAM_GET_USER_BY_ID(id))
            .then(result => result.json())
            .then(res => {
                if (res.error) {
                    console.log((res.error));
                }
                getUserByIDSuccess(res, hashtag)
            })
            .catch(error => {
                getUserByIDError(error)
            })
            , 20000)
    })

    return
}

export const getUserByIDSuccess = (result, hashtag) => {
    let user = { ...result.data.user.reel.user }

    setInterval(() => fetch(INSTAGRAM_GET_USER_BY_USERNAME(user.username))
        .then(result => result.json())
        .then(res => {
            if (res.error) {
                console.log((res.error));
            }
            getUserByUsernameSuccess(res, hashtag)
        })
        .catch(error => {
            getUserByUsernameError(error)
        })
        , 40000)

    return result
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

export const getUserByUsernameSuccess = (result, hashtag) => {
    const user = { ...result.graphql.user }
    let user_obj = {
        biography: user.biography,
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        full_name: user.full_name,
        id: user.id,
        is_business_account: user.is_business_account,
        is_private: user.is_private,
        profile_pic_url: user.profile_pic_url,
        username: user.username,
        media_count: user.edge_owner_to_timeline_media.count
    }

    addInfluencer(user_obj, hashtag)
    return result
}

export const getUserByUsernameError = error => {
    return {
        type: GET_USER_BY_USERNAME_ERROR,
        error: error
    }
}

//DB
export const addFetchJob = (user_id, project_id, fetch_job) => {
    const fj_add = db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        title: fetch_job.value.title,
        date_created: fetch_job.value.date_created,
        hashtag: fetch_job.value.hashtag || '',
        location: fetch_job.value.location || '',
        criteria: String(fetch_job.criteria),
        status: 'pending'
    });

    const key = fj_add.key
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${key}`).update({
        id: key
    })
}

export const updateFetchJob = (user_id, project_id, fetch_job) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${fetch_job.id}`).update({
        status: fetch_job.status
    });
}

export const removeFetchJob = (user_id, project_id, fetchJob_id) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).child(fetchJob_id).remove()
}


