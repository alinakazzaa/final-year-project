import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import projectReducer from '../reducers/projectReducer';

const rootReducer = combineReducers(
    {
        user: userReducer,
        projects: projectReducer,
    },
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;