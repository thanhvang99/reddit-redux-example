import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function configureStore(preloadedState){
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}
