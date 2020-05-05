import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_CURRENT_INFLUENCER, REMOVE_INFLUENCER, UPDATE_INFLUENCER, CLEAR_INFLUENCER_STATE, CLEAR_CURRENT_INFLUENCER, GET_INFLUENCER_BY_USERNAME } from '../constants'
import { SET_INFLUENCERS_ERROR, SET_INFLUENCERS_PENDING, SET_INFLUENCERS_SUCCESS, REMOVE_INFLUENCER_FROM_FETCH_JOB } from '../constants/response/types'
import { MSG_NO_INFLUENCERS } from '../constants/response/messages'

export const getAllInfluencers = fetch_job => {

    return dispatch => {
        const influencers = []
        dispatch(setInfluencersPending())

        db.ref(`Influencers/`).once('value', snapshot => {
            let influencer
            if (snapshot !== null)
                fetch_job.influencers.success.forEach(id => {
                    influencer = snapshot.child(id).val()
                    if (influencer !== null)
                        influencers.push(influencer)
                })

        }).then(() => {
            if (influencers.length > 0) {
                dispatch(setInfluencersSuccess(influencers))
            } else {
                dispatch(setInfluencersError())
            }
        })
    }
}

export const setInfluencersPending = () => {

    return {
        type: SET_INFLUENCERS_PENDING
    }
}

export const setInfluencersSuccess = influencers => {

    return {
        type: SET_INFLUENCERS_SUCCESS,
        influencers
    }
}

export const setInfluencersError = () => {
    return {
        type: SET_INFLUENCERS_ERROR,
        message: MSG_NO_INFLUENCERS
    }
}

export const setCurrentInfluencer = influencer => {
    return {
        type: SET_CURRENT_INFLUENCER,
        influencer
    }
}

export const addInfluencer = influencer => {
    db.ref('/Influencers').child(influencer.id).set({
        ...influencer,
        profile_url: `https://www.instagram.com/${influencer.username}/`,
        date_added: DATE_TODAY,
        to_do: true
    })
}

export const updateInfluencer = influencer => {

    db.ref(`/Influencers/${influencer.id}`).update({
        ...influencer
    })

    return {
        type: UPDATE_INFLUENCER,
        influencer
    }
}

export const removeInfluencer = influencer_id => {

    db.ref(`/Influencers/${influencer_id}`).remove()

    return {
        type: REMOVE_INFLUENCER,
        id: influencer_id
    }
}

export const filterInfluencers = (influencers, status) => {
    return [...influencers.filter(influ => influ.to_do == status)]
}

export const clearCurrentInfluencer = () => {
    return {
        type: CLEAR_CURRENT_INFLUENCER
    }
}

export const clearInfluencerState = () => {
    return {
        type: CLEAR_INFLUENCER_STATE
    }
}