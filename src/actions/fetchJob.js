import { db } from '../database/config/db';
import { DB_PROJECT_FETCH_JOBS_REF, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_ERROR, SET_CURRENT_FETCH_JOB, SET_RUNNING_FETCH_JOB, GET_MEDIA_BY_HASHTAG_PENDING, GET_MEDIA_BY_HASHTAG_ERROR, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR, CLEAR_CURRENT_FETCH_JOB, ADD_FETCH_JOB, UPDATE_FETCH_JOB, REMOVE_FETCH_JOB, UPDATE_FETCH_JOB_STATUS, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_USER_BY_ID_SUCCESS, CLEAR_RUNNING_FETCH_JOB } from '../constants';
import { addInfluencer } from './influencer';
import { INSTAGRAM_GET_USER_BY_ID, INSTAGRAM_GET_USER_BY_USERNAME, INSTAGRAM_GET_MEDIA_BY_HASHTAG } from '../constants/endpoints';

let PROJECT_ID, USER_ID, RUNNING_FETCH_JOB

export const getProjectFetchJobs = (user_id, project_id) => {
    const fetch_jobs = []

    DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).on('value', fj_snapshot => {

        fj_snapshot.forEach(fj_snap => {
            const fj = {
                title: fj_snap.val().details.title,
                status: fj_snap.val().status,
                date_created: fj_snap.val().details.date_created,
                hashtag: fj_snap.val().details.hashtag,
                location: fj_snap.val().details.location,
                criteria: fj_snap.val().details.criteria,
                id: fj_snap.val().details.id,
            }
            fetch_jobs.push(fj)

        })

    })
    if (fetch_jobs.length == 0) {
        const error = { type: 'no fetch jobs' }
        return {
            type: SET_FETCH_JOBS_ERROR,
            error: error
        }
    } else {
        return {
            type: SET_FETCH_JOBS_SUCCESS,
            fetch_jobs: fetch_jobs
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
        fetch_job: fetch_job
    }
}

export const clearRunningFetchJob = fetch_job => {
    return {
        type: CLEAR_RUNNING_FETCH_JOB,
        payload: fetch_job
    }
}

export const clearCurrentFetchJob = () => {
    return {
        type: CLEAR_CURRENT_FETCH_JOB,
    }
}


export const fetchMedia = (running_fetch_job, user_id, project_id) => {
    let response = {}
    fetch(INSTAGRAM_GET_MEDIA_BY_HASHTAG(running_fetch_job.hashtag))
        .then(result => {
            if (result.ok) {
                result.json().then(res => {
                    // extractInfluencerIDs(res)
                    response = { type: 'success', message: 'extracting influencer IDs' }
                    const fj = { ...running_fetch_job, result: response, status: 'completed' }
                    updateFetchJob(USER_ID, PROJECT_ID, fj)

                    return {
                        type: GET_MEDIA_BY_HASHTAG_SUCCESS,
                        payload: response
                    }
                })
            }
        })
        .catch(error => {
            response = { type: 'error', message: error }
            const fj = { ...running_fetch_job, result: response, status: 'completed' }
            updateFetchJob(USER_ID, PROJECT_ID, fj)
            return {
                type: GET_MEDIA_BY_HASHTAG_ERROR,
                error: response
            }
        })

    response = { type: 'error', message: 'no destination' }
    const fj = { ...running_fetch_job, result: response, status: 'completed' }
    updateFetchJob(USER_ID, PROJECT_ID, fj)

    return {
        type: GET_MEDIA_BY_HASHTAG_ERROR,
        error: response
    }


}


// fetch actions
export const getMediaByHashtagPending = fetch_job => {
    return {
        type: GET_MEDIA_BY_HASHTAG_PENDING,
        fetch_job: fetch_job
    }
}

export const getMediaByHashtagSuccess = result => {
    console.log(result)
    // extractInfluencerIDs(result)
    return result
}

export const getMediaByHashtagError = error => {
    return {
        type: GET_MEDIA_BY_HASHTAG_ERROR,
        error: error
    }
}

export const extractInfluencerIDs = result => {
    console.log('in extract influencers: ')
    console.log(result)
    // let edges = []
    // let has_next_page = false
    // let end_cursor
    const media_ids = []

    // if (result.graphql) {
    //     edges = [...result.graphql.hashtag.edge_hashtag_to_media.edges]
    //     has_next_page = result.graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page
    //     if (has_next_page)
    //         end_cursor = result.graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor
    // }
    // else if (result.data) {
    //     edges = [...result.data.hashtag.edge_hashtag_to_media]
    //     has_next_page = result.data.hashtag.edge_hashtag_to_media.page_info.has_next_page
    //     if (has_next_page)
    //         end_cursor = result.data.hashtag.edge_hashtag_to_media.page_info.end_cursor
    // }
    // else if (result.status == 'fail') {
    //     console.log("Failed fetch: " + result.message)
    // } else {
    //     console.log(result)
    // }

    // if (edges.length > 0) {
    //     edges.forEach(edge => {
    //         media_ids.push(edge.node.owner.id)
    //     })
    //     getUserByIDs(media_ids)
    // }

    // // if (has_next_page) {
    // //     // get next page
    // // }

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

export const getUserByIDs = media_ids => {
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

export const getUserByIDPending = () => {
    return {
        type: GET_USER_BY_ID_PENDING
    }
}

export const getUserByIDSuccess = result => {
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
        type: GET_USER_BY_ID_SUCCESS,
        success: { type: 'success', message: 'successfully fetched users by ID' }
    }
}

export const getUserByIDError = error => {
    console.log(error)
    return {
        type: GET_USER_BY_ID_ERROR,
        error: error,
        hashtag: RUNNING_FETCH_JOB.hashtag
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

    addInfluencer(user_obj, RUNNING_FETCH_JOB.hashtag)

    return {
        type: GET_USER_BY_USERNAME_SUCCESS,
        payload: RUNNING_FETCH_JOB.hashtag
    }
}

export const getUserByUsernameError = error => {
    return {
        type: GET_USER_BY_USERNAME_ERROR,
        error: error,
        hashtag: RUNNING_FETCH_JOB.hashtag
    }
}

//DB
export const addFetchJob = (user_id, project_id, fetch_job) => {
    let fj_obj = {
        details: {
            title: fetch_job.value.title,
            date_created: fetch_job.value.date_created,
            hashtag: fetch_job.value.hashtag || '',
            location: fetch_job.value.location || '',
            criteria: String(fetch_job.criteria),
        },
        status: 'pending',
        result: {}
    }

    const fj_add = db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        ...fj_obj
    });


    const key = fj_add.key
    fj_obj = { ...fj_obj, id: key }
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${key}`).update({
        details: { ...fj_obj }
    })

    return {
        type: ADD_FETCH_JOB,
        fetch_job: fj_obj
    }
}

export const updateFetchJob = (user_id, project_id, fetch_job) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${fetch_job.id}`).update({
        ...fetch_job
    });
}

export const removeFetchJob = (user_id, project_id, fetchJob) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).child(fetchJob.id).remove()

    return {
        type: REMOVE_FETCH_JOB,
        payload: fetchJob
    }
}

