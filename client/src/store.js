import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

//Set initial state to an empty object
const initialState = {};

//Put all middleware that we are going to use in this array
const middleware = [thunk];

//createStore takes in three argument: reducer, state and middleware.
//Since we are using redux, we need to wrap our applyMiddleware in a compose function
const store = createStore(rootReducer, initialState, compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;