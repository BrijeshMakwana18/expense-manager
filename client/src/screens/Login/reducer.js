import {actionTypes} from './actionTypes';

const initialState = {
  userToken: '',
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_LOGIN:
      console.log(action);
      return {...state, userToken: action.payload};
    default:
      return state;
  }
};

export default LoginReducer;
