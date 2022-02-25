import {actionTypes} from './actionTypes';
const initialState = {
  userDetails: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA:
      console.log(action);
      return {...state, userDetails: action.payload};
    default:
      return state;
  }
};

export default AppReducer;
