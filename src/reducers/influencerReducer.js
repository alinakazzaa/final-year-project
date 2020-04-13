import { SET_INFLUENCERS_PENDING, SET_INFLUENCERS_SUCCESS, SET_INFLUENCERS_ERROR } from "../constants/response/types"
import { SET_CURRENT_INFLUENCER, REMOVE_INFLUENCER } from "../constants"

const initialState = {
    all_influencers: [],
    current_influencer: {},
    pending: null,
    error: null
}

const influencerReducer = (state = initialState, action) => {
    const influencers = [...state.all_influencers]

    switch (action.type) {
        case SET_INFLUENCERS_PENDING:

            return {
                ...state,
                pending: true
            }
        case SET_INFLUENCERS_SUCCESS:

            return {
                ...state,
                all_influencers: [...action.influencers],
                pending: false
            }
        case SET_INFLUENCERS_ERROR:

            return {
                ...state,
                pending: false,
                error: { type: action.type, message: action.message }
            }
        case SET_CURRENT_INFLUENCER:

            return {
                ...state,
                current_influencer: { ...action.influencer }
            }

        case REMOVE_INFLUENCER:
            return {
                ...state,
                all_influencers: [...influencers.filter(influ => influ.id !== action.influencer_id)]
            }
        default:
            return state
    }
}

export default influencerReducer