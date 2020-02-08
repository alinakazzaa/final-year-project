import { USER_LOGIN, USER_LOGOUT } from '../constants';

const initialState = {
    user: {
    }
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            // let user = { ...state.user }
            // user.details = { ...action.payload }
            return {
                ...action.payload
            };
        case USER_LOGOUT:
            return {
                ...initialState
            };
        default:
            return state;
    }
}
export default userReducer;