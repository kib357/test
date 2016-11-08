import { combineReducers } from "redux";
import helmet from "./helmet";
import cities from "./cities";
import nav from "./nav";

const rootReducer = combineReducers({
    helmet,
    cities,
    nav,
});

export default rootReducer;