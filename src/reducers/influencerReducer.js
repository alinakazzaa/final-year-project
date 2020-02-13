import { SET_CURRENT_FETCH_JOB, DB_USER_REF, GET_ALL_INFLUENCERS, SET_CURRENT_INFLUENCER } from '../constants';

const initialState = {
    influencers: [],
    current_influencer: {}
};

const influencerReducer = (state = initialState, action) => {
    let updated_state = { ...state }

    switch (action.type) {
        case GET_ALL_INFLUENCERS:
            updated_state.influencers = [...action.payload]
            return {
                ...updated_state
            };
        default:
            return state;
    }
}

export default influencerReducer;