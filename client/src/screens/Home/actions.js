import {actionTypes} from './actionTypes';
export const fetchDashboard = data => ({
  type: actionTypes.FETCH_DASHBOARD,
  payload: data,
});
export const setDashboardData = data => ({
  type: actionTypes.SET_DASHBOARD_DATA,
  payload: data,
});
