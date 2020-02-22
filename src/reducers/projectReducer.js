import { SET_PROJECTS_PENDING, SET_CURRENT_PROJECT, SET_PROJECTS_SUCCESS, SET_PROJECTS_ERROR, CLEAR_CURRENT_PROJECT, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from '../constants';

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
    let proj
    let active
    let archived

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
            updated_state.error = null
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

        case CLEAR_CURRENT_PROJECT:
            updated_state.current_project = {}
            return {
                ...updated_state
            };

        case ADD_PROJECT:
            if (action.payload.active) {
                active = [...updated_state.projects.active]
                active.splice(active.length, 1, action.payload);
                updated_state.projects = { ...updated_state.projects, active: active }
            } else {
                archived = [...state.projects.archived]
                archived.splice(archived.length, 1, action.payload);
                updated_state.projects = { ...updated_state.projects, archived: archived }
            }
            return {
                ...updated_state
            };
        case UPDATE_PROJECT:
            if (action.payload.active) {
                active = [...updated_state.projects.active]
                let index = active.findIndex(proj => proj.id == action.payload.id);
                active.splice(index, 1, action.payload);
                updated_state.projects = { ...updated_state.projects, active: active }
            } else {
                archived = [...updated_state.projects.archived]
                let index = archived.findIndex(proj => proj.id == action.payload.id);
                archived.splice(index, 1, action.payload);
                updated_state.projects = { ...updated_state.projects, archived: archived }
            }
            return {
                ...updated_state,

            };

        case REMOVE_PROJECT:
            proj = action.payload
            if (proj.active) {
                active = [...updated_state.projects.active]
                active.filter(project => project.id !== action.payload.id)
                updated_state.projects = { ...updated_state.projects, active: active }
            } else {
                archived = [...updated_state.projects.archived]
                archived.filter(project => project.id !== action.payload.id)
                updated_state.projects = { ...updated_state.projects, archived: archived }
            }
            return {
                ...updated_state
            };

        default:
            return state;
    }
}
export default projectReducer;