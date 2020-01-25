import { createStore, combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
import textReducer from '../reducers/textReducer';

const rootReducer = combineReducers(
    {
        count: countReducer,
        text: textReducer
    },
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;

//Here, we have created the redux store and passed the reducer to that store.
//  This store will ideally contain all the data that handles the app state. 

//