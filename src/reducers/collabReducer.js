import { SET_COLLABS_PENDING, SET_COLLABS_SUCCESS, SET_COLLABS_ERROR, SET_CURRENT_COLLAB, CLEAR_CURRENT_COLLAB, ADD_COLLAB, REMOVE_COLLAB, UPDATE_COLLAB } from '../constants'
import { GET_USER_MEDIA_PENDING, GET_USER_MEDIA_SUCCESS, GET_USER_MEDIA_ERROR } from '../constants/response/types'

const initialState = {
    collabs: [],
    current_collab: {},
    pending: null,
    error: null,
    publications: [],
    response: {}
}

const collabReducer = (state = initialState, action) => {
    let collabs = [...state.collabs]
    switch (action.type) {

        case SET_COLLABS_PENDING:

            return {
                ...state,
                pending: true,
            }

        case SET_COLLABS_SUCCESS:

            return {
                ...state,
                pending: false,
                collabs: action.collabs
            }

        case SET_COLLABS_ERROR:

            return {
                ...state,
                pending: false,
                error: action.message
            }

        case SET_CURRENT_COLLAB:

            return {
                ...state,
                current_collab: { ...action.collab },
                pending: false
            }

        case CLEAR_CURRENT_COLLAB:

            return {
                ...state,
                current_collab: {},
                pending: null
            }

        case ADD_COLLAB:

            return {
                ...state,
                collabs: [...state.collabs, action.collab]
            }

        case UPDATE_COLLAB:
            collabs.splice(getIndex(collabs, action.collab), 1, action.collab)

            return {
                ...state,
                collabs: collabs

            }

        case REMOVE_COLLAB:

            return {
                ...state,
                collabs: [...state.collabs.filter(c => c.details.id !== action.collab.details.id)]
            }


        case GET_USER_MEDIA_PENDING:

            return {
                ...state,
                pending: true
            }

        case GET_USER_MEDIA_SUCCESS:

            return {
                ...state,
                response: { type: action.type, message: action.message },
                publications: action.media,
                pending: false
            }

        case GET_USER_MEDIA_ERROR:

            return {
                ...state,
                response: { type: action.type, message: action.message },
                pending: false,
                error: true
            }

        default:
            return state
    }
}

export const getIndex = (collabs, collab) => collabs.map(c => { return c }).indexOf(collab.details.id)
export const activeCollabs = state => [...state.collab.collabs.filter(collab => collab.details.active == true)]
export const completedCollabs = state => [...state.collab.collabs.filter(collab => collab.details.active == false)]
export const searchedCollabs = (state, text) => [...state.collab.collabs.filter(collab => collab.details.title.toLowerCase().includes(text.toLowerCase()))]

export default collabReducer