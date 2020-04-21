import { SET_INFLUENCERS_PENDING, SET_INFLUENCERS_SUCCESS, SET_INFLUENCERS_ERROR } from "../constants/response/types"
import { SET_CURRENT_INFLUENCER, REMOVE_INFLUENCER, UPDATE_INFLUENCER, CLEAR_CURRENT_INFLUENCER, CLEAR_INFLUENCER_STATE } from "../constants"

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
                pending: true,
                error: null,
                response: null
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
                current_influencer: action.influencer
            }

        case UPDATE_INFLUENCER:
            influencers.splice(getIndex(influencers, action.influencer.id), 1, action.influencer)

            return {
                ...state,
                all_influencers: influencers,
                pending: false
            }


        case REMOVE_INFLUENCER:
            return {
                ...state,
                all_influencers: [...influencers.filter(influ => influ.id !== action.id)],
                pending: false
            }

        case CLEAR_CURRENT_INFLUENCER:

            return {
                ...state,
                current_influencer: {}
            }
        case CLEAR_INFLUENCER_STATE:

            return {
                ...initialState
            }

        default:
            return state
    }
}

export const getIndex = (influencers, influ_id) => influencers.map(influ => { return influ.id }).indexOf(influ_id)

export default influencerReducer