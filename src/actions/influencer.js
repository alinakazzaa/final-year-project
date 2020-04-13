import { db } from '../database/config/db'
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_CURRENT_INFLUENCER, REMOVE_INFLUENCER } from '../constants'
import { SET_INFLUENCERS_ERROR, SET_INFLUENCERS_PENDING, SET_INFLUENCERS_SUCCESS } from '../constants/response/types'
import { MSG_NO_INFLUENCERS } from '../constants/response/messages'

export const getAllInfluencers = fetch_job => {
    return dispatch => {

        const influencers = []
        dispatch(getInfluencersPending())

        fetch_job.influencers.success.forEach(id => {
            db.ref(`Influencers/${id}`).once('value', snapshot => {
                influencers.push(snapshot.val())

                if (influencers.length == fetch_job.influencers.success.length)
                    if (influencers.length > 0) {
                        dispatch(getInfluencersSuccess(influencers))
                    } else {
                        dispatch(getInfluencersError())
                    }
            })
        })


    }
}

export const getInfluencersPending = () => {

    return {
        type: SET_INFLUENCERS_PENDING
    }
}

export const getInfluencersSuccess = influencers => {
    return {
        type: SET_INFLUENCERS_SUCCESS,
        influencers
    }
}

export const getInfluencersError = () => {
    return {
        type: SET_INFLUENCERS_ERROR,
        message: MSG_NO_INFLUENCERS
    }
}

export const setCurrentInfluencer = influencer => {
    return {
        type: SET_CURRENT_INFLUENCER,
        influencer: influencer
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

export const updateInfluencer = (hashtag, influencer) => {
    db.ref(`/Influencers/hashtags/${hashtag}/${influencer.id}`).update({
        ...influencer
    })
}

export const removeInfluencer = (fetch_job, influencer_id) => {
    return dispatch => {
        db.ref(`/Influencers/hashtags/${fetch_job.details.hashtag}`).child(influencer_id).remove()
        db.ref(`/Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/ ` +
            `FetchJobs/${fetch_job.details.id}/influencers/success`).child(influencer_id).remove()

        dispatch({
            type: REMOVE_INFLUENCER,
            id: influencer_id
        })
    }
}

export const getInfluByUsername = username => {
    let influ_obj = {}
    db.ref('/Influencers').on('value', (influ_snapshot) => {
        influ_snapshot.forEach(influ_snap => {
            if (influ_snap.val().username == username) {
                influ_obj = { ...influ_snap.val() }
            }
        })
    })

    return influ_obj
}

export const filterInfluencers = (influencers, status) => {
    return [...influencers.filter(influ => influ.to_do == status)]
}