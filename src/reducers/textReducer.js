import { TEXT_CHANGE } from '../constants';

const initialState = {
    text: ''
};

const textReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEXT_CHANGE:
            console.log(state)
            return {
                ...state,
                somethingElse: action.payload
            };
        default:
            return state;
    }
}
export default textReducer;

//