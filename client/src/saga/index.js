import {all} from 'redux-saga/effects';
import {userLoginWatcher} from '../screens/Login/saga';
import {userSignupWatcher} from '../screens/Signup/saga';
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([userLoginWatcher(), userSignupWatcher()]);
}
