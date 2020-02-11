import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import projectReducer from '../reducers/projectReducer';
import fetchJobReducer from '../reducers/fetchJobReducer';
import influencerReducer from '../reducers/influencerReducer';

const rootReducer = combineReducers(
    {
        user: userReducer,
        project: projectReducer,
        fetch_job: fetchJobReducer,
        influencer: influencerReducer
    },
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;