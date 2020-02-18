import { db } from '../database/config/db';
import { DB_PROJECT_FETCH_JOBS_REF, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_ERROR, SET_CURRENT_FETCH_JOB, SET_RUNNING_FETCH_JOB, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR, CLEAR_CURRENT_FETCH_JOB, ADD_FETCH_JOB, UPDATE_FETCH_JOB, REMOVE_FETCH_JOB, UPDATE_FETCH_JOB_STATUS, GET_MEDIA_BY_HASHTAG_SUCCESS } from '../constants';
import { addInfluencer } from './influencer';
import { INSTAGRAM_GET_USER_BY_ID, INSTAGRAM_GET_USER_BY_USERNAME } from '../constants/endpoints';

let HASHTAG = ''

export const getProjectFetchJobs = (user_id, project_id) => {

    const completed = []
    const running = []
    const pending = []

    DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).on('value', fj_snapshot => {
        fj_snapshot.forEach(fj_snap => {
            const fj = {
                title: fj_snap.val().details.title,
                status: fj_snap.val().details.status,
                date_created: fj_snap.val().details.date_created,
                hashtag: fj_snap.val().details.hashtag,
                location: fj_snap.val().details.location,
                criteria: fj_snap.val().details.criteria,
                id: fj_snap.val().details.id,
            }
            if (fj.status == 'completed') {
                pending.push(fj)
            } else if (fj.status == 'running') {
                running.push(fj)
            } else {
                completed.push(fj)
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
            pending: pending
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
    getInfluencerIds(result)
    return result
}

export const getInitialCursorError = error => {
    return {
        type: GET_MEDIA_BY_HASHTAG_ERROR,
        error: error
    }
}

export const getInfluencerIds = result => {
    let edges = []
    let has_next_page = false
    let end_cursor
    const media_ids = []

    if (result.graphql) {
        edges = [...result.graphql.hashtag.edge_hashtag_to_media.edges]
        has_next_page = result.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page
        HASHTAG = result.graphql.hashtag.name
        if (has_next_page)
            end_cursor = result.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor
    }
    else if (result.data) {
        edges = [...result.data.hashtag.edge_hashtag_to_media]
        has_next_page = result.data.hashtag.edge_hashtag_to_media.page_info.has_next_page
        HASHTAG = result.data.hashtag.name
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
        getInfluencersByIDs(media_ids, HASHTAG)
    }

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
                    getUserByIDError(res.error);
                } else {
                    getUserByIDSuccess(res)
                }

            })
            .catch(error => {
                getUserByIDError(error)
            })
            , 50000)
    })
    return media_ids
}

export const getUserByIDSuccess = (result) => {
    let user = { ...result.data.user.reel.user }
    getUserByUsernamePending()
    setInterval(() => fetch(INSTAGRAM_GET_USER_BY_USERNAME(user.username))
        .then(result => result.json())
        .then(res => {
            if (res.error) {
                getUserByUsernameError(res.error)
            } else {
                getUserByUsernameSuccess(res)
            }

        })
        .catch(error => {
            getUserByUsernameError(error)
        })
        , 50000)

    return {
        type: GET_USER_BY_USERNAME_SUCCESS,
        payload: HASHTAG
    }
}

export const getUserByIDError = error => {
    console.log(error)
    return {
        type: GET_USER_BY_ID_ERROR,
        error: error,
        hashtag: HASHTAG
    }
}

export const getUserByUsernamePending = () => {
    return {
        type: GET_USER_BY_USERNAME_PENDING
    }
}

export const getUserByUsernameSuccess = result => {
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

    addInfluencer(user_obj, HASHTAG)

    return {
        type: GET_USER_BY_USERNAME_SUCCESS,
        payload: HASHTAG
    }
}

export const getUserByUsernameError = error => {
    return {
        type: GET_USER_BY_USERNAME_ERROR,
        error: error,
        hashtag: HASHTAG
    }
}

//DB
export const addFetchJob = (user_id, project_id, fetch_job) => {
    let fj_obj = {
        title: fetch_job.value.title,
        date_created: fetch_job.value.date_created,
        hashtag: fetch_job.value.hashtag || '',
        location: fetch_job.value.location || '',
        criteria: String(fetch_job.criteria),
        status: 'pending'
    }
    const fj_add = db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        details: { ...fj_obj }
    });


    const key = fj_add.key
    fj_obj = { ...fj_obj, id: key }
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${key}`).update({
        details: { ...fj_obj }
    })

    return {
        type: ADD_FETCH_JOB,
        payload: fj_obj
    }
}

export const updateFetchJobStatus = (user_id, project_id, fetch_job) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${fetch_job.id}/details`).update({
        ...fetch_job
    });

    return {
        type: UPDATE_FETCH_JOB_STATUS,
        payload: fetch_job
    }

}

export const removeFetchJob = (user_id, project_id, fetchJob) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).child(fetchJob.id).remove()

    return {
        type: REMOVE_FETCH_JOB,
        payload: fetchJob
    }
}

