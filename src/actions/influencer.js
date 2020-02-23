import { db } from '../database/config/db';
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_INFLUENCERS_SUCCESS, SET_INFLUENCERS_PENDING, SET_INFLUENCERS_ERROR, SET_CURRENT_INFLUENCER } from '../constants';

export const getAllInfluencers = (user_id, project_id, fetch_job) => {
    getInfluencersPending()
    let influencers = []
    let influencers_success = []

    db.ref(`Users/${user_id}/Projects/${project_id}/FetchJobs/${fetch_job.id}/influencers/success`).on('value', (success) => {
        influencers = [...success.val()]
    });

    influencers.forEach(influ => {
        db.ref('Influencers/').on('value', (influ_snapshot) => {
            influ_snapshot.forEach(influ_snap => {
                if (influ_snap.key == influ.id)
                    influencers_success.push(influ_snap.val())
            })
        });

    })

    if (influencers_success.length > 0) {
        return {
            type: SET_INFLUENCERS_SUCCESS,
            payload: influencers_success
        }
    } else {
        let error = { type: 'no influencers' }
        return {
            type: SET_INFLUENCERS_ERROR,
            error: error
        }
    }
}

export const getInfluencersPending = () => {

    return {
        type: SET_INFLUENCERS_PENDING,
    }
}

export const setCurrentInfluencer = influencer => {
    return {
        type: SET_CURRENT_INFLUENCER,
        payload: influencer
    }
}

export const addInfluencer = influencer => {
    db.ref('/Influencers').child(influencer.id).set({
        ...influencer,
        profile_url: `https://www.instagram.com/${influencer.username}/`,
        date_added: DATE_TODAY
    })
}

export const updateInfluencer = (hashtag, influencer) => {
    db.ref(`/Influencers/hashtags/${hashtag}/${influencer.id}`).update({
        ...influencer
    });
}

export const removeInfluencer = (hashtag, influencer_id) => {
    db.ref(`/Influencers/hashtags/${hashtag}`).child(influencer_id).remove()
}