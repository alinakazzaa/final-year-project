import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import projectReducer from '../reducers/projectReducer';
import fetchJobReducer from '../reducers/fetchJobReducer';
import influencerReducer from '../reducers/influencerReducer';
import instagramReducer from '../reducers/instagramReducer';

const middlewares = [thunk];

const rootReducer = combineReducers(
    {
        user: userReducer,
        project: projectReducer,
        fetch_job: fetchJobReducer,
        influencer: influencerReducer,
        insta_fetch: instagramReducer
    },
);

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(...middlewares));
}

export default configureStore;