import { db } from '../database/config/db';
import { CLEAR_CURRENT_COLLAB, SET_CURRENT_COLLAB, ADD_COLLAB, UPDATE_COLLAB, REMOVE_COLLAB, CLEAR_COLLAB_STATE } from '../constants';
import { DATE_TODAY } from '../constants/TodayDate'
import { DB_USER_COLLABS_REF } from '../constants/database';
import { SET_COLLABS_ERROR, SET_COLLABS_SUCCESS, SET_COLLABS_PENDING, GET_COLLAB_INFLUENCER_SUCCESS, GET_COLLAB_INFLUENCER_ERROR } from '../constants/response/types';
import { MSG_NO_COLLABS } from '../constants/response/messages';


export const getUserCollabs = user_id => {
    return dispatch => {

        dispatch(setCollabsPending())

        const collabs = []

        DB_USER_COLLABS_REF(user_id).once('value', collabSnapshot => {
            collabSnapshot.forEach(collab => {
                const collabItem = {
                    ...collab.val()
                }
                collabs.push(collabItem)
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

export const clearCollabState = () => {
    return {
        type: CLEAR_COLLAB_STATE
    }
}

export const addCollab = (user_id, project_id, collabValue) => {
    return dispatch => {
        let collab = {
            details: {
                ...collabValue.details,
                compensation: collabValue.details.compensation || '',
                date_created: DATE_TODAY,
                user_id: user_id,
                project_id: project_id,
                id: '',
                tags: collabValue.details.tags || []
            }
        }

        db.ref(`/Users/${user_id}/Collabs/`).push({
            ...collab,
        }).then(data => {
            collab.details.id = data.key

            db.ref(`/Users/${user_id}/Collabs/${data.key}/details`).update({
                id: data.key
            })

            dispatch({
                type: ADD_COLLAB,
                collab
            })
        })
    }

}

export const updateCollab = collab => {
    return dispatch => {
        db.ref(`/Users/${collab.details.user_id}/Collabs/${collab.details.id}`).update({
            ...collab
        })

        dispatch({
            type: UPDATE_COLLAB,
            collab
        })
    }

}

export const removeCollab = collab => {
    db.ref(`/Users/${collab.details.user_id}/Collabs/${collab.details.id}`).remove()

    return {
        type: REMOVE_COLLAB,
        collabId: collab.details.id
    }
}

export const filterCollabs = (collabs, active) => {
    return [...collabs.filter(collab => collab.details.active == active)]
}

export const fetchCollabInfluencer = (collab, pending) => {
    return dispatch => {
        dispatch(pending())
        db.ref(`Influencers/${collab.details.influencer}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val().id) {
                    dispatch(updateCollab({ details: { ...collab.details, influencer: snapshot.val() } }))
                    dispatch({ type: GET_COLLAB_INFLUENCER_SUCCESS })
                } else {
                    dispatch({ type: GET_COLLAB_INFLUENCER_ERROR })
                }
            })
    }
}

