import { db } from '../config/db';
import { DATE_TODAY } from '../../constants/TodayDate'

export const addInfluencer = (influencer, hashtag) => {
    // console.log(influencer, hashtag)
    db.ref(`/Influencers/hashtags/${hashtag}`).child(influencer.id).set({
        ...influencer, date_added: DATE_TODAY
    })
}

