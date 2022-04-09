import {actionTypes} from './actionTypes';
const initialState = {
  userDetails: {},
  dashboardData: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA:
      return {...state, userDetails: action.payload};
    case actionTypes.SET_DASHBOARD_DATA:
      return {...state, dashboardData: action.payload};
    default:
      return state;
  }
};

export default AppReducer;
