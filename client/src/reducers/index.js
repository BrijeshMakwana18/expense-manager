import {combineReducers} from 'redux';
import LoginReducer from '../screens/Login/reducer';
import SignupReducer from '../screens/Signup/reducer';
const reducer = combineReducers({
  LoginReducer,
  SignupReducer,
});

export default reducer;
