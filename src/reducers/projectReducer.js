import { SET_PROJECTS, SET_CURRENT_PROJECT } from '../constants';

const initialState = {
    projects: {},
    current_project: {}
};

const projectReducer = (state = initialState, action) => {
    let updated_state = { ...state }

    switch (action.type) {
        case SET_PROJECTS:
            updated_state.projects = [...action.payload]
            return {
                ...updated_state
            };
        case SET_CURRENT_PROJECT:
            updated_state.current_project = { ...action.payload }
            return {
                ...updated_state
            };
        default:
            return state;
    }
}
export default projectReducer;