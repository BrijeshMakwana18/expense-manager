import {actionTypes} from './actionTypes';

const initialState = {
  userToken: '',
};

const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNUP:
      return {...state, userToken: action.payload};
    default:
      return state;
  }
};

export default SignupReducer;
