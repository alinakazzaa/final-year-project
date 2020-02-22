import { db } from '../database/config/db';
import { DB_PROJECT_FETCH_JOBS_REF, SET_FETCH_JOBS_SUCCESS, SET_FETCH_JOBS_PENDING, SET_FETCH_JOBS_ERROR, SET_CURRENT_FETCH_JOB, SET_RUNNING_FETCH_JOB, CLEAR_RUNNING_FETCH_JOB, UPDATE_FETCH_JOB_STATUS, ADD_FETCH_JOB, REMOVE_FETCH_JOB } from '../constants';

export const getProjectFetchJobs = (user_id, project_id) => {
    const fetch_jobs = []

    DB_PROJECT_FETCH_JOBS_REF(user_id, project_id).on('value', fj_snapshot => {

        fj_snapshot.forEach(fj_snap => {
            const fj = {
                title: fj_snap.val().title,
                status: fj_snap.val().status,
                date_created: fj_snap.val().date_created,
                hashtag: fj_snap.val().hashtag,
                location: fj_snap.val().location,
                criteria: fj_snap.val().criteria,
                id: fj_snap.val().id,
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

//DB
export const addFetchJob = (user_id, project_id, fetch_job) => {
    let fj_obj = {
        title: fetch_job.value.title,
        date_created: fetch_job.value.date_created,
        hashtag: fetch_job.value.hashtag || '',
        location: fetch_job.value.location || '',
        criteria: String(fetch_job.criteria),
        status: 'pending',
        result: {}
    }

    const fj_add = db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).push({
        ...fj_obj
    });


    const key = fj_add.key
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs/${key}`).update({
        id: key
    })

    fj_obj = { ...fj_obj, id: key }

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

export const removeFetchJob = (user_id, project_id, fetch_job) => {
    db.ref(`/Users/${user_id}/Projects/${project_id}/FetchJobs`).child(fetch_job.id).remove()

    return {
        type: REMOVE_FETCH_JOB,
        payload: fetch_job
    }
}

