import { USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGIN_ERROR } from '../constants';

const initialState = {
    pending: true,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            console.log(action.payload)
            return {
                ...action.payload,
                pending: false
            };
        case USER_LOGIN_ERROR:
            return {
                pending: false,
                error: action.error,
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