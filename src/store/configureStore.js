import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import projectReducer from '../reducers/projectReducer';
import fetchJobReducer from '../reducers/fetchJobReducer';
import influencerReducer from '../reducers/influencerReducer';
import fetchReducer from '../reducers/fetchReducer';
import collabReducer from '../reducers/collabReducer';

const rootReducer = combineReducers(
    {
        user: userReducer,
        project: projectReducer,
        fetch_job: fetchJobReducer,
        influencer: influencerReducer,
        running_fetch: fetchReducer,
        collab: collabReducer
    },
);

const configureStore = () => {

    return createStore(rootReducer, compose(applyMiddleware(thunk),
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
}

export default configureStore;