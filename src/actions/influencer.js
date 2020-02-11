import { GET_ALL_INFLUENCERS } from '../constants';

export const getAllInfluencers = hashtag => {
    return {
        type: GET_ALL_INFLUENCERS,
        payload: hashtag
    }
}