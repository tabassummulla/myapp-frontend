import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import accessTokenReducer from "./reducers/authReducer";
import navBarReducer from "./reducers/navBarReducer";
import userReducer from "./reducers/userReducer";
import profileReducer from "./reducers/profileReucer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  accessToken: accessTokenReducer,
  navBarValue: navBarReducer,
  user: userReducer,
  profile: profileReducer
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
