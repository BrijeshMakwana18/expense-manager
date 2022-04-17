import {put, takeLatest} from 'redux-saga/effects';
import {HTTP_METHODS} from '../../services/api-constants';
import {FETCH_STAT} from '../../services/api-endpoints';
import {request} from '../../services/services';
import {actionTypes} from './actionTypes';
function* fetchStat(action) {
  const params = action.payload.params;
  const token = action.payload.token;
  try {
    const {response} = yield request(
      FETCH_STAT(),
      HTTP_METHODS.POST,
      params,
      true,
      token,
    );
    console.log('Success', response);
    action.payload.onSuccess(response.data);
  } catch (error) {
    console.log('Error', error.data);
  }
}
export function* fetchStatWatcher() {
  yield takeLatest(actionTypes.FETCH_STAT, fetchStat);
}
