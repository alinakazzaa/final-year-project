import { SET_CURRENT_FETCH_JOB, DB_USER_REF, GET_ALL_INFLUENCERS, SET_CURRENT_INFLUENCER } from '../constants';
import { db } from '../database/config/db';

const initialState = {
    influencers: [],
    current_influencer: {}
};

const influencerReducer = (state = initialState, action) => {
    let updated_state = { ...state }

    switch (action.type) {
        case GET_ALL_INFLUENCERS:
            let hashtag = action.payload
            let influencers = []
            db.ref(`Influencers/hashtags/${hashtag}`).on('value', (influ_snapshot) => {
                influ_snapshot.forEach(influ_snap => {
                    influencers.push(influ_snap.val())
                })
            });

            updated_state.influencers = influencers
            return {
                ...updated_state
            };
        default:
            return state;
    }
}

export default influencerReducer;