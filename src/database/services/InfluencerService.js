import { db } from '../config/db';

export const addInfluencer = (influencer, hashtag) => {
    // console.log(influencer, hashtag)
    db.ref(`/Influencers/hashtags/${hashtag}`).child(influencer.id).set({
        ...influencer
    })
}

