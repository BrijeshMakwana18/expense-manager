import {actionTypes} from './actionTypes';

export const handleFetchStat = data => ({
  type: actionTypes.FETCH_STAT,
  payload: data,
});
