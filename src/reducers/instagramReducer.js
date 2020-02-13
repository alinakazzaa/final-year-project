import { SET_CURRENT_FETCH_JOB, SET_FETCH_JOBS, GET_MEDIA_BY_HASHTAG_ERROR, GET_MEDIA_BY_HASHTAG_SUCCESS, GET_MEDIA_BY_HASHTAG_PENDING, GET_NEXT_PAGE_PENDING, GET_NEXT_PAGE_SUCCESS, GET_NEXT_PAGE_ERROR, GET_MEDIA_IDS, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_ERROR, GET_USER_BY_USERNAME_PENDING, GET_USER_BY_USERNAME_SUCCESS, GET_USER_BY_USERNAME_ERROR } from '../constants';

const initialState = {
    pending: false,
    result: {},
    error: null,
    influ_ids: [],
    influencers: []
};

const instagramReducer = (state = initialState, action) => {
    let updated_state
    let influencer
    let influs = []
    switch (action.type) {
        // case GET_MEDIA_BY_HASHTAG_PENDING:
        //     return {
        //         ...state,
        //         pending: true
        //     }
        // case GET_MEDIA_BY_HASHTAG_SUCCESS:
        //     return {
        //         ...state,
        //         pending: false,
        //         result: { ...action.payload }
        //     }
        // case GET_MEDIA_BY_HASHTAG_ERROR:
        //     return {
        //         ...state,
        //         pending: false,
        //         error: action.error
        //     }
        case GET_MEDIA_IDS:
            return {
                ...state,
                pending: false,
                influ_ids: action.payload
            }

        case GET_NEXT_PAGE_PENDING:
            return {
                ...state,
                pending: true
            }
        case GET_NEXT_PAGE_SUCCESS:
            return {
                ...state,
                // pending: false,
                // edges: [...action.payload]
            }
        case GET_NEXT_PAGE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        case GET_USER_BY_ID_PENDING:
            return {
                ...state,
                pending: true
            }
        case GET_USER_BY_ID_SUCCESS:
            updated_state = { ...state }
            influencer = { ...action.payload }
            console.log(action.payload)
            // influs = [...state.influencers]
            // influs.push(influencer.data.user.reel.user)
            // updated_state.influencers = influs
            return {
                ...state
            }

        case GET_USER_BY_ID_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }

        case GET_USER_BY_ID_PENDING:
            return {
                ...state,
                pending: true
            }
        case GET_USER_BY_USERNAME_PENDING:
            return {
                ...state,
                pending: true
            }
        case GET_USER_BY_USERNAME_SUCCESS:
            updated_state = { ...state }
            influencer = { ...action.payload }
            const influs = [...state.influencers]
            influs.push(influencer)
            updated_state.influencers = influs
            return {
                ...updated_state
            }

        case GET_USER_BY_USERNAME_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export const getMedia = state => state.insta_fetch.result;
export const getPending = state => state.insta_fetch.pending;
export const getError = state => state.insta_fetch.error;

export const getInfluIDs = state => state.insta_fetch.influ_ids;
export const getInfluencers = state => state.insta_fetch.influencers;

export default instagramReducer;