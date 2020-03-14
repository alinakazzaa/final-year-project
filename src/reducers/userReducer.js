import { USER_LOGOUT } from '../constants';
import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from '../constants/response/types';

const initialState = {
    pending: true,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...action.user,
                pending: false
            };
        case USER_LOGIN_ERROR:
            return {
                pending: false,
                error: { type: action.type, message: action.message },
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