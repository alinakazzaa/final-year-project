import { SET_COLLABS_PENDING, SET_COLLABS_SUCCESS, SET_COLLABS_ERROR, SET_CURRENT_COLLAB, CLEAR_CURRENT_COLLAB, ADD_COLLAB, REMOVE_COLLAB, UPDATE_COLLAB } from '../constants';

const initialState = {
    collabs: [],
    current_collab: {},
    pending: null,
    error: null
};

const collabReducer = (state = initialState, action) => {
    let collabs = [...state.collabs]
    switch (action.type) {

        case SET_COLLABS_PENDING:

            return {
                ...state,
                pending: true,
            };

        case SET_COLLABS_SUCCESS:

            return {
                ...state,
                pending: false,
                collabs: action.collabs
            };

        case SET_COLLABS_ERROR:

            return {
                ...state,
                pending: false,
                error: action.message
            };

        case SET_CURRENT_COLLAB:

            return {
                ...state,
                current_collab: { ...action.collab },
                pending: false
            };

        case CLEAR_CURRENT_COLLAB:

            return {
                ...state,
                current_collab: {},
                pending: null
            };

        case ADD_COLLAB:

            return {
                ...state,
                collabs: [...state.collabs, action.collab]
            };

        case UPDATE_COLLAB:
            collabs.splice(getIndex(collabs, action.collab), 1, action.collab)

            return {
                ...state,
                collabs: collabs

            };

        case REMOVE_COLLAB:

            return {
                ...state,
                collabs: [...state.collabs.filter(c => c.details.id !== action.collab.details.id)]
            };

        default:
            return state;
    }
}

export const getIndex = (collabs, collab) => collabs.map(c => { return c }).indexOf(collab.details.id);

export default collabReducer;