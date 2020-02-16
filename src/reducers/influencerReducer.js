import { SET_CURRENT_FETCH_JOB, DB_USER_REF, GET_ALL_INFLUENCERS, SET_CURRENT_INFLUENCER } from '../constants';

const initialState = {
    influencers: [],
    current_influencer: {},
    pending: true,
    error: null
};

const influencerReducer = (state = initialState, action) => {
    let updated_state = { ...state }

    switch (action.type) {
        case GET_ALL_INFLUENCERS:
            updated_state.influencers = [...action.payload]
            return {
                ...updated_state
            };
        case SET_CURRENT_INFLUENCER:
            updated_state.current_influencer = action.payload
            return {
                ...updated_state
            };
        default:
            return state;
    }
}

export const getAllInfluencers = state => state.influencer.influencers
export const getCurrentInfluencer = state => state.influencer.current_influencer

export default influencerReducer;