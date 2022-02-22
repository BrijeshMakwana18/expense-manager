import {put, call, takeLatest} from 'redux-saga/effects';
import {actionTypes} from './actionTypes';
function userSignup(action) {
  console.log('userSignup saga');
  put({
    type: actionTypes.USER_SIGNUP,
    payload: action.payload,
  });
}
export function* userSignupWatcher() {
  yield takeLatest(actionTypes.USER_SIGNUP, userSignup);
}
