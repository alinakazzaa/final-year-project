import { createStore, combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
import textReducer from '../reducers/textReducer';
import userReducer from '../reducers/userReducer';
import projectReducer from '../reducers/projectReducer';

const rootReducer = combineReducers(
    {
        count: countReducer,
        text: textReducer,
        user: userReducer,
        projects: projectReducer
    },
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;