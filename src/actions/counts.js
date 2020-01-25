// Actions are JavaScript objects that represent payloads of
// information that send data from your application to your Redux store.

// Actions have a type and an optional payload

import { COUNTER_CHANGE } from '../constants';
export function changeCount(count) {
    return {
        type: COUNTER_CHANGE,
        payload: count
    }
}

// The changeCount() function returns an action. Now based on that action, reducers function’s case is executed.
//