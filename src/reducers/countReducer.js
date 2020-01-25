// A reducer is a pure function that takes the previous state
//  and an action as arguments and returns a new state.

import { COUNTER_CHANGE } from '../constants';
const initialState = {
    count: 0
};
const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTER_CHANGE:
            return {
                ...state,
                count: action.payload
            };
        default:
            return state;
    }
}
export default countReducer;

// The first time, it will take the initial state of our application,
// and then we pass whatever argument, it takes that argument and operates based on the case execution.
// The second argument is action, which consists of type and payload. The payload is the count value,
// which assigned to count variable in store.
//