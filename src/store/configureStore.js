import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import projectReducer from '../reducers/projectReducer';
import fetchJobReducer from '../reducers/fetchJobReducer';

const rootReducer = combineReducers(
    {
        user: userReducer,
        projects: projectReducer,
        fetch_jobs: fetchJobReducer
    },
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;