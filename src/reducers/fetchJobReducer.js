import { SET_CURRENT_FETCH_JOB, SET_FETCH_JOBS } from '../constants';

const initialState = {
    fetch_jobs: {},
    current_fetch_job: {}
};

const fetchJobReducer = (state = initialState, action) => {
    let updated_state = { ...state }
    switch (action.type) {
        case SET_FETCH_JOBS:
            let jobs = [...action.payload]
            updated_state.fetch_jobs = jobs
            return {
                ...updated_state
            };
        case SET_CURRENT_FETCH_JOB:
            updated_state.current_fetch_job = { ...action.payload }
            return {
                ...updated_state
            };
        default:
            return state;
    }
}
export default fetchJobReducer;