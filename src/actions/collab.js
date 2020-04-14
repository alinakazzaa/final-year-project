import { db } from '../database/config/db';
import { CLEAR_CURRENT_COLLAB, SET_CURRENT_COLLAB, ADD_COLLAB, UPDATE_COLLAB, REMOVE_COLLAB } from '../constants';
import { DATE_TODAY } from '../constants/TodayDate'
import { DB_USER_COLLABS_REF } from '../constants/database';
import { SET_COLLABS_ERROR, SET_COLLABS_SUCCESS, SET_COLLABS_PENDING } from '../constants/response/types';
import { MSG_NO_COLLABS } from '../constants/response/messages';

export const getUserCollabs = user_id => {
    const collabs = []

    return dispatch => {

        dispatch(setCollabsPending())

        DB_USER_COLLABS_REF(user_id).on('value', collab_snapshot => {
            collab_snapshot.forEach(collab => {
                collabs.push(collab.val())
            })

            if (collabs.length == 0) {
                dispatch(setCollabsError())
            } else {
                dispatch(setCollabsSuccess(collabs))
            }
        })
    }
}

export const setCollabsPending = () => {

    return {
        type: SET_COLLABS_PENDING
    }
}

export const setCollabsSuccess = collabs => {

    return {
        type: SET_COLLABS_SUCCESS,
        collabs
    }
}

export const setCollabsError = () => {

    return {
        type: SET_COLLABS_ERROR,
        message: MSG_NO_COLLABS
    }
}

export const clearCurrentCollab = () => {
    return {
        type: CLEAR_CURRENT_COLLAB
    }
}

export const setCurrentCollab = collab => {
    return {
        type: SET_CURRENT_COLLAB,
        collab
    }
}

export const addCollab = (user_id, project_id, collab_val) => {
    let collab = {
        ...collab_val,
        description: collab_val.description || '',
        date_created: DATE_TODAY,
        id: '',
        influencer: collab_val.influencer,
        user_id: user_id,
        project_id: project_id
    }
    db.ref(`/Users/${user_id}/Collabs/`).push({
        details: { ...collab }
    }).then(data => {
        collab.id = data.key

        db.ref(`/Users/${user_id}/Collabs/${data.key}/details`).update({
            id: data.key
        })
    })

    return {
        type: ADD_COLLAB,
        collab
    }
}

export const updateCollab = (user_id, collab) => {
    db.ref(`/Users/${user_id}/Collabs/${collab.id}/details`).update({
        ...collab
    })

    return {
        type: UPDATE_COLLAB,
        collab
    }
}

export const removeCollab = collab => {
    db.ref(`/Users/${collab.user_id}/Collabs`).child(collab.id).remove()
    return {
        type: REMOVE_COLLAB,
        collab: collab
    }
}

export const filterCollabs = (collabs, active) => {
    return [...collabs.filter(collab => collab.details.active == active)]
}

