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
    let newState = { ...state }
    let newUser = { ...state.user }
    switch (action.type) {
        case USER_LOGIN:
            const user = { ...action.payload }
            newUser.details = user.details
            return {
                ...newUser
            };
        case USER_LOGOUT:
            return {
                ...initialState
            };
        case SET_USER_PROJECTS:
            const projects = [...action.payload]
            newState.projects = projects
            return {
                ...newState
            };
        default:
            return state;
    }
}
export default userReducer;