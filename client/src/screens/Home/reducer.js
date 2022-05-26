import {actionTypes} from './actionTypes';
const initialState = {
  userDetails: {},
  dashboardData: {},
  investments: {},
  isInvestmentsLoading: true,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_DATA:
      return {...state, userDetails: action.payload};
    case actionTypes.SET_DASHBOARD_DATA:
      return {...state, dashboardData: action.payload};
    case actionTypes.LOADING_INVESTMENTS:
      return {...state, isInvestmentsLoading: action.payload};
    case actionTypes.SET_INVESTMENTS_DATA:
      return {
        ...state,
        investments: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
