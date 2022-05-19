import {put, takeLatest} from 'redux-saga/effects';
import {HTTP_METHODS} from '../../services/api-constants';
import {FETCH_DASHBOARD, FETCH_INVESTMETNS} from '../../services/api-endpoints';
import {request} from '../../services/services';
import {actionTypes} from './actionTypes';
function* fetchDashboard(action) {
  try {
    const {response} = yield request(
      FETCH_DASHBOARD(),
      HTTP_METHODS.POST,
      action.payload.params,
      true,
    );
    if (response.data.responseType) {
      yield put({
        type: actionTypes.SET_DASHBOARD_DATA,
        payload: response.data,
      });
    }
    if (action.payload.onSuccess) {
      action?.payload?.onSuccess(response.data);
    }
  } catch (error) {
    if (action.payload.onError) {
      action?.payload?.onError(error.response.data);
    }
  }
}
export function* fetchDashboardWatcher() {
  yield takeLatest(actionTypes.FETCH_DASHBOARD, fetchDashboard);
}

function* fetchInvestments(action) {
  yield put({
    type: actionTypes.LOADING_INVESTMENTS,
    payload: true,
  });
  try {
    const {response} = yield request(
      FETCH_INVESTMETNS(),
      HTTP_METHODS.POST,
      action.payload.params,
      true,
    );
    if (response.data) {
      yield put({
        type: actionTypes.SET_INVESTMENTS_DATA,
        payload: response.data,
      });
      yield put({
        type: actionTypes.LOADING_INVESTMENTS,
        payload: false,
      });
    }
    if (action.payload.onSuccess) {
      action?.payload?.onSuccess(response.data);
    }
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_INVESTMENTS,
      payload: false,
    });
    if (action.payload.onError) {
      action?.payload?.onError(error.response.data);
    }
  }
}
export function* fetchInvestmentsWatcher() {
  yield takeLatest(actionTypes.FETCH_INVESTMENTS, fetchInvestments);
}
