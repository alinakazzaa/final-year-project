import { USER_LOGIN, USER_LOGOUT } from '../constants';

const initialState = {
    user: {
    }
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
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