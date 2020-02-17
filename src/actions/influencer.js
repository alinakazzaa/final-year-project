import { db } from '../database/config/db';
import { DATE_TODAY } from '../constants/TodayDate'
import { SET_INFLUENCERS_SUCCESS, SET_INFLUENCERS_PENDING, SET_INFLUENCERS_ERROR, SET_CURRENT_INFLUENCER } from '../constants';

export const getAllInfluencers = hashtag => {
    const influencers = []
    db.ref(`Influencers/hashtags/${hashtag}`).on('value', (influ_snapshot) => {
        influ_snapshot.forEach(influ_snap => {
            influencers.push(influ_snap.val())
        })
    });

    if (influencers.length == 0) {
        let error = { type: 'no projects' }
        return {
            type: SET_INFLUENCERS_ERROR,
            error: error
        }
    } else {
        return {
            type: SET_INFLUENCERS_SUCCESS,
            payload: influencers
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

export const addInfluencer = (influencer, hashtag) => {
    db.ref(`/Influencers/hashtags/${hashtag}`).child(influencer.id).set({
        ...influencer,
        profile_url: `https://www.instagram.com/${influencer.username}/`,
        date_added: DATE_TODAY
    })
}

export const updateInfluencer = (hashtag, influencer) => {
    console.log(influencer)
    db.ref(`/Influencers/hashtags/${hashtag}/${influencer.id}`).update({
        ...influencer
    });
}

export const removeInfluencer = (hashtag, influencer_id) => {
    db.ref(`/Influencers/hashtags/${hashtag}`).child(influencer_id).remove()
}