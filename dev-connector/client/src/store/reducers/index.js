import { combineReducers } from "redux";
import authReducer from "./auth";
import errorsReducer from "./errors";
import profileReducer from "./profile";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer
});

export default rootReducer;
