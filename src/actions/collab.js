import { db } from '../database/config/db';
import { DB_USER_PROJECTS_REF, SET_PROJECTS_PENDING, SET_CURRENT_PROJECT, SET_PROJECTS_SUCCESS, SET_PROJECTS_ERROR, CLEAR_CURRENT_PROJECT, ADD_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT, DB_USER_COLLABS_REF, CLEAR_CURRENT_COLLAB, SET_CURRENT_COLLAB, ADD_COLLAB, UPDATE_COLLAB, REMOVE_COLLAB, SET_COLLABS_PENDING, SET_COLLABS_ERROR, SET_COLLABS_SUCCESS } from '../constants';
import { DATE_TODAY } from '../constants/TodayDate'

export const getUserCollabs = user_id => {
    const collabs = []

    DB_USER_COLLABS_REF(user_id).on('value', collab_snapshot => {
        collab_snapshot.forEach(collab_snap => {
            collabs.push(collab_snap.val())
        })
    })

    if (collabs.length == 0) {
        let error = { type: 'no collabs' }
        return {
            type: SET_COLLABS_ERROR,
            message: error
        }
    } else {
        return {
            type: SET_COLLABS_SUCCESS,
            collabs: collabs
        }
    }
}

export const setCollabsPending = () => {

    return {
        type: SET_COLLABS_PENDING,
    }
}

export const clearCurrentCollab = () => {
    return {
        type: CLEAR_CURRENT_COLLAB,
    }
}

export const setCurrentCollab = collab => {
    return {
        type: SET_CURRENT_COLLAB,
        collab: collab
    }
}

export const addCollab = (user_id, project_id, collab) => {
    let collab_obj = {
        ...collab,
        description: collab.description || '',
        date_created: DATE_TODAY,
        id: '',
        influencer: collab.influencer,
        user_id: user_id,
        project_id: project_id
    }

    const collab_add = db.ref(`/Users/${user_id}/Collabs/`).push({
        details: { ...collab_obj }
    })

    const key = collab_add.key
    collab_obj = { ...collab_obj, id: key }
    db.ref(`/Users/${user_id}/Collabs/${key}`).update({
        details: { ...collab_obj }
    })

    return {
        type: ADD_COLLAB,
        collab: collab_obj
    }
}

export const updateCollab = (user_id, collab) => {

    db.ref(`/Users/${user_id}/Collabs/${collab.id}/details`).update({
        ...collab
    });

    return {
        type: UPDATE_COLLAB,
        collab: collab
    }


}

export const removeCollab = (user_id, collab) => {
    db.ref(`/Users/${user_id}/Collabs`).child(collab.id).remove()

    return {
        type: REMOVE_COLLAB,
        collab: collab
    }
}

