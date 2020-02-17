import { SET_CURRENT_FETCH_JOB, DB_USER_REF, SET_INFLUENCERS_SUCCESS, SET_INFLUENCERS_PENDING, SET_INFLUENCERS_ERROR, SET_CURRENT_INFLUENCER } from '../constants';

const initialState = {
    influencers: [],
    current_influencer: {},
    pending: null,
    error: null
};

const influencerReducer = (state = initialState, action) => {
    let updated_state = { ...state }

    switch (action.type) {
        case SET_INFLUENCERS_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            };
        case SET_INFLUENCERS_SUCCESS:
            updated_state.influencers = [...action.payload]
            return {
                ...updated_state
            };
        case SET_INFLUENCERS_ERROR:
            updated_state.pending = false
            updated_state.error = action.error
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