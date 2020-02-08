import { USER_LOGIN, USER_LOGOUT, SET_USER_PROJECTS } from '../constants';

const initialState = {
    user: {
        details: {},
        projects: {},
        fetch_jobs: {},
        collaborations: {},
    }
};
const userReducer = (state = initialState, action) => {
    let updated_user = { ...state.user }
    let updated_state = { ...state }
    switch (action.type) {
        case USER_LOGIN:
            const details = { ...action.payload.details }
            updated_user.details = details
            updated_state.user = updated_user
            return {
                ...updated_state
            };
        case USER_LOGOUT:
            return {
                ...initialState
            };
        case SET_USER_PROJECTS:
            const projects = [...action.payload]
            updated_user.projects = projects
            updated_state.user = updated_user
            return {
                ...updated_state
            };
        default:
            return state;
    }
}
export default userReducer;