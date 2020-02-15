import { db } from '../database/config/db';
import { DATE_TODAY } from '../constants/TodayDate'
import { GET_ALL_INFLUENCERS } from '../constants';

export const getAllInfluencers = hashtag => {
    const influencers = []
    db.ref(`Influencers/hashtags/${hashtag}`).on('value', (influ_snapshot) => {
        influ_snapshot.forEach(influ_snap => {
            influencers.push(influ_snap.val())
        })
    });

    return {
        type: GET_ALL_INFLUENCERS,
        payload: influencers
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
    // db.ref(`/Influencers/hashtags/${hashtag}/${influencer.id}`).update({
    //     ...influencer
    // });


}