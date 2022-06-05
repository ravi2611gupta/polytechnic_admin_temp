import { compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../pages/Login/Redux/login.redux";

import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    login:loginReducer
})

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;


// const store = createStore(rootReducer,['Use Redux'],applyMiddleware(thunk))
const middleware = [thunk]





  const store = configureStore(
    {reducer:rootReducer},
    composeEnhancers(
        applyMiddleware(middleware)
    )
);

export default store;