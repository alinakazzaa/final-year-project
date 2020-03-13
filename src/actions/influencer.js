import { db } from '../database/config/db';
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_INFLUENCERS_SUCCESS, SET_INFLUENCERS_PENDING, SET_INFLUENCERS_ERROR, SET_CURRENT_INFLUENCER } from '../constants';

export const getAllInfluencers = fetch_job => {

    getInfluencersPending()

    let influencers = []
    let influencers_success = []

    db.ref(`Users/${fetch_job.details.user_id}/Projects/${fetch_job.details.project_id}/FetchJobs/${fetch_job.details.id}/influencers/success`).on('value', (success) => {
        influencers = success.val()
    });


    influencers.forEach(id => {
        db.ref('Influencers/').on('value', (influ_snapshot) => {
            influ_snapshot.forEach(influ_snap => {
                if (influ_snap.key == id)
                    influencers_success.push(influ_snap.val())
            })
        });

    })

    if (influencers_success.length > 0) {
        return {
            type: SET_INFLUENCERS_SUCCESS,
            influencers: influencers_success
        }
    } else {
        let error = { type: 'no influencers' }
        return {
            type: SET_INFLUENCERS_ERROR,
            message: error
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
        date_added: DATE_TODAY,
        to_do: true
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