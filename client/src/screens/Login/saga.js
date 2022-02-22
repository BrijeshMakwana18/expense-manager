import {put, call, takeLatest} from 'redux-saga/effects';
import {actionTypes} from './actionTypes';
function userLogin(action) {
  console.log('userLogin saga');
  put({
    type: actionTypes.USER_LOGIN,
    payload: action.payload,
  });
}
export function* userLoginWatcher() {
  yield takeLatest(actionTypes.USER_LOGIN, userLogin);
}
