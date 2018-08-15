import { combineReducers } from "redux";
import authReducer from "./auth";
import errorsReducer from "./errors";
import profileReducer from "./profile";
import postReducer from "./post";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  post: postReducer
});

export default rootReducer;
