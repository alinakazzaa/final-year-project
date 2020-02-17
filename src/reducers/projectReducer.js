import { SET_PROJECTS_PENDING, SET_CURRENT_PROJECT, UPDATE_STATE_PROJECTS, SET_PROJECTS_SUCCESS, SET_PROJECTS_ERROR } from '../constants';

const initialState = {
    projects: {
        active: [],
        archived: []
    },
    current_project: {},
    pending: null,
    error: null
};

const projectReducer = (state = initialState, action) => {
    let updated_state = { ...state }

    switch (action.type) {
        case SET_PROJECTS_PENDING:
            updated_state.pending = true
            return {
                ...updated_state
            };
        case SET_PROJECTS_SUCCESS:
            updated_state.projects.active = action.active
            updated_state.projects.archived = action.archived
            updated_state.pending = false
            return {
                ...updated_state
            };
        case SET_PROJECTS_ERROR:
            updated_state.pending = false
            updated_state.error = action.error
            return {
                ...updated_state
            };
        case SET_CURRENT_PROJECT:
            updated_state.current_project = { ...action.payload }
            updated_state.pending = false
            return {
                ...updated_state
            };
        default:
            return state;
    }
}
export default projectReducer;